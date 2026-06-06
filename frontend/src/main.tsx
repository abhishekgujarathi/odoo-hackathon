import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import router from "./routes.tsx";
import AppProviders from "./providers/AppProviders.tsx";
import VendorData from "./pages/VendorForm.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import VendorsPage from "./pages/VendorsPage.tsx";
import AppLayout from "./components/layout/AppLayout.tsx";
import VendorForm from "./pages/VendorForm.tsx";
import RFQForm from "./pages/RFQForm.tsx";
import QuotationComparisonPage from "./pages/QuotationComparisonPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
      
      <RouterProvider router={router} />

    </AppProviders>
  </StrictMode>,
);
