import { Stack, Typography } from "@mui/material";
import {
  cbEthAddress,
  useReadAaveOracleGetAssetPrice,
} from "../../../generated/generated";
import { formatBigIntOnTwoDecimals } from "../../../../shared/utils/helpers";
import { etherUnits, formatUnits, parseUnits } from "viem";
import { ONE_ETHER } from "../../../meta/constants";
import cbethImg from "../../../../assets/cbeth.svg";
import { RHFInputField } from "../../../../shared/components/form/rhf/RHFInputField";
import { DepositModalFormData } from "../../../pages/ilm-details-page/components/your-info/DepositModal";

interface AmountInputBoxProps {
  walletBalance: bigint;
  amount: string;
}

function AmountInputBox({ walletBalance, amount }: AmountInputBoxProps) {
  const { data: cbEthPrice } = useReadAaveOracleGetAssetPrice({
    args: [cbEthAddress],
  });

  return (
    <Stack
      sx={{
        border: 1,
        borderColor: "#F2EEEE",
        borderRadius: 1,
        paddingLeft: "0.6rem",
        paddingRight: "0.6rem",
        paddingBottom: "0.3rem",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <RHFInputField<DepositModalFormData>
          name="amount"
          type="number"
          placeholder="0.00"
          className="pt-1 no-underline"
          max={formatUnits(walletBalance || 0n, etherUnits.wei)}
        />

        <Stack direction={"row"} alignItems={"center"} spacing={"0.5rem"}>
          <img
            src={cbethImg}
            alt="Logo"
            style={{
              height: "2rem",
            }}
          ></img>
          <Typography align="right" fontSize={"1.1rem"}>
            cbETH
          </Typography>
        </Stack>
      </Stack>

      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography fontSize={"0.9rem"}>
          $
          {formatBigIntOnTwoDecimals(
            (parseUnits(amount, 18) * (cbEthPrice || 0n)) / ONE_ETHER,
            8
          )}
        </Typography>
        <Typography fontSize={"0.8rem"}>
          Wallet balance {formatBigIntOnTwoDecimals(walletBalance, 18)}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default AmountInputBox;
