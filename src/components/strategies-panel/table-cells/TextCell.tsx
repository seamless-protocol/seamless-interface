import { TableCell, Typography } from "@mui/material";

function TextCell({ text }: { text: string }) {
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
