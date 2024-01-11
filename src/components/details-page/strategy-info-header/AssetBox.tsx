import { Box, Stack, Typography } from "@mui/material";

function AssetBox() {
  return (
    <Stack
      direction={"row"}
      spacing={"15px"}
      alignItems={"center"}
      position={"relative"}
      width={"600px"}
    >
      <img
        src="cbeth.svg"
        alt="Logo"
        style={{
          height: "60px",
          marginRight: 7,
          marginLeft: 7,
        }}
      ></img>

      <Box>
        <Typography
          sx={{
            fontFamily: "Arial",
            fontSize: "0.9rem",
            color: "#FFFFEF",
          }}
        >
          cbETH
        </Typography>
        <Typography
          sx={{
            fontFamily: "Verdana",
            fontWeight: 550,
            fontSize: "1.1rem",
            marginBottom: "5px",
            color: "#FFFFEF",
          }}
        >
          Coinbase Staked ETH
        </Typography>
      </Box>
    </Stack>
  );
}

export default AssetBox;
