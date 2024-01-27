import { Container } from "@mui/material";
import { ReactNode } from "react";

interface HeaderContainerProps {
  children: ReactNode;
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
