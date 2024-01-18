import { Button, Modal, Stack } from "@mui/material";
import WalletDataBox from "./wallet-data-box/WalletDataBox";
import { useState } from "react";
import DepositModal from "../../../modal/deposit-modal/DepositModal";

interface DepositRowProps {
  isLoading?: boolean;
  walletBalance: string;
  walletBalanceUSD: string;
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
        walletBalance={walletBalance}
        walletBalanceUSD={walletBalanceUSD}
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

      <Modal
        open={showModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DepositModal setShowModal={setShowModal} />
      </Modal>
    </Stack>
  );
}

export default DepositRow;
