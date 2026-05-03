import { GoogleLogin } from '@react-oauth/google';
import ReactGA from 'react-ga4';

export default function GoogleAuth() {
  const handleSuccess = (credentialResponse) => {
    console.log('Login Success:', credentialResponse);
    ReactGA.event({
      category: 'User',
      action: 'Login',
      label: 'Google OAuth Success'
    });
    // You can handle the response (e.g., send to backend) here
  };

  const handleError = () => {
    console.log('Login Failed');
    ReactGA.event({
      category: 'User',
      action: 'Login',
      label: 'Google OAuth Failed'
    });
  };

  return (
    <div className="flex items-center justify-center p-4">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap
        theme="filled_blue"
        shape="pill"
      />
    </div>
  );
}
