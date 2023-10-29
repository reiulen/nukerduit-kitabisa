import { Route, Routes } from "react-router-dom";
import Login from "@/pages/Auth/Login";
import GuardRoute from "@/components/middleware/GuardRoute";
import GuestOnlyRoute from "@/components/middleware/GuestOnlyRoute";
import DashboardIndex from "@/pages/Dashboard/Index";
import BuyTransactionIndex from "@/pages/BuyTransaction/Index";
import SellTransactionIndex from "@/pages/SellTransaction/Index";
import SummaryTransactionIndex from "@/pages/SummaryTransaction/Index";

const RouteApps = () => {
  return (
    <Routes>
      <Route path="/" element={<GuestOnlyRoute />}>
        <Route path="/" element={<Login />} />
      </Route>
      <Route path="/admin/*" element={<GuardRoute />}>
        <Route path="dashboard" element={<DashboardIndex />} />
        <Route path="buy-transaction" element={<BuyTransactionIndex />} />
        <Route path="sell-transaction" element={<SellTransactionIndex />} />
        <Route path="summary-transaction" element={<SummaryTransactionIndex />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  );
};

export default RouteApps;
