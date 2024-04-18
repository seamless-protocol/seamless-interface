import { useQueryClient } from '@tanstack/react-query';
import React, { useRef } from 'react'
import { useForm } from 'react-hook-form';
import { parseUnits, Address } from 'viem';
import { useAccount } from 'wagmi';
import { useNotificationContext, ModalHandles, useToken, FlexCol, FlexRow, MyFormProvider, Typography, useFullTokenData } from '../../../../../../shared';
import { useWrappedDebounce } from '../../../../../state/common/hooks/useWrappedDebounce';
import { useFetchAssetPrice } from '../../../../../state/common/queries/useFetchViewAssetPrice';
import { StrategyConfig, findILMStrategyByAddress } from '../../../../../state/loop-strategy/config/StrategyConfig';
import { useFetchViewPreviewWithdraw } from '../../../../../state/loop-strategy/hooks/useFetchViewPreviewWithdraw';
import { useWriteStrategyWithdraw } from '../../../../../state/loop-strategy/mutations/useWriteStrategyWithdraw';
import { WithdrawModalFormData } from '../../../../../v1/pages/ilm-details-page/components/your-info/withdraw/WithdrawModal';
import { FormButtons } from './FormButtons';
import { Tag } from '../../../../pages/test-page/tabs/earn-tab/Tag';
import { Summary } from './Summary';
import { RHFWithdrawStrategyAmountField } from './RHFWithdrawStrategyAmountField';
import { useFormSettingsContext } from '../../contexts/useFormSettingsContext';


export const WithdrawStrategyForm = () => {
  const { asset } = useFormSettingsContext();

  const strategy = findILMStrategyByAddress(asset);

  if (!strategy) {
    // eslint-disable-next-line no-console
    console.warn("Strategy not found!!!");
    return <>Strategy not found!</>;
  }

  return <WithdrawStrategyLocal strategy={strategy} />;
};


const WithdrawStrategyLocal: React.FC<{
  strategy: StrategyConfig
}> = ({ strategy }) => {
  const { asset, onTransaction, hideTag, disableAssetPicker, overrideUrlSlug } = useFormSettingsContext();
  const { data: tokenData } = useFullTokenData(asset);

  const {
    data: { symbol: strategySymbol },
  } = useToken(strategy.address);

  const account = useAccount();
  const { showNotification } = useNotificationContext();
  const modalRef = useRef<ModalHandles | null>(null);
  const queryClient = useQueryClient();

  const { data: price } = useFetchAssetPrice({ asset: strategy.address });

  const { withdrawAsync } = useWriteStrategyWithdraw(strategy.id);

  // FORM //
  const methods = useForm<WithdrawModalFormData>({
    defaultValues: {
      amount: "",
    },
  });
  const { handleSubmit, watch, reset } = methods;
  const amount = watch("amount");
  const { debouncedAmount } = useWrappedDebounce(amount, price.bigIntValue, 500);

  const { data: previewWithdrawData, isLoading, isFetched } = useFetchViewPreviewWithdraw(strategy.id, debouncedAmount);

  const onSubmitAsync = async (data: WithdrawModalFormData) => {
    if (previewWithdrawData) {
      // todo refactor in separate pr, create mutation
      try {
        const { txHash } = await withdrawAsync(
          parseUnits(data.amount, 18),
          account.address as Address,
          account.address as Address,
          previewWithdrawData?.assetsToReceive.tokenAmount.bigIntValue || 0n
        );
        modalRef.current?.close();
        showNotification({
          txHash,
          content: `You Withdrew ${data.amount} ${strategySymbol}`,
        });
        queryClient.invalidateQueries();
      } catch (e) {
        modalRef.current?.close();
        showNotification({
          status: "error",

          content: (e as any)?.shortMessage,
        });
      } finally {
        reset();
        onTransaction?.();
      }
    }
  };

  return (
    <MyFormProvider methods={methods} onSubmit={handleSubmit(onSubmitAsync)}>
      <FlexCol className="gap-8">
        <FlexCol className="gap-6">
          <FlexRow className="justify-between items-start">
            <FlexCol className="gap-1 min-h-14">
              <Typography type="bold4">{asset ? "Withdraw" : "Select Asset"}</Typography>
              <Typography type="regular3">{tokenData.name}</Typography>
            </FlexCol>

            {(asset != null && !hideTag) && <Tag tag="ILM" />}
          </FlexRow>
          <RHFWithdrawStrategyAmountField
            overrideUrlSlug={disableAssetPicker ? undefined : overrideUrlSlug}
            assetAddress={disableAssetPicker ? strategy.address : undefined}
            name="amount" />
        </FlexCol>

        <Summary displayablePreviewData={{
          data: previewWithdrawData,
          isFetched,
          isLoading
        }} />

        <FormButtons />
      </FlexCol>
    </MyFormProvider>
  )
}
