import polygonPositiveSvg from "@assets/common/polygon-positive.svg";
import polygonNegativeSvg from "@assets/common/polygon-negative.svg";
import { ViewNumber } from "@shared";

export const getApyColor = (apy: ViewNumber): string | undefined => {
  if (!apy.value) return undefined;
  return apy.value >= 0 ? "text-success-900" : "text-error-1000";
};

export const getApyIndicatorSvg = (apy: ViewNumber): string | undefined => {
  if (!apy.value) return undefined;
  return apy.value >= 0 ? polygonPositiveSvg : polygonNegativeSvg;
};
