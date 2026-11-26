"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface CartItem {
  key: string;
  productSlug: string;
  productName: string;
  imageSrc: string;
  optionSummary: string;
  unitPrice: number;
  quantity: number;
}

export interface DemoCheckoutSummary {
  mode: "direct" | "cart";
  items: CartItem[];
  totalAmount: number;
}

interface CartContextValue {
  items: CartItem[];
  totalCount: number;
  totalAmount: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  checkoutModal: DemoCheckoutSummary | null;
  openDirectCheckout: (item: CartItem) => void;
  openCartCheckout: () => void;
  closeCheckoutModal: () => void;
}

const STORAGE_KEY = "chalna_mvp_cart_v1";

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutModal, setCheckoutModal] = useState<DemoCheckoutSummary | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      // ignore storage errors
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }, [items, hydrated]);

  const totalCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const totalAmount = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [items]
  );

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const addItem = useCallback(
    (incoming: Omit<CartItem, "quantity"> & { quantity?: number }) => {
      const qty = incoming.quantity ?? 1;
      setItems((prev) => {
        const existingIndex = prev.findIndex((x) => x.key === incoming.key);
        if (existingIndex >= 0) {
          return prev.map((x, idx) =>
            idx === existingIndex ? { ...x, quantity: x.quantity + qty } : x
          );
        }
        return [...prev, { ...incoming, quantity: qty }];
      });
      setIsCartOpen(true);
    },
    []
  );

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((x) => x.key !== key);
      }
      return prev.map((x) => (x.key === key ? { ...x, quantity } : x));
    });
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((x) => x.key !== key));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const openDirectCheckout = useCallback((item: CartItem) => {
    setIsCartOpen(false);
    setCheckoutModal({
      mode: "direct",
      items: [item],
      totalAmount: item.unitPrice * item.quantity,
    });
  }, []);

  const openCartCheckout = useCallback(() => {
    setIsCartOpen(false);
    setCheckoutModal((prev) => {
      // compute from latest items outside updater? pass via state below
      return prev;
    });
  }, []);

  const openCartCheckoutSafe = useCallback(() => {
    if (items.length === 0) return;
    setIsCartOpen(false);
    setCheckoutModal({
      mode: "cart",
      items: [...items],
      totalAmount: items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    });
  }, [items]);

  const closeCheckoutModal = useCallback(() => setCheckoutModal(null), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalCount,
      totalAmount,
      isCartOpen,
      openCart,
      closeCart,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      checkoutModal,
      openDirectCheckout,
      openCartCheckout: openCartCheckoutSafe,
      closeCheckoutModal,
    }),
    [
      items,
      totalCount,
      totalAmount,
      isCartOpen,
      openCart,
      closeCart,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      checkoutModal,
      openDirectCheckout,
      openCartCheckoutSafe,
      closeCheckoutModal,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
