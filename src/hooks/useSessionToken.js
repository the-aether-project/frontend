// import { useState, useEffect } from 'react';

// const useSessionToken = () => {
//   const [session, setSession] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const verifySession = async () => {
//       const token = localStorage.getItem('access_token');
//       if (!token) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch('http://localhost:7878/api/authorized/session', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//           body: JSON.stringify({ user: token })
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setSession(data.message);
//         } else {
//           localStorage.removeItem('access_token');
//         }
//       } catch (error) {
//         console.error('Failed to verify session:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     verifySession();
//   }, []);
  

//   return { session, loading };
// };

// export default useSessionToken;

import { useState, useEffect } from 'react';

const verifySession = async (setSession, setLoading) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    setLoading(false);
    return;
  }

  try {
    const response = await fetch('http://localhost:7878/api/authorized/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ user: token })
    });

    if (response.ok) {
      const data = await response.json();
      setSession(data.message);
    } else {
      localStorage.removeItem('access_token');
    }
  } catch (error) {
    console.error('Failed to verify session:', error);
  } finally {
    setLoading(false);
  }
};

const useSessionToken = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifySession(setSession, setLoading);
  }, []);

  return { session, loading };
};

export { useSessionToken, verifySession };