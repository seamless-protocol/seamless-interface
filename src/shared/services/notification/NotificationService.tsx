import { TPositions } from "../../types/INotification";
import { useNotificationContext } from "./useNotificationContext";

export const NotificationService = () => {
  const { showNotification } = useNotificationContext();

  return {
    success: (
      content: React.ReactNode,
      options: { icon?: string; position?: TPositions } = {}
    ) => showNotification({ content, status: "success", ...options }),
    info: (
      content: React.ReactNode,
      options: { icon?: string; position?: TPositions } = {}
    ) => showNotification({ content, status: "info", ...options }),
    warning: (
      content: React.ReactNode,
      options: { icon?: string; position?: TPositions } = {}
    ) => showNotification({ content, status: "warning", ...options }),
    error: (
      content: React.ReactNode,
      options: { icon?: string; position?: TPositions } = {}
    ) => showNotification({ content, status: "error", ...options }),
    loading: (
      content: React.ReactNode,
      options: { icon?: string; position?: TPositions } = {}
    ) => showNotification({ content, status: "loading", ...options }),
  };
};
