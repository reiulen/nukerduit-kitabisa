import {useSessionAuth} from  "@/stores/useAuthStore";
import * as React from "react";
import { Navigate, Outlet } from "react-router-dom";

type GuardRouteProps = {
  children?: React.ReactNode;
};

export default function GuestOnlyRoute({ children }: GuardRouteProps) {
  const {sessionUser} = useSessionAuth();

  if (sessionUser?.access_token) return <Navigate to="/admin/dashboard" replace={true} />;

  return children || <Outlet />;
}

