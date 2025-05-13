import { useRef } from "react";
import { Address } from "viem";
import { ModalHandles, FlexRow, Modal } from "@shared";
import { WithdrawLeverageTokenForm } from "../../../../../../components/forms/withdraw-form/WithdrawForm";
import { DepositLeverageTokenForm } from "../../../../../../components/forms/deposit-form/DepositForm";
import { useLeverageTokenFormContext } from "../../../../../../components/forms/contexts/leverage-token-form-provider/LeverageTokenFormProvider";

export const TableButtons: React.FC<{
  leverageTokenAddress?: Address;
}> = ({ leverageTokenAddress: strategy }) => {
  const depositModal = useRef<ModalHandles>(null);
  const withdrawModal = useRef<ModalHandles>(null);
  const { setMode, setOnTransaction } = useLeverageTokenFormContext();

  return (
    <FlexRow className="gap-2 text-start cursor-default">
      <Modal
        header="Deposit to Leverage Token"
        ref={depositModal}
        size="normal"
        onOpen={() => {
          setMode("deposit");
          setOnTransaction(() => {
            depositModal.current?.close();
          });
        }}
        buttonProps={{
          "data-cy": `deposit-button-${strategy}`,
          children: "Deposit",
          className:
            "text-bold3 border bg-transparent hover:bg-gray-100 text-metalic border border-black rounded-lg p-2 px-4 items-center",
        }}
      >
        <div className="">
          <DepositLeverageTokenForm />
        </div>
      </Modal>
      <Modal
        header="Withdraw from Strategy"
        ref={withdrawModal}
        onOpen={() => {
          setMode("withdraw");
          setOnTransaction(() => {
            withdrawModal.current?.close();
          });
        }}
        size="normal"
        buttonProps={{
          "data-cy": `withdraw-button-${strategy}`,
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
