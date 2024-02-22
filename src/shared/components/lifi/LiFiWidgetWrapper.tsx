import { useEffect, useRef } from "react";
import {
  LiFiWidget,
  type WidgetConfig,
  useWidgetEvents,
  WidgetEvent,
  HiddenUI,
  WidgetDrawer,
} from "@lifi/widget";
import { UNSAFE_LocationContext } from "react-router-dom";
import { useLifiWidgetContext } from "@shared";
import { lifiConfig } from "../../../../lifi.config.ts";

export const LiFiWidgetWrapper = () => {
  const { isOpen, setIsOpen } = useLifiWidgetContext();
  const widgetEvents = useWidgetEvents();

  const widgetConfig: WidgetConfig = {
    ...lifiConfig,
    hiddenUI: [HiddenUI.DrawerButton],
  };

  const notifyStart = () => console.log("Swap started");
  const notifyComplete = () => console.log("Swap complete");
  const notifyError = () => console.log("Something went wrong");

  useEffect(() => {
    const onRouteExecutionStarted = () => {
      notifyStart();
    };

    const onRouteExecutionCompleted = () => {
      notifyComplete();
    };
    const onRouteExecutionFailed = () => {
      notifyError();
    };

    widgetEvents.on(WidgetEvent.RouteExecutionStarted, onRouteExecutionStarted);
    widgetEvents.on(
      WidgetEvent.RouteExecutionCompleted,
      onRouteExecutionCompleted
    );
    widgetEvents.on(WidgetEvent.RouteExecutionFailed, onRouteExecutionFailed);
    return () => widgetEvents.all.clear();
  }, [widgetEvents]);

  const drawerRef = useRef<WidgetDrawer>(null);

  useEffect(() => {
    if (isOpen) {
      drawerRef.current?.openDrawer();
    } else {
      drawerRef.current?.closeDrawer();
    }
  }, [isOpen]);

  return (
    // This is to force LiFi widget to use Memory router to not override the Browser history router
    <UNSAFE_LocationContext.Provider value={null as any}>
      <LiFiWidget
        integrator={widgetConfig.integrator}
        config={widgetConfig}
        ref={drawerRef}
        onClose={() => setIsOpen(false)}
      />
    </UNSAFE_LocationContext.Provider>
  );
};
