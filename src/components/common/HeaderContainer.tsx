import { Container } from "@mui/material";

interface HeaderContainerProps {
  children: any;
}

function HeaderContainer({ children }: HeaderContainerProps) {
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#8A247C",
        height: "226px",
      }}
      maxWidth={false}
    >
      {children}
    </Container>
  );
}

export default HeaderContainer;
