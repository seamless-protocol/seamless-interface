import { Button, TableCell } from "@mui/material";
import { Link } from "react-router-dom";

function ButtonLinkCell({ label, route }: { label: string; route: string }) {
  return (
    <TableCell align="center">
      <Link to={route}>
        <Button
          variant="contained"
          disableRipple
          sx={{
            backgroundColor: "#0DA8EB",
            borderRadius: "3px",
            "&:hover": {
              backgroundColor: "#0DA8EB",
            },
          }}
        >
          {label}
        </Button>
      </Link>
    </TableCell>
  );
}

export default ButtonLinkCell;
