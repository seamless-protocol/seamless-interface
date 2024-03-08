import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://84e34564ee57a14bd9483263953eec4c@o4506875589033984.ingest.us.sentry.io/4506875589165056",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
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
