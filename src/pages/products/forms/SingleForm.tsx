import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { Accept } from "react-dropzone";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { FormDropzone } from "../../../components/inputs/FormDropzone";
import { FormInput } from "../../../components/inputs/FormInput";
import { FormTextarea } from "../../../components/inputs/FormTextarea";
import { useCreateProductWPricingMutation } from "../../../modules/product/api/product.api";
import { CreateProductWPricingRequest } from "../../../modules/product/dtos/requests/create-product-with-pricing.request";
import { ProductPricing } from "../../../modules/product/entity/product-pricing.entity";
import { Product } from "../../../modules/product/entity/product.entity";
import { productPricingSlice } from "../../../modules/product/entity/product.slice";
import { PlanRenewalType } from "../../../modules/product/enums/plan-renewal-type.enum";
import { ProductType } from "../../../modules/product/enums/product-type.enum";
import { useTypedDispatch } from "../../../store";

/* Validation Schema for Formik */
const validationSchema = Yup.object().shape({
  productName: Yup.string().required("Product Type is required!"),
  productDescription: Yup.string().required("Product Type is required!"),
  productPrice: Yup.number()
    .typeError("Price must be a number!")
    .min(1, "Price must be greater than 0 !")
    .required("Price is required!"),
});

export type SingleFormValue = Omit<Product, "productBenefits" | "pricings">;

interface SingleFormProps {
  productFromDb?: Product | undefined;
}

const SingleForm: React.FC<SingleFormProps> = ({
  productFromDb,
}: SingleFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<SingleFormValue>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  /* Create product mutation */
  const [createProductWPricing, { isLoading, isError }] =
    useCreateProductWPricingMutation();

  // file to base64 converter
  const getBase64 = (file: File): Promise<string | ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const acceptedFiles: Accept = {
    "image/png": [".png"],
    "image/jpeg": [".jpeg", ".jpg"],
  };

  const [base64Image, setBase64Image] = React.useState<
    string | ArrayBuffer | null
  >(null);

  React.useEffect(() => {
    if (productFromDb) {
      reset({
        ...productFromDb,
      });
      if (productFromDb.productImageUrl.length > 0) {
        setBase64Image(productFromDb.productImageUrl);
      }
      if (productFromDb.pricings.length > 0) {
        reset({
          ...productFromDb,
          productPrice: productFromDb.pricings[0].planPrice,
        });
      }
    }
    console.log("productFromDb", productFromDb);
    console.log("base64Image", base64Image);
  }, []);

  React.useEffect(() => {
    console.log("base64Image", base64Image);
  }, [base64Image]);

  const onSubmit = async (data: SingleFormValue) => {
    // create
    if (!productFromDb) {
      const pricing: ProductPricing = {
        planName: data.productName,
        planPrice: data.productPrice,
        hasFreeTrial: false,
        freeTrialType: null,
        freeTrialDuration: null,
        planRenewalInterval: null,
        planRenewalType: PlanRenewalType.LIFETIME,
      };

      const Product: Product = {
        productName: data.productName,
        productType: ProductType.SINGLE,
        productImage: base64Image,
        productDescription: data.productDescription,
      };

      const createPayload: CreateProductWPricingRequest = {
        ...Product,
        productPricing: [pricing],
      };

      try {
        const createdProduct = await createProductWPricing(
          createPayload
        ).unwrap();
        if (createdProduct) {
          toast.success("Product created successfully");
          navigate("/product/list");
          dispatch(productPricingSlice.actions.setTmpProductPricings([]));
          reset({});
        }
      } catch (error) {
        toast.error(error.message);
      }
    }

    // update
    if (productFromDb) {
      let pricing: ProductPricing = {
        planName: data.productName,
      };

      let planPrice = data.productPrice || productFromDb.pricings[0].planPrice;

      if (productFromDb.pricings.length > 0) {
        pricing = {
          ...productFromDb.pricings[0],
          planName: data.productName,
          planPrice: planPrice,
        };
      }

      if (productFromDb.pricings.length === 0) {
        pricing = {
          planName: data.productName,
          planPrice: data.productPrice,
          hasFreeTrial: false,
          freeTrialType: null,
          freeTrialDuration: null,
          planRenewalInterval: null,
          planRenewalType: PlanRenewalType.LIFETIME,
        };
      }

      let images: string = "";

      if (
        typeof base64Image === "string" &&
        base64Image.length > 0 &&
        base64Image.includes("data:image")
      ) {
        images = base64Image;
      } else {
        images = productFromDb.productImageUrl;
      }

      let Product: Product = {
        ...productFromDb,
        productName: data.productName,
        productDescription: data.productDescription,
        productImageUrl: images,
      };

      // const updatePayload: any = {
      //   ...Product,
      //   productPricing: [pricing],
      // };

      // try {
      //   const updatedProduct = await updateProductWPricing(
      //     updatePayload
      //   ).unwrap();
      //   if (updatedProduct) {
      //     toast.success("Product updated successfully");
      //     navigate("/product/list");
      //     dispatch(productPricingSlice.actions.setTmpProductPricings([]));
      //     reset({});
      //   }
      // }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-2 space-y-5">
      <div className="px-5 pb-2 pt-5">
        {base64Image && (
          <div className="flex justify-center pb-5">
            <div
              className="relative"
              onClick={() => {
                setBase64Image(null);
                setValue("productImage", null);
              }}
            >
              <img
                width={300}
                src={base64Image as string}
                alt="product"
                className="object-cover"
              />
              <div className="absolute z-10 -right-2 -top-2 flex justify-center items-center w-8 h-8 rounded-full bg-white text-red-500 border border-red-500">
                x
              </div>
            </div>
          </div>
        )}

        {!base64Image && (
          <FormDropzone<SingleFormValue>
            name="productImage"
            id="productImage"
            register={register}
            control={control}
            onDrop={async (files) => {
              const file = files[0];
              setValue("productImage", file);
              const getImage = await getBase64(file);
              setBase64Image(getImage);
              return file;
            }}
            label="Product Image"
            placeholder="Product Image"
            maxFiles={1}
            maxSize={1024 * 1024 * 3}
            accept={acceptedFiles}
            errors={errors}
          />
        )}
      </div>

      <div className="pt-5">
        <FormInput<SingleFormValue>
          name="productName"
          id={"productName"}
          label={"Product Name"}
          register={register}
          placeholder={"Please input product name"}
          errors={errors}
        />
      </div>

      <div className="">
        <FormTextarea<SingleFormValue>
          name="productDescription"
          id={"productDescription"}
          label={"Product Description"}
          register={register}
          placeholder={"Please input product description"}
          errors={errors}
        />
      </div>

      <div className="pb-2">
        <FormInput<SingleFormValue>
          type={"number"}
          min={1}
          name="productPrice"
          id={"productPrice"}
          label={"Product Price"}
          register={register}
          placeholder={"Please input product price"}
          errors={errors}
        />
      </div>

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
                {/* Creating... */}
                Saving...
              </Typography>
            </Box>
          }
          type="submit"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          fullWidth
          disabled={isLoading}
        >
          Save
        </LoadingButton>
      </div>
    </form>
  );
};

export default SingleForm;
