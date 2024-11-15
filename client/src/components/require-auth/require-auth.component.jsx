import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const hasRole = auth?.roles?.some((role) => allowedRoles.includes(role));

  if (!hasRole && auth?.username) {
    console.log(
      "Redirecting to /unauthorized. User roles:",
      auth.roles,
      "Allowed roles:",
      allowedRoles
    );
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return hasRole ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
