import { Container } from "@mui/material";
import HeaderInfoBox from "./HeaderInfoBox";

interface HeaderInfoStackProps {
  isLoading: boolean;
  values: [
    {
      label: string;
      value: string;
    },
  ];
  sx?: any;
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
      {values.map((value) => (
        <HeaderInfoBox
          isLoading={isLoading}
          label={value.label}
          value={value.value}
        />
      ))}
    </Container>
  );
}

export default HeaderInfoStack;
