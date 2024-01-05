import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import logo from "/logo-seamless.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const pages = [
  "Dashboard",
  "Markets",
  "Staking Farms",
  "Swap onto Base",
  "Governance",
];

function ResponsiveAppBar() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#124280",
        height: "48px",
      }}
    >
      <Container maxWidth={false}>
        <Toolbar variant="dense" sx={{ ml: "-30px" }}>
          <img
            src={logo}
            alt="Logo"
            style={{
              height: "20px",
              marginRight: 7,
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: "1.0rem",
              textAlign: "center",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Seamless
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{
                  color: "white",
                  display: "block",
                  textTransform: "none",
                  fontFamily: "Verdana",
                  mr: 2,
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ mr: "-20px" }}>
            <ConnectButton showBalance={false} accountStatus="address" />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
