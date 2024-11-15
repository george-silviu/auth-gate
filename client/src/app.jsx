import { Routes, Route } from "react-router-dom";

import AppLayout from "./components/app-layout/app-layout.component";

import Login from "./pages/login/login.page";
import Register from "./pages/register/register.page";
import Unauthorized from "./pages/unauthorized/unauthorized.page";

import Dashboard from "./pages/dashboard/dashboard.page";
import Partners from "./pages/partners/partners.page";
import Users from "./pages/users/users.page";
import Leads from "./pages/leads/leads.page";
import Resources from "./pages/resources/resources.page";
import NotFound from "./pages/not-found/not-found.page";

import PersistLogin from "./components/persist-login/persist-login.component";
import RequireAuth from "./components/require-auth/require-auth.component";

const ROLES = {
  Superadmin: "superadmin",
  Admin: "admin",
};

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Private routes */}

      <Route element={<PersistLogin />}>
        <Route
          element={
            <RequireAuth allowedRoles={[ROLES.Superadmin, ROLES.Admin]} />
          }
        >
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.Superadmin, ROLES.Admin]} />
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Superadmin]} />}>
              <Route path="partners" element={<Partners />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Superadmin]} />}>
              <Route path="users" element={<Users />} />
            </Route>

            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.Superadmin, ROLES.Admin]} />
              }
            >
              <Route path="leads" element={<Leads />} />
            </Route>

            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.Superadmin, ROLES.Admin]} />
              }
            >
              <Route path="resources" element={<Resources />} />
            </Route>
          </Route>
        </Route>
      </Route>
      {/* Catch all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
