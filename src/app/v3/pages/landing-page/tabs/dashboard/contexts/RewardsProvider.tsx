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

export type ClaimStatus = "idle" | "pending" | "success" | "failed";

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
  const [claimFn, setClaimFn] = useState<((id: string) => Promise<void>) | null>(null);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const startClaims = (claimAsync: (id: string) => Promise<void>) => {
    const ids = Array.from(selected);
    setClaimOrder(ids);
    setStatuses(ids.reduce((acc, i) => ({ ...acc, [i]: "idle" }), {} as Record<string, ClaimStatus>));
    setCurrentStep(0);
    setClaimFn(() => claimAsync);
  };

  const confirmStep = async () => {
    if (!claimFn || currentStep >= claimOrder.length) return;
    const id = claimOrder[currentStep];
    setStatuses((prev) => ({ ...prev, [id]: "pending" }));
    try {
      await claimFn(id);
      console.log("claimed", id);
      setStatuses((prev) => ({ ...prev, [id]: "success" }));
      setCurrentStep((prev) => prev + 1);
    } catch {
      setStatuses((prev) => ({ ...prev, [id]: "failed" }));
    }
  };

  const cancelStep = () => {
    if (currentStep < claimOrder.length) {
      const id = claimOrder[currentStep];
      setStatuses((prev) => ({ ...prev, [id]: "failed" }));
    }
  };

  const reset = () => {
    setSelected(new Set());
    setClaimOrder([]);
    setStatuses({});
    setCurrentStep(0);
    setClaimFn(null);
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
