import { useRef } from "react";
import { Address } from "viem";
import { ModalHandles, FlexRow, Modal } from "@shared";

export const TableButtons: React.FC<{
  strategy?: Address;
  isStrategy: boolean;
}> = () => {
  const addModal = useRef<ModalHandles>(null);
  const removeModal = useRef<ModalHandles>(null);

  return (
    <FlexRow className="gap-2 text-start cursor-default">
      <Modal
        ref={addModal}
        size="normal"
        buttonProps={{
          children: "Add",
          className: "text-bold3 bg-metalic text-neutral-0 rounded-[100px] p-2 px-8 items-center",
        }}
      >
        <div className="mt-[-60px]">todo forms</div>
      </Modal>
      <Modal
        ref={removeModal}
        size="normal"
        buttonProps={{
          children: "Remove",
          className:
            "text-bold3 bg-transparent hover:bg-gray-100 text-metalic border border-metalic text-metalic rounded-[100px] p-2 px-8 items-center text-center",
        }}
      >
        <div className="mt-[-60px]">todo forms</div>
      </Modal>
    </FlexRow>
  );
};
