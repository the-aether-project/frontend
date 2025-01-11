

'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import useSessionToken from '@/hooks/useSessionToken';

const SessionContext = createContext(null);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === null) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

const SessionProvider = ({ children }) => {
  const { session: tokenSession, loading, error } = useSessionToken();
  const [session, setSession] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (loading) {
      setStatus('loading');
    } else if (tokenSession) {
      setSession(tokenSession);
      setStatus('authenticated');
    } else {
      setSession(null);
      setStatus('unauthenticated');
    }
  }, [loading, tokenSession]);

  if (loading) {
    return <div>Loading...</div>; // Replace with a custom loading component if needed
  }

  if (error) {
    return (
      <div className="error">
        <p>Error: {error.message}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <SessionContext.Provider value={{ session, setSession, status, setStatus }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;


// 'use client'
// import { createContext, useContext, useCallback, useMemo } from 'react'
// import useSessionToken, { SESSION_STATUS } from '@/hooks/useSessionToken'

// const SessionContext = createContext(null)

// export const useSession = () => {
//   const context = useContext(SessionContext)
//   if (!context) {
//     throw new Error('useSession must be used within a SessionProvider')
//   }
//   return context
// }

// const SessionProvider = ({ children }) => {
//   const {
//     session,
//     status,
//     error,
//     refreshSession,
//     logout
//   } = useSessionToken()

//   // Memoized value to prevent unnecessary re-renders
//   const value = useMemo(() => ({
//     session,
//     status,
//     error,
//     refreshSession,
//     logout,
//     isLoading: status === SESSION_STATUS.LOADING,
//     isAuthenticated: status === SESSION_STATUS.AUTHENTICATED,
//     isError: status === SESSION_STATUS.ERROR
//   }), [session, status, error, refreshSession, logout])

//   if (status === SESSION_STATUS.LOADING) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//       </div>
//     )
//   }

//   if (status === SESSION_STATUS.ERROR) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-xl font-semibold text-red-600 mb-2">Session Error</h2>
//           <p className="text-gray-600 mb-4">{error?.message || 'An error occurred while loading your session'}</p>
//           <button
//             onClick={refreshSession}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <SessionContext.Provider value={value}>
//       {children}
//     </SessionContext.Provider>
//   )
// }

// export default SessionProvider