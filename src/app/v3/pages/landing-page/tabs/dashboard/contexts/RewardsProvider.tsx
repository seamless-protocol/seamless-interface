import { createContext, useContext, useState, ReactNode } from "react";
import { useEsSeamRewardsWrapper } from "../hooks/esSeamRewardsWrapper";
import { Hash } from "viem";
import { useMorphoRewardsWrapper } from "../hooks/MorphoRewardsWrapper";
import { useStkSeamRewardsWrapper } from "../hooks/stkSeamRewardsWrapper";
import { useFuulRewardsWrapper } from "../hooks/FuulRewardsWrapper";
import { FetchData, mergeQueryStates, ViewBigInt } from "@shared";

export interface Reward {
  tokenAmount?: ViewBigInt;
  dollarAmount?: ViewBigInt;
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
  claimAllAsync?: () => Promise<Hash | undefined>;
  isClaiming?: boolean;
}

export type ClaimStatus = "idle" | "pending" | "success" | "failed";

interface RewardsContextValue {
  items: FetchData<RewardItem[] | undefined>;
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

  // stkSeam HOOK
  const stkSeamReward = useStkSeamRewardsWrapper({
    settings: {
      onSuccess: (tx) => {
        const { id } = stkSeamReward.data;
        setStatuses((prev) => ({ ...prev, [id]: "success" }));
        setTxHashes((prev) => ({ ...prev, [id]: tx }));
        setCurrentStep((prev) => prev + 1);
      },
      onError: () => {
        const { id } = stkSeamReward.data;
        setStatuses((prev) => ({ ...prev, [id]: "failed" }));
        setCurrentStep((prev) => prev + 1);
      },
    },
  });
  // MORPHO HOOK
  const morphoReward = useMorphoRewardsWrapper({
    settings: {
      onSuccess: (tx) => {
        const { id } = morphoReward.data;
        setStatuses((prev) => ({ ...prev, [id]: "success" }));
        setTxHashes((prev) => ({ ...prev, [id]: tx }));
        setCurrentStep((prev) => prev + 1);
      },
      onError: () => {
        const { id } = morphoReward.data;
        setStatuses((prev) => ({ ...prev, [id]: "failed" }));
        setCurrentStep((prev) => prev + 1);
      },
    },
  });
  // Fuul HOOK
  const fuulReward = useFuulRewardsWrapper({
    settings: {
      onSuccess: (tx) => {
        const { id } = fuulReward.data;
        setStatuses((prev) => ({ ...prev, [id]: "success" }));
        setTxHashes((prev) => ({ ...prev, [id]: tx }));
        setCurrentStep((prev) => prev + 1);
      },
      onError: () => {
        const { id } = fuulReward.data;
        setStatuses((prev) => ({ ...prev, [id]: "failed" }));
        setCurrentStep((prev) => prev + 1);
      },
    },
  });

  // esSEAM HOOK
  const esSeamReward = useEsSeamRewardsWrapper({
    settings: {
      onSuccess: (tx) => {
        const { id } = esSeamReward.data;
        setStatuses((prev) => ({ ...prev, [id]: "success" }));
        setTxHashes((prev) => ({ ...prev, [id]: tx }));
        setCurrentStep((prev) => prev + 1);
      },
      onError: () => {
        const { id } = esSeamReward.data;
        setStatuses((prev) => ({ ...prev, [id]: "failed" }));
        setCurrentStep((prev) => prev + 1);
      },
    },
  });

  const items: RewardItem[] = [stkSeamReward.data, morphoReward.data, fuulReward.data, esSeamReward.data];

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
        items: {
          ...mergeQueryStates([stkSeamReward, morphoReward, fuulReward, esSeamReward]),
          data: items,
        },
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
