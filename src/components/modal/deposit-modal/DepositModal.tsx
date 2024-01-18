import { IconButton, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";

import { useEffect, useState } from "react";
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

interface DepositModalProps {
  setShowModal: (value: boolean) => void;
}

function DepositModal({ setShowModal }: DepositModalProps) {
  const account = useAccount();
  const [amount, setAmount] = useState(0);

  const {
    writeContract: deposit,
    isPending: isDepositPending,
    isSuccess: isDepositSuccessful,
  } = useWriteLoopStrategyDeposit();
  const {
    writeContract: approve,
    isPending: isApprovalPending,
    isSuccess: isAppovalSuccessful,
  } = useWriteCbEthApprove();

  const { shares } = useFetchPreviewDeposit(amount);
  const { allowance } = useFetchAssetAllowance(
    isAppovalSuccessful,
    isDepositSuccessful
  );
  const { balance: cbEthBalance } =
    useFetchAccountAssetBalance(isDepositSuccessful);

  const handleDeposit = () => {
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

  useEffect(() => {
    if (isDepositSuccessful) {
      setAmount(0);
    }
  }, [isDepositSuccessful]);

  return (
    <Stack
      spacing={"1rem"}
      maxWidth={"80rem"}
      sx={{
        padding: "1rem",
        background: "white",
        borderRadius: "0.4rem",
        width: "30%",
      }}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography variant="h6">Deposit cbETH</Typography>
        <IconButton
          onClick={() => {
            setShowModal(false);
          }}
        >
          <CloseIcon sx={{ fontSize: "2rem" }} />
        </IconButton>
      </Stack>

      <AmountInputBox
        walletBalance={formatToNumber(cbEthBalance, 18)}
        amount={amount}
        setAmount={setAmount}
      />

      <TransactionDetailsBox shares={shares} />

      <LoadingButton
        variant="contained"
        loading={isApprovalPending}
        sx={{ backgroundColor: "grey", textTransform: "none" }}
        disabled={formatToNumber(allowance, 18) >= amount}
        onClick={() =>
          approve({
            args: [loopStrategyAddress, parseEther(amount.toString())],
          })
        }
      >
        Approve cbETH to continue
      </LoadingButton>

      <LoadingButton
        variant="contained"
        loading={isDepositPending}
        sx={{ backgroundColor: "grey", textTransform: "none" }}
        disabled={formatToNumber(allowance, 18) < amount}
        onClick={handleDeposit}
      >
        Deposit cbETH
      </LoadingButton>
    </Stack>
  );
}

export default DepositModal;
