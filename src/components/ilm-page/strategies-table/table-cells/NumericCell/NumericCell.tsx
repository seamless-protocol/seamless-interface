import { Box, TableCell } from "@mui/material";
import LoadingComponent from "../../../../common/LoadingComponent";
import NumericContent from "./NumericContent";

interface NumericCellProps {
  isLoading: boolean;
  primaryNumber?: string;
  secondaryNumber?: string;
}

function NumericCell({
  isLoading,
  primaryNumber,
  secondaryNumber,
}: NumericCellProps) {
  return (
    <TableCell>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <LoadingComponent sx={{ width: "100%" }} />
        </Box>
      ) : (
        <NumericContent
          primaryNumber={primaryNumber}
          secondaryNumber={secondaryNumber}
        />
      )}
    </TableCell>
  );
}

export default NumericCell;
