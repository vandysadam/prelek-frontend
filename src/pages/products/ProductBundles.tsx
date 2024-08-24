import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import React from "react";
import { useForm } from "react-hook-form";
import { FormInput } from "../../components/inputs/FormInput";
import { FormSelect } from "../../components/inputs/FormSelect";
import { ProductBundle } from "../../modules/product/entity/product-bundle.entity";
import { Product } from "../../modules/product/entity/product.entity";

type ProductBundleProps = {
  className?: string;
  productId: string;
  product?: Product;
};

type FormValues = Partial<ProductBundle>;

/* Validation Schema for Formik */
const resolver = classValidatorResolver(ProductBundle, {
  skipMissingProperties: true,
  skipNullProperties: true,
  skipUndefinedProperties: true,
});

export const ProductBundles: React.FC<ProductBundleProps> = ({
  productId,
  product,
}) => {
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
    resolver,
  });

  const [isEdit, setIsEdit] = React.useState(false);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <section className="bg-white shadow-lg rounded-sm border border-gray-200 relative mt-2">
      {/* navigation */}
      <header className="px-5 pt-4 pb-1 flex flex-row justify-between">
        <h2 className="font-semibold text-gray-800 ml-3 mt-1">
          Product Bundles
        </h2>
        <div className="flex flex-row justify-between">
          <button className="btn btn-primary" onClick={() => {}}>
            Add
          </button>
        </div>
      </header>
      <form
        className="mx-5 px-2 my-5 pb-2 pt-2 border border-gray-200"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="px-5 pb-2">
          <h2>Form {isEdit ? "Edit" : "Add"}</h2>
        </div>

        <div className="px-5 pb-2">
          <FormSelect<FormValues>
            name="productId"
            id={"productId"}
            label={"Product"}
            register={register}
            placeholder={"Please input has free trial"}
            errors={errors}
          >
            <option value={""}>Select Product</option>
            {/* <option value={PlanRenewalType.DAILY}>Daily</option>
            <option value={PlanRenewalType.WEEKLY}>Weekly</option>
            <option value={PlanRenewalType.MONTHLY}>Monthly</option>
            <option value={PlanRenewalType.YEARLY}>Yearly</option>
            <option value={PlanRenewalType.LIFETIME}>Lifetime</option> */}
          </FormSelect>
        </div>
        <div className="px-5 pb-2">
          <FormSelect<FormValues>
            name="pricingId"
            id={"pricingId"}
            label={"Product Pricing"}
            register={register}
            placeholder={"Please input has free trial"}
            errors={errors}
          >
            <option value={""}>Select Product</option>
          </FormSelect>
        </div>

        <div className="px-5 pb-2">
          <input className="btn btn-primary" type={"submit"} />
        </div>
      </form>
      <main className="my-5">
        <table className="table w-full mx-5 mt-5">
          <thead>
            <tr>
              <th>Product</th>
              <th>Product Pricing</th>
              <th>Actions</th>
            </tr>
          </thead>
        </table>
      </main>
    </section>
  );
};
