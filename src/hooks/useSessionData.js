// hooks/useSessionData.js
import { useSession } from "next-auth/react";

const useSessionData = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isAuthenticated = !!session;

  return { session, isLoading, isAuthenticated };
};

export default useSessionData;
