import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BagProvider } from "./helpers/BagContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BagProvider>
      <GoogleOAuthProvider clientId="11870494481-c848i8nfi5mpqej8nd3jfqei47rumfs0.apps.googleusercontent.com">
        <Router>
          <App />
        </Router>
      </GoogleOAuthProvider>
    </BagProvider>
  </StrictMode>
);
