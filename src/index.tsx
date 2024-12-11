import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import OverviewPage from "./pages/overview";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <OverviewPage />
  </React.StrictMode>
);
