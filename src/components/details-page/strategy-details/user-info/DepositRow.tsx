import { Button, Stack } from "@mui/material";
import WalletDataBox from "./wallet-data-box/WalletDataBox";
import { useState } from "react";
import { Modal } from "../../../modal/Modal";
import DepositModal from "../../../modal/deposit-modal/DepositModal";
import { formatOnTwoDecimals } from "../../../../utils/helpers";

interface DepositRowProps {
  isLoading?: boolean;
  walletBalance: number;
  walletBalanceUSD: number;
}

function DepositRow({
  isLoading,
  walletBalance,
  walletBalanceUSD,
}: DepositRowProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <Stack
      direction="row"
      sx={{
        marginTop: "20px",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <WalletDataBox
        isLoading={isLoading}
        label="Available to deposit"
        walletBalance={formatOnTwoDecimals(walletBalance)}
        walletBalanceUSD={formatOnTwoDecimals(walletBalanceUSD)}
      />

      <Button
        variant="contained"
        disableRipple
        size="small"
        sx={{
          backgroundColor: "#0DA8EB",
          borderRadius: "3px",
          "&:hover": {
            backgroundColor: "#0DA8EB",
          },
        }}
        onClick={() => setShowModal(true)}
      >
        Deposit
      </Button>

      {showModal ? (
        <Modal>
          <DepositModal
            walletBalance={walletBalance}
            walletBalanceUSD={walletBalanceUSD}
          />
        </Modal>
      ) : null}
    </Stack>
  );
}

export default DepositRow;
