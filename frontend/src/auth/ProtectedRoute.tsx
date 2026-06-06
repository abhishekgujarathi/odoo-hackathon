import { Navigate, Outlet, useLocation } from "react-router-dom";

export function getAuthState() {
  const jwtToken = localStorage.getItem("jwtToken");
  const role = localStorage.getItem("role");
  return { jwtToken, role };
}

export default function ProtectedRoute({
  allowedRoles,
  children,
  redirectTo = "/login",
}) {
  const { jwtToken, role } = getAuthState();
  const location = useLocation();

  if (!jwtToken) {
    return <Navigate to={redirectTo} state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // alert(allowedRoles.includes(role?.toLocaleLowerCase()));
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
