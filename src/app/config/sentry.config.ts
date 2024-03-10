import * as Sentry from "@sentry/react";
import React from "react";
import {
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from "react-router-dom";
import { IS_DEV_MODE } from "./window.override";

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
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // https://app.seamlessprotocol.com/
    tracePropagationTargets: [
      "http://localhost:4173/",
      "https://app.seamlessprotocol.com",
      /^https:\/\/app\.seamlessprotocol\.com\/.*/,
    ],
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });
}
