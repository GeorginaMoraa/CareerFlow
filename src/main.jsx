import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import { SettingsProvider } from "./context/SettingsContext";
import { JobProvider } from "./context/JobContext";
import { seedDemoData } from "./utils/demo";

// The hosted preview runs inside a frame without real URLs, so it uses an
// in-memory router and starts with example data. Normal builds are unaffected.
const isDemo = import.meta.env.VITE_DEMO === "true";
const Router = isDemo ? MemoryRouter : BrowserRouter;
if (isDemo) seedDemoData();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <SettingsProvider>
        <JobProvider>
          <App />
          <Toaster position="bottom-right" toastOptions={{ duration: 2500 }} />
        </JobProvider>
      </SettingsProvider>
    </Router>
  </StrictMode>
);
