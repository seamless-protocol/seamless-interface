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

export const getBackGroundColorBasedOnSign = (value: number | string | undefined): string | undefined => {
  const valueNumber = Number(value || 0);

  if (valueNumber === undefined) return undefined;

  if (valueNumber === 0) {
    return "bg-primary-100";
  }

  if (valueNumber > 0) {
    return "bg-green-100";
  }

  if (valueNumber < 0) {
    return "bg-red-100";
  }

  return undefined;
};
