import { IconButton, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import {
  formatBigIntOnTwoDecimals,
  formatUnitsToNumber,
  stringToNumber,
} from "../../../utils/helpers";
import {
  cbEthAddress,
  loopStrategyAddress,
  useWriteCbEthApprove,
  useWriteLoopStrategyDeposit,
} from "../../../generated/generated";
import { parseUnits } from "viem";
import { useAccount } from "wagmi";
import AmountInputBox from "./AmountInputBox";
import TransactionDetailsBox from "./TransactionDetailsBox";
import { useFetchAccountAssetBalance } from "../../../hooks/useFetchAccountAssetBalance";
import { useFetchAssetAllowance } from "../../../hooks/useFetchAssetAllowance";
import { useFetchPreviewDeposit } from "../../../hooks/useFetchPreviewDeposit";
import { useDebounce } from "@uidotdev/usehooks";

interface DepositModalProps {
  setShowModal: (value: boolean) => void;
}

function DepositModal({ setShowModal }: DepositModalProps) {
  const account = useAccount();
  const [amount, setAmount] = useState("0.0");
  const debouncedAmount = useDebounce(amount, 500);

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

  const { shares } = useFetchPreviewDeposit(debouncedAmount);
  const { allowance } = useFetchAssetAllowance(
    cbEthAddress,
    isAppovalSuccessful,
    isDepositSuccessful
  );
  const { balance: cbEthBalance } = useFetchAccountAssetBalance(
    cbEthAddress,
    isDepositSuccessful
  );

  const handleDeposit = () => {
    if (shares) {
      deposit({
        args: [
          parseUnits(amount, 18),
          account.address as `0x${string}`,
          shares,
        ],
      });
    }
  };

  useEffect(() => {
    if (isDepositSuccessful) {
      setAmount("0.0");
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
        walletBalance={cbEthBalance || 0n}
        amount={amount}
        setAmount={setAmount}
      />

      <TransactionDetailsBox shares={formatBigIntOnTwoDecimals(shares, 18)} />

      <LoadingButton
        variant="contained"
        loading={isApprovalPending}
        sx={{ backgroundColor: "grey", textTransform: "none" }}
        disabled={formatUnitsToNumber(allowance, 18) >= stringToNumber(amount)}
        onClick={() =>
          approve({
            args: [loopStrategyAddress, parseUnits(amount || "0", 18)],
          })
        }
      >
        Approve cbETH to continue
      </LoadingButton>

      <LoadingButton
        variant="contained"
        loading={isDepositPending}
        sx={{ backgroundColor: "grey", textTransform: "none" }}
        disabled={formatUnitsToNumber(allowance, 18) < stringToNumber(amount)}
        onClick={handleDeposit}
      >
        Deposit cbETH
      </LoadingButton>
    </Stack>
  );
}

export default DepositModal;
