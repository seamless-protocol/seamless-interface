import React, { useState } from "react";
import { RewardItemRow } from "./RewardItem";
import { useRewards } from "../../contexts/RewardsProvider";

export const RewardsSelector: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
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

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    reset();
    setModalOpen(false);
  };

  const handleStart = () => {
    startClaims(async (id) => {
      console.log("claimAsync", id);
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
    });
  };

  return (
    <>
      {!modalOpen && (
        <div>
          {items.map((item) => (
            <RewardItemRow key={item.id} item={item} />
          ))}
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={openModal}>
            Claim
          </button>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-1/2 relative">
            <button className="absolute top-2 right-2 text-gray-500" onClick={closeModal}>
              Cancel
            </button>

            {!isClaiming && (
              <div>
                <h2 className="text-xl font-bold mb-4">Select Rewards</h2>
                {items.map((item) => (
                  <RewardItemRow
                    key={item.id}
                    item={item}
                    showCheckbox
                    checked={selected.has(item.id)}
                    onToggle={() => toggleSelect(item.id)}
                  />
                ))}
                <div className="mt-4 flex justify-end gap-2">
                  <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded">
                    Cancel
                  </button>
                  <button
                    onClick={handleStart}
                    disabled={selected.size === 0}
                    className="px-4 py-2 bg-green-500 text-white rounded"
                  >
                    Start Claim
                  </button>
                </div>
              </div>
            )}

            {isClaiming && currentStep < claimOrder.length && (
              <div>
                {claimOrder.map((id, idx) => {
                  const item = items.find((i) => i.id === id)!;
                  const status = statuses[id];
                  return <RewardItemRow key={id} item={item} stepNumber={idx + 1} status={status} />;
                })}
                <div className="mt-4 flex justify-end gap-2">
                  <button onClick={confirmStep} className="px-3 py-1 bg-green-500 text-white rounded">
                    Confirm
                  </button>
                  <button onClick={cancelStep} className="px-3 py-1 bg-red-500 text-white rounded">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {isClaiming && currentStep >= claimOrder.length && (
              <div className="text-center mt-6">
                <p className="text-lg font-semibold">All done!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
