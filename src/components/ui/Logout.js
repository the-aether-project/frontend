


// "use client"
// import { useSession } from './SessionProvider';

// const Logout = () => {
//   const { setSession, setStatus } = useSession();

//   const handleLogout = async () => {
//     try {
//       localStorage.removeItem('access_token');
//       await setSession(null); // Clear the session
//       await setStatus('unauthenticated'); // Update status
//       console.log('Logged out successfully!');
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   return (
//     <button onClick={handleLogout}>
//       Logout
//     </button>
//   );
// };
// export default Logout;
"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from './SessionProvider';

const Logout = () => {
  const { setSession, setStatus, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      localStorage.removeItem('access_token');
      await setSession(null); // Clear the session
      await setStatus('unauthenticated'); // Update status
      console.log('Logged out successfully!');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  return (
    <button onClick={handleLogout} >
      Logout
    </button>
  );
};

export default Logout;