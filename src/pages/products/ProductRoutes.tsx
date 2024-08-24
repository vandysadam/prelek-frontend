import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductAdd from "./ProductAdd";
import ProductBundlingAdd from "./ProductBundlingAdd";
import ProductBundlingEdit from "./ProductBundlingEdit";
import ProductBundlingList from "./ProductBundlingList";
import ProductDetail from "./ProductDetail";
import ProductEdit from "./ProductEdit";
import ProductList from "./ProductList";

const ProductRoutes: React.FC = () => {
  return (
    <div>
      <Routes>
        {/* Product Routes */}
        <Route path="/list" element={<ProductList />} />
        <Route path="/add" element={<ProductAdd />} />
        <Route path="/detail/:id" element={<ProductDetail />} />
        <Route path="/edit/:id" element={<ProductEdit />} />

        {/* Bundling Package (Product Families) Routes */}
        <Route
          path="/bundling-package/list"
          element={<ProductBundlingList />}
        ></Route>
        <Route
          path="/bundling-package/add"
          element={<ProductBundlingAdd />}
        ></Route>
        <Route
          path="/bundling-package/edit/:id"
          element={<ProductBundlingEdit />}
        ></Route>
      </Routes>
    </div>
  );
};

export default ProductRoutes;
