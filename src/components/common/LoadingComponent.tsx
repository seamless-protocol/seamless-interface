import { CircularProgress, SxProps } from "@mui/material";

interface LoadingComponentProps {
  size?: string;
  sx?: SxProps;
}

function LoadingComponent({ size, sx }: LoadingComponentProps) {
  return <CircularProgress size={size} sx={sx} />;
}

export default LoadingComponent;
