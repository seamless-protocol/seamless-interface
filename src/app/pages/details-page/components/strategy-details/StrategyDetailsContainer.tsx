import { Container } from "@mui/material";
import { ReactNode } from "react";

interface StrategyDetailsContainerProps {
  children: ReactNode;
}

function StrategyDetailsContainer({ children }: StrategyDetailsContainerProps) {
  return (
    <Container
      disableGutters
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "-40px",
        width: "97%",
      }}
    >
      {children}
    </Container>
  );
}

export default StrategyDetailsContainer;
