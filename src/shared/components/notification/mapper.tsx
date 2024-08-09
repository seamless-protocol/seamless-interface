import { CheckIcon, XMarkIcon, InformationCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";

export const ENUM_STATUSES = {
  success: <CheckIcon width={32} height={32} />,
  loading: <div className="loading loading-spinner" />,
  error: <XMarkIcon width={32} height={32} />,
  info: <InformationCircleIcon width={32} height={32} />,
  warning: <ExclamationCircleIcon width={32} height={32} />,
};

const ENUM_COLORSv2 = {
  success: "bg-green-600",
  loading: "bg-neutral-100",
  error: "bg-red-600",
  info: "bg-neutral-100",
  warning: "bg-orange-400",
};

export const ENUM_COLORS = ENUM_COLORSv2;

export const ENUM_MESSAGES = {
  success: "All done!",
  loading: "Loading...",
  error: "woops :(",
  info: "New info!",
  warning: "Carefull!",
};
