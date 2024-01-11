import { Container } from "@mui/material";

interface StrategyDetailsContainerProps {
  children: any;
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
        width: "90%",
      }}
    >
      {children}
    </Container>
  );
}

export default StrategyDetailsContainer;
