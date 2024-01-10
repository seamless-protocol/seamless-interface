import { TableCell, Typography } from "@mui/material";

function CommonColumnHeader({ label, sx }: { label: string; sx?: any }) {
  return (
    <TableCell sx={sx}>
      <Typography
        sx={{
          fontFamily: "Verdana",
          fontSize: "15px",
          textAlign: "center",
        }}
      >
        {label}
      </Typography>
    </TableCell>
  );
}

export default CommonColumnHeader;
