import { TableCell, Typography } from "@mui/material";

function NumericCell({
  primaryNumber,
  secondaryNumber,
}: {
  primaryNumber?: string;
  secondaryNumber?: string;
}) {
  return (
    <TableCell>
      <Typography
        sx={{
          fontFamily: "Verdana",
          fontSize: "15px",
          fontWeight: 550,
          textAlign: "center",
          marginBottom: "3px",
        }}
      >
        {primaryNumber || 0}
      </Typography>
      {secondaryNumber && (
        <Typography
          sx={{
            fontFamily: "Verdana",
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          {secondaryNumber || 0}
        </Typography>
      )}
    </TableCell>
  );
}

export default NumericCell;
