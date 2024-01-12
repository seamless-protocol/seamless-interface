import { Button, TableCell } from "@mui/material";
import { Link } from "react-router-dom";

interface ButtonLinkCellProps {
  label: string;
  route: string;
}

function ButtonLinkCell({ label, route }: ButtonLinkCellProps) {
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
