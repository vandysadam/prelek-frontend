import React from "react";
import { Route, Routes } from "react-router-dom";
import OrderDetail from "./OrderDetail";
import OrderList from "./OrderList";

const OrderRoutes: React.FC = () => {
  return (
    <div>
      <Routes>
        {/* Order Routes */}
        <Route path="/list" element={<OrderList />}></Route>
        <Route path="/detail/:orderId" element={<OrderDetail />}></Route>
      </Routes>
    </div>
  );
};

export default OrderRoutes;
