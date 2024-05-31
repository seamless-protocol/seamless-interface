import { useContext } from "react";
import { AssetsContext, AssetsContextType } from "./AssetsProvider";

export const useAssetsContext = (): AssetsContextType => {
  const context = useContext(AssetsContext);

  if (context === undefined) {
    throw new Error("useAssetsContext must be used within a AssetsProvider");
  }

  return context;
};
