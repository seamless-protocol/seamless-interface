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
        paddingLeft: "0.6rem",
        paddingRight: "0.6rem",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
      }}
    >
      <Typography fontSize={"0.9rem"}>Shares to receive</Typography>
      <Typography fontSize={"0.9rem"}>
        {formatBigIntOnTwoDecimals(shares, 18)}
      </Typography>
    </Stack>
  );
}

export default TransactionDetailsBox;
