import { Container, SxProps } from "@mui/material";
import HeaderInfoBox from "./HeaderInfoBox";

interface HeaderInfoStackValue {
  label: string;
  value: string;
}

interface HeaderInfoStackProps {
  isLoading: boolean;
  values: HeaderInfoStackValue[];
  sx?: SxProps;
}

function HeaderInfoStack({ isLoading, values, sx }: HeaderInfoStackProps) {
  return (
    <Container
      sx={{
        ...sx,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {values.map((value, index) => (
        <HeaderInfoBox
          key={index}
          isLoading={isLoading}
          label={value.label}
          value={value.value}
        />
      ))}
    </Container>
  );
}

export default HeaderInfoStack;
