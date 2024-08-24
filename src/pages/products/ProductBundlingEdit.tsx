import React, { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { FormInput } from "../../components/inputs/FormInput";
import { FormSelect } from "../../components/inputs/FormSelect";
import { FormTextarea } from "../../components/inputs/FormTextarea";
import {
  useCreateProductMutation,
  useGetProductDetailQuery,
  useUpdateProductMutation,
} from "../../modules/product/api/product.api";
import { Product } from "../../modules/product/entity/product.entity";
import Header from "../../partials/Header";
import Sidebar from "../../partials/sidebar/Sidebar";
import { FormDropzone } from "../../components/inputs/FormDropzone";
import { ProductFamily } from "../../modules/product/entity/product-family.entity";
import {
  useGetProductFamilyDetailQuery,
  useUpdateProductFamilyMutation,
} from "../../modules/product/api/product-family.api";

/* Validation Schema for Formik */
const validationSchema = Yup.object().shape({
  productFamilyName: Yup.string().required("Product Name is required"),
});

export type FormValues = Omit<ProductFamily, "productFamilyBenefits">;

const ProductBundlingEdit: React.FC = () => {
  /* SideBar State */
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* Create product mutation */
  const [updateProductFamily] = useUpdateProductFamilyMutation();

  /* Get Params id */
  const { id } = useParams();

  /* Navigate */
  const navigate = useNavigate();

  /* Get Product Detail Query */
  const { data: productData } = useGetProductFamilyDetailQuery(
    { id },
    { skip: false, refetchOnMountOrArgChange: true }
  );

  /* React Hook Form */
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  /* Use Effect for Get Product Detail */
  useEffect(() => {
    if (productData?.data) {
      reset(productData.data);
    }
  }, [productData, reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      const { productFamilyName } = data;
      const createdProduct = await updateProductFamily({
        _id: id,
        productFamilyName,
        productFamilyDescription: "",
        isLimited: false,
        quota: 0,
      }).unwrap();
      if (createdProduct) {
        toast.success("Product created successfully");
        navigate("/product/list");
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

            {/* Edit Product Form */}
            <section className="bg-white shadow-lg rounded-sm border border-gray-200 relative">
              {/* navigation */}
              <header className="px-5 pt-4 pb-1 flex flex-row">
                <Link
                  to="/product/bundling-package/list"
                  className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-indigo-500"
                >
                  <FaArrowLeft />
                </Link>
                <h2 className="font-semibold text-gray-800 ml-3 mt-1">
                  Bundling Package Edit
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
                    register={register}
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
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductBundlingEdit;
