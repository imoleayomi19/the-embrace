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
  battery: string;
  price: number;
  storage: string;
};

export type SolarProduct = ShopProduct & {
  slug: string;
  application: "Residential" | "Commercial / Industrial";
  brand: string;
  powerSize: string;
  tagline: string;
  configurations: SolarConfiguration[];
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
  productConfigurations?: SolarConfiguration[]
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
  };
}

export const shopProducts: SolarProduct[] = [
  product(201, "IVEM 3KW", "ivem-3kw", "Residential", "IVEM", "3KW", 1750000, "Compact home power for essential loads."),
  product(202, "IVEM 4KW Classic Light - Complete Package", "ivem-4kw", "Residential", "IVEM", "4KW", 2100000, "Everything you need to power your home. Inverter, battery, and solar.", [
    { id: "ivem-4kw-1", solar: "2.3KW", battery: "2x 220Ah Battery", price: 2100000, storage: "5.12kWh LiFePO4" },
    { id: "ivem-4kw-2", solar: "3.5KW", battery: "2x 220Ah Battery", price: 2650000, storage: "10.24kWh LiFePO4" },
    { id: "ivem-4kw-3", solar: "4.6KW", battery: "3x 220Ah Battery", price: 3200000, storage: "15kWh LiFePO4" },
  ]),
  product(203, "IVEM 5KW", "ivem-5kw", "Residential", "IVEM", "5KW", 2850000, "Reliable hybrid energy for growing homes."),
  product(204, "IVEM 6KW", "ivem-6kw", "Residential", "IVEM", "6KW", 3250000, "Balanced solar backup for demanding homes."),
  product(205, "IVEM 8KW", "ivem-8kw", "Residential", "IVEM", "8KW", 3900000, "More headroom for cooling, pumps, and appliances."),
  product(206, "IVEM 10KW", "ivem-10kw", "Residential", "IVEM", "10KW", 4650000, "High-capacity home energy with dependable backup."),
  product(207, "IVEM 12KW", "ivem-12kw", "Residential", "IVEM", "12KW", 5350000, "Whole-home power for larger residential demand."),
  product(208, "IVPM 5KW", "ivpm-5kw", "Residential", "IVPM", "5KW", 2950000, "Efficient residential power management."),
  product(209, "IVPM 8KW", "ivpm-8kw", "Residential", "IVPM", "8KW", 3750000, "Scalable backup for modern homes."),
  product(210, "IVPM 10KW", "ivpm-10kw", "Residential", "IVPM", "10KW", 4450000, "Strong, flexible power for larger homes."),
  product(211, "IVGM 6KW", "ivgm-6kw", "Residential", "IVGM", "6KW", 3400000, "Residential-grade power with commercial resilience."),
  product(212, "IVGM 8KW", "ivgm-8kw", "Residential", "IVGM", "8KW", 4100000, "Robust hybrid power for demanding applications."),
  product(213, "DEYE DXLV 15KW", "deye-dxlv-15kw", "Commercial / Industrial", "DEYE DXLV", "15KW", 7200000, "Low-voltage commercial storage for daily operations."),
  product(214, "DEYE DXLV 20KW", "deye-dxlv-20kw", "Commercial / Industrial", "DEYE DXLV", "20KW", 8900000, "Flexible low-voltage energy for growing facilities."),
  product(215, "DEYE DXHV 50KW", "deye-dxhv-50kw", "Commercial / Industrial", "DEYE DXHV", "50KW", 18500000, "High-voltage power for serious commercial loads."),
  product(216, "DEYE DXHV 100KW", "deye-dxhv-100kw", "Commercial / Industrial", "DEYE DXHV", "100KW", 32500000, "Scalable high-voltage energy for industrial sites."),
  product(217, "FLEX Commercial Energy Package", "flex", "Commercial / Industrial", "FLEX", "250KW", 42000000, "Flexible commercial energy built around your operation."),
];

export function getShopProduct(slug: string | undefined): SolarProduct | undefined {
  return shopProducts.find((item) => item.slug === slug);
}
