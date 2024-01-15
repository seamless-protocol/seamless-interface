import { TableCell, Typography } from "@mui/material";

interface TextCellProps {
  text: string;
}

function TextCell({ text }: TextCellProps) {
  return (
    <TableCell>
      <Typography
        sx={{
          fontFamily: "Verdana",
          fontSize: "13px",
          textAlign: "center",
        }}
      >
        {text}
      </Typography>
    </TableCell>
  );
}

export default TextCell;
