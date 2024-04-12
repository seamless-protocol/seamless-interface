import { useFormContext } from "react-hook-form";
import { Displayable, ViewBigInt } from "src/shared/types/Displayable";
import { Address, formatUnits, parseUnits } from "viem";

import { FlexCol } from "../../containers/FlexCol";
import { FlexRow } from "../../containers/FlexRow";
import { Icon } from "../../images/Icon";
import { RHFInputFieldProps, RHFInputField } from "./RHFInputField";
import { useFullTokenData } from "../../../state";
import { Typography } from "../../text/Typography/Typography";
import { DisplayMoney } from "../../display/DisplayMoney";
import { DisplayTokenAmount } from "../../display/DisplayTokenAmount";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { MAX_NUMBER } from "../../../../globals";



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
  const { setValue, getValues } = useFormContext();
  const { isConnected } = useAccount();
  const { setValue, getValues } = useFormContext();
  const { isConnected } = useAccount();
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

  useEffect(() => {
    const value = getValues(name as string);

    if (!tokenData?.decimals) {
      setValue(name as string, "");
    } else if (
      (isConnected && (walletBalance?.data?.bigIntValue || 0n) < parseUnits(value, tokenData.decimals)) ||
      0n
    ) {
      setValue(name as string, "");
    }
  }, [isConnected]);

  useEffect(() => {
    const value = getValues(name as string);

    if (!tokenData?.decimals) {
      setValue(name as string, "");
    } else if (
      (isConnected && (walletBalance?.data?.bigIntValue || 0n) < parseUnits(value, tokenData.decimals)) ||
      0n
    ) {
      setValue(name as string, "");
    }
  }, [isConnected]);

  return (
    <div className="border bg-neutral-0 rounded-2xl p-4">
      <FlexRow className="items-center w-full">
        <FlexCol className="flex-grow gap-2 text-medium4">
          <RHFInputField<T>
            name={name}
            min={0}
            max={isConnected ? walletBalance?.data?.value || "0" : String(MAX_NUMBER)}
            placeholder="0.00"
            {...other}
          />
          {assetAddress ? (
            <DisplayMoney {...dollarValue} {...dollarValue?.data} typography="medium2" />
          ) : (
            <span className="min-h-[18px]" />
          )}
          <RHFInputField<T>
            name={name}
            min={0}
            max={isConnected ? walletBalance?.data?.value || "0" : String(MAX_NUMBER)}
            placeholder="0.00"
            {...other}
          />
          {assetAddress ? (
            <DisplayMoney {...dollarValue} {...dollarValue?.data} typography="medium2" />
          ) : (
            <span className="min-h-[18px]" />
          )}
        </FlexCol>
        <div className="flex flex-col items-end gap-2">
          {assetButton || (
            <div className="inline-flex items-center space-x-2">
              <Icon width={24} src={tokenData?.logo} alt="input-field-asset" />
              <Typography type="medium4">{tokenData?.symbol}</Typography>
            </div>
          )}
          {(isConnected && assetAddress) && (
            <div className="inline-flex gap-2 items-center">
              <DisplayTokenAmount {...walletBalance} {...walletBalance?.data} typography="medium2" />
              <button type="button" onClick={handleMaxClick}>
                <Typography type="bold2">MAX</Typography>
              </button>
            </div>
          )}
          {(!isConnected || !assetAddress) && <span className="min-h-[18px]" />}
        </div>
      </FlexRow>
    </div>
  );
}
