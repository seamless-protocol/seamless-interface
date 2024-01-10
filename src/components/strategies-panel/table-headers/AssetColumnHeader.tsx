import { TableCell, Typography } from "@mui/material";

function AssetColumnHeader({ label, sx }: { label: string; sx?: any }) {
  return (
    <TableCell sx={sx}>
      <Typography
        sx={{
          fontFamily: "Verdana",
          fontSize: "15px",
        }}
      >
        {label}
      </Typography>
    </TableCell>
  );
}

export default AssetColumnHeader;
