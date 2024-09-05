import { useRef } from "react";
import { Address } from "viem";
import { ModalHandles, FlexRow, Modal } from "@shared";
import { FormSettingsProvider } from "../../../../../components/forms/contexts/FormSettingsContext";
import { DepositForm } from "../../../../../components/forms/deposit-form/DepositForm";
import { WithdrawForm } from "../../../../../components/forms/withdraw-form/WithdrawForm";

export const TableButtons: React.FC<{
  strategy?: Address;
}> = ({ strategy }) => {
  const addModal = useRef<ModalHandles>(null);
  const removeModal = useRef<ModalHandles>(null);

  return (
    <FlexRow className="gap-2 text-start cursor-default">
      <Modal
        header="Deposit to Strategy"
        ref={addModal}
        size="normal"
        buttonProps={{
          children: "Deposit",
          className: "text-bold3 bg-metalic text-neutral-0 rounded-lg p-2 px-4 items-center",
        }}
      >
        <div className="">
          <FormSettingsProvider defaultStrategy={strategy}>
            <DepositForm />
          </FormSettingsProvider>
        </div>
      </Modal>
      <Modal
        header="Withdraw from Strategy"
        ref={removeModal}
        size="normal"
        buttonProps={{
          children: "Withdraw",
          className:
            "text-bold3 border bg-transparent hover:bg-gray-100 text-metalic border border-black rounded-lg p-2 px-4 items-center",
        }}
      >
        <div className="">
          <FormSettingsProvider defaultStrategy={strategy}>
            <WithdrawForm />
          </FormSettingsProvider>
        </div>
      </Modal>
    </FlexRow>
  );
};
