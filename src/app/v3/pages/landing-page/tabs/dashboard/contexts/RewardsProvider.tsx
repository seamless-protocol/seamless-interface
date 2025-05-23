import { createContext, useContext, useState, ReactNode } from "react";
import { useMutateClaimSeamRewards } from "../mock-hooks/useMutateClaimSeamRewards";
import { useMutateClaimAllMorphoRewards } from "../mock-hooks/useMutateClaimAllMorphoRewards";

export interface Reward {
  tokenAmount: any;
  dollarAmount?: any;
  logo: string;
  address: string;
}

export interface RewardItem {
  id: string;
  icon: string;
  name: string;
  description: string;
  dollarAmount?: any;
  extraText?: string;
  rewards: Reward[];
  claimAllAsync?: (txHash?: string) => Promise<string>;
  isClaiming?: boolean;
}

export type ClaimStatus = "idle" | "pending" | "success" | "failed";

interface RewardsContextValue {
  items: RewardItem[];
  selected: Set<string>;
  claimOrder: string[];
  currentStep: number;
  statuses: Record<string, ClaimStatus>;
  txHashes: Record<string, string>;
  toggleSelect: (id: string) => void;
  startClaims: () => void;
  confirmStep: () => void;
  cancelStep: () => void;
  reset: () => void;
}

const RewardsContext = createContext<RewardsContextValue | undefined>(undefined);

export const RewardsProvider = ({ children }: { children: ReactNode }) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [claimOrder, setClaimOrder] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [statuses, setStatuses] = useState<Record<string, ClaimStatus>>({});
  const [txHashes, setTxHashes] = useState<Record<string, string>>({});

  // SEAM HOOK
  const seamReward = useMutateClaimSeamRewards({
    settings: {
      onSuccess: (tx) => {
        const { id } = seamReward;
        setStatuses((prev) => ({ ...prev, [id]: "success" }));
        setTxHashes((prev) => ({ ...prev, [id]: tx }));
        setCurrentStep((prev) => prev + 1);
      },
      onError: () => {
        const { id } = seamReward;
        setStatuses((prev) => ({ ...prev, [id]: "failed" }));
        setCurrentStep((prev) => prev + 1);
      },
    },
  });

  // MORPHO HOOK
  const morphoReward = useMutateClaimAllMorphoRewards({
    settings: {
      onSuccess: (tx) => {
        const { id } = morphoReward;
        setStatuses((prev) => ({ ...prev, [id]: "success" }));
        setTxHashes((prev) => ({ ...prev, [id]: tx }));
        setCurrentStep((prev) => prev + 1);
      },
      onError: () => {
        const { id } = morphoReward;
        setStatuses((prev) => ({ ...prev, [id]: "failed" }));
        setCurrentStep((prev) => prev + 1);
      },
    },
  });

  const items: RewardItem[] = [seamReward, morphoReward];

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const startClaims = () => {
    const ids = Array.from(selected);
    setClaimOrder(ids);
    setStatuses(ids.reduce((acc, i) => ({ ...acc, [i]: "idle" }), {}));
    setTxHashes({});
    setCurrentStep(0);
  };

  const confirmStep = () => {
    if (currentStep >= claimOrder.length) return;
    const id = claimOrder[currentStep];
    setStatuses((prev) => ({ ...prev, [id]: "pending" }));
    const reward = items.find((i) => i.id === id);
    reward?.claimAllAsync?.();
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
    setTxHashes({});
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
        txHashes,
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
