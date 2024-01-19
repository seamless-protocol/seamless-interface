import { Stack, TextField, Typography } from "@mui/material";
import {
  cbEthAddress,
  useReadAaveOracleGetAssetPrice,
} from "../../../generated/generated";
import { formatBigIntOnTwoDecimals } from "../../../utils/helpers";
import { parseEther } from "viem";
import { ONE_ETHER } from "../../../utils/constants";

interface AmountInputBoxProps {
  walletBalance: number;
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
          type="text"
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
            const valueNum = parseFloat(e.target.value || "0");
            const value =
              valueNum > walletBalance
                ? walletBalance.toString()
                : e.target.value;

            setAmount(value);
          }}
        />

        <Stack direction={"row"} alignItems={"center"} spacing={"0.5rem"}>
          <img
            src="src/assets/cbeth.svg"
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
            (parseEther(amount.toString()) * (cbEthPrice || 0n)) / ONE_ETHER,
            8
          )}
        </Typography>
        <Typography fontSize={"0.8rem"}>
          Wallet balance{" "}
          {formatBigIntOnTwoDecimals(parseEther(walletBalance.toString()), 18)}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default AmountInputBox;
