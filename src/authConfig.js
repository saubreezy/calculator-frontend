// Get the current environment
const getCurrentEnvironment = () => {
  const hostname = window.location.hostname;
  if (hostname.includes('dev.sauravtest.co.uk') || hostname.includes('localhost')) {
    return 'development';
  }
  return 'production';
};

// Environment-specific configurations
const developmentConfig = {
  auth: {
    clientId: "1d2416b1-9af9-4cf6-bff1-c1720526ceed", // Calculator App - Development
    authority: "https://login.microsoftonline.com/calcapp22.onmicrosoft.com",
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  }
};

const productionConfig = {
  auth: {
    clientId: "a78cca7c-a191-4775-9aa6-fcddb80be626", // Calculator App - Production
    authority: "https://login.microsoftonline.com/calcapp22.onmicrosoft.com",
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  }
};

// Export the appropriate config based on environment
export const msalConfig = getCurrentEnvironment() === 'development' ? developmentConfig : productionConfig;

// Scopes for ID token
export const loginRequest = {
  scopes: ["User.Read"]
};

// Graph API endpoint
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};

// Environment info for debugging
export const currentEnvironment = getCurrentEnvironment();
export const isDevelopment = getCurrentEnvironment() === 'development';
export const isProduction = getCurrentEnvironment() === 'production';