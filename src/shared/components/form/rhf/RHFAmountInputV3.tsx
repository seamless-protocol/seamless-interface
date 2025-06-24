import { useFormContext } from "react-hook-form";
import { Displayable, ViewBigInt } from "src/shared/types/Displayable";
import { Address, parseUnits } from "viem";

import { FlexCol } from "../../containers/FlexCol";
import { FlexRow } from "../../containers/FlexRow";
import { Icon } from "../../images/Icon";
import { RHFInputFieldProps, RHFInputField } from "./RHFInputField";
import { DisplayMoney } from "../../display/DisplayMoney";
import { DisplayTokenAmount } from "../../display/DisplayTokenAmount";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import { MAX_NUMBER } from "../../../../globals";
import { DisplayText } from "../../display/DisplayText";
import { Tooltip } from "../../tooltip/Tooltip";
import { useFocusOnAssetChange } from "../../../hooks/ui-hooks/useFocusOnAssetChange";

export interface IRHFAmountInputPropsV3 extends RHFInputFieldProps {
  assetAddress?: Address;
  walletBalance?: Displayable<ViewBigInt | undefined>;
  protocolMaxValue?: Displayable<ViewBigInt | undefined>;
  dollarValue?: Displayable<ViewBigInt | undefined>;
  assetButton?: React.ReactNode;
  focusOnAssetChange?: boolean;
  hideMaxButton?: boolean;
  tokenData?: Displayable<{
    symbol?: string;
    decimals?: number;
    logo?: string;
  }>;
  allowOverMax?: boolean;
}

export const RHFAmountInputV3 = React.forwardRef<HTMLInputElement, IRHFAmountInputPropsV3>(
  (
    {
      name,
      assetAddress,
      walletBalance,
      dollarValue,
      protocolMaxValue,
      assetButton,
      tokenData,
      focusOnAssetChange = false,
      allowOverMax = false,
      hideMaxButton,
      ...other
    },
    ref
  ) => {
    const { setValue, getValues } = useFormContext();
    const { isConnected } = useAccount();

    const max = protocolMaxValue?.data?.value;

    const handleMaxClick = () => {
      if (!tokenData?.data?.decimals) {
        // eslint-disable-next-line no-console
        console.warn("Token data coulnd't be loaded.");
        return;
      }
      const finalMax =
        (walletBalance?.data?.bigIntValue || 0n) > (protocolMaxValue?.data?.bigIntValue || 0n)
          ? protocolMaxValue?.data?.value
          : walletBalance?.data?.value;

      setValue(name as string, finalMax);
    };

    useEffect(() => {
      setValue(name as string, "");
    }, [assetAddress]);

    useEffect(() => {
      const value = getValues(name as string);

      if (!value || !tokenData?.data?.decimals) {
        setValue(name as string, "");
      } else if (
        (isConnected && (walletBalance?.data?.bigIntValue || 0n) < parseUnits(value, tokenData?.data.decimals)) ||
        0n
      ) {
        setValue(name as string, "");
      }
    }, [isConnected]);

    const inputRef = useFocusOnAssetChange(assetAddress, focusOnAssetChange);

    return (
      <div
        data-cy="amount-input-v3"
        className={`border ${other.disabled ? "bg-action-disabled text-primary-600" : "bg-neutral-0"} rounded-2xl p-4 cursor-default`}
      >
        <FlexCol className="items-center w-full gap-1">
          <FlexRow className="justify-between w-full gap-1 text-medium4">
            <RHFInputField
              className="w-[45%]"
              name={name}
              min={0}
              max={isConnected && !allowOverMax ? max || "0" : String(MAX_NUMBER)}
              placeholder="0.00"
              {...other}
              disabled={other.disabled || !assetAddress}
              ref={ref ?? inputRef}
            />
            {assetButton || (
              <div className="inline-flex items-center space-x-2 truncate">
                <Icon
                  width={24}
                  src={tokenData?.data?.logo}
                  isFetched={tokenData?.isFetched}
                  isLoading={tokenData?.isLoading}
                  alt="input-field-asset"
                />
                <Tooltip tooltip={tokenData?.data?.symbol} size="small">
                  <DisplayText
                    className="max-w-28 md:max-w-[240px] text-start"
                    typography="medium4"
                    truncate
                    text={tokenData?.data?.symbol}
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
                <Tooltip tooltip={walletBalance?.data?.symbol} size="small">
                  <DisplayTokenAmount
                    className="max-w-32 md:max-w-44"
                    truncate
                    {...walletBalance}
                    {...walletBalance?.data}
                    typography="medium2"
                  />
                </Tooltip>
                {!hideMaxButton && (
                  <button data-cy="max-button" type="button" className="text-bold2" onClick={handleMaxClick}>
                    MAX
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

RHFAmountInputV3.displayName = "RHFAmountInputV3";
