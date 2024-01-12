import { Box, Stack, TableCell, Typography } from "@mui/material";

interface AssetCellProps {
  name: string;
  symbol: string;
  image: string;
}

function AssetCell({ name, symbol, image }: AssetCellProps) {
  return (
    <TableCell>
      <Stack
        direction={"row"}
        spacing={"15px"}
        alignItems={"center"}
        position={"relative"}
      >
        <img
          src={image}
          alt="Logo"
          style={{
            height: "35px",
            marginRight: 7,
            marginLeft: 7,
          }}
        ></img>

        <Box>
          <Typography
            sx={{
              fontFamily: "Verdana",
              fontWeight: 550,
              fontSize: "0.9rem",
              marginBottom: "5px",
            }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Arial",
              fontSize: "0.9rem",
            }}
          >
            {symbol}
          </Typography>
        </Box>
      </Stack>
    </TableCell>
  );
}

export default AssetCell;
