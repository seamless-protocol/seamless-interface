import { SxProps, TableCell, Typography } from "@mui/material";

interface CommonColumnHeaderProps {
  label: string;
  sx?: SxProps;
}

function CommonColumnHeader({ label, sx }: CommonColumnHeaderProps) {
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
