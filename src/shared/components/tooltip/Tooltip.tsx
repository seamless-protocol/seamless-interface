import React, { useId, useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

/**
 * Determines the placement of the tooltip.
 */
export type TooltipPlace =
  | "top"
  | "top-start"
  | "top-end"
  | "right"
  | "right-start"
  | "right-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end";

/**
 * Theme options for the tooltip's appearance.
 */
export type TooltipTheme = "light" | "dark";

/**
 * Size options for the tooltip, affecting its padding.
 */
export type TooltipSize = "small" | "normal" | "big";

/**
 * Props for the Tooltip component.
 * @param children - The trigger element for the tooltip.
 * @param tooltip - The content to be displayed within the tooltip.
 * @param place - Optional. The preferred placement of the tooltip.
 * @param openOnClick - Optional. Determines if the tooltip should open on click.
 * @param theme - Optional. The theme of the tooltip, affecting its background and text color.
 * @param size - Optional. The size of the tooltip, affecting its padding.
 */
export const Tooltip: React.FC<{
  children: React.ReactElement;
  tooltip: React.ReactNode;
  place?: TooltipPlace;
  openOnClick?: boolean;
  theme?: TooltipTheme;
  size?: TooltipSize;
}> = ({
  children,
  tooltip,
  openOnClick,
  place = "top",
  theme = "light",
  size = "normal",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipId = useId();

  const themeStyles = {
    light: {
      backgroundColor: "white",
      color: "black",
    },
    dark: {
      backgroundColor: "rgba(0, 0, 0, 0.65)",
      color: "white",
    },
  };

  const sizeStyles = {
    small: {
      padding: "4px 8px",
    },
    normal: {
      padding: "16px 24px",
    },
    big: {
      padding: "24px 32px",
    },
  };

  return (
    <span
      data-tooltip-id={tooltipId}
      onMouseEnter={() => {
        setIsVisible(true);
      }}
      onMouseLeave={() => {
        setIsVisible(false);
      }}
    >
      {children}
      <ReactTooltip
        style={{
          ...themeStyles[theme],
          ...sizeStyles[size],
          zIndex: 99999999,
          boxShadow:
            "rgba(0, 0, 0, 0.2) 0px 0px 2px, rgba(0, 0, 0, 0.1) 0px 2px 10px",
        }}
        className={isVisible ? "show-tooltip" : "hide-tooltip"}
        opacity={1}
        id={tooltipId}
        place={place}
        openOnClick={openOnClick}
      >
        {tooltip}
      </ReactTooltip>
    </span>
  );
};
