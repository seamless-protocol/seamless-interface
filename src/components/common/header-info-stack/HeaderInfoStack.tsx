import { Container } from "@mui/material";
import HeaderInfoBox from "./HeaderInfoBox";

interface HeaderInfoStackProps {
  values: [
    {
      label: string;
      value: string;
    }
  ];
  sx?: any;
}

function HeaderInfoStack({ values, sx }: HeaderInfoStackProps) {
  return (
    <Container
      sx={{
        ...sx,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {values.map((value) => (
        <HeaderInfoBox label={value.label} value={value.value} />
      ))}
    </Container>
  );
}

export default HeaderInfoStack;
