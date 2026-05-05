"use client";
import React, { createContext, useContext, useState } from "react";

export type ParkingType = "short" | "long";

interface ParkingState {
  phone: string;
  plate: string;
  state: string;
  parkingType: ParkingType;
  hours: number;
  minutes: number;
  total: number;
  quickLabel: string;
}

interface ParkingContextType {
  data: ParkingState;
  set: (partial: Partial<ParkingState>) => void;
}

const defaultState: ParkingState = {
  phone: "",
  plate: "",
  state: "",
  parkingType: "short",
  hours: 0,
  minutes: 0,
  total: 0,
  quickLabel: "",
};

const ParkingContext = createContext<ParkingContextType>({
  data: defaultState,
  set: () => {},
});

export function ParkingProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<ParkingState>(defaultState);
  const set = (partial: Partial<ParkingState>) =>
    setData((prev) => ({ ...prev, ...partial }));
  return (
    <ParkingContext.Provider value={{ data, set }}>
      {children}
    </ParkingContext.Provider>
  );
}

export const useParkingCtx = () => useContext(ParkingContext);
