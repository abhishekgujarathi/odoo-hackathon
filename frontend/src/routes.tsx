import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";

// Pages
import Dashboard from "./pages/Dashboard";
import VendorsPage from "./pages/VendorsPage";
import VendorForm from "./pages/VendorForm";
import RFQForm from "./pages/RFQForm";
import { ErrorBoundary } from "./components/ErrorBoundary";
import QuotationComparisonPage from "./pages/QuotationComparisonPage";

const router = createBrowserRouter([
  // Public routes
  { path: "/login", element: <LoginPage /> },

  // Protected routes (with sidebar)
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "vendors", element: <VendorsPage /> },
      { path: "vendors/add", element: <VendorForm /> },
      { path: "vendors/:id/edit", element: <ErrorBoundary><VendorForm /></ErrorBoundary> },
      { path: "rfqs", element: <Navigate to="/" replace /> },
      { path: "rfqs/create", element: <RFQForm /> },
      { path: "quotations", element: <QuotationComparisonPage /> },
      { path: "approvals", element: <Navigate to="/" replace /> },
      { path: "purchase-orders", element: <Navigate to="/" replace /> },
      { path: "invoices", element: <Navigate to="/" replace /> },
      { path: "reports", element: <Navigate to="/" replace /> },
      { path: "activity", element: <Navigate to="/" replace /> },
    ],
  },

  // Catch-all
  { path: "*", element: <ErrorPage /> },
]);

export default router;
