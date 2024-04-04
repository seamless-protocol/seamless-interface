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
  Icon,
  useFullTokenData,
} from "@shared";
import { useForm } from "react-hook-form";
import { AddStrategyModal } from "./AddStrategyModal";
import { AssetPicker } from "../../../../../components/AssetPicker";
import { useEffect, useRef } from "react";
import { useAssetPickerState } from "../../../../../hooks/useAssetPickerState";
import { TypographyV2 } from "../../../../../../../shared/components/text/TypographyV2/TypographyV2";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Tag } from "../Tag";

const mockProps = {
  name: "amount",
  assetAddress: sWETH_ADDRESS as Address,
  walletBalance: {
    value: "234,925.00",
    viewValue: "234,925.00",
    bigIntValue: BigInt("234925000000000000000000"),
    symbol: "ETH",
  },
  usdValue: "2000 USD",
};

export const FormWrapper = () => {
  const modalRef = useRef<ModalHandles | null>(null);
  const { asset, isStrategy } = useAssetPickerState({});
  const { data: tokenData } = useFullTokenData(asset);

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
      <FlexCol className="gap-8">
        <FlexCol className="gap-6">
          <FlexRow className="justify-between items-start">
            <FlexCol className="gap-1">
              <Typography type="bold4">Add to strategy</Typography>
              <Typography type="regular3">Multiply wstETH staking rewards</Typography>
            </FlexCol>

            {isStrategy ? <Tag tag="ILM" /> : <Tag tag="LEND" />}
          </FlexRow>
          <RHFAmountInput
            {...mockProps}
            assetButton={
              <Modal
                ref={modalRef}
                buttonProps={{
                  children: (
                    <div className="flex justify-between min-w-28 min-h-7 space-x-2 border rounded-lg p-1 hover:bg-neutral-50">
                      {tokenData?.logo && <Icon width={18} src={tokenData?.logo} alt="input-field-asset" />}
                      <TypographyV2 type="bold3">{tokenData?.symbol || "Choose asset"}</TypographyV2>
                      <ChevronDownIcon width={12} />
                    </div>
                  ),
                }}
              >
                <div className="mx-[-24px] mt-[-80px]">
                  <AssetPicker />
                </div>
              </Modal>
            }
          />
        </FlexCol>

        {isStrategy && (
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
        )}

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
