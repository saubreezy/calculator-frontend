import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { useEffect, useState } from "react";
import Login from "./Login";
import { GROUP_IDS } from "../authConfig";

const ProtectedRoute = ({ children }) => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [userGroups, setUserGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const checkUserAccess = async () => {
      if (!isAuthenticated || accounts.length === 0) {
        setIsLoading(false);
        return;
      }

      try {
        // Get the active account
        const account = accounts[0];
        
        // Get the ID token which contains group claims
        const silentRequest = {
          scopes: ["User.Read"],
          account: account
        };

        const response = await instance.acquireTokenSilent(silentRequest);
        const idToken = response.idToken;
        
        // Decode the JWT token to get group claims
        const tokenPayload = JSON.parse(atob(idToken.split('.')[1]));
        const groups = tokenPayload.groups || [];
        
        setUserGroups(groups);
        
        // Check if user has access to current environment
        const currentEnvironment = window.location.hostname;
        const isDevEnvironment = currentEnvironment.includes('dev.sauravtest.co.uk') || 
                                currentEnvironment.includes('localhost');
        
        if (isDevEnvironment) {
          // Only developers can access dev environment
          const hasDeveloperAccess = groups.some(groupId => 
            groupId === GROUP_IDS.DEVELOPERS
          );
          setHasAccess(hasDeveloperAccess);
        } else {
          // Both developers and analysts can access production
          const hasAccess = groups.some(groupId => 
            groupId === GROUP_IDS.DEVELOPERS || groupId === GROUP_IDS.ANALYSTS
          );
          setHasAccess(hasAccess);
        }
        
      } catch (error) {
        console.error("Error checking user access:", error);
        setHasAccess(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserAccess();
  }, [isAuthenticated, accounts, instance]);

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  if (!hasAccess) {
    const currentEnvironment = window.location.hostname;
    const isDevEnvironment = currentEnvironment.includes('dev.sauravtest.co.uk') || 
                            currentEnvironment.includes('localhost');
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        textAlign: 'center',
        padding: '20px'
      }}>
        <h1>Access Denied</h1>
        <p>
          {isDevEnvironment 
            ? "You don't have permission to access the development environment. Only developers can access this environment."
            : "You don't have permission to access this application. Please contact your administrator."
          }
        </p>
        <button 
          onClick={() => instance.logout()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Sign Out
        </button>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
