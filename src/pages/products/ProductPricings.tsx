import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormInput } from "../../components/inputs/FormInput";
import { ProductPricing } from "../../modules/product/entity/product-pricing.entity";
// import { yupResolver } from "@hookform/resolvers/yup";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import * as Yup from "yup";
import { FormCheckbox } from "../../components/inputs/FormCheckbox";
import { FormSelect } from "../../components/inputs/FormSelect";
import { PlanRenewalType } from "../../modules/product/enums/plan-renewal-type.enum";
import {
  useCreateProductPricingMutation,
  useUpdateProductPricingMutation,
} from "../../modules/product/api/product-pricing.api";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

type ProductPricingsProps = {
  className?: string;
  productId: string;
  productPricings: ProductPricing[];
};

type FormValues = Omit<ProductPricing, "productDetails">;

/* Validation Schema for Formik */
const resolver = classValidatorResolver(ProductPricing, {
  skipMissingProperties: true,
  skipNullProperties: true,
  skipUndefinedProperties: true,
});

const ProductPricings: React.FC<ProductPricingsProps> = ({
  productId,
  productPricings,
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
  const [pricingFormAction, setPricingFormAction] = useState<
    "create" | "edit" | null
  >(null);

  const [createProductPricing, { isLoading: createLoading }] =
    useCreateProductPricingMutation();
  const [updateProductPricing, { isLoading: updateLoading }] =
    useUpdateProductPricingMutation();

  useEffect(() => {
    console.log(productId);
  }, [productId]);

  /* On Add Product Pricing */
  const onAddProductPricing = () => {
    reset({});
    setIsEdit(false);
    setPricingFormAction("create");
  };

  /* On Edit Product Pricing */
  const onEditProductPricing = (productPricing: ProductPricing) => {
    setIsEdit(true);
    reset(productPricing);
    console.log("editProductPricing");
    setPricingFormAction("edit");
  };

  /* On Delete Product Pricing */
  const onDeleteProductPricing = () => {
    console.log("deleteProductPricing");
  };

  const onSubmit = async (data: FormValues) => {
    try {
      console.log(data);
      const {
        planName,
        freeTrialDuration,
        freeTrialType,
        hasFreeTrial,
        planPrice,
        planRenewalInterval,
        planRenewalType,
      } = data;

      if (isEdit) {
        await updateProductPricing({
          _id: watch("_id"),
          planName,
          freeTrialDuration,
          freeTrialType,
          hasFreeTrial,
          planPrice: Number(planPrice),
          planRenewalInterval: Number(planRenewalInterval),
          planRenewalType,
          productId,
        });
        setPricingFormAction(null);
      } else {
        await createProductPricing({
          planName,
          freeTrialDuration,
          freeTrialType,
          hasFreeTrial,
          planPrice: Number(planPrice),
          planRenewalInterval: Number(planRenewalInterval),
          planRenewalType,
          productId,
        });

        setPricingFormAction(null);
      }
    } catch (error) {
      console.log(error);
      toast(error.message, { type: "error" });
    }
  };

  return (
    <section className="bg-white shadow-lg rounded-sm border border-gray-200 relative mt-2">
      {/* navigation */}
      <header className="px-5 pt-4 pb-1 flex flex-row justify-between">
        <h2 className="font-semibold text-gray-800 ml-3 mt-1">
          Product Pricings
        </h2>
        <div className="flex flex-row justify-between">
          <Button color={"primary"} onClick={onAddProductPricing}>
            <FaPlus />
          </Button>
        </div>
      </header>

      {pricingFormAction == null ? (
        <div></div>
      ) : (
        <form
          className="mx-5 px-2 pt-2 pb-2 border border-gray-200"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="px-5 pb-2">
            <h2>Form {isEdit ? "Edit" : "Add"}</h2>
          </div>

          <div className="px-5 pb-2">
            <FormInput<FormValues>
              name="planName"
              id={"planName"}
              label={"Plan Name"}
              register={register}
              placeholder={"Please input plan name"}
              errors={errors}
            />
          </div>
          <div className="px-5 pb-2">
            <FormCheckbox<FormValues>
              name="hasFreeTrial"
              id={"hasFreeTrial"}
              label={"Has Free Trial"}
              register={register}
              placeholder={"Please input has free trial"}
              errors={errors}
            />
          </div>
          <div className="px-5 pb-2">
            <FormSelect<FormValues>
              name="freeTrialType"
              id={"freeTrialType"}
              label={"Free Trial Type"}
              register={register}
              placeholder={"Please input has free trial"}
              errors={errors}
            >
              <option value={""}>Select Free Trial Type</option>
              <option value={PlanRenewalType.DAILY}>Daily</option>
              <option value={PlanRenewalType.WEEKLY}>Weekly</option>
              <option value={PlanRenewalType.MONTHLY}>Monthly</option>
              <option value={PlanRenewalType.YEARLY}>Yearly</option>
              <option value={PlanRenewalType.LIFETIME}>Lifetime</option>
            </FormSelect>
          </div>
          <div className="px-5 pb-2">
            <FormInput<FormValues>
              type={"number"}
              name="freeTrialDuration"
              id={"freeTrialDuration"}
              label={"Free Trial Duration"}
              register={register}
              placeholder={"Please input has free trial"}
              errors={errors}
            />
          </div>
          <div className="px-5 pb-2">
            <FormInput<FormValues>
              type="number"
              name="planPrice"
              id={"planPrice"}
              label={"Plan Price"}
              register={register}
              placeholder={"Please input plan name"}
              errors={errors}
            />
          </div>
          <div className="px-5 pb-2">
            <FormSelect<FormValues>
              name="planRenewalType"
              id={"planRenewalType"}
              label={"Plan Renewal Type"}
              register={register}
              placeholder={"Please input plan name"}
              errors={errors}
            >
              <option value="">Select Plan Renewal Type</option>
              <option value={PlanRenewalType.DAILY}>Daily</option>
              <option value={PlanRenewalType.WEEKLY}>Weekly</option>
              <option value={PlanRenewalType.MONTHLY}>Monthly</option>
              <option value={PlanRenewalType.YEARLY}>Yearly</option>
              <option value={PlanRenewalType.LIFETIME}>Lifetime</option>
            </FormSelect>
          </div>

          <div className="px-5 pb-2">
            <FormInput<FormValues>
              type="number"
              name="planRenewalInterval"
              id={"planRenewalInterval"}
              label={"Plan Renewal Interval"}
              register={register}
              placeholder={"Please input plan renewal interval"}
              errors={errors}
            />
          </div>

          <div className="px-5 pb-2">
            <input className="btn btn-primary" type={"submit"} />
          </div>
        </form>
      )}

      <section className="px-5 pb-2 w-full overflow-x-auto mt-5">
        <table className="table table-zebra w-full ">
          <thead>
            <tr>
              <th>Plan Name</th>
              <th>Has Free Trial</th>
              <th>Free Trial Type</th>
              <th>Free Trial Duration</th>
              <th>Plan Price</th>
              <th>Plan Renewal Type</th>
              <th>Plan Renewal Interval</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {productPricings &&
              productPricings.map((productPricing) => (
                <tr key={productPricing._id}>
                  <td>{productPricing.planName}</td>
                  <td>{productPricing.hasFreeTrial}</td>
                  <td>{productPricing.freeTrialType}</td>
                  <td>{productPricing.freeTrialDuration}</td>
                  <td>{productPricing.planPrice}</td>
                  <td>{productPricing.planRenewalType}</td>
                  <td>{productPricing.planRenewalInterval}</td>
                  <td>
                    <Button
                      onClick={() => onEditProductPricing(productPricing)}
                      color={"warning"}
                    >
                      <FaEdit />
                    </Button>

                    <Button
                      onClick={() => onDeleteProductPricing()}
                      color={"error"}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default ProductPricings;
