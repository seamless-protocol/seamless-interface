import { createContext, useContext, useState, ReactNode } from "react";

import { Displayable, ViewBigInt } from "@shared";

export interface Reward {
  tokenAmount: Displayable<ViewBigInt>;
  dollarAmount?: Displayable<ViewBigInt>;
  logo: string;
  address: string;
}

export interface RewardItem {
  id: string;
  icon: string;
  name: string;
  description: string;
  dollarAmount?: Displayable<ViewBigInt>;
  extraText?: string;
  rewards: Reward[];
  claimAsync: () => Promise<void>;
}

export type ClaimStatus = "idle" | "pending" | "success" | "failed";

interface RewardsContextValue {
  items: RewardItem[];
  selected: Set<string>;
  claimOrder: string[];
  currentStep: number;
  statuses: Record<string, ClaimStatus>;
  toggleSelect: (id: string) => void;
  startClaims: () => void;
  confirmStep: () => Promise<void>;
  cancelStep: () => void;
  reset: () => void;
}

const RewardsContext = createContext<RewardsContextValue | undefined>(undefined);

// RewardsProvider.tsx
export const RewardsProvider = ({ children, items }: { children: ReactNode; items: RewardItem[] }) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [claimOrder, setClaimOrder] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [statuses, setStatuses] = useState<Record<string, ClaimStatus>>({});

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const startClaims = () => {
    const ids = Array.from(selected);
    setClaimOrder(ids);
    setStatuses(ids.reduce((acc, i) => ({ ...acc, [i]: "idle" }), {} as Record<string, ClaimStatus>));
    setCurrentStep(0);
  };

  const confirmStep = async () => {
    if (currentStep >= claimOrder.length) return;
    const id = claimOrder[currentStep];
    const item = items.find((i) => i.id === id);
    if (!item) return;

    setStatuses((prev) => ({ ...prev, [id]: "pending" }));
    try {
      await item.claimAsync();
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
