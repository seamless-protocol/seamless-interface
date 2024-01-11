import { Container } from "@mui/material";

interface UserInfoContainerProps {
  children: any;
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
      }}
    >
      {children}
    </Container>
  );
}

export default UserInfoContainer;
