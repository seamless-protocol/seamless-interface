import { CircularProgress } from "@mui/material";

interface LoadingComponentProps {
  size?: string;
  sx?: any;
}

function LoadingComponent({ size, sx }: LoadingComponentProps) {
  return <CircularProgress size={size} sx={sx} />;
}

export default LoadingComponent;
