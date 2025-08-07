import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

const Login = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch(e => {
      console.error(e);
    });
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      textAlign: 'center'
    }}>
      <h1>Welcome to Calculator App</h1>
      <p>Please sign in to continue</p>
      <button 
        onClick={handleLogin}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#0078d4',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Sign In with Microsoft
      </button>
    </div>
  );
};

export default Login;
