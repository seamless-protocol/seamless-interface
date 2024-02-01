import { Button, Modal } from "@mui/material";
import { useState } from "react";
import DepositModal from "../../../../components/modal/deposit-modal/DepositModal";

export const DepositButton = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
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
    </div>
  );
};
