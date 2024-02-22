import { useContext } from "react";
import { LifiWidgetContext } from "./LifiWidgetContext";

export const useLifiWidgetContext = () => {
  const context = useContext(LifiWidgetContext);

  if (!context)
    throw new Error(
      "useLifiWidgetContext must be used inside LifiWidgetContext"
    );

  return context;
};
