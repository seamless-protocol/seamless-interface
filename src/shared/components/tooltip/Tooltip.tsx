import React, { useId } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

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

export const Tooltip: React.FC<{
  children: React.ReactElement;
  tooltip: React.ReactNode;
  place?: TooltipPlace;
  openOnClick?: boolean;
}> = ({ children, tooltip, openOnClick, place = "top" }) => {
  const tooltipId = useId();

  const clonedChild = React.cloneElement(children, {
    "data-tooltip-id": tooltipId,
  });

  return (
    <>
      {clonedChild}
      <ReactTooltip
        style={{
          backgroundColor: "white",
          color: "black",
          padding: "16px 24px",
          zIndex: 99999999,
          boxShadow:
            "rgba(0, 0, 0, 0.2) 0px 0px 2px, rgba(0, 0, 0, 0.1) 0px 2px 10px",
        }}
        opacity={1}
        id={tooltipId}
        place={place}
        openOnClick={openOnClick}
      >
        {tooltip}
      </ReactTooltip>
    </>
  );
};
