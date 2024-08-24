import { yupResolver } from "@hookform/resolvers/yup";

import { LoadingButton } from "@mui/lab";
import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { FormTextarea } from "../../../../components/inputs/FormTextarea";
import { useCompanyRequestRejectMutation } from "../../../../modules/company/company-request/api/company-request.api";
import { RejectCompanyRequestDto } from "../../../../modules/company/company-request/dtos/requests/reject-company.request";
import { CompanyRequest } from "../../../../modules/company/company-request/entities/company-request.entity";

interface Props {
  companyRequest: CompanyRequest;
  successCallback: (purpose: "approve" | "reject" | "detail") => void;
}

export type RejectCompanyRequest = Omit<RejectCompanyRequestDto, "">;

const RejectCompanyRequest: React.FC<Props> = (props: Props) => {
  const [reject, { isLoading }] = useCompanyRequestRejectMutation();

  /* Initial State for Formik form */
  const initialState: RejectCompanyRequestDto = {
    company_request_id: "",
    reject_reason: "",
  };

  /* Validation Schema for Formik */
  const validationSchema = Yup.object().shape({
    reject_reason: Yup.string().required("Field is Required!"),
  });

  const RHF = useForm<RejectCompanyRequestDto>({
    defaultValues: initialState,
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = RHF;

  const onSubmit = async (formValue: RejectCompanyRequestDto) => {
    try {
      await reject({
        ...formValue,
        company_request_id: props.companyRequest._id,
      });
      toast.success(
        `${props.companyRequest.requested_company_name} Rejected Sucessfully!`,
        {
          theme: "dark",
        }
      );
      props.successCallback("detail");
    } catch (error) {
      if (error.data.statusCode < 500) {
        toast.error(error.data.message, {
          theme: "dark",
        });
      }
      if (error.data.statusCode >= 500) {
        toast.error("Something went wrong, please try again later!");
      }
    }
  };

  return (
    <div className="mt-5 px-7">
      <h2 className="text-xl font-bold text-gray-800">
        Reject {props.companyRequest.requested_company_name} ?
      </h2>
      <FormProvider {...RHF}>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-2 space-y-5">
          <div className="text-gray-600">
            <div className="space-y-4">
              {/* Company Address */}
              <div className="grid col-span-12 md:col-span-4">
                <FormTextarea<RejectCompanyRequest>
                  name="reject_reason"
                  id={"reject_reason"}
                  label={"Reject Reason *"}
                  register={register}
                  placeholder={"Please input product name"}
                  errors={errors}
                  rows={10}
                />
              </div>
            </div>
          </div>
          <div className="flex lg:justify-end pt-3">
            <div>
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
                      Rejecting...
                    </Typography>
                  </Box>
                }
                className={
                  "m-4 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2  sm:ml-3 sm:w-auto sm:text-sm"
                }
                sx={{
                  backgroundColor: "red !important",
                  "&:hover": {
                    backgroundColor: "red !important",
                  },
                }}
                type="submit"
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                disabled={isLoading}
              >
                {errors ? "Reject" : "Please fill all required field"}
              </LoadingButton>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default RejectCompanyRequest;
