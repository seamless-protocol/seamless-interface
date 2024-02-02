import { Button } from "@mui/material";

// todo: remove and implement modal, like deposit
export const WithdrawButton = () => {
  return (
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
    >
      Withdraw
    </Button>
  );
};
