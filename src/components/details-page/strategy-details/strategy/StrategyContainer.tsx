import { Container } from "@mui/material";
import { ReactNode } from "react";

interface StrategyContainerProps {
  children: ReactNode;
}

function StrategyContainer({ children }: StrategyContainerProps) {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        borderRadius: "5px",
        position: "relative",
        width: "70%",
        paddingLeft: "15px",
        paddingRight: "15px",
      }}
    >
      {children}
    </Container>
  );
}

export default StrategyContainer;
