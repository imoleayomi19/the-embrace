import { useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  AirVent,
  BatteryCharging,
  Check,
  CookingPot,
  Droplets,
  Fan,
  GlassWater,
  Heater,
  Laptop,
  Lightbulb,
  Microwave,
  Minus,
  Plane,
  Plus,
  Refrigerator,
  Snowflake,
  Speaker,
  Sun,
  Trash2,
  Tv,
  WashingMachine,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useCart } from "../context/cartStore";
import calculatorConfig from "../data/solarCalculatorConfig.json";

type Appliance = {
  id: string;
  name: string;
  quantity: number;
  watts: number;
  hoursPerDay: number;
  icon: string;
};

type AppliancePreset = (typeof calculatorConfig.appliances)[number];
type PricedItem = { name: string; price: number } | null;

const iconByName: Record<string, LucideIcon> = {
  fan: Fan,
  bulb: Lightbulb,
  heater: Heater,
  refrigerator: Refrigerator,
  washingMachine: WashingMachine,
  television: Tv,
  airConditioner: AirVent,
  pump: Droplets,
  iron: Zap,
  drone: Plane,
  laptop: Laptop,
  cooker: CookingPot,
  microwave: Microwave,
  water: GlassWater,
  freezer: Snowflake,
  speaker: Speaker,
  cooler: Fan,
};

const backupOptions = ["Petrol Generator", "Diesel Generator", "Grid Only", "No Backup"] as const;
type BackupOption = (typeof backupOptions)[number];

const backupLabels: Record<BackupOption, string> = {
  "Petrol Generator": "Petrol generator",
  "Diesel Generator": "Diesel generator",
  "Grid Only": "Grid only",
  "No Backup": "Nothing yet",
};

function formatCurrency(value: number) {
  return `₦${Math.round(value).toLocaleString("en-NG")}`;
}

function makeAppliance(preset: AppliancePreset, quantity = 1): Appliance {
  return {
    id: `${preset.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${crypto.randomUUID()}`,
    name: preset.name,
    quantity,
    watts: preset.watts,
    hoursPerDay: preset.hoursPerDay,
    icon: preset.icon,
  };
}

function findInverter(requiredWatts: number): PricedItem {
  const inverter = calculatorConfig.inverters.find((item) => item.watts >= requiredWatts);
  return inverter ? { name: inverter.name, price: inverter.price } : null;
}

function findBattery(requiredAmpHours: number): PricedItem {
  const battery = calculatorConfig.batteries.find((item) => item.ampHours >= requiredAmpHours);
  return battery ? { name: battery.name, price: battery.price } : null;
}

function findPanel(dailyEnergyWh: number) {
  const requiredPanelWatts = dailyEnergyWh / calculatorConfig.sunHoursPerDay;
  const options = calculatorConfig.panels.map((panel) => {
    const quantity = Math.ceil(requiredPanelWatts / panel.watts);
    return { panel, quantity, totalPrice: quantity * panel.price };
  });
  const recommendation = options.reduce((best, option) =>
    option.totalPrice < best.totalPrice ||
      (option.totalPrice === best.totalPrice && option.panel.watts > best.panel.watts)
      ? option
      : best
  );
  const { panel: selectedPanel, quantity } = recommendation;
  return {
    name: `${quantity} × ${selectedPanel.watts} W Solar Panels`,
    price: quantity * selectedPanel.price,
    quantity,
    watts: selectedPanel.watts,
  };
}

export function SolarCalculator() {
  const { addToCart } = useCart();
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [backup, setBackup] = useState<BackupOption>("Petrol Generator");
  const [fuelPrice, setFuelPrice] = useState(1000);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [showOtherForm, setShowOtherForm] = useState(false);
  const [otherName, setOtherName] = useState("");
  const [otherWatts, setOtherWatts] = useState(100);
  const [otherHours, setOtherHours] = useState(6);
  const resultRef = useRef<HTMLElement>(null);

  const totals = useMemo(() => {
    const runningWatts = appliances.reduce((total, item) => total + item.quantity * item.watts, 0);
    const dailyEnergyWh = appliances.reduce(
      (total, item) => total + item.quantity * item.watts * item.hoursPerDay,
      0
    );
    const inverter = runningWatts > 0 ? findInverter(runningWatts * 1.25) : null;
    const batteryAmpHours = (dailyEnergyWh * 1.2) / calculatorConfig.batteryVoltage;
    const battery = dailyEnergyWh > 0 ? findBattery(batteryAmpHours) : null;
    const panels = dailyEnergyWh > 0 ? findPanel(dailyEnergyWh) : null;
    const completeSystemCost = (inverter?.price ?? 0) + (battery?.price ?? 0) + (panels?.price ?? 0);
    const monthlyFuelSavings =
      backup === "Petrol Generator"
        ? (dailyEnergyWh / 1000 / calculatorConfig.petrolGeneratorEfficiencyKwhPerLitre) *
        calculatorConfig.daysPerMonth *
        fuelPrice
        : 0;

    return {
      runningWatts,
      dailyEnergyWh,
      inverter,
      battery,
      batteryAmpHours,
      panels,
      completeSystemCost,
      monthlyFuelSavings,
      paybackMonths: monthlyFuelSavings > 0 ? completeSystemCost / monthlyFuelSavings : null,
    };
  }, [appliances, backup, fuelPrice]);

  const itemCount = appliances.reduce((total, item) => total + item.quantity, 0);

  function addPreset(preset: AppliancePreset) {
    setAppliances((current) => {
      const selected = current.find((item) => item.name === preset.name && !item.id.startsWith("other-"));
      return selected
        ? current.map((item) => (item.id === selected.id ? { ...item, quantity: item.quantity + 1 } : item))
        : [...current, makeAppliance(preset)];
    });
  }

  function decrementPreset(name: string) {
    setAppliances((current) =>
      current.flatMap((item) => {
        if (item.name !== name || item.id.startsWith("other-")) return [item];
        return item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : [];
      })
    );
  }

  function updateAppliance(id: string, field: "quantity" | "watts" | "hoursPerDay", value: number) {
    const safeValue = Number.isFinite(value) ? value : 0;
    setAppliances((current) =>
      current.map((item) =>
        item.id === id
          ? {
            ...item,
            [field]:
              field === "quantity"
                ? Math.max(1, Math.floor(safeValue))
                : field === "hoursPerDay"
                  ? Math.max(0, Math.min(24, safeValue))
                  : Math.max(0, safeValue),
          }
          : item
      )
    );
  }

  function addOtherAppliance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = otherName.trim();
    if (!name) return;
    setAppliances((current) => [
      ...current,
      {
        id: `other-${crypto.randomUUID()}`,
        name,
        quantity: 1,
        watts: Number.isFinite(otherWatts) ? Math.max(0, otherWatts) : 0,
        hoursPerDay: Number.isFinite(otherHours) ? Math.max(0, Math.min(24, otherHours)) : 0,
        icon: "appliance",
      },
    ]);
    setOtherName("");
    setShowOtherForm(false);
  }

  function adjustHours(adjustment: number) {
    setAppliances((current) =>
      current.map((item) => ({
        ...item,
        hoursPerDay: Math.max(0, Math.min(24, item.hoursPerDay + adjustment)),
      }))
    );
  }

  function calculate() {
    setHasCalculated(true);
    window.setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  }

  function addAvailableItemsToCart() {
    if (totals.inverter) {
      addToCart({
        id: `solar-calculator-inverter-${totals.inverter.name}`,
        productName: totals.inverter.name,
        configurationName: "Solar calculator recommendation",
        price: totals.inverter.price,
      });
    }
    if (totals.battery) {
      addToCart({
        id: `solar-calculator-battery-${totals.battery.name}`,
        productName: totals.battery.name,
        configurationName: "Solar calculator recommendation",
        price: totals.battery.price,
      });
    }
    if (totals.panels) {
      addToCart({
        id: `solar-calculator-panels-${totals.panels.watts}`,
        productName: `${totals.panels.quantity} × ${totals.panels.watts} W Solar Panels`,
        configurationName: "Solar calculator recommendation",
        price: totals.panels.price,
      });
    }
  }

  function checkoutOnWhatsApp() {
    const applianceList = appliances.map(
      (item) => `• ${item.name}: ${item.quantity} × ${item.watts} W, ${item.hoursPerDay} hrs/day`
    );
    const message = [
      "Hello EmbraceTech, I used the Solar Load Calculator and would like a quote.",
      "",
      "Selected appliances:",
      ...applianceList,
      "",
      "Recommended system:",
      `• Inverter: ${totals.inverter?.name ?? "Custom size — quote required"} (${totals.inverter ? formatCurrency(totals.inverter.price) : "Quote required"})`,
      `• Battery: ${totals.battery?.name ?? `${Math.ceil(totals.batteryAmpHours)} Ah — quote required`} (${totals.battery ? formatCurrency(totals.battery.price) : "Quote required"})`,
      `• Solar panels: ${totals.panels?.name ?? "Not calculated"} (${totals.panels ? formatCurrency(totals.panels.price) : "—"})`,
      `Estimated complete-item system cost: ${formatCurrency(totals.completeSystemCost)}`,
      `Estimated monthly fuel savings: ${formatCurrency(totals.monthlyFuelSavings)}`,
      `Estimated payback: ${totals.paybackMonths === null ? "Not available" : `${totals.paybackMonths.toFixed(1)} months`}`,
    ].join("\n");
    window.open(`https://wa.me/2347061451583?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 font-poppins text-sm text-slate-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15";
  const primaryButton =
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-montserrat text-sm font-bold text-white transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:cursor-not-allowed disabled:opacity-50";
  const quietButton =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 font-montserrat text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <main className="min-h-screen bg-slate-50 pb-28 pt-20 sm:pt-24 lg:pb-16">
      {/* Intro */}
      <header className="bg-primary text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.3fr_1fr] md:items-center md:py-16">
          <div>
            <p className="mb-3 font-montserrat text-sm font-semibold text-secondary">EmbraceTech solar planner</p>
            <h1 className="font-anton text-3xl leading-tight tracking-wide text-white sm:text-4xl md:text-5xl">
              Find the right solar system for your home or business
            </h1>
            <p className="mt-4 max-w-xl font-poppins text-sm leading-7 text-white/85 sm:text-base">
              Pick the appliances you want to power. We'll size your inverter, batteries and panels, then show how
              much you could save on fuel.
            </p>
          </div>

          <ol className="space-y-3 rounded-xl bg-white/10 p-5 font-poppins text-sm text-white/90 backdrop-blur-sm">
            {[
              ["Choose what you power", "Tap your appliances"],
              ["Check the details", "Fix any numbers that look off"],
              ["See your system", "Get sizes, prices and savings"],
            ].map(([title, hint], index) => (
              <li key={title} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary font-montserrat text-xs font-bold text-primary">
                  {index + 1}
                </span>
                <span>
                  <span className="block font-montserrat font-semibold text-white">{title}</span>
                  <span className="text-white/70">{hint}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0 space-y-8">
          {/* Step 1 */}
          <Panel step={1} title="What do you want to power?" hint="Tap an appliance to add it. Use + and − to change how many you have.">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {calculatorConfig.appliances.map((preset) => {
                const quantity =
                  appliances.find((item) => item.name === preset.name && !item.id.startsWith("other-"))?.quantity ?? 0;
                const Icon = iconByName[preset.icon] ?? Zap;
                const selected = quantity > 0;
                return (
                  <div
                    key={preset.name}
                    className={`flex flex-col overflow-hidden rounded-xl border-2 transition ${selected ? "border-primary bg-primary/5" : "border-slate-200 bg-white hover:border-secondary"
                      }`}
                  >
                    <button
                      type="button"
                      onClick={() => addPreset(preset)}
                      aria-label={`Add ${preset.name}${selected ? `, ${quantity} selected` : ""}`}
                      className="flex flex-1 items-center gap-3 p-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-secondary"
                    >
                      <span
                        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${selected ? "bg-primary text-secondary" : "bg-slate-100 text-primary"
                          }`}
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-montserrat text-sm font-semibold leading-tight text-slate-800">
                          {preset.name}
                        </span>
                        <span className="block font-poppins text-xs text-slate-500">about {preset.watts} W</span>
                      </span>
                    </button>
                    <div
                      className={`flex items-center justify-between border-t px-2 py-1.5 ${selected ? "border-primary/15" : "border-slate-100"
                        }`}
                    >
                      {selected ? (
                        <>
                          <button
                            type="button"
                            onClick={() => decrementPreset(preset.name)}
                            aria-label={`Remove one ${preset.name}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-primary hover:bg-primary/10"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="font-montserrat text-sm font-bold text-primary" aria-live="polite">
                            {quantity} added
                          </span>
                          <button
                            type="button"
                            onClick={() => addPreset(preset)}
                            aria-label={`Add another ${preset.name}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-primary hover:bg-primary/10"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </>
                      ) : (
                        <span className="w-full py-1 text-center font-poppins text-xs text-slate-400">Tap to add</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-4">
              {showOtherForm ? (
                <form onSubmit={addOtherAppliance} className="grid gap-3 sm:grid-cols-[1.5fr_1fr_1fr_auto] sm:items-end">
                  <label className="font-montserrat text-xs font-semibold text-slate-700">
                    What is it called?
                    <input
                      required
                      value={otherName}
                      onChange={(event) => setOtherName(event.target.value)}
                      placeholder="e.g. Blender"
                      className={`${inputClass} mt-1`}
                    />
                  </label>
                  <label className="font-montserrat text-xs font-semibold text-slate-700">
                    Power (watts)
                    <input
                      type="number"
                      min="0"
                      value={otherWatts}
                      onChange={(event) => setOtherWatts(Number(event.target.value))}
                      className={`${inputClass} mt-1`}
                    />
                  </label>
                  <label className="font-montserrat text-xs font-semibold text-slate-700">
                    Hours used daily
                    <input
                      type="number"
                      min="0"
                      max="24"
                      step="0.5"
                      value={otherHours}
                      onChange={(event) => setOtherHours(Number(event.target.value))}
                      className={`${inputClass} mt-1`}
                    />
                  </label>
                  <div className="flex gap-2">
                    <button type="submit" className={primaryButton}>
                      Add
                    </button>
                    <button type="button" onClick={() => setShowOtherForm(false)} className={quietButton}>
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                  <p className="font-poppins text-sm text-slate-600">Can't see your appliance? Add it yourself.</p>
                  <button type="button" onClick={() => setShowOtherForm(true)} className={quietButton}>
                    <Plus className="h-4 w-4" /> Add your own
                  </button>
                </div>
              )}
            </div>
          </Panel>

          {/* Step 2 */}
          <Panel
            step={2}
            title="Check the details"
            hint="We've filled in typical figures. Change them if your appliances are different. The watts are usually on the appliance label."
          >
            {appliances.length === 0 ? (
              <div className="rounded-xl bg-slate-50 px-4 py-8 text-center">
                <p className="font-montserrat text-sm font-semibold text-slate-700">Nothing added yet</p>
                <p className="mt-1 font-poppins text-sm text-slate-500">
                  Go back to step 1 and tap the appliances you use.
                </p>
              </div>
            ) : (
              <ul className="space-y-3">
                {appliances.map((item) => {
                  const Icon = iconByName[item.icon] ?? Zap;
                  return (
                    <li key={item.id} className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-primary">
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </span>
                          <p className="truncate font-montserrat text-sm font-semibold text-slate-800">{item.name}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setAppliances((current) => current.filter((appliance) => appliance.id !== item.id))}
                          aria-label={`Remove ${item.name}`}
                          className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 font-poppins text-xs text-slate-500 transition hover:bg-slate-100 hover:text-primary"
                        >
                          <Trash2 className="h-4 w-4" /> Remove
                        </button>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
                        <Field label="How many">
                          <input
                            aria-label={`${item.name} quantity`}
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(event) => updateAppliance(item.id, "quantity", Number(event.target.value))}
                            className={inputClass}
                          />
                        </Field>
                        <Field label="Power (watts)">
                          <input
                            aria-label={`${item.name} watts`}
                            type="number"
                            min="0"
                            value={item.watts}
                            onChange={(event) => updateAppliance(item.id, "watts", Number(event.target.value))}
                            className={inputClass}
                          />
                        </Field>
                        <Field label="Hours used daily">
                          <input
                            aria-label={`${item.name} hours per day`}
                            type="number"
                            min="0"
                            max="24"
                            step="0.5"
                            value={item.hoursPerDay}
                            onChange={(event) => updateAppliance(item.id, "hoursPerDay", Number(event.target.value))}
                            className={inputClass}
                          />
                        </Field>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            <div className="mt-6 grid gap-5 border-t border-slate-100 pt-6 md:grid-cols-[1.4fr_1fr]">
              <fieldset>
                <legend className="font-montserrat text-sm font-semibold text-slate-800">
                  What do you use when the grid is off?
                </legend>
                <p className="mt-1 font-poppins text-xs text-slate-500">
                  We use this to work out how much you could save.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {backupOptions.map((option) => (
                    <label
                      key={option}
                      className={`cursor-pointer rounded-full border px-4 py-2 font-montserrat text-xs font-semibold transition focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-secondary ${backup === option
                          ? "border-primary bg-primary text-white"
                          : "border-slate-300 bg-white text-slate-700 hover:border-primary"
                        }`}
                    >
                      <input
                        type="radio"
                        name="backup"
                        value={option}
                        checked={backup === option}
                        onChange={() => setBackup(option)}
                        className="sr-only"
                      />
                      {backupLabels[option]}
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="font-montserrat text-sm font-semibold text-slate-800">
                Petrol price today
                <span className="mt-1 block font-poppins text-xs font-normal text-slate-500">Naira per litre</span>
                <span className="relative mt-3 block">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-poppins text-sm text-slate-500">
                    ₦
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={fuelPrice}
                    onChange={(event) => setFuelPrice(Math.max(0, Number(event.target.value)))}
                    className={`${inputClass} pl-8`}
                  />
                </span>
              </label>
            </div>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-poppins text-sm text-slate-500">
                {appliances.length === 0 ? "Add at least one appliance to continue." : "Happy with the list? Let's size your system."}
              </p>
              <button type="button" onClick={calculate} disabled={appliances.length === 0} className={primaryButton}>
                Show my recommended system
              </button>
            </div>
          </Panel>

          {/* Step 3 */}
          {hasCalculated && (
            <section ref={resultRef} className="scroll-mt-24" aria-labelledby="step-3-title">
              <Panel step={3} title="Your recommended system" hint="Based on the appliances above." headingId="step-3-title">
                <div className="grid gap-3 md:grid-cols-3">
                  <SystemCard
                    icon={Zap}
                    label="Inverter"
                    description="Turns stored power into electricity your appliances can use."
                    item={totals.inverter}
                    fallback="Larger than our standard sizes. Ask us for a quote."
                  />
                  <SystemCard
                    icon={BatteryCharging}
                    label="Batteries"
                    description="Store power so you have light at night and when it's cloudy."
                    item={totals.battery}
                    fallback={`You need about ${Math.ceil(totals.batteryAmpHours).toLocaleString("en-NG")} Ah. Ask us for a quote.`}
                  />
                  <SystemCard
                    icon={Sun}
                    label="Solar panels"
                    description="Collect sunlight and turn it into power."
                    item={totals.panels ? { name: totals.panels.name, price: totals.panels.price } : null}
                    fallback="Add appliances to see panels."
                  />
                </div>

                <div className="mt-5 flex flex-wrap items-end justify-between gap-3 rounded-xl bg-primary p-5 text-white">
                  <div>
                    <p className="font-montserrat text-sm font-semibold text-white/80">Estimated total cost</p>
                    <p className="font-poppins text-xs text-white/60">Includes only the items priced above</p>
                  </div>
                  <p className="font-anton text-3xl tracking-wide text-secondary">
                    {formatCurrency(totals.completeSystemCost)}
                  </p>
                </div>

                {(totals.inverter === null || totals.battery === null) && (
                  <p className="mt-3 rounded-lg bg-slate-50 px-4 py-3 font-poppins text-xs leading-5 text-slate-600">
                    Part of this system is bigger than our standard price list, so it isn't in the total. Message us for a
                    full quote.
                  </p>
                )}

                {/* Savings */}
                <div className="mt-8 rounded-xl border border-secondary/60 bg-secondary/10 p-5 sm:p-6">
                  <h3 className="font-montserrat text-lg font-bold normal-case tracking-normal text-primary">
                    What you could save
                  </h3>
                  {backup === "Petrol Generator" ? (
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="font-poppins text-xs text-slate-600">You spend on petrol each month</p>
                        <p className="font-anton text-3xl tracking-wide text-primary">
                          {formatCurrency(totals.monthlyFuelSavings)}
                        </p>
                      </div>
                      <div>
                        <p className="font-poppins text-xs text-slate-600">Solar pays for itself in about</p>
                        <p className="font-anton text-3xl tracking-wide text-primary">
                          {totals.paybackMonths === null ? "—" : `${totals.paybackMonths.toFixed(1)} months`}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-3 font-poppins text-sm leading-6 text-slate-700">
                      Savings are worked out from petrol spending. You chose “{backupLabels[backup]}”, so choose “Petrol
                      generator” in step 2 if you'd like to see them.
                    </p>
                  )}

                  <div className="mt-5 border-t border-secondary/40 pt-4">
                    <p className="font-montserrat text-sm font-semibold text-slate-800">Want to test a different routine?</p>
                    <p className="font-poppins text-xs text-slate-600">
                      This changes the daily hours of every appliance in your list.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => adjustHours(-1)}
                        disabled={appliances.every((item) => item.hoursPerDay <= 0)}
                        className={quietButton}
                      >
                        <Minus className="h-4 w-4" /> 1 hour less a day
                      </button>
                      <button
                        type="button"
                        onClick={() => adjustHours(1)}
                        disabled={appliances.every((item) => item.hoursPerDay >= 24)}
                        className={quietButton}
                      >
                        <Plus className="h-4 w-4" /> 1 hour more a day
                      </button>
                    </div>
                  </div>
                  <p className="mt-4 font-poppins text-[11px] leading-5 text-slate-500">
                    We assume a generator gives about {calculatorConfig.petrolGeneratorEfficiencyKwhPerLitre} kWh per litre.
                    Real fuel use varies.
                  </p>
                </div>

                <div className="mt-8">
                  <h3 className="font-montserrat text-lg font-bold normal-case tracking-normal text-primary">
                    Ready to go ahead?
                  </h3>
                  <p className="mt-1 font-poppins text-sm text-slate-600">
                    Prices are estimates. Your final quote may differ.
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={addAvailableItemsToCart}
                      disabled={!totals.inverter && !totals.battery && !totals.panels}
                      className={primaryButton}
                    >
                      <Check className="h-4 w-4" /> Add these items to my cart
                    </button>
                    <button
                      type="button"
                      onClick={checkoutOnWhatsApp}
                      disabled={appliances.length === 0}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-secondary px-6 py-3 font-montserrat text-sm font-bold text-primary transition hover:bg-secondary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <svg aria-hidden="true" className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12.04 2a9.9 9.9 0 0 0-8.51 14.96L2 22l5.2-1.36A9.93 9.93 0 1 0 12.04 2Zm0 18.05a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.09.81.82-3.01-.2-.31a8.13 8.13 0 1 1 6.9 3.82Zm4.46-6.08c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.23-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.23-.01-.36.1-.48.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.46-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.5.58.18 1.1.15 1.52.09.46-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
                      </svg>
                      Get a quote on WhatsApp
                    </button>
                  </div>
                </div>
              </Panel>
            </section>
          )}
        </div>

        {/* Live summary (desktop) */}
        <aside className="hidden lg:block" aria-label="Your power summary">
          <div className="sticky top-28 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-montserrat text-base font-bold text-primary">Your power needs</h2>
            <p className="mt-1 font-poppins text-xs text-slate-500">Updates as you add appliances.</p>
            <dl className="mt-5 space-y-4">
              <SummaryRow label="Appliances" value={itemCount.toLocaleString("en-NG")} />
              <SummaryRow label="Power at once" value={`${totals.runningWatts.toLocaleString("en-NG")} W`} />
              <SummaryRow label="Energy used daily" value={`${(totals.dailyEnergyWh / 1000).toLocaleString("en-NG", { maximumFractionDigits: 1 })} kWh`} />
            </dl>
            <button
              type="button"
              onClick={calculate}
              disabled={appliances.length === 0}
              className={`${primaryButton} mt-6 w-full`}
            >
              Show my system
            </button>
            <button
              type="button"
              onClick={() => {
                setAppliances([]);
                setHasCalculated(false);
              }}
              disabled={appliances.length === 0}
              className={`${quietButton} mt-2 w-full`}
            >
              Start over
            </button>
          </div>
        </aside>
      </div>

      {/* Live summary (mobile) */}
      {appliances.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] backdrop-blur lg:hidden">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
            <div className="font-poppins text-xs text-slate-600">
              <p className="font-montserrat text-sm font-bold text-primary">
                {itemCount} {itemCount === 1 ? "appliance" : "appliances"}
              </p>
              <p>{totals.runningWatts.toLocaleString("en-NG")} W at once</p>
            </div>
            <button type="button" onClick={calculate} className={`${primaryButton} min-h-11 px-4 py-2`}>
              Show my system
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function Panel({
  step,
  title,
  hint,
  headingId,
  children,
}: {
  step: number;
  title: string;
  hint: string;
  headingId?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-6 flex items-start gap-4">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary font-anton text-lg text-primary">
          {step}
        </span>
        <div>
          <h2 id={headingId} className="m-0 font-montserrat text-xl font-bold normal-case tracking-normal text-primary">
            {title}
          </h2>
          <p className="mt-1 max-w-2xl font-poppins text-sm leading-6 text-slate-600">{hint}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block font-montserrat text-[11px] font-semibold text-slate-600 sm:text-xs">
      <span className="mb-1 block">{label}</span>
      {children}
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
      <dt className="font-poppins text-sm text-slate-600">{label}</dt>
      <dd className="font-anton text-xl tracking-wide text-primary">{value}</dd>
    </div>
  );
}

function SystemCard({
  icon: Icon,
  label,
  description,
  item,
  fallback,
}: {
  icon: LucideIcon;
  label: string;
  description: string;
  item: PricedItem;
  fallback: string;
}) {
  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-slate-50 p-5">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-secondary">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h4 className="mt-4 font-montserrat text-base font-bold text-primary">{label}</h4>
      <p className="mt-1 font-poppins text-xs leading-5 text-slate-500">{description}</p>
      <p className="mt-4 font-poppins text-sm font-medium text-slate-800">{item?.name ?? fallback}</p>
      <p className="mt-auto pt-3 font-anton text-xl tracking-wide text-primary">
        {item ? formatCurrency(item.price) : "Price on request"}
      </p>
    </div>
  );
}
