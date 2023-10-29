import { useSessionAuth } from "@/stores/useAuthStore";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

type GuardRouteProps = {
  children?: React.ReactNode;
};

export default function GuardRoute({ children }: GuardRouteProps) {
  const { sessionUser } = useSessionAuth();
  if (!sessionUser?.access_token)
    return <Navigate to="/" replace={true} />;

  return children || <Outlet />;
}
