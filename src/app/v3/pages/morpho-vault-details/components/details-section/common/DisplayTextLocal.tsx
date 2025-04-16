import React from "react";

// todo refactor this, move it to shared, consider merging it with DisplayText (existing component)
export const DisplayTextLocal: React.FC<{
  text?: string;
  isLoading?: boolean;
  errorMessage?: string;
}> = ({ text, isLoading, errorMessage }) => {
  if (isLoading) return <>Loading...</>;
  if (errorMessage) return <>{errorMessage}</>;

  return <>{text}</>;
};
