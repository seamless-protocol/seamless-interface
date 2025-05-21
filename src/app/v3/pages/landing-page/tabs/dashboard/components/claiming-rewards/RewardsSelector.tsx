import React from "react";
import { RewardItemRow } from "./RewardItem";
import { useRewards } from "../../contexts/RewardsProvider";
import { DisplayMoney, Modal, ModalHandles, Typography } from "@shared";
import { RewardsHeading } from "./RewardsHeading";
import { RewardItemClaimingRow } from "./RewardItemClaimingRow";

export const RewardsSelector: React.FC = () => {
  const modalRef = React.useRef<ModalHandles>(null);

  const { items, selected, claimOrder, currentStep, statuses, toggleSelect, startClaims, confirmStep, reset } =
    useRewards();

  const isClaiming = claimOrder.length > 0;

  const handleStart = () => {
    startClaims();
  };

  return (
    <div className="bg-neutral-0 p-10 rounded-3xl border border-blue-100 flex flex-col gap-10">
      <div className="flex flex-row justify-between">
        <RewardsHeading />
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
              {!isClaiming && (
                <div className="flex flex-col gap-10 mt-10">
                  <div className="flex flex-row items-center justify-between">
                    <RewardsHeading />
                    <div>
                      <button
                        className={`text-bold3 ${selected.size === 0 ? "bg-gray-200" : "bg-metalic"}  rounded-button text-neutral-0 py-3 px-10`}
                        onClick={handleStart}
                        disabled={selected.size === 0}
                      >
                        Claim
                      </button>
                    </div>
                  </div>
                  {items.map((item) => (
                    <RewardItemRow
                      key={item.id}
                      item={item}
                      showCheckbox
                      checked={selected.has(item.id)}
                      onToggle={() => toggleSelect(item.id)}
                    />
                  ))}
                </div>
              )}

              {isClaiming && currentStep < claimOrder.length && (
                <div>
                  <div className="flex flex-col gap-2 mb-8">
                    <Typography type="medium4">Claim preview</Typography>
                    <Typography type="body2">
                      You’re claiming {selected.size} rewards. Each will require a separate confirmation to complete the
                      claiming process.
                    </Typography>
                  </div>
                  <div className="flex flex-col gap-6">
                    {claimOrder.map((id, idx) => {
                      const item = items.find((i) => i.id === id)!;
                      const status = statuses[id];
                      return <RewardItemClaimingRow key={id} item={item} stepNumber={idx + 1} status={status} />;
                    })}
                  </div>

                  <hr className="bg-navy-100 mt-8 mb-6" />

                  <div className="flex flex-row justify-between">
                    <Typography type="bold3">Total </Typography>
                    <DisplayMoney typography="bold3" viewValue="906.64" />
                  </div>
                  <div className="mt-8 flex gap-4">
                    <button
                      onClick={() => {
                        reset();
                        modalRef.current?.close();
                      }}
                      className="text-bold3 border border-metalic bg-neutral-0 rounded-button py-3 px-4 w-1/2"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmStep}
                      className="text-bold3 bg-metalic rounded-button text-neutral-0 py-3 px-4 w-1/2"
                    >
                      Confirm {currentStep + 1}/{claimOrder.length}
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
          </Modal>
        </div>
      </div>
      <div className="">
        {items.map((item) => (
          <RewardItemRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
