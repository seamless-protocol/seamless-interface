import { FlexRow, Modal, ModalHandles } from "../../../../../../shared";
import { Address } from "viem";
import { StrategyForm } from "../../../../components/forms/earn-forms/deposit-strategy-form/StrategyForm";
import { SupplyForm } from "../../../../components/forms/earn-forms/supply-form/SupplyForm";
import { useRef } from "react";
import { FormSettingsProvider } from "../../../../components/forms/contexts/FormSettingsContext";
import { WithdrawStrategyForm } from "../../../../components/forms/withdraw-forms/withdraw-strategy-form/WithdrawStrategyForm";
import { WithdrawForm } from "../../../../components/forms/withdraw-forms/withdraw-form/WithdrawForm";
import { useFetchStrategyBySubStrategyAddress } from "../../../../../state/common/hooks/useFetchStrategyBySubStrategyAddress";

export const TableButtonsMobile: React.FC<{
  asset: Address;
  subStrategy?: Address;
  isStrategy: boolean;
}> = ({ asset, isStrategy, subStrategy }) => {
  const addModal = useRef<ModalHandles>(null);
  const removeModal = useRef<ModalHandles>(null);

  const { data: strategy } = useFetchStrategyBySubStrategyAddress(subStrategy);

  return (
    <FlexRow className="gap-2 text-start cursor-default">
      <Modal
        ref={addModal}
        size="normal"
        buttonProps={{
          children: "Add",
          className: "w-full text-bold3 bg-metalic text-neutral-0 rounded-[100px] p-2 px-8 items-center",
        }}
      >
        <div className="mt-[-60px]">
          <FormSettingsProvider
            defaultAsset={strategy?.address || asset}
            defaultSubStrategy={subStrategy}
            onTransaction={() => {
              addModal.current?.close();
            }}
            disableAssetPicker
            hideTag
          >
            {isStrategy ? <StrategyForm /> : <SupplyForm />}
          </FormSettingsProvider>
        </div>
      </Modal>
      <Modal
        ref={removeModal}
        size="normal"
        buttonProps={{
          children: "Remove",
          className:
            "w-full text-bold3 bg-transparent hover:bg-gray-100 text-metalic border border-metalic text-metalic rounded-[100px] p-2 px-8 items-center text-center",
        }}
      >
        <div className="mt-[-60px]">
          <FormSettingsProvider
            defaultAsset={strategy?.address || asset}
            defaultSubStrategy={subStrategy}
            onTransaction={() => {
              removeModal.current?.close();
            }}
            disableAssetPicker
            hideTag
          >
            {isStrategy ? <WithdrawStrategyForm selectedSubStrategy={subStrategy} /> : <WithdrawForm />}
          </FormSettingsProvider>
        </div>
      </Modal>
    </FlexRow>
  );
};
