import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { WETH_ADDRESS } from "@meta";
import { FormButtons } from "./FormButtons";
import { FlexCol, Typography, MyFormProvider, FlexRow } from "@shared";
import { RHFDepositAmountField } from "./RHFDepositAmountField";
import { RouterConfig } from "@router";
import { RHFReceiveAmountField } from "./RHFReceiveAmountField";
import { Summary } from "./Summary";
import { useLeverageTokenFormContext } from "../leverage-token-form-provider/LeverageTokenFormProvider";
import { EmptyFormGuard } from "../../../../pages/common/components/EmptyFormGuard";
import { LimitStatusComponent } from "../components/LimitStatus";
import { useFetchLeverageTokenAssets } from "../../../../../data/leverage-tokens/queries/leverage-token-assets/leverage-token-assets.hook";

export const DepositLeverageTokenForm = () => {
  const { formOnSubmitAsync, reactHookFormMethods, selectedLeverageToken } = useLeverageTokenFormContext();
  const { address: leverageTokenAddress } = selectedLeverageToken?.data || {};

  const { data: leverageTokenAssets } = useFetchLeverageTokenAssets(leverageTokenAddress);

  const onSubmitAsync = async () => {
    await formOnSubmitAsync({});
  };

  return (
    <EmptyFormGuard errorSource="DepositLeverageTokenForm" data={{ ...selectedLeverageToken }}>
      <MyFormProvider methods={reactHookFormMethods} onSubmit={reactHookFormMethods.handleSubmit(onSubmitAsync)}>
        <FlexCol className="gap-4">
          <FlexCol className="gap-4">
            <FlexCol className="gap-2">
              <Typography type="medium3">Mint</Typography>
              <RHFDepositAmountField name="depositAmount" />
            </FlexCol>

            {leverageTokenAssets?.collateralAsset === WETH_ADDRESS && (
              <FlexRow className="w-full">
                <Link
                  to={RouterConfig.Routes.wrapEth}
                  className="flex flex-row items-center justify-end gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Typography type="bold2" className="text-right">
                    To wrap ETH, click here
                  </Typography>
                  <ArrowTopRightOnSquareIcon width={12} />
                </Link>
              </FlexRow>
            )}

            <FlexCol className="gap-2">
              <Typography type="medium3">Receive</Typography>
              <RHFReceiveAmountField name="receiveAmount" />
            </FlexCol>

            <Summary />
            <LimitStatusComponent />
          </FlexCol>

          <FormButtons />
        </FlexCol>
      </MyFormProvider>
    </EmptyFormGuard>
  );
};
