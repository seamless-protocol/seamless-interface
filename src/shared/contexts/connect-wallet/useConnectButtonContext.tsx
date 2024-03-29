import { useContext } from "react";
import { ConnectButtonContext } from "./ConnectButtonProvider";

export const useConnectButtonContext = () => {
  const context = useContext(ConnectButtonContext);

  if (!context) throw new Error("useConnectButtonContext must be used inside ConnectButtonContextProvider");

  return context;
};
