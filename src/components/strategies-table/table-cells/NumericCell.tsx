import { CircularProgress, TableCell, Typography } from "@mui/material";

interface NumericCellProps {
  primaryNumber?: string;
  secondaryNumber?: string;
}

function NumericCell({ primaryNumber, secondaryNumber }: NumericCellProps) {
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
        {primaryNumber || <CircularProgress />}
      </Typography>
      {secondaryNumber && (
        <Typography
          sx={{
            fontFamily: "Verdana",
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          {secondaryNumber || <CircularProgress />}
        </Typography>
      )}
    </TableCell>
  );
}

export default NumericCell;
