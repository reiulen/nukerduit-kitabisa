import { Route, Routes } from "react-router-dom";
import Login from "@/pages/Auth/Login";
import GuardRoute from "@/components/middleware/GuardRoute";
import GuestOnlyRoute from "@/components/middleware/GuestOnlyRoute";
import DashboardIndex from "@/components/pages/Backoffice/Dashboard/Index";

const RouteApps = () => {
  return (
    <Routes>
      <Route path="/" element={<GuestOnlyRoute />}>
        <Route path="/" element={<Login />} />
      </Route>
      <Route path="/admin/*" element={<GuardRoute />}>
        <Route path="dashboard" element={<DashboardIndex />} />
      </Route>
    </Routes>
  );
};

export default RouteApps;
