import { Container } from "@mui/material";
import { ReactNode } from "react";

interface UserInfoContainerProps {
  children: ReactNode;
}

function UserInfoContainer({ children }: UserInfoContainerProps) {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        backgroundColor: "#FFFFFF",
        marginLeft: "20px",
        borderRadius: "5px",
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "15px",
        paddingBottom: "25px",
        height: "100%",
      }}
    >
      {children}
    </Container>
  );
}

export default UserInfoContainer;
