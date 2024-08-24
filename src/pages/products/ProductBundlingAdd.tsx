import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { FormInput } from "../../components/inputs/FormInput";
import { FormTextarea } from "../../components/inputs/FormTextarea";
import { useCreateProductFamilyMutation } from "../../modules/product/api/product-family.api";
import { ProductFamily } from "../../modules/product/entity/product-family.entity";
import Header from "../../partials/Header";
import Sidebar from "../../partials/sidebar/Sidebar";

/* Validation Schema for Formik */
const validationSchema = Yup.object().shape({
  productFamilyName: Yup.string().required("Product Name is required"),
});

export type FormValues = Omit<ProductFamily, "productFamilyBenefits">;

function ProductBundlingAdd() {
  /* SideBar State */
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  /* Create product mutation */
  const [createProductFamily] = useCreateProductFamilyMutation();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  /* Navigate */
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    try {
      const { productFamilyName, productFamilyDescription, isLimited, quota } =
        data;
      const createdProduct = await createProductFamily({
        productFamilyName,
        productFamilyDescription,
        isLimited,
        quota,
      }).unwrap();
      if (createdProduct) {
        toast.success("Product created successfully");
        navigate("/product/family/list");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

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
                  Product Bundling Package
                </h1>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative">
              {/* navigation */}
              <header className="px-5 pt-4 pb-1 flex flex-row">
                <Link
                  to="/product/bundling-package/list"
                  className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-indigo-500"
                >
                  <FaArrowLeft />
                </Link>
                <h2 className="font-semibold text-gray-800 ml-3 mt-1">
                  New Bundling Package
                </h2>
              </header>

              <form onSubmit={handleSubmit(onSubmit)} className="mb-2">
                <div className="px-5 pb-2">
                  <FormInput<FormValues>
                    name="productFamilyName"
                    id={"productFamilyName"}
                    label={"Bundling Package Name"}
                    register={register}
                    placeholder={"ex: contag lebaran package"}
                    errors={errors}
                  />
                </div>
                <div className="px-5 pb-2">
                  <FormTextarea<FormValues>
                    name="productFamilyDescription"
                    id={"productFamilyDescription"}
                    label={"Bundling Package Description"}
                    errors={errors}
                    placeholder={"Please input product description"}
                  />
                </div>
                <div className="px-5 pb-2">
                  <FormInput<FormValues>
                    name="quota"
                    id={"quota"}
                    label={"Quota"}
                    register={register}
                    placeholder={"Please input Quota"}
                    errors={errors}
                  />
                </div>
                <div className="px-5 pb-2">
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-primary"
                  />
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProductBundlingAdd;
