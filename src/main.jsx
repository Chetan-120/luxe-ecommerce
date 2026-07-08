import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#1a1a1a",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "9999px",
            padding: "12px 20px",
            fontSize: "14px",
          },
          iconTheme: { primary: "#c9a227", secondary: "#0a0a0a" },
        }}
      />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);