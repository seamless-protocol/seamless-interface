import { Container, SxProps } from "@mui/material";
import HeaderInfoBox from "./HeaderInfoBox";

interface HeaderInfoStackValues {
  label: string;
  value: string;
}

interface HeaderInfoStackProps {
  values: HeaderInfoStackValues[];
  sx?: SxProps;
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
