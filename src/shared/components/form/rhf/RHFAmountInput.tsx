import { useFormContext } from "react-hook-form";
import { Displayable, ViewBigInt } from "src/shared/types/Displayable";
import { Address, formatUnits } from "viem";
import { FlexCol } from "../../containers/FlexCol";
import { FlexRow } from "../../containers/FlexRow";
import { Icon } from "../../images/Icon";
import { RHFInputFieldProps, RHFInputField } from "./RHFInputField";
import { useFullTokenData } from "../../../state";
import { Typography } from "../../text/Typography/Typography";
import { DisplayMoney } from "../../display/DisplayMoney";
import { DisplayTokenAmount } from "../../display/DisplayTokenAmount";
import { useEffect } from "react";

export interface IRHFAmountInputProps<T> extends RHFInputFieldProps<T> {
  assetAddress: Address;
  walletBalance?: Displayable<ViewBigInt>;
  dollarValue?: Displayable<ViewBigInt>;
  assetButton?: React.ReactNode;
}

export function RHFAmountInput<T>({
  name,
  assetAddress,
  walletBalance,
  dollarValue,
  assetButton,
  ...other
}: IRHFAmountInputProps<T>) {
  const { setValue } = useFormContext();
  const { data: tokenData } = useFullTokenData(assetAddress);

  const handleMaxClick = () => {
    if (!tokenData?.decimals) {
      // eslint-disable-next-line no-console
      console.warn("Token data coulnd't be loaded.");
      return;
    }

    setValue(name as string, formatUnits(walletBalance?.data?.bigIntValue || 0n, tokenData?.decimals));
  };

  useEffect(() => {
    setValue(name as string, "");
  }, [assetAddress]);

  return (
    <div className="border bg-neutral-0 rounded-2xl p-4">
      <FlexRow className="items-center w-full">
        <FlexCol className="flex-grow gap-2 text-medium4">
          <RHFInputField<T> name={name} min={0} max={walletBalance?.data?.value || "0"} placeholder="0.00" {...other} />
          <DisplayMoney {...dollarValue} {...dollarValue?.data} typography="medium2" />
        </FlexCol>
        <div className="flex flex-col items-end gap-2">
          {assetButton || (
            <div className="inline-flex items-center space-x-2">
              <Icon width={24} src={tokenData?.logo} alt="input-field-asset" />
              <Typography type="medium4">{tokenData?.symbol}</Typography>
            </div>
          )}
          <div className="inline-flex gap-2 items-center">
            <DisplayTokenAmount {...walletBalance} {...walletBalance?.data} typography="medium2" />
            <button type="button" onClick={handleMaxClick}>
              <Typography type="bold2">MAX</Typography>
            </button>
          </div>
        </div>
      </FlexRow>
    </div>
  );
}
