


"use client"
import { useSession } from './SessionProvider';

const Logout = () => {
  const { setSession, setStatus } = useSession();

  const handleLogout = async () => {
    try {
      localStorage.removeItem('access_token');
      setSession(null); // Clear the session
      setStatus('unauthenticated'); // Update status
      console.log('Logged out successfully!');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};
export default Logout;