import { SxProps, TableCell, Typography } from "@mui/material";

interface AssetColumnHeaderProps {
  label: string;
  sx?: SxProps;
}

function AssetColumnHeader({ label, sx }: AssetColumnHeaderProps) {
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
