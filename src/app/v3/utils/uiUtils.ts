import polygonPositiveSvg from "@assets/common/polygon-positive.svg";
import polygonNegativeSvg from "@assets/common/polygon-negative.svg";
import { ViewBigInt, ViewNumber } from "@shared";

export const getApyColor = (apy: ViewNumber | ViewBigInt): string | undefined => {
  if (apy.value === undefined) return undefined;

  const value = Number(apy.value);

  if (value === 0) {
    return "text-primary-600";
  }

  if (value > 0) {
    return "text-success-900";
  }

  if (value < 0) {
    return "text-error-1000";
  }

  return undefined;
};

export const getApyIndicatorSvg = (apy: ViewNumber | ViewBigInt): string | undefined => {
  if (!apy.value) return undefined;
  return Number(apy.value) >= 0 ? polygonPositiveSvg : polygonNegativeSvg;
};

export const getRealizedGainBackGroundColor = (realizedGainPercentage: ViewBigInt): string | undefined => {
  if (realizedGainPercentage.bigIntValue === undefined) return undefined;

  if (realizedGainPercentage.bigIntValue === 0n) {
    return "bg-primary-100";
  }

  if (realizedGainPercentage.bigIntValue > 0n) {
    return "bg-green-100";
  }

  if (realizedGainPercentage.bigIntValue < 0n) {
    return "bg-red-100";
  }

  return undefined;
};
