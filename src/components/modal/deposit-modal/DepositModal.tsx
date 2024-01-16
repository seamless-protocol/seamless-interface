import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { formatToNumber } from "../../../utils/helpers";
import {
  loopStrategyAddress,
  useWriteCbEthApprove,
  useWriteLoopStrategyDeposit,
} from "../../../generated/generated";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import AmountInputBox from "./AmountInputBox";
import TransactionDetailsBox from "./TransactionDetailsBox";
import { useFetchAccountAssetBalance } from "../../../hooks/useFetchAccountAssetBalance";
import { useFetchAssetAllowance } from "../../../hooks/useFetchAssetAllowance";
import { useFetchPreviewDeposit } from "../../../hooks/useFetchPreviewDeposit";

function DepositModal() {
  const account = useAccount();
  const [amount, setAmount] = useState(0);

  const { writeContract: deposit, isSuccess: isDepositSuccessful } =
    useWriteLoopStrategyDeposit();
  const { writeContract: approve, isSuccess: isAppovalSuccessful } =
    useWriteCbEthApprove();

  const { shares } = useFetchPreviewDeposit(amount);
  const { allowance } = useFetchAssetAllowance(isAppovalSuccessful);
  const { balance: cbEthBalance } =
    useFetchAccountAssetBalance(isDepositSuccessful);

  const handleDeposit = async () => {
    if (shares) {
      deposit({
        args: [
          parseEther(amount.toString()),
          account.address as `0x${string}`,
          shares,
        ],
      });
    }
  };

  return (
    <Stack spacing={"5%"} sx={{ padding: "2%" }}>
      <Typography variant="h6" align="left">
        Deposit cbETH
      </Typography>

      <AmountInputBox
        walletBalance={cbEthBalance}
        amount={amount}
        setAmount={setAmount}
      />

      <TransactionDetailsBox shares={shares} />

      <Button
        variant="contained"
        sx={{ backgroundColor: "grey", textTransform: "none" }}
        disabled={formatToNumber(allowance, 18) >= amount}
        onClick={() =>
          approve({
            args: [loopStrategyAddress, parseEther(amount.toString())],
          })
        }
      >
        Approve cbETH to continue
      </Button>

      <Button
        variant="contained"
        sx={{ backgroundColor: "grey", textTransform: "none" }}
        disabled={formatToNumber(allowance, 18) < amount}
        onClick={handleDeposit}
      >
        Deposit cbETH
      </Button>
    </Stack>
  );
}

export default DepositModal;
