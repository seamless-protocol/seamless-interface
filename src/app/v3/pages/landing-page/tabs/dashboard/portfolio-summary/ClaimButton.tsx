import { useRef } from "react";
import { Modal, ModalHandles } from "../../../../../../../shared";

export const ClaimButton = () => {
  const claimModal = useRef<ModalHandles>(null);

  return (
    <div className="p-1">
      <Modal
        ref={claimModal}
        size="small"
        buttonProps={{
          children: "Claim",
          className: "text-bold3 bg-metalic rounded-button text-neutral-0 py-3 px-4",
        }}
      >
        <div className="mt-[-60px]">todo forms</div>
      </Modal>
    </div>
  );
};
