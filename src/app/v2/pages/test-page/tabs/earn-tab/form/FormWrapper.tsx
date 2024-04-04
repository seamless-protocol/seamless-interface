import { Address } from "viem";
import { sWETH_ADDRESS } from "@meta";
import {
  MyFormProvider,
  FlexCol,
  Typography,
  RHFAmountInput,
  RHFInputSliderField,
  FlexRow,
  Modal,
  ModalHandles,
} from "@shared";
import { useForm } from "react-hook-form";
import { AddStrategyModal } from "./AddStrategyModal";
import { AssetPicker } from "../../../../../components/AssetPicker";
import { useEffect, useRef } from "react";
import { useAssetPickerState } from "../../../../../hooks/useAssetPickerState";

const mockProps = {
  name: "amount",
  assetAddress: sWETH_ADDRESS as Address,
  walletBalance: {
    value: "1.0",
    viewValue: "1",
    bigIntValue: BigInt("1000000000000000000"),
    symbol: "ETH",
  },
  usdValue: "2000 USD",
};

export const FormWrapper = () => {
  const modalRef = useRef<ModalHandles | null>(null);
  const { asset, isStrategy } = useAssetPickerState({});

  useEffect(() => {
    modalRef.current?.close();
  }, [asset, isStrategy]);

  const methods = useForm<{
    amount: string;
  }>({
    defaultValues: {
      amount: "",
    },
  });
  const { handleSubmit } = methods;

  return (
    <MyFormProvider methods={methods} onSubmit={handleSubmit(() => {})}>
      <Modal
        ref={modalRef}
        buttonProps={{
          children: <>Test</>,
        }}
      >
        <div className="mx-[-24px]">
          <AssetPicker />
        </div>
      </Modal>
      <FlexCol className="gap-8">
        <FlexCol className="gap-6">
          <FlexCol className="gap-">
            <Typography type="bold4">Add to strategy</Typography>
            <Typography type="regular3">Multiply wstETH staking rewards</Typography>
          </FlexCol>
          <RHFAmountInput {...mockProps} />
        </FlexCol>

        <FlexCol className="gap-4">
          <Typography type="bold3">Multiplier</Typography>
          <FlexCol>
            <RHFInputSliderField name="test" min="0" max="2" />
            <FlexRow className="justify-between pl-1">
              <Typography type="medium3">3x</Typography>
              <Typography type="medium3">5x</Typography>
              <Typography type="medium3">10x</Typography>
            </FlexRow>
          </FlexCol>
        </FlexCol>

        <FlexCol className="rounded-card bg-neutral-100 p-6 gap-4">
          <Typography type="bold3">Summary</Typography>
          <FlexRow className="text-navy-600 justify-between">
            <Typography type="bold2">Estimated APY</Typography>
            <Typography type="medium2" className="text-navy-1000">
              9.33%
            </Typography>
          </FlexRow>
          <FlexRow className="text-navy-600 justify-between">
            <Typography type="bold2">Rewards APR</Typography>
            <Typography type="medium2" className="text-navy-1000">
              9.33%
            </Typography>
          </FlexRow>
          <FlexRow className="text-navy-600 justify-between">
            <Typography type="bold2">Est. time to break even</Typography>
            <Typography type="medium2" className="text-navy-1000">
              3 days
            </Typography>
          </FlexRow>
        </FlexCol>

        <AddStrategyModal />
      </FlexCol>
    </MyFormProvider>
  );
};
