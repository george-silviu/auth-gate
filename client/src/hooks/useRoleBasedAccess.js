import useAuth from "./useAuth";

const useRoleBasedAccess = (allowedRoles) => {
  const { auth } = useAuth();
  const hasAccess = allowedRoles.some((role) => auth?.roles.includes(role));
  return hasAccess;
};

export default useRoleBasedAccess;
