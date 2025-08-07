# MSAL Authentication Setup

This document outlines the MSAL authentication implementation for the Calculator App.

## What's Been Implemented

### 1. MSAL Configuration (`src/authConfig.js`)
- Configured with your Azure AD app registration details
- Set up for single-page application (SPA)
- Includes group-based access control configuration

### 2. Authentication Provider (`src/AuthProvider.jsx`)
- Wraps the entire application with MSAL context
- Handles authentication state management

### 3. Login Component (`src/components/Login.jsx`)
- Clean login interface with Microsoft sign-in
- Handles authentication popup

### 4. Protected Route (`src/components/ProtectedRoute.jsx`)
- Checks user authentication and group membership
- Implements environment-based access control:
  - **Dev environment**: Only developers can access
  - **Production environment**: Both developers and analysts can access

### 5. Updated App Component (`src/App.jsx`)
- Integrated authentication flow
- Added user info display and logout functionality
- Includes temporary debug component for group IDs

## Next Steps

### 1. Get Group IDs
1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Log in to your app** using one of your test users

3. **Check the debug info** - You'll see a section showing your group IDs

4. **Copy the group IDs** and update `src/authConfig.js`:
   ```javascript
   export const GROUP_IDS = {
     DEVELOPERS: "actual-developer-group-id-here",
     ANALYSTS: "actual-analyst-group-id-here"
   };
   ```

### 2. Test the Implementation

#### Test Scenarios:

**Developer Access (saurav@calcapp22.onmicrosoft.com)**:
- ✅ Should access `http://localhost:3000` (development)
- ✅ Should access `https://sauravtest.co.uk` (production)

**Developer Access (developer1@calcapp22.onmicrosoft.com)**:
- ✅ Should access `http://localhost:3000` (development)
- ✅ Should access `https://sauravtest.co.uk` (production)

**Analyst Access (analyst1@calcapp22.onmicrosoft.com)**:
- ❌ Should be blocked from `http://localhost:3000` (development)
- ✅ Should access `https://sauravtest.co.uk` (production)

### 3. Remove Debug Components

After getting the group IDs:
1. Remove the `GroupInfo` component import and usage from `App.jsx`
2. Delete the `GroupInfo.jsx` file
3. Delete the `getGroupIds.js` utility file

### 4. Deploy to Environments

#### Development Environment:
```bash
npm run build
aws s3 sync dist/ s3://sauravapp-dev-frontend/ --delete
```

#### Production Environment:
```bash
npm run build
aws s3 sync dist/ s3://sauravapp-frontend/ --delete
```

## Configuration Details

### Azure AD Settings Used:
- **Client ID**: `a78cca7c-a191-4775-9aa6-fcddb80be626`
- **Tenant**: `calcapp22.onmicrosoft.com`
- **Redirect URIs**: 
  - `https://sauravtest.co.uk`
  - `https://dev.sauravtest.co.uk`
  - `http://localhost:3000`

### Group-Based Access Control:
- **Developers**: Can access both dev and production environments
- **Analysts**: Can only access production environment
- **Unauthorized users**: Blocked from all environments

## Troubleshooting

### Common Issues:

1. **"Access Denied" error**:
   - Check if user is assigned to the correct group
   - Verify group IDs in `authConfig.js`
   - Ensure user is assigned to the app in Azure AD

2. **Login not working**:
   - Verify redirect URIs in Azure AD app registration
   - Check if app is enabled for user sign-in
   - Ensure "Assignment required?" is set to "Yes"

3. **Group claims not appearing**:
   - Verify group claims are configured in Azure AD
   - Check if user is actually in the groups
   - Ensure groups are assigned to the app

### Debug Commands:

```javascript
// In browser console after login:
// Check current user groups
const account = msalInstance.getActiveAccount();
const response = await msalInstance.acquireTokenSilent({
  scopes: ["User.Read"],
  account: account
});
const tokenPayload = JSON.parse(atob(response.idToken.split('.')[1]));
console.log("Groups:", tokenPayload.groups);
```

## Security Features

- ✅ **Multi-factor authentication** (if configured in Azure AD)
- ✅ **Group-based access control**
- ✅ **Environment-specific restrictions**
- ✅ **Secure token handling**
- ✅ **Automatic session management**

## Future Enhancements

1. **Role-based UI**: Different interfaces for different user roles
2. **Audit logging**: Track user access and actions
3. **Session timeout**: Automatic logout after inactivity
4. **Remember me**: Extended session for trusted devices
5. **Profile management**: User profile editing capabilities
