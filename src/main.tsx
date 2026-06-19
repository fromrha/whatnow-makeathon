import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./styles/index.css";

// Standalone Vite entrypoint for local development and demo stability.
// This is ADDITIVE: it does not replace the Figma Make entrypoint
// (__figma__entrypoint__.ts), which remains the source-of-truth entry inside
// the Figma Make environment.

const container = document.getElementById("root");
if (!container) {
  throw new Error('Root element "#root" not found in index.html');
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
