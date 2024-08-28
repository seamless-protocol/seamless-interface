import polygonPositiveSvg from "@assets/common/polygon-positive.svg";
import polygonNegativeSvg from "@assets/common/polygon-negative.svg";

export const getColorBasedOnSign = (value: number | string | undefined): string | undefined => {
  if (!value) return undefined;
  return Number(value || 0) >= 0 ? "text-success-900" : "text-error-1000";
};

export const getSvgBasedOnSign = (value: number | string | undefined): string | undefined => {
  if (!value) return undefined;
  return Number(value || 0) >= 0 ? polygonPositiveSvg : polygonNegativeSvg;
};
