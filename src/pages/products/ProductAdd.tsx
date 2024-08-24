import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { FormSelect } from "../../components/inputs/FormSelect";
import { Product } from "../../modules/product/entity/product.entity";
import Header from "../../partials/Header";
import Sidebar from "../../partials/sidebar/Sidebar";
import SingleForm from "./forms/SingleForm";
import SubscriptionPage from "./forms/SubscriptionPage";

function ProductAdd() {
  /* SideBar State */
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const validationSchema = Yup.object().shape({
    productType: Yup.string().required("Product Type is required"),
  });

  type FormValues = Omit<Product, "productBenefits" | "pricings">;

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                  Product
                </h1>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative">
              {/* navigation */}
              <header className="px-5 pt-4 pb-1 flex flex-row">
                <Link
                  to="/product/list"
                  className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-indigo-500"
                >
                  <FaArrowLeft />
                </Link>
                <h2 className="font-semibold text-gray-800 ml-3 mt-1">
                  New Product
                </h2>
              </header>

              <div className="px-10 py-6">
                <FormSelect<FormValues>
                  name="productType"
                  id={"productType"}
                  label={"Product Type"}
                  register={register}
                  errors={errors}
                >
                  <option value="">Please select product type</option>
                  <option value="single">Product</option>
                  <option value="subscription">Subscription</option>
                </FormSelect>
                {watch("productType") === "single" && <SingleForm />}
                {watch("productType") === "subscription" && (
                  <SubscriptionPage />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProductAdd;
