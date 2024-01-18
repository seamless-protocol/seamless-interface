import { InputBase, Stack, Typography } from "@mui/material";
import {
  cbEthAddress,
  useReadAaveOracleGetAssetPrice,
} from "../../../generated/generated";
import { formatBigIntOnTwoDecimals } from "../../../utils/helpers";
import { parseEther } from "viem";
import { ONE_ETHER } from "../../../utils/constants";

interface AmountInputBoxProps {
  walletBalance: number;
  amount: number;
  setAmount: (amount: number) => void;
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
        <InputBase
          placeholder="0.00"
          type="number"
          value={amount || ""}
          sx={{
            marginTop: "0.1rem",
            fontSize: "1.3rem",
          }}
          onChange={(e) => {
            let value = parseFloat(e.target.value || "0");
            value = value > walletBalance ? walletBalance : value;
            setAmount(value);
          }}
        ></InputBase>

        <Stack direction={"row"} alignItems={"center"} spacing={"0.5rem"}>
          <img
            src="cbeth.svg"
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
