import {
  CheckIcon,
  XMarkIcon,
  InformationCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

export const ENUM_STATUSES = {
  success: <CheckIcon className="text-success-main" width={32} height={32} />,
  loading: <div className="loading loading-spinner"></div>,
  error: <XMarkIcon className="text-error-main" width={32} height={32} />,
  info: (
    <InformationCircleIcon className="text-info-main" width={32} height={32} />
  ),
  warning: (
    <ExclamationCircleIcon
      className="text-warning-main"
      width={32}
      height={32}
    />
  ),
};

export const ENUM_COLORS = {
  success: "bg-success-200",
  loading: "bg-disabled-200",
  error: "bg-error-200",
  info: "bg-info-200",
  warning: "bg-warning-200",
};

export const ENUM_MESSAGES = {
  success: "All done!",
  loading: "Loading...",
  error: "woops :(",
  info: "New info!",
  warning: "Carefull!",
};
