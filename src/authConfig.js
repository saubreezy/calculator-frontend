export const msalConfig = {
  auth: {
    clientId: "a78cca7c-a191-4775-9aa6-fcddb80be626", // Your Application (client) ID
    authority: "https://login.microsoftonline.com/calcapp22.onmicrosoft.com", // Your tenant ID
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  }
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ["User.Read"]
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};

// Group IDs for access control
export const GROUP_IDS = {
  DEVELOPERS: "95d6c283-4a72-4b91-8503-ed2abc0e343e",
  ANALYSTS: "3042ab9a-a461-496c-ba70-6a3f11272237"
};
