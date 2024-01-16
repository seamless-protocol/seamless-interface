import { InputBase, Stack, Typography } from "@mui/material";
import {
  cbEthAddress,
  useReadAaveOracleGetAssetPrice,
} from "../../../generated/generated";
import { formatBigIntOnTwoDecimals } from "../../../utils/helpers";
import { parseEther } from "viem";
import { ONE_ETHER } from "../../../utils/constants";

interface AmountInputBoxProps {
  walletBalance: bigint | undefined;
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
          sx={{
            marginTop: "0.1rem",
            fontSize: "130%",
          }}
          onChange={(e) => {
            setAmount(parseFloat(e.target.value || "0"));
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

          <Typography align="right" fontSize={"110%"}>
            cbETH
          </Typography>
        </Stack>
      </Stack>

      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography fontSize={"90%"}>
          $
          {formatBigIntOnTwoDecimals(
            (parseEther(amount.toString()) * (cbEthPrice || 0n)) / ONE_ETHER,
            8
          )}
        </Typography>
        <Typography fontSize={"80%"}>
          Wallet balance {formatBigIntOnTwoDecimals(walletBalance, 18)}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default AmountInputBox;
