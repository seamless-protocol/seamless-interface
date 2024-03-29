import { useContext } from "react";
import { NotificationContext } from "./NotificationContext";

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);

  if (!context) throw new Error("useNotification must be used inside NotificationContextProvider");

  return context;
};
