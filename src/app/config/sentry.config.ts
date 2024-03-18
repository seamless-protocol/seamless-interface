import * as Sentry from "@sentry/react";
import React from "react";
import {
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from "react-router-dom";
import { IS_DEV_MODE } from "../../globals";

if (!IS_DEV_MODE) {
  Sentry.init({
    dsn: "https://f078a84aea6485ab874269be898bad60@o4506877073555456.ingest.us.sentry.io/4506877076242432",
    integrations: [
      Sentry.feedbackIntegration({
        colorScheme: "light",
      }),
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
      Sentry.reactRouterV6BrowserTracingIntegration({
        useEffect: React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      }),
    ],
    // Performance Monitoring
    tracesSampleRate: 0.5, //  Capture 50% of the transactions
    // https://app.seamlessprotocol.com/
    tracePropagationTargets: [
      "http://localhost:4173/",
      "https://app.seamlessprotocol.com",
      /^https:\/\/app\.seamlessprotocol\.com\/.*/,
    ],
    // Session Replay
    replaysSessionSampleRate: 0.0, // This sets the sample rate at 0%.
    replaysOnErrorSampleRate: 1.0, // Monitoring 100% sessions where error occur.
  });
}
