import { useMemo, useRef, useState, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Plus,
  ShoppingCart,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { useCart } from "../context/cartStore";
import calculatorConfig from "../data/solarCalculatorConfig.json";

// Type definitions
type PowerUnit = "W" | "HP" | "BTU/h";

type Appliance = {
  id: string;
  name: string;
  quantity: number;
  watts: number;
  powerUnit: PowerUnit;
  hoursPerDay: number;
  iconKey: string;
};

type Preset = {
  name: string;
  watts: number;
  hoursPerDay: number;
  iconKey: string;
};

// Preset catalog corresponding to Image 1
const APPLIANCE_PRESETS: Preset[] = [
  { name: "Fan", watts: 75, hoursPerDay: 8, iconKey: "fan" },
  { name: "Bulbs", watts: 15, hoursPerDay: 8, iconKey: "bulbs" },
  { name: "Water Heater", watts: 2000, hoursPerDay: 1, iconKey: "waterHeater" },
  { name: "Refrigerator", watts: 250, hoursPerDay: 10, iconKey: "refrigerator" },
  { name: "Washing Machine", watts: 500, hoursPerDay: 1, iconKey: "washingMachine" },
  { name: "Television", watts: 120, hoursPerDay: 6, iconKey: "television" },
  { name: "Air Conditioner", watts: 1500, hoursPerDay: 6, iconKey: "airConditioner" },
  { name: "WiFi Modem", watts: 20, hoursPerDay: 24, iconKey: "wifiModem" },
  { name: "Pressing Iron", watts: 1000, hoursPerDay: 1, iconKey: "pressingIron" },
  { name: "Drone", watts: 100, hoursPerDay: 1, iconKey: "drone" },
  { name: "Laptop", watts: 65, hoursPerDay: 8, iconKey: "laptop" },
  { name: "Pressure Pump", watts: 750, hoursPerDay: 1, iconKey: "pressurePump" },
  { name: "Microwave", watts: 1200, hoursPerDay: 0.5, iconKey: "microwave" },
  { name: "Water Pump", watts: 1000, hoursPerDay: 1, iconKey: "waterPump" },
  { name: "Freezer", watts: 250, hoursPerDay: 12, iconKey: "freezer" },
  { name: "Home Theatre", watts: 150, hoursPerDay: 4, iconKey: "homeTheatre" },
  { name: "Decoder", watts: 30, hoursPerDay: 8, iconKey: "decoder" },
  { name: "Water Dispenser", watts: 500, hoursPerDay: 4, iconKey: "waterDispenser" },
];

// Vector Appliance Graphics matching real home appliances
function ApplianceGraphic({ iconKey }: { iconKey: string }) {
  switch (iconKey) {
    case "fan":
      return (
        <svg viewBox="0 0 48 48" className="w-11 h-11 text-slate-700" fill="none">
          <circle cx="24" cy="24" r="18" stroke="#002060" strokeWidth="2" strokeDasharray="3 3" opacity="0.3" />
          <circle cx="24" cy="24" r="5" fill="#002060" />
          <path d="M24 19C24 14 28 10 32 10C32 14 28 19 24 19Z" fill="#fd8d07" opacity="0.9" />
          <path d="M28 27C33 27 37 31 37 35C33 35 28 31 28 27Z" fill="#fd8d07" opacity="0.9" />
          <path d="M19 26C16 30 11 31 9 28C10 24 15 23 19 26Z" fill="#fd8d07" opacity="0.9" />
          <path d="M24 29V42M18 42H30" stroke="#002060" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "bulbs":
      return (
        <svg viewBox="0 0 48 48" className="w-11 h-11 text-slate-700" fill="none">
          <path d="M16 18C16 13.58 19.58 10 24 10C28.42 10 32 13.58 32 18C32 21.5 30 23.5 28.5 26C27.5 27.5 27 29 27 31H21C21 29 20.5 27.5 19.5 26C18 23.5 16 21.5 16 18Z" fill="#fef08a" stroke="#fd8d07" strokeWidth="2" />
          <path d="M21 31H27V34H21V31ZM22 34H26V36H22V34Z" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
          <path d="M24 15V22M21 18L27 18" stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="24" cy="18" r="8" fill="#fdba74" opacity="0.2" />
        </svg>
      );
    case "waterHeater":
      return (
        <svg viewBox="0 0 48 48" className="w-11 h-11 text-slate-700" fill="none">
          <rect x="15" y="8" width="18" height="28" rx="4" fill="#f8fafc" stroke="#002060" strokeWidth="2" />
          <rect x="18" y="12" width="12" height="6" rx="1.5" fill="#e2e8f0" />
          <circle cx="24" cy="24" r="3.5" fill="#ef4444" opacity="0.8" />
          <path d="M21 36V42M27 36V42M19 42H23M25 42H29" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "refrigerator":
      return (
        <svg viewBox="0 0 48 48" className="w-11 h-11 text-slate-700" fill="none">
          <rect x="15" y="6" width="18" height="36" rx="3" fill="#f8fafc" stroke="#002060" strokeWidth="2" />
          <line x1="15" y1="18" x2="33" y2="18" stroke="#002060" strokeWidth="2" />
          <line x1="18" y1="11" x2="18" y2="15" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="22" x2="18" y2="30" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "washingMachine":
      return (
        <svg viewBox="0 0 48 48" className="w-11 h-11 text-slate-700" fill="none">
          <rect x="13" y="7" width="22" height="34" rx="3" fill="#f8fafc" stroke="#002060" strokeWidth="2" />
          <line x1="13" y1="15" x2="35" y2="15" stroke="#002060" strokeWidth="1.5" />
          <circle cx="18" cy="11" r="1.5" fill="#0284c7" />
          <circle cx="22" cy="11" r="1.5" fill="#fd8d07" />
          <circle cx="24" cy="27" r="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
          <circle cx="24" cy="27" r="4.5" fill="#38bdf8" opacity="0.6" />
        </svg>
      );
    case "television":
      return (
        <svg viewBox="0 0 48 48" className="w-11 h-11 text-slate-700" fill="none">
          <rect x="9" y="10" width="30" height="22" rx="2" fill="#1e293b" stroke="#002060" strokeWidth="2" />
          <rect x="11" y="12" width="26" height="18" fill="#38bdf8" opacity="0.25" />
          <path d="M21 32L18 40M27 32L30 40M16 40H32" stroke="#002060" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "airConditioner":
      return (
        <svg viewBox="0 0 48 48" className="w-11 h-11 text-slate-700" fill="none">
          <rect x="8" y="14" width="32" height="16" rx="3" fill="#f8fafc" stroke="#002060" strokeWidth="2" />
          <rect x="11" y="23" width="26" height="4" rx="1" fill="#e2e8f0" />
          <circle cx="34" cy="18" r="1.5" fill="#10b981" />
          <path d="M14 34Q16 38 18 34M22 34Q24 38 26 34M30 34Q32 38 34 34" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "wifiModem":
      return (
        <svg viewBox="0 0 48 48" className="w-11 h-11 text-slate-700" fill="none">
          <rect x="11" y="25" width="26" height="12" rx="2" fill="#1e293b" stroke="#002060" strokeWidth="2" />
          <line x1="15" y1="10" x2="15" y2="25" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="33" y1="10" x2="33" y2="25" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="17" cy="31" r="1.5" fill="#10b981" />
          <circle cx="22" cy="31" r="1.5" fill="#10b981" />
          <circle cx="27" cy="31" r="1.5" fill="#38bdf8" />
        </svg>
      );
    case "pressingIron":
      return (
        <svg viewBox="0 0 48 48" className="w-11 h-11 text-slate-700" fill="none">
          <path d="M10 32C10 26 15 22 24 22H36C38 22 40 24 38 27L35 32H10Z" fill="#0284c7" stroke="#002060" strokeWidth="2" />
          <path d="M8 33H40V35H8V33Z" fill="#94a3b8" />
          <path d="M14 22V14H30V22" stroke="#002060" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "drone":
      return (
        <svg viewBox="0 0 48 48" className="w-11 h-11 text-slate-700" fill="none">
          <line x1="12" y1="14" x2="36" y2="34" stroke="#002060" strokeWidth="2.5" />
          <line x1="36" y1="14" x2="12" y2="34" stroke="#002060" strokeWidth="2.5" />
          <circle cx="24" cy="24" r="5" fill="#1e293b" stroke="#002060" strokeWidth="1.5" />
          <ellipse cx="12" cy="14" rx="5" ry="2" stroke="#fd8d07" strokeWidth="1.5" />
          <ellipse cx="36" cy="14" rx="5" ry="2" stroke="#fd8d07" strokeWidth="1.5" />
          <ellipse cx="12" cy="34" rx="5" ry="2" stroke="#fd8d07" strokeWidth="1.5" />
          <ellipse cx="36" cy="34" rx="5" ry="2" stroke="#fd8d07" strokeWidth="1.5" />
        </svg>
      );
    case "laptop":
      return (
        <svg viewBox="0 0 48 48" className="w-11 h-11 text-slate-700" fill="none">
          <rect x="13" y="11" width="22" height="17" rx="1.5" fill="#1e293b" stroke="#002060" strokeWidth="2" />
          <rect x="15" y="13" width="18" height="13" fill="#38bdf8" opacity="0.3" />
          <path d="M9 31C9 30 11 29 13 29H35C37 29 39 30 39 31L41 35H7L9 31Z" fill="#94a3b8" stroke="#002060" strokeWidth="1.5" />
        </svg>
      );
    case "pressurePump":
    case "waterPump":
      return (
        <svg viewBox="0 0 48 48" className="w-11 h-11 text-slate-700" fill="none">
          <rect x="12" y="17" width="18" height="16" rx="2" fill="#0284c7" stroke="#002060" strokeWidth="2" />
          <circle cx="34" cy="25" r="7" fill="#64748b" stroke="#002060" strokeWidth="2" />
          <rect x="10" y="33" width="26" height="4" fill="#334155" />
          <path d="M34 14V18M38 25H42" stroke="#002060" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "microwave":
      return (
        <svg viewBox="0 0 48 48" className="w-11 h-11 text-slate-700" fill="none">
          <rect x="9" y="13" width="30" height="22" rx="2.5" fill="#f8fafc" stroke="#002060" strokeWidth="2" />
          <rect x="13" y="17" width="16" height="14" rx="1.5" fill="#1e293b" />
          <rect x="31" y="17" width="5" height="14" rx="1" fill="#e2e8f0" />
          <circle cx="33.5" cy="20" r="1.5" fill="#10b981" />
        </svg>
      );
    case "freezer":
      return (
        <svg viewBox="0 0 48 48" className="w-11 h-11 text-slate-700" fill="none">
          <rect x="9" y="14" width="30" height="24" rx="2" fill="#f8fafc" stroke="#002060" strokeWidth="2" />
          <line x1="9" y1="19" x2="39" y2="19" stroke="#002060" strokeWidth="1.5" />
          <line x1="20" y1="16.5" x2="28" y2="16.5" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "homeTheatre":
      return (
        <svg viewBox="0 0 48 48" className="w-11 h-11 text-slate-700" fill="none">
          <rect x="10" y="8" width="6" height="32" rx="1.5" fill="#1e293b" stroke="#002060" strokeWidth="1.5" />
          <rect x="32" y="8" width="6" height="32" rx="1.5" fill="#1e293b" stroke="#002060" strokeWidth="1.5" />
          <rect x="18" y="24" width="12" height="16" rx="2" fill="#334155" stroke="#002060" strokeWidth="1.5" />
          <circle cx="24" cy="32" r="3.5" fill="#002060" />
        </svg>
      );
    case "decoder":
      return (
        <svg viewBox="0 0 48 48" className="w-11 h-11 text-slate-700" fill="none">
          <rect x="10" y="20" width="28" height="10" rx="2" fill="#1e293b" stroke="#002060" strokeWidth="2" />
          <rect x="14" y="23" width="8" height="4" rx="1" fill="#0284c7" opacity="0.6" />
          <circle cx="32" cy="25" r="1.5" fill="#10b981" />
        </svg>
      );
    case "waterDispenser":
    default:
      return (
        <svg viewBox="0 0 48 48" className="w-11 h-11 text-slate-700" fill="none">
          <rect x="16" y="20" width="16" height="22" rx="2" fill="#f8fafc" stroke="#002060" strokeWidth="2" />
          <path d="M19 20V12C19 9 29 9 29 12V20H19Z" fill="#38bdf8" opacity="0.7" stroke="#0284c7" strokeWidth="1.5" />
          <circle cx="21" cy="27" r="1.5" fill="#ef4444" />
          <circle cx="27" cy="27" r="1.5" fill="#0284c7" />
        </svg>
      );
  }
}

function formatCurrency(value: number) {
  return `₦${Math.round(value).toLocaleString("en-NG")}`;
}

const WATTS_PER_UNIT: Record<PowerUnit, number> = {
  W: 1,
  HP: 746,
  "BTU/h": 0.293071,
};
const INVERTER_SAFETY_FACTOR = 1.25;
const INVERTER_EFFICIENCY = 0.8;
const INVERTER_POWER_FACTOR = 0.8;

function powerToWatts(value: number, unit: PowerUnit): number {
  return value * WATTS_PER_UNIT[unit];
}

function wattsToPower(watts: number, unit: PowerUnit): number {
  const value = watts / WATTS_PER_UNIT[unit];
  return Number(value.toFixed(unit === "BTU/h" ? 0 : 2));
}

export function SolarCalculator() {
  const { addToCart } = useCart();

  // State: starts empty so nothing is pre-selected when the page loads
  const [appliances, setAppliances] = useState<Appliance[]>([]);

  const [backup, setBackup] = useState<string>("Petrol Generator");
  const [fuelPrice, setFuelPrice] = useState<number>(1000);
  const [hasCalculated, setHasCalculated] = useState<boolean>(true);
  const [backupHoursAdjustment, setBackupHoursAdjustment] = useState<number>(0);
  const [cartSuccess, setCartSuccess] = useState<boolean>(false);

  // Custom appliance inline modal
  const [showAddCustom, setShowAddCustom] = useState<boolean>(false);
  const [customName, setCustomName] = useState<string>("");
  const [customWatts, setCustomWatts] = useState<number>(150);
  const [customPowerUnit, setCustomPowerUnit] = useState<PowerUnit>("W");
  const [customHours, setCustomHours] = useState<number>(6);

  const step3Ref = useRef<HTMLDivElement>(null);

  // Calculations
  const totals = useMemo(() => {
    const runningWatts = appliances.reduce((sum, item) => sum + item.quantity * item.watts, 0);
    const dailyEnergyWh = appliances.reduce(
      (sum, item) => sum + item.quantity * item.watts * item.hoursPerDay,
      0
    );

    const requiredInverterKva =
      (runningWatts * INVERTER_SAFETY_FACTOR) /
      (INVERTER_EFFICIENCY * INVERTER_POWER_FACTOR * 1000);
    const requiredInverterKw = requiredInverterKva * INVERTER_POWER_FACTOR;
    const requiredInverterWatts = requiredInverterKw * 1000;
    const inverter =
      calculatorConfig.inverters.find((item) => item.watts >= requiredInverterWatts) ||
      calculatorConfig.inverters[calculatorConfig.inverters.length - 1];

    // Battery sizing: (Daily Energy * 1.2) / 48V
    const requiredAmpHours = (dailyEnergyWh * 1.2) / (calculatorConfig.batteryVoltage || 48);
    const battery =
      calculatorConfig.batteries.find((item) => item.ampHours >= requiredAmpHours) ||
      calculatorConfig.batteries[calculatorConfig.batteries.length - 1];

    // Solar panels: Daily Energy / 5 sun hours
    const requiredPanelWatts = dailyEnergyWh / (calculatorConfig.sunHoursPerDay || 5);
    const bestPanel = calculatorConfig.panels[calculatorConfig.panels.length - 2] || calculatorConfig.panels[0];
    const rawCount = Math.max(2, Math.ceil(requiredPanelWatts / bestPanel.watts));
    const panelCount = rawCount % 2 === 0 ? rawCount : rawCount + 1; // even count for strings
    const panels = {
      name: `${panelCount}x Solar Panel ${bestPanel.watts}W Mono`,
      watts: bestPanel.watts,
      quantity: panelCount,
      price: bestPanel.price * panelCount,
    };

    const completeSystemCost =
      (inverter?.price || 0) + (battery?.price || 0) + (panels?.price || 0);

    // Fuel generator comparison
    const monthlyFuelSavings =
      backup === "Petrol Generator"
        ? (dailyEnergyWh / 1000 / (calculatorConfig.petrolGeneratorEfficiencyKwhPerLitre || 3.2)) *
        (calculatorConfig.daysPerMonth || 30) *
        fuelPrice
        : backup === "Diesel Generator"
          ? (dailyEnergyWh / 1000 / 3.8) * (calculatorConfig.daysPerMonth || 30) * (fuelPrice * 1.2)
          : 0;

    const paybackMonths =
      monthlyFuelSavings > 0 ? completeSystemCost / monthlyFuelSavings : null;

    // Estimated backup time (hours)
    const batteryCapacityWh = (battery?.ampHours || 100) * 48 * 0.85; // 85% depth of discharge
    const calculatedBackupHours = runningWatts > 0 ? batteryCapacityWh / runningWatts : 4;
    const finalBackupHours = Math.max(
      1,
      Math.min(24, Math.round((calculatedBackupHours + backupHoursAdjustment) * 10) / 10)
    );

    return {
      runningWatts,
      requiredInverterKva,
      requiredInverterKw,
      dailyEnergyWh,
      inverter,
      battery,
      panels,
      completeSystemCost,
      monthlyFuelSavings,
      paybackMonths,
      finalBackupHours,
    };
  }, [appliances, backup, fuelPrice, backupHoursAdjustment]);

  // Click to add preset
  function handleAddPreset(preset: Preset) {
    setAppliances((prev) => {
      const existing = prev.find((item) => item.name.toLowerCase() === preset.name.toLowerCase());
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: `appliance-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          name: preset.name,
          quantity: 1,
          watts: preset.watts,
          powerUnit: "W",
          hoursPerDay: preset.hoursPerDay,
          iconKey: preset.iconKey,
        },
      ];
    });
  }

  // Click red badge to reduce
  function handleReducePreset(presetName: string) {
    setAppliances((prev) => {
      const existing = prev.find((item) => item.name.toLowerCase() === presetName.toLowerCase());
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        return prev.filter((item) => item.id !== existing.id);
      }
      return prev.map((item) =>
        item.id === existing.id ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  }

  // Get active quantity for badge display
  function getQuantity(presetName: string): number {
    const found = appliances.find((item) => item.name.toLowerCase() === presetName.toLowerCase());
    return found ? found.quantity : 0;
  }

  // Clear all
  function handleClearAll() {
    setAppliances([]);
    setBackupHoursAdjustment(0);
  }

  // Add custom appliance
  function handleAddCustomAppliance(e: FormEvent) {
    e.preventDefault();
    if (!customName.trim()) return;

    setAppliances((prev) => [
      ...prev,
      {
        id: `custom-${Date.now()}`,
        name: customName.trim(),
        quantity: 1,
        watts: customWatts || 100,
        powerUnit: customPowerUnit,
        hoursPerDay: customHours || 6,
        iconKey: "bulb",
      },
    ]);

    setCustomName("");
    setShowAddCustom(false);
  }

  // Remove single row in Step 2
  function handleRemoveAppliance(id: string) {
    setAppliances((prev) => prev.filter((item) => item.id !== id));
  }

  // Update row in Step 2
  function handleUpdateRow(
    id: string,
    field: "name" | "quantity" | "watts" | "hoursPerDay",
    value: string | number
  ) {
    setAppliances((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        if (field === "watts") {
          return { ...item, watts: powerToWatts(Number(value), item.powerUnit) };
        }
        return { ...item, [field]: value };
      })
    );
  }

  function handleUpdatePowerUnit(id: string, powerUnit: PowerUnit) {
    setAppliances((prev) =>
      prev.map((item) => (item.id === id ? { ...item, powerUnit } : item))
    );
  }

  // Calculate & scroll to Step 3
  function handleCalculate() {
    setHasCalculated(true);
    setTimeout(() => {
      step3Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  // Add to cart
  function handleAddToCart() {
    if (totals.inverter) {
      addToCart({
        id: `inv-${totals.inverter.name}`,
        productName: totals.inverter.name,
        configurationName: "Solar Load Calculator Recommendation",
        price: totals.inverter.price,
      });
    }
    if (totals.battery) {
      addToCart({
        id: `bat-${totals.battery.name}`,
        productName: totals.battery.name,
        configurationName: "Solar Load Calculator Recommendation",
        price: totals.battery.price,
      });
    }
    if (totals.panels) {
      addToCart({
        id: `pan-${totals.panels.watts}-${totals.panels.quantity}`,
        productName: totals.panels.name,
        configurationName: "Solar Load Calculator Recommendation",
        price: totals.panels.price,
      });
    }

    setCartSuccess(true);
    setTimeout(() => setCartSuccess(false), 3500);
  }

  // WhatsApp order text
  const whatsappText = encodeURIComponent(
    `Hello Embrace Technologies! I used your Solar Load Calculator.\n\n` +
    `📊 Load Summary:\n` +
    `• Peak Load: ${totals.runningWatts.toLocaleString()} W\n` +
    `• Daily Energy: ${totals.dailyEnergyWh.toLocaleString()} Wh\n\n` +
    `⚡ Recommended System:\n` +
    `• Inverter: ${totals.inverter?.name}\n` +
    `• Calculated inverter capacity: ${totals.requiredInverterKva.toFixed(2)} kVA (~${totals.requiredInverterKw.toFixed(2)} kW)\n` +
    `• Battery Storage: ${totals.battery?.name}\n` +
    `• Solar Panels: ${totals.panels?.name}\n` +
    `• Estimated System Cost: ${formatCurrency(totals.completeSystemCost)}\n\n` +
    `I would like to speak with an engineer to order this system.`
  );
  const whatsappUrl = `https://wa.me/2347061451583?text=${whatsappText}`;

  return (
    <>
      <Helmet>
        <title>Solar Load Calculator | Embrace Technologies Limited</title>
        <meta
          name="description"
          content="Calculate your home or office solar energy requirement, peak load, battery storage, and generator fuel savings with the EmbraceTech Solar Load Calculator."
        />
        <link rel="canonical" href="https://embracetechng.com/solar-calculator" />
      </Helmet>

      <main className="min-h-screen bg-slate-100/80 pb-8 sm:pb-12 md:pb-16">
        {/* ========================================================================= */}
        {/* HERO SECTION: full width, with top margin */}
        {/* ========================================================================= */}
        <header className="w-full mt-8 sm:mt-12 md:mt-16 bg-gradient-to-r from-primary via-[#002b80] to-primary text-white text-center py-10 sm:py-14 md:py-16 px-4 relative overflow-hidden">
          {/* Ambient pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fd8d07_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <h1
            className="relative flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-3 gap-y-1.5 font-extrabold tracking-wide text-white drop-shadow-sm font-montserrat !leading-[1.25] text-center text-base sm:text-lg md:text-2xl lg:text-3xl"
            style={{ textTransform: "none" }}
          >
            {/* EMBRACE TECHNOLOGIES LIMITED: uppercase, underlined with orange line */}
            <span
              className="inline-block pb-1 sm:pb-1.5 border-b-2 sm:border-b-[3px] border-[#fd8d07]"
              style={{ textTransform: "uppercase" }}
            >
              EMBRACE TECHNOLOGIES LIMITED
            </span>
            {/* Separator */}
            <span
              className="text-[#fd8d07] font-bold select-none px-1"
              style={{ textTransform: "none" }}
            >
              |
            </span>
            {/* Solar Load Calculator: Solar (S uppercase), Load (L uppercase), Calculator (C uppercase) */}
            <span
              className="text-white font-extrabold"
              style={{ textTransform: "none" }}
            >
              Solar Load Calculator
            </span>
          </h1>
          {/* Subtitle */}
          <p
            className="relative font-poppins text-slate-200 mt-4 sm:mt-5 font-normal mx-auto leading-relaxed"
            style={{ fontSize: "clamp(12px, 2.2vw, 15px)" }}
          >
            Follow the steps below to find your perfect power system &amp; calculate ROI
          </p>
        </header>

        {/* CALCULATOR CARD */}
        <div className="px-3 sm:px-6 mt-6 sm:mt-8">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border border-slate-200/80 font-montserrat">
            <div className="p-4 sm:p-7 md:p-9 space-y-10 sm:space-y-12">
              {/* ========================================================================= */}
              {/* STEP 1: APPLIANCE SELECTION GRID */}
              {/* ========================================================================= */}
              <section aria-labelledby="step-1-heading" className="space-y-4">
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <span className="px-2.5 py-0.5 rounded bg-alternativeR text-white font-montserrat font-bold text-xs uppercase tracking-wider shadow-sm">
                    STEP 1
                  </span>
                  <h2
                    id="step-1-heading"
                    className="normal-case font-poppins text-xs sm:text-sm font-semibold text-slate-800"
                  >
                    Click to add, click the red number to reduce
                  </h2>
                </div>

                {/* Grid of 18 Real Home Appliances */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2.5 sm:gap-3 pt-1">
                  {APPLIANCE_PRESETS.map((preset) => {
                    const qty = getQuantity(preset.name);
                    const isSelected = qty > 0;

                    return (
                      <div
                        key={preset.name}
                        onClick={() => handleAddPreset(preset)}
                        className={`relative p-2 sm:p-2.5 rounded-xl border transition-all duration-200 flex flex-col items-center justify-between min-h-[105px] sm:min-h-[114px] cursor-pointer select-none group text-center ${isSelected
                          ? "bg-amber-50/40 border-secondary ring-1 ring-secondary/30 shadow-sm"
                          : "bg-white border-slate-200/90 hover:border-primary/50 hover:shadow-md"
                          }`}
                        title={`Click to add ${preset.name} (${preset.watts}W)`}
                      >
                        {/* Red Number Badge (Click to Reduce) */}
                        {isSelected && (
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReducePreset(preset.name);
                            }}
                            title="Click to reduce"
                            className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-orange-600 text-white font-montserrat font-black text-[11px] sm:text-xs flex items-center justify-center shadow-md hover:bg-orange-600 hover:scale-110 active:scale-95 transition-transform z-10 cursor-pointer"
                          >
                            {qty}
                          </span>
                        )}

                        {/* Graphic Icon (Medium Size) */}
                        <div className="w-12 h-12 sm:w-13 sm:h-13 flex items-center justify-center my-auto transition-transform group-hover:scale-105">
                          <ApplianceGraphic iconKey={preset.iconKey} />
                        </div>

                        {/* Appliance Name */}
                        <span className="text-[10px] sm:text-[11px] font-poppins font-medium text-slate-700 text-center leading-tight line-clamp-2 mt-1 group-hover:text-primary transition-colors">
                          {preset.name}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Buttons: Add Other Appliance & Clear All */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddCustom((prev) => !prev)}
                    className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-800 text-white font-montserrat font-bold text-xs tracking-wide shadow-sm transition-colors flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Other Appliance
                  </button>
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-montserrat font-semibold text-xs transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                {/* Collapsible Custom Appliance Form */}
                <AnimatePresence>
                  {showAddCustom && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      onSubmit={handleAddCustomAppliance}
                      className="overflow-hidden bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 mt-3 max-w-lg mx-auto"
                    >
                      <h3 className="normal-case font-montserrat font-bold text-xs sm:text-sm text-slate-800 mb-3">
                        Add Custom Appliance
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs font-poppins">
                        <div className="sm:col-span-5">
                          <label className="block text-slate-500 mb-1">Appliance Name</label>
                          <input
                            type="text"
                            required
                            value={customName}
                            onChange={(e) => setCustomName(e.target.value)}
                            placeholder="e.g. Deep Fryer, CCTV NVR"
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/40 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-500 mb-1">Power per item</label>
                          <input
                            type="number"
                            min="0.01"
                            step="any"
                            required
                            value={wattsToPower(customWatts, customPowerUnit)}
                            onChange={(e) =>
                              setCustomWatts(powerToWatts(Number(e.target.value), customPowerUnit))
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/40 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-500 mb-1">Unit of measurement</label>
                          <select
                            value={customPowerUnit}
                            onChange={(e) => setCustomPowerUnit(e.target.value as PowerUnit)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/40 text-xs"
                          >
                            <option value="W">Watts (W)</option>
                            <option value="HP">Horsepower (HP)</option>
                            <option value="BTU/h">BTU per hour (BTU/h)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-slate-500 mb-1">Hours used per day</label>
                          <input
                            type="number"
                            min="0.5"
                            max="24"
                            step="0.5"
                            required
                            value={customHours}
                            onChange={(e) => setCustomHours(Number(e.target.value))}
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/40 text-xs"
                          />
                        </div>
                        <p className="sm:col-span-5 text-[10px] leading-relaxed text-slate-500">
                          Calculations use watts automatically (1 HP ≈ 746 W; 1 BTU/h ≈ 0.293 W).
                          BTU/h and horsepower on air conditioners describe cooling capacity, not
                          electrical input. Use the electrical input rating if available;
                          conversions are estimates.
                        </p>
                        <div className="flex items-end">
                          <button
                            type="submit"
                            className="w-full py-2 bg-primary hover:bg-primary/90 text-white font-montserrat font-bold rounded-lg text-xs"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </section>

              {/* ========================================================================= */}
              {/* STEP 2: VERIFY LOAD & CALCULATE ROI */}
              {/* ========================================================================= */}
              <section aria-labelledby="step-2-heading" className="space-y-4 pt-6 border-t border-slate-200">
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <span className="px-2.5 py-0.5 rounded bg-alternativeR text-white font-montserrat font-bold text-xs uppercase tracking-wider shadow-sm">
                    STEP 2
                  </span>
                  <h2
                    id="step-2-heading"
                    className="normal-case font-poppins text-xs sm:text-sm font-semibold text-slate-800"
                  >
                    Verify Load &amp; Calculate Return on Investment
                  </h2>
                </div>

                {/* Table / List of Selected Appliances */}
                {appliances.length === 0 ? (
                  <div className="py-8 px-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/80 text-center font-poppins text-xs sm:text-sm text-slate-500">
                    No appliances selected yet. Click any appliance in Step 1 above to add it to your calculation.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    <p className="font-poppins text-[11px] leading-relaxed text-slate-500">
                      Enter the number of items, each item&apos;s power rating, and how many hours
                      you use it daily. Select the unit shown on its label; power is converted to
                      watts for the calculation. For air conditioners, BTU/h and HP describe
                      cooling capacity, so use the electrical input rating if available.
                    </p>
                    <div className="hidden sm:grid grid-cols-12 gap-2 sm:gap-3 items-center px-2.5 sm:px-3 border border-transparent text-[11px] font-semibold text-slate-500">
                      <span className="col-span-4 pl-3">Appliance name</span>
                      <span className="col-span-1 text-center">Number</span>
                      <span className="col-span-2 text-center">Power per item</span>
                      <span className="col-span-2 text-center">Unit</span>
                      <span className="col-span-2 text-center">Hours per day</span>
                      <span className="col-span-1" aria-hidden="true" />
                    </div>
                    {appliances.map((item) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-6 sm:grid-cols-12 gap-2 sm:gap-3 items-center bg-slate-50/90 border border-slate-200/90 p-2.5 sm:p-3 rounded-xl text-xs font-poppins"
                      >
                        {/* Appliance Name */}
                        <div className="col-span-6 sm:col-span-4">
                          <label className="text-[10px] text-slate-400 font-semibold block sm:hidden">
                            Appliance name
                          </label>
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleUpdateRow(item.id, "name", e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>

                        {/* Qty */}
                        <div className="col-span-2 sm:col-span-1">
                          <label className="text-[10px] text-slate-400 font-semibold block sm:hidden">
                            Number of items
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              handleUpdateRow(item.id, "quantity", Math.max(1, Number(e.target.value)))
                            }
                            className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1.5 text-center text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>

                        {/* Power per item */}
                        <div className="col-span-2 sm:col-span-2">
                          <label className="text-[10px] text-slate-400 font-semibold block sm:hidden">
                            Power per item
                          </label>
                          <input
                            type="number"
                            min="0.01"
                            step="any"
                            value={wattsToPower(item.watts, item.powerUnit)}
                            onChange={(e) =>
                              handleUpdateRow(item.id, "watts", Math.max(0.01, Number(e.target.value)))
                            }
                            className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1.5 text-center text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>

                        {/* Unit of measurement */}
                        <div className="col-span-2 sm:col-span-2">
                          <label className="text-[10px] text-slate-400 font-semibold block sm:hidden">
                            Unit
                          </label>
                          <select
                            value={item.powerUnit}
                            onChange={(e) =>
                              handleUpdatePowerUnit(item.id, e.target.value as PowerUnit)
                            }
                            className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1.5 text-center text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                          >
                            <option value="W">W</option>
                            <option value="HP">HP</option>
                            <option value="BTU/h">BTU/h</option>
                          </select>
                        </div>

                        {/* Hours/Day */}
                        <div className="col-span-3 sm:col-span-2">
                          <label className="text-[10px] text-slate-400 font-semibold block sm:hidden">
                            Hours used per day
                          </label>
                          <input
                            type="number"
                            min="0.5"
                            max="24"
                            step="0.5"
                            value={item.hoursPerDay}
                            onChange={(e) =>
                              handleUpdateRow(
                                item.id,
                                "hoursPerDay",
                                Math.max(0.5, Math.min(24, Number(e.target.value)))
                              )
                            }
                            className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1.5 text-center text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>

                        {/* Remove Row */}
                        <div className="col-span-3 sm:col-span-1 text-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveAppliance(item.id)}
                            className="text-red-500 hover:text-red-700 hover:scale-125 transition-transform font-bold text-lg leading-none p-1"
                            title="Remove item"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Generator & Fuel Price Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 font-poppins">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      What do you currently use for Backup Power?
                    </label>
                    <select
                      value={backup}
                      onChange={(e) => setBackup(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-sm"
                    >
                      <option value="Petrol Generator">Petrol Generator</option>
                      <option value="Diesel Generator">Diesel Generator</option>
                      <option value="Grid Only">Grid Only</option>
                      <option value="No Backup">No Backup</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Current Fuel Price (₦ per Liter)
                    </label>
                    <input
                      type="number"
                      min="100"
                      step="10"
                      value={fuelPrice}
                      onChange={(e) => setFuelPrice(Number(e.target.value))}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-sm"
                    />
                  </div>
                </div>

                {/* Calculate System Requirement Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleCalculate}
                    disabled={appliances.length === 0}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-secondary via-alternativeO to-secondary text-white font-montserrat font-black text-sm sm:text-base uppercase tracking-wider shadow-lg hover:shadow-xl hover:brightness-105 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-5 h-5 text-amber-200" />
                    CALCULATE SYSTEM REQUIREMENT
                  </button>
                </div>
              </section>

              {/* ========================================================================= */}
              {/* STEP 3: REVIEW PERFORMANCE, ROI & CHECKOUT */}
              {/* ========================================================================= */}
              {hasCalculated && appliances.length > 0 && (
                <section
                  ref={step3Ref}
                  aria-labelledby="step-3-heading"
                  className="space-y-6 pt-6 border-t border-slate-200 scroll-mt-24"
                >
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                    <span className="px-2.5 py-0.5 rounded bg-alternativeR text-white font-montserrat font-bold text-xs uppercase tracking-wider shadow-sm">
                      STEP 3
                    </span>
                    <h2
                      id="step-3-heading"
                      className="normal-case font-poppins text-xs sm:text-sm font-semibold text-slate-800"
                    >
                      Review Performance, ROI &amp; Checkout
                    </h2>
                  </div>

                  {/* 3 Metric Summary Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                    {/* Metric 1: Peak Load */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 border-l-4 border-l-alternativeR shadow-sm flex flex-col justify-between">
                      <span className="text-[11px] font-montserrat font-bold text-slate-400 uppercase tracking-wider">
                        PEAK LOAD
                      </span>
                      <div className="my-2">
                        <span className="text-2xl sm:text-3xl font-montserrat font-black text-slate-900">
                          {totals.runningWatts.toLocaleString()}
                        </span>
                        <span className="text-sm font-bold text-slate-600 ml-1">W</span>
                      </div>
                      <span className="text-[11px] font-poppins text-slate-400">
                        Running simultaneously
                      </span>
                    </div>

                    {/* Metric 2: Daily Energy */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 border-l-4 border-l-secondary shadow-sm flex flex-col justify-between">
                      <span className="text-[11px] font-montserrat font-bold text-slate-400 uppercase tracking-wider">
                        DAILY ENERGY
                      </span>
                      <div className="my-2">
                        <span className="text-2xl sm:text-3xl font-montserrat font-black text-slate-900">
                          {totals.dailyEnergyWh.toLocaleString()}
                        </span>
                        <span className="text-sm font-bold text-slate-600 ml-1">Wh</span>
                      </div>
                      <span className="text-[11px] font-poppins text-slate-400">
                        Total power needed daily
                      </span>
                    </div>

                    {/* Metric 3: Est. Backup Time */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 border-l-4 border-l-emerald-500 shadow-sm flex flex-col justify-between">
                      <span className="text-[11px] font-montserrat font-bold text-slate-400 uppercase tracking-wider">
                        EST. BACKUP TIME
                      </span>
                      <div className="my-1.5 flex items-center justify-between">
                        <div>
                          <span className="text-2xl sm:text-3xl font-montserrat font-black text-emerald-600">
                            {totals.finalBackupHours.toFixed(1)}
                          </span>
                          <span className="text-sm font-bold text-slate-600 ml-1">hrs</span>
                        </div>

                        {/* Stepper adjustment */}
                        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 text-[11px] font-semibold text-slate-600">
                          <button
                            type="button"
                            onClick={() => setBackupHoursAdjustment((prev) => prev - 0.5)}
                            className="w-5 h-5 rounded hover:bg-white text-slate-700 flex items-center justify-center font-bold"
                            title="Reduce backup target"
                          >
                            -
                          </button>
                          <span className="text-[10px] uppercase font-bold text-slate-400 px-1">ADJUST</span>
                          <button
                            type="button"
                            onClick={() => setBackupHoursAdjustment((prev) => prev + 0.5)}
                            className="w-5 h-5 rounded hover:bg-white text-slate-700 flex items-center justify-center font-bold"
                            title="Increase backup target"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <span className="text-[11px] font-poppins text-slate-400">
                        Running at max load without sun
                      </span>
                    </div>
                  </div>

                  {/* Recommended System Configuration Header */}
                  <div className="pt-2">
                    <h3 className="normal-case font-montserrat font-extrabold italic text-lg sm:text-xl text-slate-900 mb-3.5">
                      Recommended System Configuration
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 font-poppins">
                      {/* 1. Inverter */}
                      <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-sm">
                        <div>
                          <span className="font-montserrat font-bold text-slate-900 text-sm block">
                            1. Inverter
                          </span>
                          <p className="font-poppins italic text-xs text-slate-700 font-medium mt-1">
                            {(totals.inverter?.watts ?? 0) < totals.requiredInverterKw * 1000 &&
                              "Largest listed: "}
                            {totals.inverter?.name || "5 kW Hybrid Inverter"}
                          </p>
                          <p className="font-poppins text-[11px] text-slate-600 mt-2">
                            Required size: {totals.requiredInverterKva.toFixed(2)} kVA
                            {" "}({totals.requiredInverterKw.toFixed(2)} kW at 0.8 PF)
                          </p>
                          <p className="font-poppins text-[10px] leading-relaxed text-slate-500 mt-1">
                            Uses a 1.25 safety factor and 80% inverter efficiency.
                          </p>
                          {(totals.inverter?.watts ?? 0) < totals.requiredInverterKw * 1000 && (
                            <p className="font-poppins text-[10px] leading-relaxed text-red-600 mt-1">
                              The required size is above the largest inverter listed. Please request
                              a custom recommendation.
                            </p>
                          )}
                          {(totals.inverter?.watts ?? 0) >= totals.requiredInverterKw * 1000 && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 mt-2">
                              <Check className="w-3 h-3" /> In Stock
                            </span>
                          )}
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-200 font-montserrat font-bold text-sm text-alternativeR">
                          {formatCurrency(totals.inverter?.price || 1250000)}
                        </div>
                      </div>

                      {/* 2. Battery Storage */}
                      <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-sm">
                        <div>
                          <span className="font-montserrat font-bold text-slate-900 text-sm block">
                            2. Battery Storage
                          </span>
                          <p className="font-poppins italic text-xs text-slate-700 font-medium mt-1">
                            {totals.battery?.name || "48 V 200 Ah Battery Storage"}
                          </p>
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 mt-2">
                            <Check className="w-3 h-3" /> In Stock
                          </span>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-200 font-montserrat font-bold text-sm text-alternativeR">
                          {formatCurrency(totals.battery?.price || 1850000)}
                        </div>
                      </div>

                      {/* 3. Solar Panels */}
                      <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-sm">
                        <div>
                          <span className="font-montserrat font-bold text-slate-900 text-sm block">
                            3. Solar Panels
                          </span>
                          <p className="font-poppins italic text-xs text-slate-700 font-medium mt-1">
                            {totals.panels?.name || "6x Solar Panel 550W Mono"}
                          </p>
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 mt-2">
                            <Check className="w-3 h-3" /> In Stock
                          </span>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-200 font-montserrat font-bold text-sm text-alternativeR">
                          {formatCurrency(totals.panels?.price || 870000)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dark Banner: Estimated System Cost */}
                  <div className="bg-slate-800 text-white rounded-xl p-5 text-center shadow-md">
                    <span className="font-poppins italic text-xs text-slate-300 block">
                      Estimated System Cost (Available Items Only)
                    </span>
                    <span className="font-montserrat font-extrabold text-2xl sm:text-3xl text-white tracking-wide block mt-1">
                      {formatCurrency(totals.completeSystemCost)}
                    </span>
                  </div>

                  {/* Green Banner: Your Estimated Savings */}
                  <div className="bg-emerald-50 border border-emerald-200/90 rounded-2xl p-5 sm:p-7 text-center space-y-2.5 font-poppins">
                    <div className="flex items-center justify-center gap-1.5 font-montserrat font-bold text-emerald-900 text-sm sm:text-base">
                      <span>💡</span>
                      <span>Your Estimated Savings</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700">
                      Running this load on a <strong className="text-slate-900">{backup}</strong> currently costs you approx.{" "}
                      <strong className="text-alternativeR font-montserrat font-bold">
                        {formatCurrency(totals.monthlyFuelSavings)} / month
                      </strong>{" "}
                      in fuel.
                    </p>

                    <p className="text-xs sm:text-sm text-slate-700 italic">
                      This Solar System will pay for itself in fuel savings in just
                    </p>

                    <div className="py-1">
                      <span className="text-2xl sm:text-3xl font-montserrat font-black italic text-emerald-600 tracking-wide">
                        {totals.paybackMonths ? `${totals.paybackMonths.toFixed(1)} Months!` : "12.0 Months!"}
                      </span>
                    </div>

                    <p className="text-[11px] sm:text-xs text-slate-400 font-normal">
                      (Free electricity after that!)
                    </p>
                  </div>

                  {/* Action Buttons: Add Available Items to Cart & Chat via WhatsApp */}
                  <div className="space-y-3 pt-2">
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-montserrat font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add Available Items to Cart
                    </button>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-montserrat font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
                    >
                      <MessageCircle className="w-5 h-5 fill-current" />
                      Chat &amp; Order via WhatsApp
                    </a>
                  </div>

                  {/* Cart Success Toast */}
                  <AnimatePresence>
                    {cartSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-center text-emerald-800 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4 text-emerald-600" />
                        Recommended items added to your cart! You can view them in the cart drawer.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </section>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
