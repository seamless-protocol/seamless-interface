// NotificationContext.tsx
import React, { createContext, useState, useCallback, ReactNode } from "react";
import { TNotificationProps } from "../../types/INotification";
import { DisplayNotificationv2 } from "../../components/notification/DisplayNotificationv2";

interface NotificationContextType {
  showNotification: (notification: TNotificationProps) => void;
  closeNotification: () => void;
}

const defaultNotificationSettings: Omit<TNotificationProps, "content"> = {
  status: "success",
  position: "center-center",
};

const defaultContextValue: NotificationContextType = {
  showNotification: () => {},
  closeNotification: () => {},
};

export const NotificationContext = createContext<NotificationContextType>(defaultContextValue);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notification, setNotification] = useState<TNotificationProps | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const showNotification = useCallback((notification: TNotificationProps) => {
    setNotification(notification);
    setIsOpen(true);
  }, []);

  const closeNotification = useCallback(() => {
    setNotification(undefined);
    setIsOpen(false);
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification, closeNotification }}>
      {children}
      {isOpen && notification && (
        <DisplayNotificationv2 {...defaultNotificationSettings} {...notification} setModalOpen={setIsOpen} />
      )}
    </NotificationContext.Provider>
  );
};
