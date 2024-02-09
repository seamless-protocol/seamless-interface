import successIcon from "../../../assets/notification/mdi-success.svg";

export const ENUM_STATUSES = {
  success: successIcon,
  loading: successIcon, //todo
  error: successIcon, //todo
  info: successIcon, //todo
  warning: successIcon, //todo
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
