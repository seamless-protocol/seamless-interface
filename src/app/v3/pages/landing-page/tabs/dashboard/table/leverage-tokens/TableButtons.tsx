import { useRef } from "react";
import { Address } from "viem";
import { ModalHandles, FlexRow, Modal } from "@shared";
import { FormSettingsProvider } from "../../../../../../components/forms/contexts/FormSettingsContext";
import { WithdrawForm } from "../../../../../../components/forms/withdraw-form/WithdrawForm";

export const TableButtons: React.FC<{
  strategy?: Address;
}> = ({ strategy }) => {
  const removeModal = useRef<ModalHandles>(null);

  return (
    <FlexRow className="gap-2 text-start cursor-default">
      <Modal
        header="Withdraw from Strategy"
        ref={removeModal}
        size="normal"
        buttonProps={{
          "data-cy": `withdraw-button-${strategy}`,
          children: "Withdraw",
          className:
            "text-bold3 border bg-transparent hover:bg-gray-100 text-metalic border border-black rounded-lg p-2 px-4 items-center",
        }}
      >
        <div className="">
          <FormSettingsProvider
            defaultStrategy={strategy}
            onTransaction={() => {
              removeModal.current?.close();
            }}
          >
            <WithdrawForm />
          </FormSettingsProvider>
        </div>
      </Modal>
    </FlexRow>
  );
};
