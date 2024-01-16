import { Stack, Typography } from "@mui/material";

interface IlmHeaderStatsBoxProps {
  title: string;
  value: string;
}

function IlmHeaderStatsBox({ title, value }: IlmHeaderStatsBoxProps) {
  return (
    <Stack direction={"column"}>
      <Typography variant="h6" sx={{ color: "#DC91C1" }}>
        {title}
      </Typography>
      <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
        ${value}
      </Typography>
    </Stack>
  );
}

export default IlmHeaderStatsBox;
