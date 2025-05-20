// src/components/RewardsSelector.tsx
import React from "react";
import { useRewards } from "../../contexts/RewardsProvider";

export const RewardsSelector: React.FC = () => {
  const {
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
  } = useRewards();

  const isClaiming = claimOrder.length > 0;

  const handleClaimStart = () => {
    startClaims(async (id: string) => {
      console.log("claimAsync", id);
      // simulate async
      return Promise.resolve();
    });
  };

  if (!isClaiming) {
    return (
      <div>
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-4 p-4 border mb-2">
            <input type="checkbox" checked={selected.has(item.id)} onChange={() => toggleSelect(item.id)} />
            <div className="w-8 h-8">{item.icon}</div>
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-sm">
                {item.tokenAmount} tokens (${item.dollarAmount})
              </p>
              {item.extraText && <p className="text-xs text-gray-500">{item.extraText}</p>}
            </div>
          </div>
        ))}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleClaimStart}
          disabled={selected.size === 0}
        >
          Claim
        </button>
      </div>
    );
  }

  if (currentStep < claimOrder.length) {
    return (
      <div>
        {claimOrder.map((id, idx) => {
          const item = items.find((i) => i.id === id)!;
          const status = statuses[id];
          return (
            <div key={id} className="flex items-center gap-4 p-4 border mb-2">
              <span
                className={`w-6 h-6 flex items-center justify-center rounded-full border ${
                  status === "success" ? "bg-green-500 text-white" : ""
                }`}
              >
                {idx + 1}
              </span>
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          );
        })}
        <button className="px-3 py-1 bg-green-500 text-white rounded" onClick={() => confirmStep()}>
          Confirm
        </button>
        <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => cancelStep()}>
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 text-center">
      <p className="text-lg font-semibold">All done!</p>
      <button className="mt-2 px-4 py-2 bg-gray-300 rounded" onClick={reset}>
        Reset
      </button>
    </div>
  );
};
