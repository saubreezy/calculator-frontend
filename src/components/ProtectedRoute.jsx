import { useIsAuthenticated } from "@azure/msal-react";
import Login from "./Login";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <Login />;
  }

  // If user can authenticate, they have access to this environment
  // Azure AD handles all access control at the app registration level
  return children;
};

export default ProtectedRoute;