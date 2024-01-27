import { Stack, TextField, Typography } from "@mui/material";
import {
  cbEthAddress,
  useReadAaveOracleGetAssetPrice,
} from "../../../generated/generated";
import { formatBigIntOnTwoDecimals } from "../../../../shared/utils/helpers";
import { formatUnits, parseUnits } from "viem";
import { ONE_ETHER } from "../../../meta/constants";
import cbethImg from "../../../../assets/cbeth.svg";

interface AmountInputBoxProps {
  walletBalance: bigint;
  amount: string;
  setAmount: (amount: string) => void;
}

function AmountInputBox({
  walletBalance,
  amount,
  setAmount,
}: AmountInputBoxProps) {
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
        <TextField
          type="number"
          variant="standard"
          placeholder="0.0"
          value={amount || ""}
          sx={{
            paddingTop: "0.3rem",
          }}
          InputProps={{
            disableUnderline: true,
          }}
          onChange={(e) => {
            const valueBigInt = parseUnits(e.target.value || "0", 18);
            const value =
              valueBigInt > walletBalance ? walletBalance : valueBigInt;

            setAmount(formatUnits(value, 18));
          }}
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
