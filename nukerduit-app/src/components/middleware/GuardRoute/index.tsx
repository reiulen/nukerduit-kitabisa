import { useSessionAuth } from "../../../stores/useAuthStore";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

type GuardRouteProps = {
  children?: React.ReactNode;
};

export default function GuardRoute({ children }: GuardRouteProps) {
  const { sessionUser } = useSessionAuth();
  // const { logOut } = useAuthStore();
  // const [isTokenExpired, setIsTokenExpired] = useState<boolean>(false);

  // useEffect(() => {
  //   const currentTime = Math.floor(new Date().getTime() / 1000);
  //   const loginTime = Math.floor(new Date(sessionUser.logged_in_at).getTime() / 1000);
  //   const expirationTime = loginTime + sessionUser.expires_in;

  //   if (currentTime > expirationTime) {
  //     setIsTokenExpired(true);
  //     logOut();
  //     toast.error("Session expired, please login again.");
  //   }
  // }, []);

  if (!sessionUser?.access_token)
    return <Navigate to="/" replace={true} />;

  return children || <Outlet />;
}
