"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { drugType } from "@/lib/types";

interface StoreContextType {
  productsCart: drugType[];
  addDrugToCart: (drug: drugType) => void;
  removeDrugFromCart: (drug: drugType) => void;
  resetDrugCart: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [productsCart, setProductsCart] = useState<drugType[]>([]);

  // Load from localStorage once
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cartDrugs");
      if (stored) setProductsCart(JSON.parse(stored));
    } catch (err) {
      console.error("Failed to load cartDrugs:", err);
    }
  }, []);

  // Sync to localStorage on changes
  useEffect(() => {
    localStorage.setItem("cartDrugs", JSON.stringify(productsCart));
  }, [productsCart]);

  // Add with duplicate check
  const addDrugToCart = (drug: drugType) => {
    setProductsCart((prev) => {
      if (prev.some((item) => item.id === drug.id)) return prev; // prevent duplicates
      return [...prev, drug];
    });
  };

  // Remove and persist
  const removeDrugFromCart = (drug: drugType) => {
    setProductsCart((prev) => prev.filter((item) => item.id !== drug.id));
  };

  // Reset and clear storage
  const resetDrugCart = () => {
    setProductsCart([]);
    localStorage.removeItem("cartDrugs");
  };

  return (
    <StoreContext.Provider
      value={{ productsCart, addDrugToCart, removeDrugFromCart, resetDrugCart }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export function useStoreContext(): StoreContextType {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStoreContext must be used within a StoreProvider");
  }
  return context;
}
