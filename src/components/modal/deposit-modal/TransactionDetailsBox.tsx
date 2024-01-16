import { Stack, Typography } from "@mui/material";
import { formatBigIntOnTwoDecimals } from "../../../utils/helpers";

interface TransactionDetailsBoxProps {
  shares: bigint | undefined;
}

function TransactionDetailsBox({ shares }: TransactionDetailsBoxProps) {
  return (
    <Stack
      direction="row"
      justifyContent={"space-between"}
      sx={{
        border: 1,
        borderColor: "#F2EEEE",
        borderRadius: 1,
        paddingLeft: "2%",
        paddingRight: "2%",
        paddingTop: "2%",
        paddingBottom: "1%",
      }}
    >
      <Typography fontSize={"90%"}>Shares to receive</Typography>
      <Typography fontSize={"90%"}>
        {formatBigIntOnTwoDecimals(shares, 18)}
      </Typography>
    </Stack>
  );
}

export default TransactionDetailsBox;
