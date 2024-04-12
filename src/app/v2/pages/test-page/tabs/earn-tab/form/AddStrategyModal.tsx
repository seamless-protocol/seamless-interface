import {
  Buttonv2,
  FlexCol,
  FlexRow,
  Icon,
  Modal,
  ModalHandles,
  Typography,
  WatchAssetComponentv2,
  useERC20Approve,
  useFullTokenData,
  useNotificationContext,
  useToken,
} from "@shared";

import { useAssetPickerState } from "../../../../../hooks/useAssetPickerState";
import { assetSlugConfig, earnInputConfig } from "../config/SlugConfig";
import { useFormContext } from "react-hook-form";
import { parseUnits, etherUnits, Address } from "viem";
import { useReadAaveOracleGetAssetPrice } from "../../../../../../generated";
import { useWrappedDebounce } from "../../../../../../state/common/hooks/useWrappedDebounce";
import { useFetchViewPreviewDeposit } from "../../../../../../state/loop-strategy/hooks/useFetchViewPreviewDeposit";
import { useMutateDepositStrategy } from "../../../../../../state/loop-strategy/mutations/useMutateDepositStrategy";
import { DepositModalFormData } from "../../../../../../v1/pages/ilm-details-page/components/your-info/deposit/DepositModal";
import { StrategyConfig, findILMStrategyByAddress } from "../../../../../../state/loop-strategy/config/StrategyConfig";
import { useRef } from "react";

export const AddStrategyModalWrapper: React.FC<{
  asset: Address;
}> = ({ asset }) => {
  const strategy = findILMStrategyByAddress(asset);

  if (!strategy) {
    // eslint-disable-next-line no-console
    console.warn("Strategy not found!!!");
    return <>Strategy not found!</>;
  }

  return <AddStrategyModal strategy={strategy} />;
};

const AddStrategyModal: React.FC<{
  strategy: StrategyConfig;
}> = ({ strategy }) => {
  const modalRef = useRef<ModalHandles>(null);

  const { asset } = useAssetPickerState({ overrideUrlSlug: assetSlugConfig });
  const { data: tokenData } = useFullTokenData(asset);

  const { showNotification } = useNotificationContext();

  const {
    data: { symbol: strategySymbol },
  } = useToken(strategy.address);

  const { watch } = useFormContext();
  const amount = watch(earnInputConfig.name);

  const { isApproved, isApproving, approveAsync } = useERC20Approve(
    strategy.underlyingAsset.address,
    strategy.address,
    parseUnits(amount || "0", etherUnits.wei)
  );

  const { depositAsync, isDepositPending } = useMutateDepositStrategy(strategy.id);

  const { data: assetPrice } = useReadAaveOracleGetAssetPrice({
    args: [strategy?.underlyingAsset.address || ""],
  });
  const { debouncedAmount } = useWrappedDebounce(amount, assetPrice, 500);
  const { data: previewDepositData } = useFetchViewPreviewDeposit(strategy.id, debouncedAmount);

  const onSubmitAsync = async (data: DepositModalFormData) => {
    if (previewDepositData) {
      await depositAsync(
        {
          amount: data.amount,
          sharesToReceive: previewDepositData.sharesToReceive.tokenAmount.bigIntValue || 0n,
        },
        {
          onSuccess: (txHash) => {
            showNotification({
              txHash,
              content: (
                <FlexCol className="w-full items-center text-center justify-center">
                  <Typography>
                    You Supplied {data.amount} {strategy?.underlyingAsset.symbol}
                  </Typography>
                  {strategy && <WatchAssetComponentv2 {...strategy} symbol={strategySymbol} />}
                </FlexCol>
              ),
            });
          },
          onSettled: () => {
            modalRef.current?.close();
          },
        }
      );
    }
  };

  return (
    <Modal
      ref={modalRef}
      size="normal"
      buttonProps={{
        children: "Add to strategy",
        className: "text-bold3 bg-metalic text-neutral-0 rounded-[100px] py-4 px-32 items-center text-center",
      }}
      headerComponent={
        <FlexCol className="gap-1">
          <Typography type="bold4">Add to strategy</Typography>
          <Typography type="regular3">Multiply wstETH staking rewards</Typography>
        </FlexCol>
      }
    >
      <FlexCol className="gap-8">
        <FlexCol className="rounded-card bg-neutral-100 p-6 gap-4">
          <Typography type="bold3">Overview</Typography>

          <LocalRow label="Action">Deposit</LocalRow>
          <LocalRow label="Strategy">Multiply wstETH staking rewards</LocalRow>
          <LocalRow label="Multiplier">5x</LocalRow>
          <LocalRow label="Starting Asset">wstETH</LocalRow>
          <LocalRow label="Deposit Size">
            <FlexRow className="gap-2 items-center">
              0.1 wstETH <Icon src={tokenData?.logo} alt={tokenData?.shortName || ""} width={16} />
            </FlexRow>
          </LocalRow>
          <LocalRow label="Ending Asset">wstETH</LocalRow>
          <LocalRow label="Network Fee">0.0054 ETH</LocalRow>
          <LocalRow label="Est. time to break even">3 days</LocalRow>
        </FlexCol>

        <FlexCol className="gap-2">
          <Buttonv2 className="text-bold3" disabled={isApproved} loading={isApproving} onClick={approveAsync}>
            Approve
          </Buttonv2>
          <Buttonv2
            className="text-bold3"
            type="submit"
            disabled={!isApproved}
            loading={isDepositPending}
            onClick={() =>
              onSubmitAsync({
                amount,
              })
            }
          >
            Submit
          </Buttonv2>
        </FlexCol>
      </FlexCol>
    </Modal>
  );
};

const LocalRow: React.FC<{
  label: string;
  children?: React.ReactNode;
}> = ({ label, children }) => {
  return (
    <FlexRow className="text-navy-600 justify-between">
      <Typography type="bold2">{label}</Typography>
      <Typography type="medium2" className="text-navy-1000">
        {children}
      </Typography>
    </FlexRow>
  );
};
