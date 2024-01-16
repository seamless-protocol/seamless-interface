import { Typography } from "@mui/material";

interface NumericContentProps {
  primaryNumber?: string;
  secondaryNumber?: string;
}

function NumericContent({
  primaryNumber,
  secondaryNumber,
}: NumericContentProps) {
  return (
    <>
      <Typography
        sx={{
          fontFamily: "Verdana",
          fontSize: "15px",
          fontWeight: 550,
          textAlign: "center",
          marginBottom: "3px",
        }}
      >
        {primaryNumber}
      </Typography>
      {secondaryNumber && (
        <Typography
          sx={{
            fontFamily: "Verdana",
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          {secondaryNumber}
        </Typography>
      )}
    </>
  );
}

export default NumericContent;
