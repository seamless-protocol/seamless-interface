import polygonPositiveSvg from "@assets/common/polygon-positive.svg";
import polygonNegativeSvg from "@assets/common/polygon-negative.svg";

export const getColorBasedOnSign = (apy: number | string | undefined): string | undefined => {
  if (!apy) return undefined;
  return Number(apy || 0) >= 0 ? "text-success-900" : "text-error-1000";
};

export const getSvgBasedOnSign = (apy: number | string | undefined): string | undefined => {
  if (!apy) return undefined;
  return Number(apy || 0) >= 0 ? polygonPositiveSvg : polygonNegativeSvg;
};
