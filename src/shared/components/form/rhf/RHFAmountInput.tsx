import { useFormContext } from "react-hook-form";
import { Displayable, ViewBigInt } from "src/shared/types/Displayable";
import { Address, parseUnits } from "viem";

import { FlexCol } from "../../containers/FlexCol";
import { FlexRow } from "../../containers/FlexRow";
import { Icon } from "../../images/Icon";
import { RHFInputFieldProps, RHFInputField } from "./RHFInputField";
import { Typography } from "../../text/Typography/Typography";
import { DisplayMoney } from "../../display/DisplayMoney";
import { DisplayTokenAmount } from "../../display/DisplayTokenAmount";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import { MAX_NUMBER } from "../../../../globals";
import { DisplayText } from "../../display/DisplayText";
import { Tooltip } from "../../tooltip/Tooltip";
import { useFullTokenData } from "../../../../app/state/common/meta-data-queries/useFullTokenData";
import { useFocusOnAssetChange } from "../../../hooks/ui-hooks/useFocusOnAssetChange";

export interface IRHFAmountInputProps extends RHFInputFieldProps {
  assetAddress?: Address;
  walletBalance?: Displayable<ViewBigInt | undefined>;
  protocolMaxValue?: Displayable<ViewBigInt | undefined>;
  dollarValue?: Displayable<ViewBigInt | undefined>;
  assetButton?: React.ReactNode;
  focusOnAssetChange?: boolean;
  hideMaxButton?: boolean;
}

export const RHFAmountInput = React.forwardRef<HTMLInputElement, IRHFAmountInputProps>(
  (
    {
      name,
      assetAddress,
      walletBalance,
      dollarValue,
      protocolMaxValue,
      assetButton,
      focusOnAssetChange = true,
      hideMaxButton,
      ...other
    },
    ref
  ) => {
    const { setValue, getValues } = useFormContext();
    const { isConnected } = useAccount();
    const tokenDataResult = useFullTokenData(assetAddress);
    const { data: tokenData } = tokenDataResult;

    const max = protocolMaxValue?.data?.value;
    const hideTooltip = tokenData?.symbol?.length ? tokenData.symbol.length < 10 : false;

    const handleMaxClick = () => {
      if (!tokenData?.decimals) {
        // eslint-disable-next-line no-console
        console.warn("Token data coulnd't be loaded.");
        return;
      }

      setValue(name as string, max);
    };

    useEffect(() => {
      setValue(name as string, "");
    }, [assetAddress]);

    useEffect(() => {
      const value = getValues(name as string);

      if (!value || !tokenData?.decimals) {
        setValue(name as string, "");
      } else if (
        (isConnected && (walletBalance?.data?.bigIntValue || 0n) < parseUnits(value, tokenData.decimals)) ||
        0n
      ) {
        setValue(name as string, "");
      }
    }, [isConnected]);

    const inputRef = useFocusOnAssetChange(assetAddress, focusOnAssetChange);

    return (
      <div
        className={`border ${other.disabled ? "bg-action-disabled text-primary-600" : "bg-neutral-0"} rounded-2xl p-4 cursor-default`}
      >
        <FlexCol className="items-center w-full gap-1">
          <FlexRow className="justify-between w-full gap-1 text-medium4">
            <RHFInputField
              name={name}
              min={0}
              max={isConnected ? max || "0" : String(MAX_NUMBER)}
              placeholder="0.00"
              {...other}
              disabled={other.disabled || !assetAddress}
              ref={ref ?? inputRef}
            />
            {assetButton || (
              <div className="inline-flex items-center space-x-2">
                <Icon width={24} src={tokenData?.logo} alt="input-field-asset" />
                <Tooltip tooltip={tokenData?.symbol} hidden={hideTooltip} size="small">
                  <DisplayText
                    className="max-w-40 text-start"
                    typography="medium4"
                    truncate
                    text={tokenData?.symbol}
                    {...tokenDataResult}
                  />
                </Tooltip>
              </div>
            )}
          </FlexRow>
          <FlexRow className="items-center justify-between w-full gap-1">
            {assetAddress ? (
              <DisplayMoney {...dollarValue} {...dollarValue?.data} typography="medium2" />
            ) : (
              <span className="min-h-[18px]" />
            )}
            {isConnected && assetAddress && (
              <div className="inline-flex gap-2 items-end text-end">
                <Tooltip tooltip={walletBalance?.data?.symbol} hidden={hideTooltip} size="small">
                  <DisplayTokenAmount
                    className="max-w-44"
                    {...walletBalance}
                    {...walletBalance?.data}
                    typography="medium2"
                  />
                </Tooltip>
                {!hideMaxButton && (
                  <button type="button" onClick={handleMaxClick}>
                    <Typography type="bold2">MAX</Typography>
                  </button>
                )}
              </div>
            )}
            {(!isConnected || !assetAddress) && <span className="min-h-[18px]" />}
          </FlexRow>
        </FlexCol>
      </div>
    );
  }
);

RHFAmountInput.displayName = "RHFAmountInput";
