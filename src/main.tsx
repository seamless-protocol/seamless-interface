import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./app/config/window.override.ts";
import "./app/config/sentry.config.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
