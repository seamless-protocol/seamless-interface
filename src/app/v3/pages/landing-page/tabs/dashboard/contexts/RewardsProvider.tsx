// src/contexts/RewardsProvider.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface RewardItem {
  id: string;
  icon: React.ReactNode;
  name: string;
  description: string;
  tokenAmount: number;
  dollarAmount: number;
  extraText?: string;
}

type ClaimStatus = "idle" | "pending" | "success" | "cancelled";

interface RewardsContextValue {
  items: RewardItem[];
  selected: Set<string>;
  claimOrder: string[];
  currentStep: number;
  statuses: Record<string, ClaimStatus>;
  toggleSelect: (id: string) => void;
  startClaims: (claimAsync: (id: string) => Promise<void>) => void;
  confirmStep: () => Promise<void>;
  cancelStep: () => void;
  reset: () => void;
}

export const REWARDS_MOCK_ITEMS: RewardItem[] = [
  {
    id: "1",
    icon: "🎉",
    name: "Mock Reward",
    description: "This is a mock reward",
    tokenAmount: 10,
    dollarAmount: 100,
  },
  {
    id: "2",
    icon: "🎉",
    name: "Mock Reward 2",
    description: "This is a mock reward 2",
    tokenAmount: 20,
    dollarAmount: 200,
  },
];

const RewardsContext = createContext<RewardsContextValue | undefined>(undefined);

export const RewardsProvider = ({ children, items }: { children: ReactNode; items: RewardItem[] }) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [claimOrder, setClaimOrder] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [statuses, setStatuses] = useState<Record<string, ClaimStatus>>({});
  const [claimAsyncFn, setClaimAsyncFn] = useState<((id: string) => Promise<void>) | null>(null);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const startClaims = (claimAsync: (id: string) => Promise<void>) => {
    const selectedIds = Array.from(selected);
    setClaimOrder(selectedIds);
    const initStatuses: Record<string, ClaimStatus> = {};
    selectedIds.forEach((id) => {
      initStatuses[id] = "idle";
    });
    setStatuses(initStatuses);
    setCurrentStep(0);
    setClaimAsyncFn(() => claimAsync);
  };

  const confirmStep = async () => {
    if (currentStep >= claimOrder.length || !claimAsyncFn) return;
    const id = claimOrder[currentStep];
    setStatuses((prev) => ({ ...prev, [id]: "pending" }));
    try {
      await claimAsyncFn(id);
      console.log("claimed", id);
      setStatuses((prev) => ({ ...prev, [id]: "success" }));
      setCurrentStep((prev) => prev + 1);
    } catch {
      setStatuses((prev) => ({ ...prev, [id]: "cancelled" }));
    }
  };

  const cancelStep = () => {
    if (currentStep >= claimOrder.length) return;
    const id = claimOrder[currentStep];
    setStatuses((prev) => ({ ...prev, [id]: "cancelled" }));
  };

  const reset = () => {
    setSelected(new Set());
    setClaimOrder([]);
    setStatuses({});
    setCurrentStep(0);
    setClaimAsyncFn(null);
  };

  return (
    <RewardsContext.Provider
      value={{
        items,
        selected,
        claimOrder,
        currentStep,
        statuses,
        toggleSelect,
        startClaims,
        confirmStep,
        cancelStep,
        reset,
      }}
    >
      {children}
    </RewardsContext.Provider>
  );
};

export const useRewards = () => {
  const ctx = useContext(RewardsContext);
  if (!ctx) throw new Error("useRewards must be used within RewardsProvider");
  return ctx;
};
