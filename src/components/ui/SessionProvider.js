
'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import  {useSessionToken, verifySession } from '@/hooks/useSessionToken';

const SessionContext = createContext(null);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === null) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const initializeSession = async () => {
      await verifySession(setSession, setLoading);
      if (session) {
        setStatus('authenticated');
      } else {
        setStatus('unauthenticated');
      }
    };

    initializeSession();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="spinner border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
        <div className="mt-4 text-lg">Loading...</div>
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