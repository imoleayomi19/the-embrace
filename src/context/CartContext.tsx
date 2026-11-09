import { useCallback, useMemo, useState, type ReactNode } from "react";
import { CartContext, type CartItem, type NewCartItem } from "./cartStore";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((item: NewCartItem) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((currentItem) => currentItem.id === item.id);
      if (existingItem) {
        return currentItems.map((currentItem) =>
          currentItem.id === item.id
            ? { ...currentItem, quantity: currentItem.quantity + 1 }
            : currentItem
        );
      }

      return [...currentItems, { ...item, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }, []);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const value = useMemo(
    () => ({ items, itemCount, addToCart, removeFromCart }),
    [items, itemCount, addToCart, removeFromCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
