// NotificationContext.tsx
import React, { createContext, useState, useCallback, ReactNode } from "react";
import { DisplayNotification } from "../../components/notification/DisplayNotification";
import { TNotificationProps } from "../../types/INotification";

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

export const NotificationContext =
  createContext<NotificationContextType>(defaultContextValue);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [notification, setNotification] = useState<
    TNotificationProps | undefined
  >(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const showNotification = useCallback((notification: TNotificationProps) => {
    console.log("uso");
    setNotification(notification);
    console.log("setovao");
    setIsOpen(true);
    console.log("otvorio");
  }, []);

  const closeNotification = useCallback(() => {
    setNotification(undefined);
    setIsOpen(false);
  }, []);

  return (
    <NotificationContext.Provider
      value={{ showNotification, closeNotification }}
    >
      {children}
      {isOpen && notification && (
        <DisplayNotification
          {...defaultNotificationSettings}
          {...notification}
          setModalOpen={setIsOpen}
        />
      )}
    </NotificationContext.Provider>
  );
};
