import { useRef } from "react";
import { Address } from "viem";
import { ModalHandles, FlexRow, Modal } from "@shared";
import { useLeverageTokenFormContext } from "../../../../../../components/forms/leverage-token-form/leverage-token-form-provider/LeverageTokenFormProvider";
import { DepositLeverageTokenForm } from "../../../../../../components/forms/leverage-token-form/deposit-form/DepositLeverageTokenForm";
import { WithdrawLeverageTokenForm } from "../../../../../../components/forms/leverage-token-form/withdraw-form/WithdrawLeverageTokenForm";

export const TableButtons: React.FC<{
  address?: Address;
}> = ({ address }) => {
  const addModal = useRef<ModalHandles>(null);
  const removeModal = useRef<ModalHandles>(null);

  const { setMode } = useLeverageTokenFormContext();

  return (
    <FlexRow className="gap-2 text-start cursor-default">
      <Modal
        header="Deposit to Vault"
        ref={addModal}
        size="normal"
        onOpen={() => setMode("deposit")}
        buttonProps={{
          "data-cy": `deposit-button-${address}`,
          children: "Deposit",
          className: "text-bold3 bg-metalic text-neutral-0 rounded-lg p-2 px-4 items-center",
        }}
      >
        <div className="">
          <DepositLeverageTokenForm />
        </div>
      </Modal>
      <Modal
        header="Withdraw from Strategy"
        ref={removeModal}
        onOpen={() => setMode("withdraw")}
        size="normal"
        buttonProps={{
          "data-cy": `withdraw-button-${address}`,
          children: "Withdraw",
          className:
            "text-bold3 border bg-transparent hover:bg-gray-100 text-metalic border border-black rounded-lg p-2 px-4 items-center",
        }}
      >
        <div className="">
          <WithdrawLeverageTokenForm />
        </div>
      </Modal>
    </FlexRow>
  );
};
