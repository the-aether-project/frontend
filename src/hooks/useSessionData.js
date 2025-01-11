// hooks/useSessionData.js
import { useSession } from "./app/ui/components/SessionProvider";

const useSessionData = () => {
  const { session, status } = useSession();
  const isLoading = status === "loading";
  const isAuthenticated = !!session;

  return { session, isLoading, isAuthenticated };
};

export default useSessionData;
