import { TableCell, Typography } from "@mui/material";
import LoadingComponent from "../../../common/LoadingComponent";

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
      {isLoading && <LoadingComponent />}
      {!isLoading && (
        <>
          <Typography
            sx={{
              fontFamily: "Verdana",
              fontSize: "15px",
              fontWeight: 550,
              textAlign: "center",
              marginBottom: "3px",
            }}
          >
            {primaryNumber}
          </Typography>
          {secondaryNumber && (
            <Typography
              sx={{
                fontFamily: "Verdana",
                fontSize: "12px",
                textAlign: "center",
              }}
            >
              {secondaryNumber}
            </Typography>
          )}
        </>
      )}
    </TableCell>
  );
}

export default NumericCell;
