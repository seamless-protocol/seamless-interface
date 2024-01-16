import { TableCell, Typography } from "@mui/material";

interface TextCellProps {
  text: string;
}

function TextCell({ text }: TextCellProps) {
  return (
    <TableCell>
      <Typography
        variant={"subtitle1"}
        sx={{
          fontFamily: "Verdana",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {text}
      </Typography>
    </TableCell>
  );
}

export default TextCell;
