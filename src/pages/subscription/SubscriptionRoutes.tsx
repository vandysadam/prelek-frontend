import React from "react";
import { Route, Routes } from "react-router-dom";
import SubscriptionDetail from "./SubscriptionDetail";
import SubscriptionList from "./SubscriptionList";
const SubscriptionRoutes: React.FC = () => {
  return (
    <div>
      <Routes>
        {/* Order Routes */}
        <Route
          path="/detail/:subscriptionId"
          element={<SubscriptionDetail />}
        ></Route>
        <Route path="/list" element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <SubscriptionList />
          </React.Suspense>
        }></Route>
      </Routes>
    </div>
  );
};

export default SubscriptionRoutes;
