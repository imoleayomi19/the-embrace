export type ShopProduct = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
};

export type SolarConfiguration = {
  id: string;
  solar: string;
  label?: string;
  battery: string;
  price: number | null;
  storage: string;
  code?: string;
  panels?: string;
  panelBrand?: string;
};

export type SolarProduct = ShopProduct & {
  slug: string;
  application: "Residential" | "Commercial / Industrial";
  brand: string;
  powerSize: string;
  tagline: string;
  configurations: SolarConfiguration[];
  withoutSolarPrice?: number;
  systemStorage?: string;
  systemStorageAlternative?: string;
  systemBadge?: string;
};

const flyerImage = "/product.webp";

function configurations(power: number, startingPrice: number): SolarConfiguration[] {
  const solarSizes = power <= 4 ? ["2.3KW", "3.5KW", "4.6KW"] : [
    `${Math.max(2.3, power - 1.7).toFixed(1)}KW`,
    `${power}KW`,
    `${power + 1.1}KW`,
  ];
  const batteryCounts = power <= 4 ? [2, 2, 3] : [2, 3, 4];

  return solarSizes.map((solar, index) => ({
    id: `${power}-${index + 1}`,
    solar,
    battery: `${batteryCounts[index]}x 220Ah Battery`,
    price: startingPrice + index * Math.round(startingPrice * 0.26),
    storage: `${batteryCounts[index] * 5.12}kWh LiFePO4`,
  }));
}

function product(
  id: number,
  name: string,
  slug: string,
  application: SolarProduct["application"],
  brand: string,
  powerSize: string,
  startingPrice: number,
  tagline: string,
  productConfigurations?: SolarConfiguration[],
  productDetails?: Pick<SolarProduct, "withoutSolarPrice" | "systemStorage" | "systemStorageAlternative" | "systemBadge">
): SolarProduct {
  const power = Number.parseFloat(powerSize);
  return {
    id,
    name,
    slug,
    category: application,
    application,
    brand,
    powerSize,
    price: startingPrice,
    image: flyerImage,
    description: tagline,
    tagline,
    configurations: productConfigurations ?? configurations(power, startingPrice),
    ...productDetails,
  };
}

export const shopProducts: SolarProduct[] = [
  product(202, "IVEM-4 CLASSIC LITE", "ivem-4-classic-lite", "Residential", "IVEM", "4KW", 1850000, "4kVA hybrid inverter with dependable solar backup power.", [
    { id: "CLite-2K36", code: "CLite-2K36", solar: "2.36 kWp", panels: "4 x 590W", panelBrand: "Jinko", battery: "2 x 240Ah Tubular Batteries", price: 1850000, storage: "2 x 240Ah Tubular Batteries" },
    { id: "CLite-2K48", code: "CLite-2K48", solar: "2.48 kWp", panels: "4 x 620W", panelBrand: "Jinko", battery: "2 x 240Ah Tubular Batteries", price: 1900000, storage: "2 x 240Ah Tubular Batteries" },
    { id: "CLite-2K60", code: "CLite-2K60", solar: "2.60 kWp", panels: "4 x 650W", panelBrand: "Aiko", battery: "2 x 240Ah Tubular Batteries", price: 1920000, storage: "2 x 240Ah Tubular Batteries" },
    { id: "CLite-3K54", code: "CLite-3K54", solar: "3.54 kWp", panels: "6 x 590W", panelBrand: "Jinko", battery: "2 x 240Ah Tubular Batteries", price: 2150000, storage: "2 x 240Ah Tubular Batteries" },
    { id: "CLite-3K72", code: "CLite-3K72", solar: "3.72 kWp", panels: "6 x 620W", panelBrand: "Jinko", battery: "2 x 240Ah Tubular Batteries", price: 2225000, storage: "2 x 240Ah Tubular Batteries" },
    { id: "CLite-3K90", code: "CLite-3K90", solar: "3.90 kWp", panels: "6 x 650W", panelBrand: "Aiko", battery: "2 x 240Ah Tubular Batteries", price: 2255000, storage: "2 x 240Ah Tubular Batteries" },
  ], { withoutSolarPrice: 1095000, systemStorage: "2 x 240Ah Tubular Batteries", systemBadge: "Felicity system" }),
  product(218, "IVEM-4 CLASSIC PLUS", "ivem-4-classic-plus", "Residential", "IVEM", "4KW", 2730000, "4kVA hybrid inverter with larger battery support and better solar capacity.", [
    { id: "CPlus-3K54", code: "CPlus-3K54", solar: "3.54 kWp", panels: "6 x 590W", panelBrand: "Jinko", battery: "4 x 220Ah Tubular Batteries", price: 2730000, storage: "4 x 220Ah Tubular Batteries" },
    { id: "CPlus-3k72", code: "CPlus-3k72", solar: "3.72 kWp", panels: "6 x 620W", panelBrand: "Jinko", battery: "4 x 220Ah Tubular Batteries", price: 2805000, storage: "4 x 220Ah Tubular Batteries" },
    { id: "CPlus-3K90", code: "CPlus-3K90", solar: "3.90 kWp", panels: "6 x 650W", panelBrand: "Jinko", battery: "4 x 220Ah Tubular Batteries", price: 2835000, storage: "4 x 220Ah Tubular Batteries" },
    { id: "CPlus-4K72", code: "CPlus-4K72", solar: "4.72 kWp", panels: "8 x 590W", panelBrand: "Jinko", battery: "4 x 220Ah Tubular Batteries", price: 3235000, storage: "4 x 220Ah Tubular Batteries" },
    { id: "CPlus-5K31", code: "CPlus-5K31", solar: "5.31 kWp", panels: "9 x 590W", panelBrand: "Jinko", battery: "4 x 220Ah Tubular Batteries", price: 3155000, storage: "4 x 220Ah Tubular Batteries" },
    { id: "CPlus-5.58", code: "CPlus-5.58", solar: "5.58 kWp", panels: "9 x 620W", panelBrand: "Jinko", battery: "4 x 220Ah Tubular Batteries", price: 3265000, storage: "4 x 220Ah Tubular Batteries" },
    { id: "CPlus-5K85", code: "CPlus-5K85", solar: "5.85 kWp", panels: "9 x 650W", panelBrand: "Aiko", battery: "4 x 220Ah Tubular Batteries", price: 3310000, storage: "4 x 220Ah Tubular Batteries" },
  ], { withoutSolarPrice: 1605000, systemStorage: "4 x 220Ah Tubular Batteries", systemBadge: "Felicity system" }),
  product(219, "IVEM-4 SMART LITE", "ivem-4-smart-lite", "Residential", "IVEM", "4KW", 2595000, "4kVA hybrid inverter with a compact lithium battery backup.", [
    { id: "SLite-2K36", code: "SLite-2K36", solar: "2.36 kWp", panels: "4 x 590W", panelBrand: "Jinko", battery: "5kWh Lithium Battery", price: 2595000, storage: "5kWh LiFePO4 (Lithium)" },
    { id: "SLite-2K48", code: "SLite-2K48", solar: "2.48 kWp", panels: "4 x 620W", panelBrand: "Jinko", battery: "5kWh Lithium Battery", price: 2645000, storage: "5kWh LiFePO4 (Lithium)" },
    { id: "SLite-2K60", code: "SLite-2K60", solar: "2.60 kWp", panels: "4 x 650W", panelBrand: "Aiko", battery: "5kWh Lithium Battery", price: 2665000, storage: "5kWh LiFePO4 (Lithium)" },
    { id: "SLite-3K54", code: "SLite-3K54", solar: "3.54 kWp", panels: "6 x 590W", panelBrand: "Jinko", battery: "5kWh Lithium Battery", price: 2900000, storage: "5kWh LiFePO4 (Lithium)" },
    { id: "SLite-3K72", code: "SLite-3K72", solar: "3.72 kWp", panels: "6 x 620W", panelBrand: "Jinko", battery: "5kWh Lithium Battery", price: 2970000, storage: "5kWh LiFePO4 (Lithium)" },
    { id: "SLite-3K90", code: "SLite-3K90", solar: "3.90 kWp", panels: "6 x 650W", panelBrand: "Aiko", battery: "5kWh Lithium Battery", price: 3000000, storage: "5kWh LiFePO4 (Lithium)" },
  ], { withoutSolarPrice: 1780000, systemStorage: "5kWh LiFePO4 (Lithium)", systemStorageAlternative: "Felicity 12.5kWh Lithium alternative for higher configurations", systemBadge: "Felicity system" }),
  product(220, "IVEM-4 DUAL LITE", "ivem-4-dual-lite", "Residential", "IVEM", "4KW", 4105000, "4kVA hybrid inverter with dual lithium battery capacity for longer backup.", [
    { id: "DLite-3K54", code: "DLite-3K54", solar: "3.54 kWp", panels: "6 x 590W", panelBrand: "Jinko", battery: "2 x 5kWh Lithium Batteries", price: 4105000, storage: "2 x 5kWh LiFePO4 (Lithium)" },
    { id: "DLite-3K72", code: "DLite-3K72", solar: "3.72 kWp", panels: "6 x 620W", panelBrand: "Jinko", battery: "2 x 5kWh Lithium Batteries", price: 4180000, storage: "2 x 5kWh LiFePO4 (Lithium)" },
    { id: "DLite-3k90", code: "DLite-3k90", solar: "3.90 kWp", panels: "6 x 650W", panelBrand: "Jinko", battery: "2 x 5kWh Lithium Batteries", price: 4210000, storage: "2 x 5kWh LiFePO4 (Lithium)" },
    { id: "DLite-4K72", code: "DLite-4K72", solar: "4.72 kWp", panels: "8 x 590W", panelBrand: "Jinko", battery: "2 x 5kWh Lithium Batteries", price: 4385000, storage: "2 x 5kWh LiFePO4 (Lithium)" },
    { id: "DLite-5K31", code: "DLite-5K31", solar: "5.31 kWp", panels: "9 x 590W", panelBrand: "Jinko", battery: "2 x 5kWh Lithium Batteries", price: 4525000, storage: "2 x 5kWh LiFePO4 (Lithium)" },
    { id: "DLite-5K58", code: "DLite-5K58", solar: "5.58 kWp", panels: "9 x 620W", panelBrand: "Jinko", battery: "2 x 5kWh Lithium Batteries", price: 4640000, storage: "2 x 5kWh LiFePO4 (Lithium)" },
    { id: "DLite-5K85", code: "DLite-5K85", solar: "5.85 kWp", panels: "9 x 650W", panelBrand: "Jinko", battery: "2 x 5kWh Lithium Batteries", price: 4680000, storage: "2 x 5kWh LiFePO4 (Lithium)" },
  ], { withoutSolarPrice: 2985000, systemStorage: "2 x 5kWh LiFePO4 (Lithium)", systemBadge: "Felicity system" }),
  product(221, "IVEM-6 CLASSIC PLUS", "ivem-6-classic-plus", "Residential", "IVEM", "6KW", 3065000, "6kVA hybrid inverter with a strong tubular battery configuration.", [
    { id: "CPlus-4K13", code: "CPlus-4K13", solar: "4.13 kWp", panels: "7 x 590W", panelBrand: "Jinko", battery: "4 x 220Ah Tubular Batteries", price: 3065000, storage: "4 x 220Ah Tubular Batteries" },
    { id: "CPlus-4K34", code: "CPlus-4K34", solar: "4.34 kWp", panels: "7 x 620W", panelBrand: "Jinko", battery: "4 x 220Ah Tubular Batteries", price: 3150000, storage: "4 x 220Ah Tubular Batteries" },
    { id: "CPlus-4K55", code: "CPlus-4K55", solar: "4.55 kWp", panels: "7 x 650W", panelBrand: "Aiko", battery: "4 x 220Ah Tubular Batteries", price: 3185000, storage: "4 x 220Ah Tubular Batteries" },
    { id: "CPlus-4K72", code: "CPlus-4K72", solar: "4.72 kWp", panels: "8 x 590W", panelBrand: "Jinko", battery: "4 x 220Ah Tubular Batteries", price: 3205000, storage: "4 x 220Ah Tubular Batteries" },
    { id: "CPlus-4K96", code: "CPlus-4K96", solar: "4.96 kWp", panels: "8 x 620W", panelBrand: "Jinko", battery: "4 x 220Ah Tubular Batteries", price: 3305000, storage: "4 x 220Ah Tubular Batteries" },
    { id: "CPlus-5K20", code: "CPlus-5K20", solar: "5.20 kWp", panels: "8 x 650W", panelBrand: "Aiko", battery: "4 x 220Ah Tubular Batteries", price: 3345000, storage: "4 x 220Ah Tubular Batteries" },
    { id: "CPlus-5K31", code: "CPlus-5K31", solar: "5.31 kWp", panels: "9 x 590W", panelBrand: "Jinko", battery: "4 x 220Ah Tubular Batteries", price: 3345000, storage: "4 x 220Ah Tubular Batteries" },
    { id: "CPlus-5K58", code: "CPlus-5K58", solar: "5.58 kWp", panels: "9 x 620W", panelBrand: "Jinko", battery: "4 x 220Ah Tubular Batteries", price: 3455000, storage: "4 x 220Ah Tubular Batteries" },
    { id: "CPlus-5K85", code: "CPlus-5K85", solar: "5.85 kWp", panels: "9 x 650W", panelBrand: "Aiko", battery: "4 x 220Ah Tubular Batteries", price: 3500000, storage: "4 x 220Ah Tubular Batteries" },
  ], { withoutSolarPrice: 1805000, systemStorage: "4 x 220Ah Tubular Batteries", systemBadge: "Felicity system" }),
  product(222, "IVEM-6 SMART PLUS", "ivem-6-smart-plus", "Residential", "IVEM", "6KW", 3970000, "6kVA hybrid inverter with a single 10kWh lithium battery package.", [
    { id: "SPlus-4K13", code: "SPlus-4K13", solar: "4.13 kWp", panels: "7 x 590W", panelBrand: "Jinko", battery: "10kWh Lithium Battery", price: 3970000, storage: "10kWh LiFePO4 (Lithium)" },
    { id: "SPlus-4K34", code: "SPlus-4K34", solar: "4.34 kWp", panels: "7 x 620W", panelBrand: "Jinko", battery: "10kWh Lithium Battery", price: 4055000, storage: "10kWh LiFePO4 (Lithium)" },
    { id: "SPlus-4K55", code: "SPlus-4K55", solar: "4.55 kWp", panels: "7 x 650W", panelBrand: "Aiko", battery: "10kWh Lithium Battery", price: 4090000, storage: "10kWh LiFePO4 (Lithium)" },
    { id: "SPlus-4K72", code: "SPlus-4K72", solar: "4.72 kWp", panels: "8 x 590W", panelBrand: "Jinko", battery: "10kWh Lithium Battery", price: 4110000, storage: "10kWh LiFePO4 (Lithium)" },
    { id: "SPlus-4K96", code: "SPlus-4K96", solar: "4.96 kWp", panels: "8 x 620W", panelBrand: "Jinko", battery: "10kWh Lithium Battery", price: 4210000, storage: "10kWh LiFePO4 (Lithium)" },
    { id: "SPlus-5K20", code: "SPlus-5K20", solar: "5.20 kWp", panels: "8 x 650W", panelBrand: "Jinko", battery: "10kWh Lithium Battery", price: 4250000, storage: "10kWh LiFePO4 (Lithium)" },
    { id: "SPlus-5K31", code: "SPlus-5K31", solar: "5.31 kWp", panels: "9 x 590W", panelBrand: "Jinko", battery: "10kWh Lithium Battery", price: 4250000, storage: "10kWh LiFePO4 (Lithium)" },
    { id: "SPlus-5K58", code: "SPlus-5K58", solar: "5.58 kWp", panels: "9 x 620W", panelBrand: "Jinko", battery: "10kWh Lithium Battery", price: 4360000, storage: "10kWh LiFePO4 (Lithium)" },
    { id: "SPlus-5K85", code: "SPlus-5K85", solar: "5.85 kWp", panels: "9 x 650W", panelBrand: "Aiko", battery: "10kWh Lithium Battery", price: 4405000, storage: "10kWh LiFePO4 (Lithium)" },
  ], { withoutSolarPrice: 2710000, systemStorage: "10kWh LiFePO4 (Lithium)", systemBadge: "Felicity system" }),
  product(223, "IVEM-6 SMART PRO", "ivem-6-smart-pro", "Residential", "IVEM", "6KW", 4275000, "6kVA hybrid inverter with a 12.5kWh lithium battery configuration.", [
    { id: "SPro-4K55", code: "SPro-4K55", solar: "4.55 kWp", panels: "7 x 650W", panelBrand: "Aiko", battery: "12.5kWh Lithium Battery", price: 4275000, storage: "12.5kWh LiFePO4 (Lithium)" },
    { id: "SPro-4K72", code: "SPro-4K72", solar: "4.72 kWp", panels: "8 x 590W", panelBrand: "Jinko", battery: "12.5kWh Lithium Battery", price: 4295000, storage: "12.5kWh LiFePO4 (Lithium)" },
    { id: "SPro-4K96", code: "SPro-4K96", solar: "4.96 kWp", panels: "8 x 620W", panelBrand: "Jinko", battery: "12.5kWh Lithium Battery", price: 4395000, storage: "12.5kWh LiFePO4 (Lithium)" },
    { id: "SPro-5K20", code: "SPro-5K20", solar: "5.20 kWp", panels: "8 x 650W", panelBrand: "Jinko", battery: "12.5kWh Lithium Battery", price: 4435000, storage: "12.5kWh LiFePO4 (Lithium)" },
    { id: "SPro-5K31", code: "SPro-5K31", solar: "5.31 kWp", panels: "9 x 590W", panelBrand: "Jinko", battery: "12.5kWh Lithium Battery", price: 4435000, storage: "12.5kWh LiFePO4 (Lithium)" },
    { id: "SPro-5K58", code: "SPro-5K58", solar: "5.58 kWp", panels: "9 x 620W", panelBrand: "Jinko", battery: "12.5kWh Lithium Battery", price: 4545000, storage: "12.5kWh LiFePO4 (Lithium)" },
    { id: "SPro-5K85", code: "SPro-5K85", solar: "5.85 kWp", panels: "9 x 650W", panelBrand: "Aiko", battery: "12.5kWh Lithium Battery", price: 4590000, storage: "12.5kWh LiFePO4 (Lithium)" },
  ], { withoutSolarPrice: 2895000, systemStorage: "12.5kWh LiFePO4 (Lithium)", systemBadge: "Felicity system" }),
  product(224, "IVEM-6 SMART FORCE", "ivem-6-smart-force", "Residential", "IVEM", "6KW", 4585000, "6kVA hybrid inverter with a 15kWh lithium battery stack.", [
    { id: "SForce-4K55", code: "SForce-4K55", solar: "4.55 kWp", panels: "7 x 650W", panelBrand: "Aiko", battery: "15kWh Lithium Battery", price: 4585000, storage: "15kWh LiFePO4 (Lithium)" },
    { id: "SForce-4K72", code: "SForce-4K72", solar: "4.72 kWp", panels: "8 x 590W", panelBrand: "Jinko", battery: "15kWh Lithium Battery", price: 4605000, storage: "15kWh LiFePO4 (Lithium)" },
    { id: "SForce-4K96", code: "SForce-4K96", solar: "4.96 kWp", panels: "8 x 620W", panelBrand: "Jinko", battery: "15kWh Lithium Battery", price: 4700000, storage: "15kWh LiFePO4 (Lithium)" },
    { id: "SForce-5K20", code: "SForce-5K20", solar: "5.20 kWp", panels: "8 x 650W", panelBrand: "Aiko", battery: "15kWh Lithium Battery", price: 4740000, storage: "15kWh LiFePO4 (Lithium)" },
    { id: "SForce-5K31", code: "SForce-5K31", solar: "5.31 kWp", panels: "9 x 590W", panelBrand: "Jinko", battery: "15kWh Lithium Battery", price: 4740000, storage: "15kWh LiFePO4 (Lithium)" },
    { id: "SForce-5K58", code: "SForce-5K58", solar: "5.58 kWp", panels: "9 x 620W", panelBrand: "Jinko", battery: "15kWh Lithium Battery", price: 4855000, storage: "15kWh LiFePO4 (Lithium)" },
    { id: "SForce-5K85", code: "SForce-5K85", solar: "5.85 kWp", panels: "9 x 650W", panelBrand: "Aiko", battery: "15kWh Lithium Battery", price: 4895000, storage: "15kWh LiFePO4 (Lithium)" },
    { id: "SForce-6K53", code: "SForce-6K53", solar: "6.53 kWp", panels: "9 x 725W", panelBrand: "Jinko", battery: "15kWh Lithium Battery", price: 5260000, storage: "15kWh LiFePO4 (Lithium)" },
  ], { withoutSolarPrice: 3200000, systemStorage: "15kWh LiFePO4 (Lithium)", systemBadge: "Felicity system" }),
  product(225, "IVEM-6 SMART BOOST", "ivem-6-smart-boost", "Residential", "IVEM", "6KW", 4800000, "6kVA hybrid inverter with a 17.5kWh lithium battery backup.", [
    { id: "SBoost-5K20", code: "SBoost-5K20", solar: "5.20 kWp", panels: "8 x 650W", panelBrand: "Aiko", battery: "17.5kWh Lithium Battery", price: 4800000, storage: "17.5kWh LiFePO4 (Lithium)" },
    { id: "SBoost-5K31", code: "SBoost-5K31", solar: "5.31 kWp", panels: "9 x 590W", panelBrand: "Jinko", battery: "17.5kWh Lithium Battery", price: 4805000, storage: "17.5kWh LiFePO4 (Lithium)" },
    { id: "SBoost-5K58", code: "SBoost-5K58", solar: "5.58 kWp", panels: "9 x 620W", panelBrand: "Jinko", battery: "17.5kWh Lithium Battery", price: 4915000, storage: "17.5kWh LiFePO4 (Lithium)" },
    { id: "SBoost-5K85", code: "SBoost-5K85", solar: "5.85 kWp", panels: "9 x 650W", panelBrand: "Aiko", battery: "17.5kWh Lithium Battery", price: 4960000, storage: "17.5kWh LiFePO4 (Lithium)" },
    { id: "SBoost-6K53", code: "SBoost-6K53", solar: "6.53 kWp", panels: "9 x 725W", panelBrand: "Jinko", battery: "17.5kWh Lithium Battery", price: 5325000, storage: "17.5kWh LiFePO4 (Lithium)" },
  ], { withoutSolarPrice: 3265000, systemStorage: "17.5kWh LiFePO4 (Lithium)", systemBadge: "Felicity system" }),
  product(226, "IVEM-6 SMART MAX", "ivem-6-smart-max", "Residential", "IVEM", "6KW", 7560000, "6kVA hybrid inverter with a 25kWh lithium battery and high-capacity backup.", [
    { id: "SMax-5K58", code: "SMax-5K58", solar: "5.58 kWp", panels: "9 x 620W", panelBrand: "Jinko", battery: "25kWh Lithium Battery", price: 7560000, storage: "25kWh LiFePO4 (Lithium)" },
    { id: "SMax-5K85", code: "SMax-5K85", solar: "5.85 kWp", panels: "9 x 650W", panelBrand: "Aiko", battery: "25kWh Lithium Battery", price: 7605000, storage: "25kWh LiFePO4 (Lithium)" },
    { id: "SMax-6K53", code: "SMax-6K53", solar: "6.53 kWp", panels: "9 x 725W", panelBrand: "Jinko", battery: "25kWh Lithium Battery", price: 7970000, storage: "25kWh LiFePO4 (Lithium)" },
    { id: "SMax-7K08", code: "SMax-7K08", solar: "7.08 kWp", panels: "12 x 590W", panelBrand: "Jinko", battery: "25kWh Lithium Battery", price: 7870000, storage: "25kWh LiFePO4 (Lithium)" },
  ], { withoutSolarPrice: 5910000, systemStorage: "25kWh LiFePO4 (Lithium)", systemBadge: "Felicity system" }),
  product(227, "IVEM-6 DUAL PLUS", "ivem-6-dual-plus", "Residential", "IVEM", "6KW", 6265000, "6kVA hybrid inverter with dual 10kWh battery storage for extended autonomy.", [
    { id: "DPlus-5K58", code: "DPlus-5K58", solar: "5.58 kWp", panels: "9 x 620W", panelBrand: "Jinko", battery: "2 x 10kWh Lithium Batteries", price: 6265000, storage: "2 x 10kWh LiFePO4 (Lithium)" },
    { id: "DPlus-5K85", code: "DPlus-5K85", solar: "5.85 kWp", panels: "9 x 650W", panelBrand: "Aiko", battery: "2 x 10kWh Lithium Batteries", price: 6310000, storage: "2 x 10kWh LiFePO4 (Lithium)" },
    { id: "DPlus-6K53", code: "DPlus-6K53", solar: "6.53 kWp", panels: "9 x 725W", panelBrand: "Jinko", battery: "2 x 10kWh Lithium Batteries", price: 6675000, storage: "2 x 10kWh LiFePO4 (Lithium)" },
    { id: "DPlus-7K08", code: "DPlus-7K08", solar: "7.08 kWp", panels: "12 x 590W", panelBrand: "Jinko", battery: "2 x 10kWh Lithium Batteries", price: 6580000, storage: "2 x 10kWh LiFePO4 (Lithium)" },
  ], { withoutSolarPrice: 4615000, systemStorage: "2 x 10kWh LiFePO4 (Lithium)", systemBadge: "Felicity system" }),
  product(228, "IVEM-6 DUAL PRO", "ivem-6-dual-pro", "Residential", "IVEM", "6KW", 6635000, "6kVA hybrid inverter with dual 12.5kWh battery support for higher reserve capacity.", [
    { id: "DPro-5K58", code: "DPro-5K58", solar: "5.58 kWp", panels: "9 x 620W", panelBrand: "Jinko", battery: "2 x 12.5kWh Lithium Batteries", price: 6635000, storage: "2 x 12.5kWh LiFePO4 (Lithium)" },
    { id: "DPro-5K85", code: "DPro-5K85", solar: "5.85 kWp", panels: "9 x 650W", panelBrand: "Aiko", battery: "2 x 12.5kWh Lithium Batteries", price: 6680000, storage: "2 x 12.5kWh LiFePO4 (Lithium)" },
    { id: "DPro-6K53", code: "DPro-6K53", solar: "6.53 kWp", panels: "9 x 725W", panelBrand: "Jinko", battery: "2 x 12.5kWh Lithium Batteries", price: 7045000, storage: "2 x 12.5kWh LiFePO4 (Lithium)" },
    { id: "DPro-7K08", code: "DPro-7K08", solar: "7.08 kWp", panels: "12 x 590W", panelBrand: "Jinko", battery: "2 x 12.5kWh Lithium Batteries", price: 6950000, storage: "2 x 12.5kWh LiFePO4 (Lithium)" },
  ], { withoutSolarPrice: 4985000, systemStorage: "2 x 12.5kWh LiFePO4 (Lithium)", systemBadge: "Felicity system" }),
  product(229, "IVEM-8 SMART PLUS", "ivem-8-smart-plus", "Residential", "IVEM", "8KW", 4480000, "8kVA hybrid inverter for medium-sized homes and essential commercial loads.", [
    { id: "SPlus-4K96", code: "SPlus-4K96", solar: "4.96 kWp", panels: "8 x 620W", panelBrand: "Jinko", battery: "10kWh Lithium Battery", price: 4480000, storage: "10kWh LiFePO4 (Lithium)" },
    { id: "SPlus-7K08", code: "SPlus-7K08", solar: "7.08 kWp", panels: "12 x 590W", panelBrand: "Jinko", battery: "10kWh Lithium Battery", price: 5070000, storage: "10kWh LiFePO4 (Lithium)" },
    { id: "SPlus-7K44", code: "SPlus-7K44", solar: "7.44 kWp", panels: "12 x 620W", panelBrand: "Jinko", battery: "10kWh Lithium Battery", price: 5220000, storage: "10kWh LiFePO4 (Lithium)" },
    { id: "SPlus-7K80", code: "SPlus-7K80", solar: "7.80 kWp", panels: "12 x 650W", panelBrand: "Aiko", battery: "10kWh Lithium Battery", price: 5280000, storage: "10kWh LiFePO4 (Lithium)" },
    { id: "SPlus-8K26", code: "SPlus-8K26", solar: "8.26 kWp", panels: "14 x 590W", panelBrand: "Jinko", battery: "10kWh Lithium Battery", price: 5350000, storage: "10kWh LiFePO4 (Lithium)" },
    { id: "SPlus-8K68", code: "SPlus-8K68", solar: "8.68 kWp", panels: "14 x 620W", panelBrand: "Jinko", battery: "10kWh Lithium Battery", price: 5525000, storage: "10kWh LiFePO4 (Lithium)" },
    { id: "SPlus-9K10", code: "SPlus-9K10", solar: "9.10 kWp", panels: "14 x 650W", panelBrand: "Aiko", battery: "10kWh Lithium Battery", price: 5595000, storage: "10kWh LiFePO4 (Lithium)" },
    { id: "SPlus-9K36", code: "SPlus-9K36", solar: "9.44 kWp", panels: "16 x 590W", panelBrand: "Jinko", battery: "10kWh Lithium Battery", price: 5635000, storage: "10kWh LiFePO4 (Lithium)" },
    { id: "SPlus-9K92", code: "SPlus-9K92", solar: "9.92 kWp", panels: "16 x 620W", panelBrand: "Jinko", battery: "10kWh Lithium Battery", price: 5830000, storage: "10kWh LiFePO4 (Lithium)" },
  ], { withoutSolarPrice: 2980000, systemStorage: "10kWh LiFePO4 (Lithium)", systemBadge: "Felicity system" }),
  product(230, "IVEM-8 SMART PRO", "ivem-8-smart-pro", "Residential", "IVEM", "8KW", 4665000, "8kVA hybrid inverter with a 12.5kWh lithium battery package.", [
    { id: "SPro-4K96", code: "SPro-4K96", solar: "4.96 kWp", panels: "8 x 620W", panelBrand: "Jinko", battery: "12.5kWh Lithium Battery", price: 4665000, storage: "12.5kWh LiFePO4 (Lithium)" },
    { id: "SPro-7K08", code: "SPro-7K08", solar: "7.08 kWp", panels: "12 x 590W", panelBrand: "Jinko", battery: "12.5kWh Lithium Battery", price: 5255000, storage: "12.5kWh LiFePO4 (Lithium)" },
    { id: "SPro-7K44", code: "SPro-7K44", solar: "7.44 kWp", panels: "12 x 620W", panelBrand: "Jinko", battery: "12.5kWh Lithium Battery", price: 5405000, storage: "12.5kWh LiFePO4 (Lithium)" },
    { id: "SPro-7K80", code: "SPro-7K80", solar: "7.80 kWp", panels: "12 x 650W", panelBrand: "Aiko", battery: "12.5kWh Lithium Battery", price: 5465000, storage: "12.5kWh LiFePO4 (Lithium)" },
    { id: "SPro-8K26", code: "SPro-8K26", solar: "8.26 kWp", panels: "14 x 590W", panelBrand: "Jinko", battery: "12.5kWh Lithium Battery", price: 5535000, storage: "12.5kWh LiFePO4 (Lithium)" },
    { id: "SPro-8K68", code: "SPro-8K68", solar: "8.68 kWp", panels: "14 x 620W", panelBrand: "Jinko", battery: "12.5kWh Lithium Battery", price: 5710000, storage: "12.5kWh LiFePO4 (Lithium)" },
    { id: "SPro-9K10", code: "SPro-9K10", solar: "9.10 kWp", panels: "14 x 650W", panelBrand: "Aiko", battery: "12.5kWh Lithium Battery", price: 5775000, storage: "12.5kWh LiFePO4 (Lithium)" },
    { id: "SPro-9K36", code: "SPro-9K36", solar: "9.44 kWp", panels: "16 x 590W", panelBrand: "Jinko", battery: "12.5kWh Lithium Battery", price: 5820000, storage: "12.5kWh LiFePO4 (Lithium)" },
    { id: "SPro-9K92", code: "SPro-9K92", solar: "9.92 kWp", panels: "16 x 620W", panelBrand: "Jinko", battery: "12.5kWh Lithium Battery", price: 6015000, storage: "12.5kWh LiFePO4 (Lithium)" },
  ], { withoutSolarPrice: 3165000, systemStorage: "12.5kWh LiFePO4 (Lithium)", systemBadge: "Felicity system" }),
  product(231, "IVEM-8 SMART FORCE", "ivem-8-smart-force", "Residential", "IVEM", "8KW", 5565000, "8kVA hybrid inverter with a 15kWh lithium battery option.", [
    { id: "SForce-7K08", code: "SForce-7K08", solar: "7.08 kWp", panels: "12 x 590W", panelBrand: "Jinko", battery: "15kWh Lithium Battery", price: 5565000, storage: "15kWh LiFePO4 (Lithium)" },
    { id: "SForce-7K44", code: "SForce-7K44", solar: "7.44 kWp", panels: "12 x 620W", panelBrand: "Jinko", battery: "15kWh Lithium Battery", price: 5710000, storage: "15kWh LiFePO4 (Lithium)" },
    { id: "SForce-7K80", code: "SForce-7K80", solar: "7.80 kWp", panels: "12 x 650W", panelBrand: "Aiko", battery: "15kWh Lithium Battery", price: 5770000, storage: "15kWh LiFePO4 (Lithium)" },
    { id: "SForce-8K26", code: "SForce-8K26", solar: "8.26 kWp", panels: "14 x 590W", panelBrand: "Jinko", battery: "15kWh Lithium Battery", price: 5845000, storage: "15kWh LiFePO4 (Lithium)" },
    { id: "SForce-8K68", code: "SForce-8K68", solar: "8.68 kWp", panels: "14 x 620W", panelBrand: "Jinko", battery: "15kWh Lithium Battery", price: 6015000, storage: "15kWh LiFePO4 (Lithium)" },
    { id: "SForce-9K10", code: "SForce-9K10", solar: "9.10 kWp", panels: "14 x 650W", panelBrand: "Aiko", battery: "15kWh Lithium Battery", price: 6085000, storage: "15kWh LiFePO4 (Lithium)" },
    { id: "SForce-9K36", code: "SForce-9K36", solar: "9.44 kWp", panels: "16 x 590W", panelBrand: "Jinko", battery: "15kWh Lithium Battery", price: 6125000, storage: "15kWh LiFePO4 (Lithium)" },
    { id: "SForce-9K92", code: "SForce-9K92", solar: "9.92 kWp", panels: "16 x 620W", panelBrand: "Jinko", battery: "15kWh Lithium Battery", price: 6325000, storage: "15kWh LiFePO4 (Lithium)" },
  ], { withoutSolarPrice: 3470000, systemStorage: "15kWh LiFePO4 (Lithium)", systemBadge: "Felicity system" }),
  product(232, "IVEM-8 SMART BOOST", "ivem-8-smart-boost", "Residential", "IVEM", "8KW", 5625000, "8kVA hybrid inverter with a 17.5kWh lithium battery upgrade.", [
    { id: "SBoost-7K08", code: "SBoost-7K08", solar: "7.08 kWp", panels: "12 x 590W", panelBrand: "Jinko", battery: "17.5kWh Lithium Battery", price: 5625000, storage: "17.5kWh LiFePO4 (Lithium)" },
    { id: "SBoost-7K44", code: "SBoost-7K44", solar: "7.44 kWp", panels: "12 x 620W", panelBrand: "Jinko", battery: "17.5kWh Lithium Battery", price: 5775000, storage: "17.5kWh LiFePO4 (Lithium)" },
    { id: "SBoost-7K80", code: "SBoost-7K80", solar: "7.80 kWp", panels: "12 x 650W", panelBrand: "Aiko", battery: "17.5kWh Lithium Battery", price: 5830000, storage: "17.5kWh LiFePO4 (Lithium)" },
    { id: "SBoost-8K26", code: "SBoost-8K26", solar: "8.26 kWp", panels: "14 x 590W", panelBrand: "Jinko", battery: "17.5kWh Lithium Battery", price: 5905000, storage: "17.5kWh LiFePO4 (Lithium)" },
    { id: "SBoost-8K68", code: "SBoost-8K68", solar: "8.68 kWp", panels: "14 x 620W", panelBrand: "Jinko", battery: "17.5kWh Lithium Battery", price: 6075000, storage: "17.5kWh LiFePO4 (Lithium)" },
    { id: "SBoost-9K10", code: "SBoost-9K10", solar: "9.10 kWp", panels: "14 x 650W", panelBrand: "Aiko", battery: "17.5kWh Lithium Battery", price: 6145000, storage: "17.5kWh LiFePO4 (Lithium)" },
    { id: "SBoost-9K36", code: "SBoost-9K36", solar: "9.44 kWp", panels: "16 x 590W", panelBrand: "Jinko", battery: "17.5kWh Lithium Battery", price: 6185000, storage: "17.5kWh LiFePO4 (Lithium)" },
    { id: "SBoost-9K92", code: "SBoost-9K92", solar: "9.92 kWp", panels: "16 x 620W", panelBrand: "Jinko", battery: "17.5kWh Lithium Battery", price: 6385000, storage: "17.5kWh LiFePO4 (Lithium)" },
  ], { withoutSolarPrice: 3535000, systemStorage: "17.5kWh LiFePO4 (Lithium)", systemBadge: "Felicity system" }),
  product(233, "IVEM-8 SMART MAX", "ivem-8-smart-max", "Residential", "IVEM", "8KW", 8270000, "8kVA hybrid inverter with 25kWh storage for full-day power resilience.", [
    { id: "SMax-7K08", code: "SMax-7K08", solar: "7.08 kWp", panels: "12 x 590W", panelBrand: "Jinko", battery: "25kWh Lithium Battery", price: 8270000, storage: "25kWh LiFePO4 (Lithium)" },
    { id: "SMax-7K44", code: "SMax-7K44", solar: "7.44 kWp", panels: "12 x 620W", panelBrand: "Jinko", battery: "25kWh Lithium Battery", price: 8415000, storage: "25kWh LiFePO4 (Lithium)" },
    { id: "SMax-7K80", code: "SMax-7K80", solar: "7.80 kWp", panels: "12 x 650W", panelBrand: "Aiko", battery: "25kWh Lithium Battery", price: 8475000, storage: "25kWh LiFePO4 (Lithium)" },
    { id: "SMax-8K26", code: "SMax-8K26", solar: "8.26 kWp", panels: "14 x 590W", panelBrand: "Jinko", battery: "25kWh Lithium Battery", price: 8550000, storage: "25kWh LiFePO4 (Lithium)" },
    { id: "SMax-8K68", code: "SMax-8K68", solar: "8.68 kWp", panels: "14 x 620W", panelBrand: "Jinko", battery: "25kWh Lithium Battery", price: 8720000, storage: "25kWh LiFePO4 (Lithium)" },
    { id: "SMax-9K10", code: "SMax-9K10", solar: "9.10 kWp", panels: "14 x 650W", panelBrand: "Aiko", battery: "25kWh Lithium Battery", price: 8790000, storage: "25kWh LiFePO4 (Lithium)" },
    { id: "SMax-9K36", code: "SMax-9K36", solar: "9.44 kWp", panels: "16 x 590W", panelBrand: "Jinko", battery: "25kWh Lithium Battery", price: 8830000, storage: "25kWh LiFePO4 (Lithium)" },
    { id: "SMax-9K92", code: "SMax-9K92", solar: "9.92 kWp", panels: "16 x 620W", panelBrand: "Jinko", battery: "25kWh Lithium Battery", price: 9030000, storage: "25kWh LiFePO4 (Lithium)" },
  ], { withoutSolarPrice: 6175000, systemStorage: "25kWh LiFePO4 (Lithium)", systemBadge: "Felicity system" }),
  product(234, "IVEM-8 DUAL PLUS", "ivem-8-dual-plus", "Residential", "IVEM", "8KW", 7015000, "8kVA hybrid inverter with two 10kWh battery packs for extended backup.", [
    { id: "DPlus-7K08", code: "DPlus-7K08", solar: "7.08 kWp", panels: "12 x 590W", panelBrand: "Jinko", battery: "2 x 10kWh Lithium Batteries", price: 7015000, storage: "2 x 10kWh LiFePO4 (Lithium)" },
    { id: "DPlus-7K44", code: "DPlus-7K44", solar: "7.44 kWp", panels: "12 x 620W", panelBrand: "Jinko", battery: "2 x 10kWh Lithium Batteries", price: 7160000, storage: "2 x 10kWh LiFePO4 (Lithium)" },
    { id: "DPlus-7K80", code: "DPlus-7K80", solar: "7.80 kWp", panels: "12 x 650W", panelBrand: "Aiko", battery: "2 x 10kWh Lithium Batteries", price: 7220000, storage: "2 x 10kWh LiFePO4 (Lithium)" },
    { id: "DPlus-8K26", code: "DPlus-8K26", solar: "8.26 kWp", panels: "14 x 590W", panelBrand: "Jinko", battery: "2 x 10kWh Lithium Batteries", price: 7290000, storage: "2 x 10kWh LiFePO4 (Lithium)" },
    { id: "DPlus-8K68", code: "DPlus-8K68", solar: "8.68 kWp", panels: "14 x 620W", panelBrand: "Jinko", battery: "2 x 10kWh Lithium Batteries", price: 7465000, storage: "2 x 10kWh LiFePO4 (Lithium)" },
    { id: "DPlus-9K10", code: "DPlus-9K10", solar: "9.10 kWp", panels: "14 x 650W", panelBrand: "Aiko", battery: "2 x 10kWh Lithium Batteries", price: 7535000, storage: "2 x 10kWh LiFePO4 (Lithium)" },
    { id: "DPlus-9K36", code: "DPlus-9K36", solar: "9.44 kWp", panels: "16 x 590W", panelBrand: "Jinko", battery: "2 x 10kWh Lithium Batteries", price: 7575000, storage: "2 x 10kWh LiFePO4 (Lithium)" },
    { id: "DPlus-9K92", code: "DPlus-9K92", solar: "9.92 kWp", panels: "16 x 620W", panelBrand: "Jinko", battery: "2 x 10kWh Lithium Batteries", price: 7770000, storage: "2 x 10kWh LiFePO4 (Lithium)" },
  ], { withoutSolarPrice: 4920000, systemStorage: "2 x 10kWh LiFePO4 (Lithium)", systemBadge: "Felicity system" }),
  product(235, "IVEM-8 DUAL PRO", "ivem-8-dual-pro", "Residential", "IVEM", "8KW", 7380000, "8kVA hybrid inverter with dual 12.5kWh batteries for stronger energy reserve.", [
    { id: "DPro-7K08", code: "DPro-7K08", solar: "7.08 kWp", panels: "12 x 590W", panelBrand: "Jinko", battery: "2 x 12.5kWh Lithium Batteries", price: 7380000, storage: "2 x 12.5kWh LiFePO4 (Lithium)" },
    { id: "DPro-7K44", code: "DPro-7K44", solar: "7.44 kWp", panels: "12 x 620W", panelBrand: "Jinko", battery: "2 x 12.5kWh Lithium Batteries", price: 7530000, storage: "2 x 12.5kWh LiFePO4 (Lithium)" },
    { id: "DPro-7K80", code: "DPro-7K80", solar: "7.80 kWp", panels: "12 x 650W", panelBrand: "Aiko", battery: "2 x 12.5kWh Lithium Batteries", price: 7590000, storage: "2 x 12.5kWh LiFePO4 (Lithium)" },
    { id: "DPro-8K26", code: "DPro-8K26", solar: "8.26 kWp", panels: "14 x 590W", panelBrand: "Jinko", battery: "2 x 12.5kWh Lithium Batteries", price: 7660000, storage: "2 x 12.5kWh LiFePO4 (Lithium)" },
    { id: "DPro-8K68", code: "DPro-8K68", solar: "8.68 kWp", panels: "14 x 620W", panelBrand: "Jinko", battery: "2 x 12.5kWh Lithium Batteries", price: 7835000, storage: "2 x 12.5kWh LiFePO4 (Lithium)" },
    { id: "DPro-9K10", code: "DPro-9K10", solar: "9.10 kWp", panels: "14 x 650W", panelBrand: "Aiko", battery: "2 x 12.5kWh Lithium Batteries", price: 7900000, storage: "2 x 12.5kWh LiFePO4 (Lithium)" },
    { id: "DPro-9K36", code: "DPro-9K36", solar: "9.44 kWp", panels: "16 x 590W", panelBrand: "Jinko", battery: "2 x 12.5kWh Lithium Batteries", price: 7945000, storage: "2 x 12.5kWh LiFePO4 (Lithium)" },
    { id: "DPro-9K92", code: "DPro-9K92", solar: "9.92 kWp", panels: "16 x 620W", panelBrand: "Jinko", battery: "2 x 12.5kWh Lithium Batteries", price: 8140000, storage: "2 x 12.5kWh LiFePO4 (Lithium)" },
  ], { withoutSolarPrice: 5290000, systemStorage: "2 x 12.5kWh LiFePO4 (Lithium)", systemBadge: "Felicity system" }),
  product(236, "IVEM-8 DUAL FORCE", "ivem-8-dual-force", "Residential", "IVEM", "8KW", 8145000, "8kVA hybrid inverter with two 15kWh battery packs for high-capacity backup.", [
    { id: "DForce-7K44", code: "DForce-7K44", solar: "7.44 kWp", panels: "12 x 620W", panelBrand: "Jinko", battery: "2 x 15kWh Lithium Batteries", price: 8145000, storage: "2 x 15kWh LiFePO4 (Lithium)" },
    { id: "DForce-7K80", code: "DForce-7K80", solar: "7.80 kWp", panels: "12 x 650W", panelBrand: "Aiko", battery: "2 x 15kWh Lithium Batteries", price: 8205000, storage: "2 x 15kWh LiFePO4 (Lithium)" },
    { id: "DForce-8K26", code: "DForce-8K26", solar: "8.26 kWp", panels: "14 x 590W", panelBrand: "Jinko", battery: "2 x 15kWh Lithium Batteries", price: 8275000, storage: "2 x 15kWh LiFePO4 (Lithium)" },
    { id: "DForce-8K68", code: "DForce-8K68", solar: "8.68 kWp", panels: "14 x 620W", panelBrand: "Jinko", battery: "2 x 15kWh Lithium Batteries", price: 8450000, storage: "2 x 15kWh LiFePO4 (Lithium)" },
    { id: "DForce-9K10", code: "DForce-9K10", solar: "9.10 kWp", panels: "14 x 650W", panelBrand: "Aiko", battery: "2 x 15kWh Lithium Batteries", price: 8515000, storage: "2 x 15kWh LiFePO4 (Lithium)" },
    { id: "DForce-9K36", code: "DForce-9K36", solar: "9.44 kWp", panels: "16 x 590W", panelBrand: "Jinko", battery: "2 x 15kWh Lithium Batteries", price: 8560000, storage: "2 x 15kWh LiFePO4 (Lithium)" },
    { id: "DForce-9K92", code: "DForce-9K92", solar: "9.92 kWp", panels: "16 x 620W", panelBrand: "Jinko", battery: "2 x 15kWh Lithium Batteries", price: 8755000, storage: "2 x 15kWh LiFePO4 (Lithium)" },
  ], { withoutSolarPrice: 5905000, systemStorage: "2 x 15kWh LiFePO4 (Lithium)", systemBadge: "Felicity system" }),
  product(237, "IVEM-8 DUAL BOOST", "ivem-8-dual-boost", "Residential", "IVEM", "8KW", 8640000, "8kVA hybrid inverter with dual 17.5kWh battery capacity.", [
    { id: "DBoost-9K10", code: "DBoost-9K10", solar: "9.10 kWp", panels: "14 x 650W", panelBrand: "Aiko", battery: "2 x 17.5kWh Lithium Batteries", price: 8640000, storage: "2 x 17.5kWh LiFePO4 (Lithium)" },
    { id: "DBoost-9K36", code: "DBoost-9K36", solar: "9.44 kWp", panels: "16 x 590W", panelBrand: "Jinko", battery: "2 x 17.5kWh Lithium Batteries", price: 8680000, storage: "2 x 17.5kWh LiFePO4 (Lithium)" },
    { id: "DBoost-9K92", code: "DBoost-9K92", solar: "9.92 kWp", panels: "16 x 620W", panelBrand: "Jinko", battery: "2 x 17.5kWh Lithium Batteries", price: 8880000, storage: "2 x 17.5kWh LiFePO4 (Lithium)" },
  ], { withoutSolarPrice: 6025000, systemStorage: "2 x 17.5kWh LiFePO4 (Lithium)", systemBadge: "Felicity system" }),
  product(238, "IVEM-12 SMART FORCE", "ivem-12-smart-force", "Residential", "IVEM", "12KW", 5610000, "12kVA hybrid inverter with a 15kWh lithium battery package.", [
    { id: "SForce-7K08", code: "SForce-7K08", solar: "7.08 kWp", panels: "12 x 590W", panelBrand: "Jinko", battery: "15kWh Lithium Battery", price: 5610000, storage: "15kWh LiFePO4 (Lithium)" },
    { id: "SForce-8K26", code: "SForce-8K26", solar: "8.26 kWp", panels: "14 x 590W", panelBrand: "Jinko", battery: "15kWh Lithium Battery", price: 6050000, storage: "15kWh LiFePO4 (Lithium)" },
    { id: "SForce-8K68", code: "SForce-8K68", solar: "8.68 kWp", panels: "14 x 620W", panelBrand: "Jinko", battery: "15kWh Lithium Battery", price: 6225000, storage: "15kWh LiFePO4 (Lithium)" },
    { id: "SForce-8K89", code: "SForce-8K89", solar: "8.89 kWp", panels: "14 x 635W", panelBrand: "Jinko", battery: "15kWh Lithium Battery", price: 6295000, storage: "15kWh LiFePO4 (Lithium)" },
    { id: "SForce-8K96", code: "SForce-8K96", solar: "8.96 kWp", panels: "14 x 640W", panelBrand: "Jinko", battery: "15kWh Lithium Battery", price: 6325000, storage: "15kWh LiFePO4 (Lithium)" },
    { id: "SForce-9K10", code: "SForce-9K10", solar: "9.10 kWp", panels: "14 x 650W", panelBrand: "Aiko", battery: "15kWh Lithium Battery", price: 6295000, storage: "15kWh LiFePO4 (Lithium)" },
    { id: "SForce-9K44", code: "SForce-9K44", solar: "9.44 kWp", panels: "16 x 590W", panelBrand: "Jinko", battery: "15kWh Lithium Battery", price: 6330000, storage: "15kWh LiFePO4 (Lithium)" },
    { id: "SForce-9K92", code: "SForce-9K92", solar: "9.92 kWp", panels: "16 x 620W", panelBrand: "Jinko", battery: "15kWh Lithium Battery", price: 6530000, storage: "15kWh LiFePO4 (Lithium)" },
    { id: "SForce-10K16", code: "SForce-10K16", solar: "10.16 kWp", panels: "16 x 635W", panelBrand: "Jinko", battery: "15kWh Lithium Battery", price: 6610000, storage: "15kWh LiFePO4 (Lithium)" },
    { id: "SForce-10K24", code: "SForce-10K24", solar: "10.24 kWp", panels: "16 x 640W", panelBrand: "Jinko", battery: "15kWh Lithium Battery", price: 6645000, storage: "15kWh LiFePO4 (Lithium)" },
    { id: "SForce-10K40", code: "SForce-10K40", solar: "10.40 kWp", panels: "16 x 650W", panelBrand: "Aiko", battery: "15kWh Lithium Battery", price: 6610000, storage: "15kWh LiFePO4 (Lithium)" },
  ], { withoutSolarPrice: 3650000, systemStorage: "15kWh LiFePO4 (Lithium)", systemBadge: "Felicity system" }),
  product(239, "IVEM-12 SMART BOOST", "ivem-12-smart-boost", "Residential", "IVEM", "12KW", 6115000, "12kVA hybrid inverter with a 17.5kWh battery and flexible solar sizing.", [
    { id: "SBoost-8K26", code: "SBoost-8K26", solar: "8.26 kWp", panels: "14 x 590W", panelBrand: "Jinko", battery: "17.5kWh Lithium Battery", price: 6115000, storage: "17.5kWh LiFePO4 (Lithium)" },
    { id: "SBoost-8K68", code: "SBoost-8K68", solar: "8.68 kWp", panels: "14 x 620W", panelBrand: "Jinko", battery: "17.5kWh Lithium Battery", price: 6285000, storage: "17.5kWh LiFePO4 (Lithium)" },
    { id: "SBoost-8K89", code: "SBoost-8K89", solar: "8.89 kWp", panels: "14 x 635W", panelBrand: "Jinko", battery: "17.5kWh Lithium Battery", price: 6355000, storage: "17.5kWh LiFePO4 (Lithium)" },
    { id: "SBoost-8K96", code: "SBoost-8K96", solar: "8.96 kWp", panels: "14 x 640W", panelBrand: "Jinko", battery: "17.5kWh Lithium Battery", price: 6390000, storage: "17.5kWh LiFePO4 (Lithium)" },
    { id: "SBoost-9K10", code: "SBoost-9K10", solar: "9.10 kWp", panels: "14 x 650W", panelBrand: "Aiko", battery: "17.5kWh Lithium Battery", price: 6355000, storage: "17.5kWh LiFePO4 (Lithium)" },
    { id: "SBoost-9K44", code: "SBoost-9K44", solar: "9.44 kWp", panels: "16 x 590W", panelBrand: "Jinko", battery: "17.5kWh Lithium Battery", price: 6395000, storage: "17.5kWh LiFePO4 (Lithium)" },
    { id: "SBoost-9K92", code: "SBoost-9K92", solar: "9.92 kWp", panels: "16 x 620W", panelBrand: "Jinko", battery: "17.5kWh Lithium Battery", price: 6590000, storage: "17.5kWh LiFePO4 (Lithium)" },
    { id: "SBoost-10K16", code: "SBoost-10K16", solar: "10.16 kWp", panels: "16 x 635W", panelBrand: "Jinko", battery: "17.5kWh Lithium Battery", price: 6670000, storage: "17.5kWh LiFePO4 (Lithium)" },
    { id: "SBoost-10K24", code: "SBoost-10K24", solar: "10.24 kWp", panels: "16 x 640W", panelBrand: "Jinko", battery: "17.5kWh Lithium Battery", price: 6710000, storage: "17.5kWh LiFePO4 (Lithium)" },
    { id: "SBoost-10K40", code: "SBoost-10K40", solar: "10.40 kWp", panels: "16 x 650W", panelBrand: "Aiko", battery: "17.5kWh Lithium Battery", price: 6670000, storage: "17.5kWh LiFePO4 (Lithium)" },
  ], { withoutSolarPrice: 3710000, systemStorage: "17.5kWh LiFePO4 (Lithium)", systemBadge: "Felicity system" }),
  product(240, "IVEM-12 SMART MAX", "ivem-12-smart-max", "Residential", "IVEM", "12KW", 9040000, "12kVA hybrid inverter with a high-capacity 25kWh lithium battery suite.", [
    { id: "SMax-9K44", code: "SMax-9K44", solar: "9.44 kWp", panels: "16 x 590W", panelBrand: "Jinko", battery: "25kWh Lithium Battery", price: 9040000, storage: "25kWh LiFePO4 (Lithium)" },
    { id: "SMax-9K92", code: "SMax-9K92", solar: "9.92 kWp", panels: "16 x 620W", panelBrand: "Jinko", battery: "25kWh Lithium Battery", price: 9235000, storage: "25kWh LiFePO4 (Lithium)" },
    { id: "SMax-10K16", code: "SMax-10K16", solar: "10.16 kWp", panels: "16 x 635W", panelBrand: "Jinko", battery: "25kWh Lithium Battery", price: 9315000, storage: "25kWh LiFePO4 (Lithium)" },
    { id: "SMax-10K24", code: "SMax-10K24", solar: "10.24 kWp", panels: "16 x 640W", panelBrand: "Jinko", battery: "25kWh Lithium Battery", price: 9355000, storage: "25kWh LiFePO4 (Lithium)" },
    { id: "SMax-10K40", code: "SMax-10K40", solar: "10.40 kWp", panels: "16 x 650W", panelBrand: "Aiko", battery: "25kWh Lithium Battery", price: 9315000, storage: "25kWh LiFePO4 (Lithium)" },
    { id: "SMax-11K16", code: "SMax-11K16", solar: "11.16 kWp", panels: "18 x 620W", panelBrand: "Jinko", battery: "25kWh Lithium Battery", price: 9540000, storage: "25kWh LiFePO4 (Lithium)" },
    { id: "SMax-11K43", code: "SMax-11K43", solar: "11.43 kWp", panels: "18 x 635W", panelBrand: "Jinko", battery: "25kWh Lithium Battery", price: 9630000, storage: "25kWh LiFePO4 (Lithium)" },
    { id: "SMax-11K52", code: "SMax-11K52", solar: "11.52 kWp", panels: "18 x 640W", panelBrand: "Jinko", battery: "25kWh Lithium Battery", price: 9670000, storage: "25kWh LiFePO4 (Lithium)" },
    { id: "SMax-11K60", code: "SMax-11K60", solar: "11.60 kWp", panels: "16 x 725W", panelBrand: "Jinko", battery: "25kWh Lithium Battery", price: 9965000, storage: "25kWh LiFePO4 (Lithium)" },
    { id: "SMax-11K70", code: "SMax-11K70", solar: "11.70 kWp", panels: "18 x 650W", panelBrand: "Aiko", battery: "25kWh Lithium Battery", price: 9630000, storage: "25kWh LiFePO4 (Lithium)" },
    { id: "DPro-12K98", code: "DPro-12K98", solar: "12.98 kWp", panels: "22 x 590W", panelBrand: "Jinko", battery: "25kWh Lithium Battery", price: 9935000, storage: "25kWh LiFePO4 (Lithium)" },
    { id: "SMax-13K05", code: "SMax-13K05", solar: "13.05 kWp", panels: "18 x 725W", panelBrand: "Jinko", battery: "25kWh Lithium Battery", price: 10360000, storage: "25kWh LiFePO4 (Lithium)" },
  ], { withoutSolarPrice: 6355000, systemStorage: "25kWh LiFePO4 (Lithium)", systemBadge: "Felicity system" }),
  product(241, "IVEM-12 DUAL PLUS", "ivem-12-dual-plus", "Residential", "IVEM", "12KW", 7745000, "12kVA hybrid inverter with two 10kWh battery packs for longer reserve times.", [
    { id: "DPlus-9K44", code: "DPlus-9K44", solar: "9.44 kWp", panels: "16 x 590W", panelBrand: "Jinko", battery: "2 x 10kWh Lithium Batteries", price: 7745000, storage: "2 x 10kWh LiFePO4 (Lithium)" },
    { id: "DPlus-9K92", code: "DPlus-9K92", solar: "9.92 kWp", panels: "16 x 620W", panelBrand: "Jinko", battery: "2 x 10kWh Lithium Batteries", price: 7945000, storage: "2 x 10kWh LiFePO4 (Lithium)" },
    { id: "DPlus-10K16", code: "DPlus-10K16", solar: "10.16 kWp", panels: "16 x 635W", panelBrand: "Jinko", battery: "2 x 10kWh Lithium Batteries", price: 8020000, storage: "2 x 10kWh LiFePO4 (Lithium)" },
    { id: "DPlus-10K24", code: "DPlus-10K24", solar: "10.24 kWp", panels: "16 x 640W", panelBrand: "Jinko", battery: "2 x 10kWh Lithium Batteries", price: 8060000, storage: "2 x 10kWh LiFePO4 (Lithium)" },
    { id: "DPlus-10K40", code: "DPlus-10K40", solar: "10.40 kWp", panels: "16 x 650W", panelBrand: "Aiko", battery: "2 x 10kWh Lithium Batteries", price: 8020000, storage: "2 x 10kWh LiFePO4 (Lithium)" },
    { id: "DPlus-11K16", code: "DPlus-11K16", solar: "11.16 kWp", panels: "18 x 620W", panelBrand: "Jinko", battery: "2 x 10kWh Lithium Batteries", price: 8250000, storage: "2 x 10kWh LiFePO4 (Lithium)" },
    { id: "DPlus-11K43", code: "DPlus-11K43", solar: "11.43 kWp", panels: "18 x 635W", panelBrand: "Jinko", battery: "2 x 10kWh Lithium Batteries", price: 8335000, storage: "2 x 10kWh LiFePO4 (Lithium)" },
    { id: "DPlus-11K52", code: "DPlus-11K52", solar: "11.52 kWp", panels: "18 x 640W", panelBrand: "Jinko", battery: "2 x 10kWh Lithium Batteries", price: 8380000, storage: "2 x 10kWh LiFePO4 (Lithium)" },
    { id: "DPlus-11K60", code: "DPlus-11K60", solar: "11.60 kWp", panels: "16 x 725W", panelBrand: "Jinko", battery: "2 x 10kWh Lithium Batteries", price: 8670000, storage: "2 x 10kWh LiFePO4 (Lithium)" },
    { id: "DPlus-11K70", code: "DPlus-11K70", solar: "11.70 kWp", panels: "18 x 650W", panelBrand: "Aiko", battery: "2 x 10kWh Lithium Batteries", price: 8335000, storage: "2 x 10kWh LiFePO4 (Lithium)" },
    { id: "DPro-12K98", code: "DPro-12K98", solar: "12.98 kWp", panels: "22 x 590W", panelBrand: "Jinko", battery: "2 x 10kWh Lithium Batteries", price: 8645000, storage: "2 x 10kWh LiFePO4 (Lithium)" },
    { id: "DPlus-13K05", code: "DPlus-13K05", solar: "13.05 kWp", panels: "18 x 725W", panelBrand: "Jinko", battery: "2 x 10kWh Lithium Batteries", price: 9065000, storage: "2 x 10kWh LiFePO4 (Lithium)" },
  ], { withoutSolarPrice: 5065000, systemStorage: "2 x 10kWh LiFePO4 (Lithium)", systemBadge: "Felicity system" }),
  product(242, "IVEM-12 DUAL PRO", "ivem-12-dual-pro", "Residential", "IVEM", "12KW", 8115000, "12kVA hybrid inverter with dual 12.5kWh batteries and extended runtime.", [
    { id: "DPro-9K44", code: "DPro-9K44", solar: "9.44 kWp", panels: "16 x 590W", panelBrand: "Jinko", battery: "2 x 12.5kWh Lithium Batteries", price: 8115000, storage: "2 x 12.5kWh LiFePO4 (Lithium)" },
    { id: "DPro-9K92", code: "DPro-9K92", solar: "9.92 kWp", panels: "16 x 620W", panelBrand: "Jinko", battery: "2 x 12.5kWh Lithium Batteries", price: 8310000, storage: "2 x 12.5kWh LiFePO4 (Lithium)" },
    { id: "DPro-10K16", code: "DPro-10K16", solar: "10.16 kWp", panels: "16 x 635W", panelBrand: "Jinko", battery: "2 x 12.5kWh Lithium Batteries", price: 8390000, storage: "2 x 12.5kWh LiFePO4 (Lithium)" },
    { id: "DPro-10K24", code: "DPro-10K24", solar: "10.24 kWp", panels: "16 x 640W", panelBrand: "Jinko", battery: "2 x 12.5kWh Lithium Batteries", price: 8430000, storage: "2 x 12.5kWh LiFePO4 (Lithium)" },
    { id: "DPro-10K40", code: "DPro-10K40", solar: "10.40 kWp", panels: "16 x 650W", panelBrand: "Aiko", battery: "2 x 12.5kWh Lithium Batteries", price: 8390000, storage: "2 x 12.5kWh LiFePO4 (Lithium)" },
    { id: "DPro-11K16", code: "DPro-11K16", solar: "11.16 kWp", panels: "18 x 620W", panelBrand: "Jinko", battery: "2 x 12.5kWh Lithium Batteries", price: 8615000, storage: "2 x 12.5kWh LiFePO4 (Lithium)" },
    { id: "DPro-11K43", code: "DPro-11K43", solar: "11.43 kWp", panels: "18 x 635W", panelBrand: "Jinko", battery: "2 x 12.5kWh Lithium Batteries", price: 8705000, storage: "2 x 12.5kWh LiFePO4 (Lithium)" },
    { id: "DPro-11K52", code: "DPro-11K52", solar: "11.52 kWp", panels: "18 x 640W", panelBrand: "Jinko", battery: "2 x 12.5kWh Lithium Batteries", price: 8750000, storage: "2 x 12.5kWh LiFePO4 (Lithium)" },
    { id: "DPro-11K60", code: "DPro-11K60", solar: "11.60 kWp", panels: "16 x 725W", panelBrand: "Jinko", battery: "2 x 12.5kWh Lithium Batteries", price: 9040000, storage: "2 x 12.5kWh LiFePO4 (Lithium)" },
    { id: "DPro-11K70", code: "DPro-11K70", solar: "11.70 kWp", panels: "18 x 650W", panelBrand: "Aiko", battery: "2 x 12.5kWh Lithium Batteries", price: 8705000, storage: "2 x 12.5kWh LiFePO4 (Lithium)" },
    { id: "DPro-12K98", code: "DPro-12K98", solar: "12.98 kWp", panels: "22 x 590W", panelBrand: "Jinko", battery: "2 x 12.5kWh Lithium Batteries", price: 9015000, storage: "2 x 12.5kWh LiFePO4 (Lithium)" },
    { id: "DPro-13K05", code: "DPro-13K05", solar: "13.05 kWp", panels: "18 x 725W", panelBrand: "Jinko", battery: "2 x 12.5kWh Lithium Batteries", price: 9435000, storage: "2 x 12.5kWh LiFePO4 (Lithium)" },
  ], { withoutSolarPrice: 5435000, systemStorage: "2 x 12.5kWh LiFePO4 (Lithium)", systemBadge: "Felicity system" }),
  product(243, "IVEM-12 DUAL FORCE", "ivem-12-dual-force", "Residential", "IVEM", "12KW", 9320000, "12kVA hybrid inverter with dual 15kWh battery capacity for heavy backup use.", [
    { id: "DForce-11K70", code: "DForce-11K70", solar: "11.70 kWp", panels: "18 x 650W", panelBrand: "Aiko", battery: "2 x 15kWh Lithium Batteries", price: 9320000, storage: "2 x 15kWh LiFePO4 (Lithium)" },
    { id: "DForce-12K98", code: "DForce-12K98", solar: "12.98 kWp", panels: "22 x 590W", panelBrand: "Jinko", battery: "2 x 15kWh Lithium Batteries", price: 9640000, storage: "2 x 15kWh LiFePO4 (Lithium)" },
    { id: "DForce-13K05", code: "DForce-13K05", solar: "13.05 kWp", panels: "18 x 725W", panelBrand: "Jinko", battery: "2 x 15kWh Lithium Batteries", price: 10050000, storage: "2 x 15kWh LiFePO4 (Lithium)" },
    { id: "DForce-14K16", code: "DForce-14K16", solar: "14.16 kWp", panels: "24 x 590W", panelBrand: "Jinko", battery: "2 x 15kWh Lithium Batteries", price: 9935000, storage: "2 x 15kWh LiFePO4 (Lithium)" },
  ], { withoutSolarPrice: 6050000, systemStorage: "2 x 15kWh LiFePO4 (Lithium)", systemBadge: "Felicity system" }),
  product(244, "IVEM-12 DUAL BOOST", "ivem-12-dual-boost", "Residential", "IVEM", "12KW", 9765000, "12kVA hybrid inverter with dual 17.5kWh batteries for top-tier backup capacity.", [
    { id: "DBoost-12K98", code: "DBoost-12K98", solar: "12.98 kWp", panels: "22 x 590W", panelBrand: "Jinko", battery: "2 x 17.5kWh Lithium Batteries", price: 9765000, storage: "2 x 17.5kWh LiFePO4 (Lithium)" },
    { id: "DBoost-13K05", code: "DBoost-13K05", solar: "13.05 kWp", panels: "18 x 725W", panelBrand: "Jinko", battery: "2 x 17.5kWh Lithium Batteries", price: 10175000, storage: "2 x 17.5kWh LiFePO4 (Lithium)" },
    { id: "DBoost-14K16", code: "DBoost-14K16", solar: "14.16 kWp", panels: "24 x 590W", panelBrand: "Jinko", battery: "2 x 17.5kWh Lithium Batteries", price: 10060000, storage: "2 x 17.5kWh LiFePO4 (Lithium)" },
  ], { withoutSolarPrice: 6170000, systemStorage: "2 x 17.5kWh LiFePO4 (Lithium)", systemBadge: "Felicity system" }),
];

export function getShopProduct(slug: string | undefined): SolarProduct | undefined {
  return shopProducts.find((item) => item.slug === slug);
}