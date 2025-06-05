import React from "react";
import { RewardItemRow } from "./RewardItem";
import { useRewards } from "../../contexts/RewardsProvider";
import { DisplayMoney, Modal, ModalHandles, Typography } from "@shared";
import { RewardsHeading } from "./RewardsHeading";
import { RewardItemClaimingRow } from "./RewardItemClaimingRow";
import { useSumRewardDollarAmounts } from "../../hooks/SumRewardDollarAmounts";

export const RewardsSelector: React.FC = () => {
  const modalRef = React.useRef<ModalHandles>(null);
  const {
    items,
    selected,
    claimOrder,
    currentStep,
    statuses,
    txHashes,
    toggleSelect,
    startClaims,
    confirmStep,
    reset,
  } = useRewards();

  const isClaiming = claimOrder.length > 0;
  const isDone = currentStep >= claimOrder.length;
  const currentId = claimOrder[currentStep];
  const isLoading = currentId ? statuses[currentId] === "pending" : false;

  const total = claimOrder.length;
  const successCount = Object.values(statuses).filter((s) => s === "success").length;

  const handleStart = () => {
    startClaims();
  };

  const dollarAmount = useSumRewardDollarAmounts(items.data?.map((i) => i?.data?.rewards).flat() || []);

  return (
    <div className="bg-neutral-0 p-10 rounded-3xl border border-blue-100 flex flex-col gap-10">
      <div className="flex flex-row justify-between">
        <RewardsHeading items={items} />
        <div>
          <Modal
            ref={modalRef}
            size="normal"
            buttonProps={{
              children: "Claim",
              className: "text-bold3 bg-metalic rounded-button text-neutral-0 py-3 px-4",
            }}
            onClose={reset}
          >
            <div className="mt-[-45px]">
              {/* Selection view */}
              {!isClaiming && (
                <div className="flex flex-col mt-10">
                  <div className="flex flex-row items-center justify-between mb-10">
                    <RewardsHeading items={items} />
                    <div>
                      <button
                        className={`text-bold3 ${
                          selected.size === 0 ? "bg-gray-200" : "bg-metalic"
                        } rounded-button text-neutral-0 py-3 px-10`}
                        onClick={handleStart}
                        disabled={selected.size === 0}
                      >
                        Claim
                      </button>
                    </div>
                  </div>
                  {items.data?.map((item, index) => (
                    <RewardItemRow
                      key={item.data?.id || index}
                      item={item}
                      showCheckbox
                      checked={selected.has(item?.data?.id || "")}
                      onToggle={() => toggleSelect(item?.data?.id || "")}
                    />
                  ))}
                </div>
              )}

              {/* Claiming view */}
              {isClaiming && (
                <div>
                  <div className="flex flex-col gap-2 mb-8">
                    <Typography type="medium4">{!isDone ? "Claim preview" : "Done Claiming"}</Typography>

                    {!isDone && (
                      <Typography type="body2">
                        You’re claiming {total} rewards. Each will require a separate confirmation to complete the
                        claiming process.
                      </Typography>
                    )}
                    {isDone && (
                      <Typography type="body2">
                        Successfully claimed {successCount}/{total} rewards. Your rewards may remain visible for a few
                        minutes while the reward data is being updated.
                      </Typography>
                    )}
                  </div>

                  <div className="flex flex-col gap-6">
                    {claimOrder.map((id, idx) => {
                      const item = items.data?.find((i) => i?.data?.id === id)!;
                      const status = statuses[id];
                      const txHash = txHashes[id];
                      return (
                        <RewardItemClaimingRow
                          key={id}
                          item={item}
                          stepNumber={idx + 1}
                          status={status}
                          txHash={txHash}
                        />
                      );
                    })}
                  </div>

                  <hr className="bg-navy-100 mt-8 mb-6" />

                  <div className="flex flex-row justify-between">
                    <Typography type="bold3">Total </Typography>
                    <DisplayMoney typography="bold3" viewValue={dollarAmount.viewValue} />
                  </div>

                  {!isDone ? (
                    <div className="mt-8 flex gap-4">
                      <button
                        onClick={modalRef.current?.close}
                        className="text-bold3 border border-metalic bg-neutral-0 rounded-button py-3 px-4 w-1/2"
                        disabled={isLoading}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={confirmStep}
                        className="text-bold3 bg-metalic rounded-button text-neutral-0 py-3 px-4 w-1/2"
                        disabled={isLoading}
                      >
                        {isLoading ? "Claiming..." : `Confirm ${currentStep + 1}/${total}`}
                      </button>
                    </div>
                  ) : (
                    <div className="text-center mt-6">
                      <button
                        onClick={() => {
                          reset();
                          modalRef.current?.close();
                        }}
                        className="text-bold3 mt-4 bg-metalic rounded-button text-neutral-0 py-3 px-4 w-full"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Modal>
        </div>
      </div>

      {/* Always show all items below */}
      <div>{items.data?.map((item, index) => <RewardItemRow key={item?.data?.id || index} item={item} />)}</div>
    </div>
  );
};
