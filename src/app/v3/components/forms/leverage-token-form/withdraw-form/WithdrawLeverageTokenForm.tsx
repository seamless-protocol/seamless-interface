import React from "react";
import { MyFormProvider, FlexCol, Typography } from "@shared";
import { RHFWithdrawStrategyAmountField } from "./RHFWithdrawLeverageTokenAmountField";
import { RHFReceiveAmountField } from "./RHFReceiveAmountField";
import { Summary } from "./Summary";
import { FormButtons } from "./FormButtons";
import { useLeverageTokenFormContext } from "../leverage-token-form-provider/LeverageTokenFormProvider";

export const WithdrawLeverageTokenForm: React.FC = () => {
  const {
    selectedLeverageToken: { data: leverageToken, isLoading, error },
  } = useLeverageTokenFormContext();

  if (isLoading) {
    return <div className="min-h-[300px]" />;
  }

  if (!leverageToken || error) {
    // eslint-disable-next-line no-console
    console.warn("Vault not found!!!");
    if (error) console.error("LeverageTokenForm error while fetching info", error);

    return (
      <div className="min-h-[300px]">
        <Typography type="medium3" className="text-red-600">
          Error while fetching full vault info: {error?.message}
        </Typography>
      </div>
    );
  }

  return <WithdrawLeverageTokenLocal />;
};

export const WithdrawLeverageTokenLocal: React.FC = () => {
  const { methods, formOnSubmitAsync } = useLeverageTokenFormContext();

  const onSubmit = async () => {
    await formOnSubmitAsync({});
  };

  return (
    <MyFormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <FlexCol className="gap-8">
        <FlexCol className="gap-3">
          <Typography type="medium3">Withdraw</Typography>
          <RHFWithdrawStrategyAmountField name="withdrawAmount" />
        </FlexCol>

        <FlexCol className="gap-3">
          <Typography type="medium3">Receive</Typography>
          <RHFReceiveAmountField name="receiveAmount" />
        </FlexCol>

        <Summary />

        <FormButtons />
      </FlexCol>
    </MyFormProvider>
  );
};
