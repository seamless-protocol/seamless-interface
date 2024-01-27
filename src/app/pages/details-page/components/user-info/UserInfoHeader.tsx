import { Typography } from "@mui/material";

function UserInfoHeader() {
  return (
    <Typography
      sx={{
        fontWeight: 600,
        fontSize: "1.0rem",
        fontFamily: "Verdana",
        color: "#000000",
      }}
    >
      Your info
    </Typography>
  );
}

export default UserInfoHeader;
