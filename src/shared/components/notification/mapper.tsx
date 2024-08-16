import { CheckIcon, XMarkIcon, InformationCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { IS_STYLE_VERSION_2 } from "../../../globals";

export const ENUM_STATUSES = {
  success: <CheckIcon width={32} height={32} data-cy="notification-success-icon" />,
  loading: <div className="loading loading-spinner" data-cy="notification-loading-icon" />,
  error: <XMarkIcon width={32} height={32} data-cy="notification-error-icon" />,
  info: <InformationCircleIcon width={32} height={32} data-cy="notification-info-icon" />,
  warning: <ExclamationCircleIcon width={32} height={32} data-cy="notification-warning-icon" />,
};

const ENUM_COLORSv1 = {
  success: "bg-success-200",
  loading: "bg-disabled-200",
  error: "bg-error-200",
  info: "bg-info-200",
  warning: "bg-warning-200",
};

const ENUM_COLORSv2 = {
  success: "bg-green-600",
  loading: "bg-neutral-100",
  error: "bg-red-600",
  info: "bg-neutral-100",
  warning: "bg-orange-400",
};

export const ENUM_COLORS = IS_STYLE_VERSION_2 ? ENUM_COLORSv2 : ENUM_COLORSv1;

export const ENUM_MESSAGES = {
  success: "All done!",
  loading: "Loading...",
  error: "woops :(",
  info: "New info!",
  warning: "Carefull!",
};
