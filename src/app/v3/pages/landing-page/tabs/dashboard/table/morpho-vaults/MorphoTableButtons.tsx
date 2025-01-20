import { useRef } from "react";
import { Address } from "viem";
import { ModalHandles, FlexRow, Modal } from "@shared";
import { FormSettingsProvider } from "../../../../../../components/forms/contexts/FormSettingsContext";
import { MorphoWithdrawForm } from "../../../../../../components/forms/morpho-vault/withdraw-form/MorphoWithdrawForm";
import { MorphoDepositForm } from "../../../../../../components/forms/morpho-vault/deposit-form/MorphoDepositForm";

export const MorphoTableButtons: React.FC<{
  vault?: Address;
}> = ({ vault }) => {
  const addModal = useRef<ModalHandles>(null);
  const removeModal = useRef<ModalHandles>(null);

  return (
    <FlexRow className="gap-2 text-start cursor-default">
      <Modal
        header="Deposit to Strategy"
        ref={addModal}
        size="normal"
        buttonProps={{
          "data-cy": `deposit-button-${vault}`,
          children: "Deposit",
          className: "text-bold3 bg-metalic text-neutral-0 rounded-lg p-2 px-4 items-center",
        }}
      >
        <div className="">
          <FormSettingsProvider
            defaultStrategy={vault}
            onTransaction={() => {
              addModal.current?.close();
            }}
          >
            <MorphoDepositForm />
          </FormSettingsProvider>
        </div>
      </Modal>
      <Modal
        header="Withdraw from Strategy"
        ref={removeModal}
        size="normal"
        buttonProps={{
          "data-cy": `withdraw-button-${vault}`,
          children: "Withdraw",
          className:
            "text-bold3 border bg-transparent hover:bg-gray-100 text-metalic border border-black rounded-lg p-2 px-4 items-center",
        }}
      >
        <div className="">
          <FormSettingsProvider
            defaultStrategy={vault}
            onTransaction={() => {
              removeModal.current?.close();
            }}
          >
            <MorphoWithdrawForm />
          </FormSettingsProvider>
        </div>
      </Modal>
    </FlexRow>
  );
};
