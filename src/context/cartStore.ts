import { createContext, useContext } from "react";

export type CartItem = {
  id: string;
  productName: string;
  configurationName: string;
  price: number | null;
  quantity: number;
};

export type NewCartItem = Omit<CartItem, "quantity">;

export type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  addToCart: (item: NewCartItem) => void;
  removeFromCart: (id: string) => void;
};

export const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
