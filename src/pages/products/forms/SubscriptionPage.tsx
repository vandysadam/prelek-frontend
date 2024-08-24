import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { FormInput } from "../../../components/inputs/FormInput";
import { FormTextarea } from "../../../components/inputs/FormTextarea";
import { useCreateProductWPricingMutation } from "../../../modules/product/api/product.api";
import { CreateProductWPricingRequest } from "../../../modules/product/dtos/requests/create-product-with-pricing.request";
import { UpdateProductWPricingRequest } from "../../../modules/product/dtos/requests/update-product-with-pricing.request";
import { Product } from "../../../modules/product/entity/product.entity";
import { productPricingSlice } from "../../../modules/product/entity/product.slice";
import { ProductType } from "../../../modules/product/enums/product-type.enum";
import { useTypedDispatch, useTypedSelector } from "../../../store";
import SubscriptionPlanPage from "./SubscriptionPlanPage";

const validationSchema = Yup.object().shape({
  productName: Yup.string().required("Product Name is required"),
  productDescription: Yup.string().required("Product Description is required"),
});

interface SubscriptionPageProps {
  productFromDb?: Product | undefined;
}

type SubscriptionPageValue = Omit<Product, "productBenefits" | "pricings">;

const SubscriptionPage: React.FC<SubscriptionPageProps> = ({
  productFromDb,
}: SubscriptionPageProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubscriptionPageValue>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  /* redux state used on update data as displayed data */
  const productPricings = useTypedSelector(
    (state) => state.productPricingSlice.productPricings
  );

  /* as data that marked as created */
  const createdPricings = useTypedSelector(
    (state) => state.productPricingSlice.createdPricings
  );
  /* as data that marked as updated */
  const updatedPricings = useTypedSelector(
    (state) => state.productPricingSlice.updatedPricings
  );
  /* as data that marked as deleted */
  const deletedPricings = useTypedSelector(
    (state) => state.productPricingSlice.deletedPricings
  );

  /* redux state used on create data */
  const tmpProductPricings = useTypedSelector(
    (state) => state.productPricingSlice.tmpProductPricings
  );

  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const [createProductWPricing, { isLoading }] =
    useCreateProductWPricingMutation();

  const onSubmit = async (data: SubscriptionPageValue) => {
    if (
      (productFromDb && productPricings.length === 0) ||
      (!productFromDb && tmpProductPricings.length === 0)
    ) {
      toast.error("Please add at least one subscription plan!");
      return;
    }

    // create product
    if (!productFromDb) {
      const Product: Product = {
        productName: data.productName,
        productType: ProductType.SUBSCRIPTION,
        productDescription: data.productDescription,
      };
      const createPayload: CreateProductWPricingRequest = {
        ...Product,
        productPricing: tmpProductPricings,
      };
      try {
        const createdProduct = await createProductWPricing(
          createPayload
        ).unwrap();
        if (createdProduct) {
          navigate("/product/list");
          reset({});
          dispatch(productPricingSlice.actions.setTmpProductPricings([]));
          toast.success("Product created successfully");
        }
      } catch (error) {
        toast.error(error.message);
      }
    }

    // update product
    if (productFromDb) {
      const Product: Product = {
        productName: data.productName,
        productType: ProductType.SUBSCRIPTION,
        productDescription: data.productDescription,
      };
      const updatePayload: UpdateProductWPricingRequest = {
        ...Product,
        productPricing: tmpProductPricings,
        createdProductPricing: createdPricings,
        updatedProductPricing: updatedPricings,
        deletedProductPricing: deletedPricings,
      };
      console.log("update", updatePayload);
      // try {
      //   const createdProduct = await createProductWPricing(
      //     createPayload
      //   ).unwrap();
      //   if (createdProduct) {
      //     navigate("/product/list");
      //     reset({});
      //     dispatch(productPricingSlice.actions.setTmpProductPricings([]));
      //     toast.success("Product created successfully");
      //   }
      // } catch (error) {
      //   toast.error(error.message);
      // }
    }
  };

  /* on init */
  React.useEffect(() => {
    if (productFromDb) {
      dispatch(
        productPricingSlice.actions.setProductPricings(productFromDb.pricings)
      );
    }
    if (typeof tmpProductPricings === "undefined") {
      dispatch(productPricingSlice.actions.setTmpProductPricings([]));
    }

    dispatch(productPricingSlice.actions.clearPricingList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    console.log("productPricings", productPricings);
    console.log("tmpProductPricings", tmpProductPricings);
    console.log("createdPricings", createdPricings);
    console.log("updatedPricings", updatedPricings);
    console.log("deletedPricings", deletedPricings);
  }, [
    productPricings,
    tmpProductPricings,
    createdPricings,
    updatedPricings,
    deletedPricings,
  ]);

  React.useEffect(() => {
    if (productFromDb) {
      reset({
        ...productFromDb,
        productName: productFromDb.productName,
        productDescription: productFromDb.productDescription,
      });
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-2 space-y-5">
      <div className="pt-5">
        <FormInput<SubscriptionPageValue>
          name="productName"
          id={"productName"}
          label={"Product Name"}
          register={register}
          placeholder={"Please input product name"}
          errors={errors}
        />
      </div>

      <div className="pb-2">
        <FormTextarea<SubscriptionPageValue>
          name="productDescription"
          id={"productDescription"}
          label={"Product Description"}
          register={register}
          placeholder={"Please input product description"}
          errors={errors}
        />
      </div>

      <SubscriptionPlanPage
        pricings={productFromDb ? productPricings : tmpProductPricings}
        editMode={productFromDb ? true : false}
      />

      <div className="pb-2">
        <LoadingButton
          loading={isLoading}
          loadingIndicator={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CircularProgress
                size={20}
                sx={{ color: "white" }}
                thickness={4}
              />
              <Typography sx={{ color: "white", fontSize: "1em", ml: 1 }}>
                Creating...
              </Typography>
            </Box>
          }
          type="submit"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          fullWidth
          disabled={isLoading}
        >
          Create
        </LoadingButton>
      </div>
    </form>
  );
};

export default SubscriptionPage;
