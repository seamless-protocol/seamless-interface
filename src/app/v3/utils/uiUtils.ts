import polygonPositiveSvg from "@assets/common/polygon-positive.svg";
import polygonNegativeSvg from "@assets/common/polygon-negative.svg";
import { ViewBigInt, ViewNumber } from "@shared";

export const getApyColor = (apy: ViewNumber | ViewBigInt): string | undefined => {
  if (!apy.value) return undefined;
  return Number(apy.value) >= 0 ? "text-success-900" : "text-error-1000";
};

export const getApyIndicatorSvg = (apy: ViewNumber | ViewBigInt): string | undefined => {
  if (!apy.value) return undefined;
  return Number(apy.value) >= 0 ? polygonPositiveSvg : polygonNegativeSvg;
};

export const getRealizedGainBackGroundColor = (realizedGainPercentage: ViewBigInt): string | undefined => {
  if (!realizedGainPercentage.bigIntValue) return undefined;
  return realizedGainPercentage.bigIntValue >= 0n ? "bg-green-100" : "bg-red-100";
};
