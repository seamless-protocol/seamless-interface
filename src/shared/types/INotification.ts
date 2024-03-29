import React from "react";

type XPositions = "left" | "right" | "center";
type YPositions = "top" | "bottom" | "center";

export type TPositions = `${YPositions}-${XPositions}`;
export type TNotificationStatus = "success" | "info" | "loading" | "error" | "warning";

export type TNotificationProps = {
  content: React.ReactNode;
  status?: TNotificationStatus;
  duration?: number;
  icon?: React.ReactNode;
  position?: TPositions;
  txHash?: string;
};

export type NotificationOptions = {
  duration?: number;
  icon?: string;
  position?: TPositions;
};

export interface NotificationInterface {
  success: (content: React.ReactNode, options?: NotificationOptions) => ReturnType<never>;
  info: (content: React.ReactNode, options?: NotificationOptions) => ReturnType<never>;
  warning: (content: React.ReactNode, options?: NotificationOptions) => ReturnType<never>;
  error: (content: React.ReactNode, options?: NotificationOptions) => ReturnType<never>;
  loading: (content: React.ReactNode, options?: NotificationOptions) => ReturnType<never>;
  remove: (toastId: string) => void;
}
