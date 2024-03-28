import { useFormContext } from "react-hook-form";
import { ViewBigInt } from "src/shared/types/Displayable";
import { Address, formatUnits } from "viem";
import { FlexCol } from "../../containers/FlexCol";
import { FlexRow } from "../../containers/FlexRow";
import { Icon } from "../../images/Icon";
import { TypographyV2 } from "../../text/TypographyV2/TypographyV2";
import { RHFInputFieldProps, RHFInputField } from "./RHFInputField";
import { useToken } from "../../../state/meta-data-queries/useToken";

import randomAsset from "@assets/tokens/wsteth.svg"; //todo fetch from useFullTokenData

interface IProps<T> extends RHFInputFieldProps<T> {
  assetAddress: Address;
  walletBalance: ViewBigInt;
  usdValue: string;
}

export function RHFAmountInput<T>({
  name,
  assetAddress,
  walletBalance,
  usdValue,
  ...other
}: IProps<T>) {
  const { setValue } = useFormContext();
  const { data: tokenData } = useToken(assetAddress); //todo get asset as well

  const handleMaxClick = () => {
    setValue(
      name as string,
      formatUnits(walletBalance.bigIntValue || 0n, tokenData?.decimals || 18)
    );
  };

  return (
    <div className="border bg-neutral-0 rounded-2xl p-4">
      <FlexRow className="items-center w-full">
        <FlexCol className="flex-grow gap-2 text-medium4">
          <RHFInputField<T> name={name} placeholder="0.00" {...other} />
          <TypographyV2 type="medium2">~ {usdValue}</TypographyV2>
        </FlexCol>
        <FlexCol className="text-right gap-2">
          <div className="flex items-center space-x-2">
            <Icon width={24} src={randomAsset} alt="input-field-asset" />
            <TypographyV2 type="medium4">{tokenData?.symbol}</TypographyV2>
          </div>

          <FlexRow className="gap-2">
            <TypographyV2 type="medium2">
              Balance: {walletBalance.viewValue}
            </TypographyV2>

            <button type="button" onClick={handleMaxClick}>
              <TypographyV2 type="bold2">MAX</TypographyV2>
            </button>
          </FlexRow>
        </FlexCol>
      </FlexRow>
    </div>
  );
}
