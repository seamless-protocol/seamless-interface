import { Button } from "@mui/material";

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
