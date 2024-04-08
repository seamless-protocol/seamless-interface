import { useFormContext } from "react-hook-form";
import { ViewBigInt } from "src/shared/types/Displayable";
import { Address, formatUnits } from "viem";
import { FlexCol } from "../../containers/FlexCol";
import { FlexRow } from "../../containers/FlexRow";
import { Icon } from "../../images/Icon";
import { TypographyV2 } from "../../text/TypographyV2/TypographyV2";
import { RHFInputFieldProps, RHFInputField } from "./RHFInputField";

import { useFullTokenData } from "../../../state";

interface IProps<T> extends RHFInputFieldProps<T> {
  assetAddress: Address;
  walletBalance: ViewBigInt;
  usdValue: string;
  assetButton?: React.ReactNode;
}

export function RHFAmountInput<T>({ name, assetAddress, walletBalance, usdValue, assetButton, ...other }: IProps<T>) {
  const { setValue } = useFormContext();
  const { data: tokenData } = useFullTokenData(assetAddress);

  const handleMaxClick = () => {
    if (!tokenData?.decimals) {
      // eslint-disable-next-line no-console
      console.warn("Token data coulnd't be loaded.");
      return;
    }
    setValue(name as string, formatUnits(walletBalance.bigIntValue || 0n, tokenData?.decimals));
  };

  return (
    <div className="border bg-neutral-0 rounded-2xl p-4">
      <FlexRow className="items-center w-full">
        <FlexCol className="flex-grow gap-2 text-medium4">
          <RHFInputField<T> name={name} placeholder="0.00" {...other} />
          <TypographyV2 type="medium2">~ {usdValue}</TypographyV2>
        </FlexCol>
        <div className="flex flex-col items-end gap-2">
          {assetButton || (
            <div className="inline-flex items-center space-x-2">
              <Icon width={24} src={tokenData?.logo} alt="input-field-asset" />
              <TypographyV2 type="medium4">{tokenData?.symbol}</TypographyV2>
            </div>
          )}
          <div className="inline-flex gap-2 items-center">
            <TypographyV2 type="medium2">Balance: {walletBalance.viewValue}</TypographyV2>
            <button type="button" onClick={handleMaxClick}>
              <TypographyV2 type="bold2">MAX</TypographyV2>
            </button>
          </div>
        </div>
      </FlexRow>
    </div>
  );
}
