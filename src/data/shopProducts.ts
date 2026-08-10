export type ShopProduct = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
};

export const shopProducts: ShopProduct[] = [
  {
    id: 101,
    name: "IVPS3.5~10kVA Hybrid Inverter",
    category: "Inverters",
    price: 258000,
    image: "./product.png",
    description: "Reliable hybrid inverter for home and small commercial systems.",
  },
  {
    id: 102,
    name: "IVEM8~12kW Solar Inverter",
    category: "Inverters",
    price: 430000,
    image: "./main1.jpg",
    description: "High-performance inverter with smart monitoring capability.",
  },
  {
    id: 103,
    name: "12kWh Lithium Battery Bank",
    category: "Batteries",
    price: 520000,
    image: "./img-3.png",
    description: "Efficient battery backup system for uninterrupted power.",
  },
  {
    id: 104,
    name: "Solar Panel Kit 5kW",
    category: "Panels",
    price: 180000,
    image: "./solar-4.jpg",
    description: "Complete solar panel kit for residential installations.",
  },
  {
    id: 105,
    name: "CCTV CCTV Dome Camera",
    category: "Security",
    price: 64000,
    image: "./about-us.jpg",
    description: "Weatherproof dome camera with night vision and motion alerts.",
  },
  {
    id: 106,
    name: "Hybrid Solar Charge Controller",
    category: "Accessories",
    price: 52000,
    image: "./new3.jpg",
    description: "Smart controller for hybrid solar and battery charging.",
  },
  {
    id: 107,
    name: "Rack & Rail Mounting Kit",
    category: "Accessories",
    price: 18500,
    image: "./product.png",
    description: "Strong and durable mounting system for solar modules.",
  },
  {
    id: 108,
    name: "Surge Protection Device",
    category: "Accessories",
    price: 9500,
    image: "./product.png",
    description: "Essential surge protection for power reliability and safety.",
  },


];
