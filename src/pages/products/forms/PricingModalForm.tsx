import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { FormCheckbox } from "../../../components/inputs/FormCheckbox";
import { FormInput } from "../../../components/inputs/FormInput";
import { FormSelect } from "../../../components/inputs/FormSelect";

import ModalBase, { ModalType } from "../../../components/modal/ModalBase";
import { tmpProductPricing } from "../../../modules/product/entity/types";
import { PlanRenewalType } from "../../../modules/product/enums/plan-renewal-type.enum";

interface SubscriptionModalProps {
  modalState: boolean;
  viewOnly: boolean;
  modalType: ModalType;
  pricing: tmpProductPricing | null;
  onAddPricing?: (pricing: tmpProductPricing) => void;
  onEditPricing?: (pricing: tmpProductPricing) => void;
  onSetModalState: (modalState: boolean) => void;
}

type FormValues = Omit<tmpProductPricing, "productDetails">;

const SubscriptionAddModalForm: React.FC<SubscriptionModalProps> = ({
  modalState,
  viewOnly,
  modalType,
  pricing,
  onSetModalState,
  onAddPricing,
  onEditPricing,
}: SubscriptionModalProps) => {
  const schema = Yup.object().shape({
    planName: Yup.string().required("Plan Name is required"),
    planPrice: Yup.number()
      .when("planName", {
        is: (planName: string) => planName !== "",
        then: Yup.number().required("Plan Price is required"),
      })
      .typeError("Plan Price must be a number"),
    hasFreeTrial: Yup.boolean(),
    freeTrialDuration: Yup.number().when("hasFreeTrial", {
      is: true,
      then: Yup.number().required("Free Trial Duration is required"),
    }),
    freeTrialDurationType: Yup.string().when("hasFreeTrial", {
      is: true,
      then: Yup.string().required("Free Trial Duration Type is required"),
    }),
    freeTrialType: Yup.string().when("hasFreeTrial", {
      is: true,
      then: Yup.string().required("Free Trial Type is required"),
    }),
    planRenewalType: Yup.string().required("Plan Renewal Type is required"),
    planRenewalInterval: Yup.number()
      .when("planRenewalType", {
        is: (planName: string) => planName !== "",
        then: Yup.number().required("Plan Renewal Interval is required"),
      })
      .typeError("Plan Renewal Interval must be a number"),
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    if (data.planPrice) {
      data.planPrice = Number(data.planPrice);
    }
    if (data.planRenewalInterval) {
      data.planRenewalInterval = Number(data.planRenewalInterval);
    }
    if (data.freeTrialDuration) {
      data.freeTrialDuration = Number(data.freeTrialDuration);
    }

    if (pricing) {
      onEditPricing(data);
    }
    if (!pricing) {
      onAddPricing(data);
      reset({});
    }
  };

  /* Use Effect for Get pricing */
  React.useEffect(() => {
    if (pricing) {
      reset({
        ...pricing,
        hasFreeTrial: false,
      });
    }
    if (!pricing) {
      reset({});
    }
  }, [pricing, reset]);

  return (
    <ModalBase
      isOpen={modalState}
      setIsOpen={onSetModalState}
      modalType={modalType}
      modalHeader={
        <h2 className="text-xl font-bold text-gray-800 mt-2">
          {viewOnly ? "Details" : pricing ? "Edit Plan" : "Add Plan"}
        </h2>
      }
      modalContent={
        <form className="pb-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="text-gray-600 mx-2 space-y-1 py-5">
            <FormInput<FormValues>
              name="planName"
              id={"planName"}
              label={"Plan Name"}
              register={register}
              placeholder={"Please input plan name"}
              errors={errors}
            />
            <FormInput<FormValues>
              type="number"
              min={1}
              name="planPrice"
              id={"planPrice"}
              label={"Plan Price"}
              register={register}
              placeholder={"Please input plan name"}
              errors={errors}
            />
            <FormCheckbox<FormValues>
              name="hasFreeTrial"
              id={"hasFreeTrial"}
              label={"Has Free Trial"}
              register={register}
              placeholder={"Please input has free trial"}
              errors={errors}
            />
            {watch("hasFreeTrial") && (
              <>
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
                <FormInput<FormValues>
                  type={"number"}
                  min={1}
                  name="freeTrialDuration"
                  id={"freeTrialDuration"}
                  label={"Free Trial Duration"}
                  register={register}
                  placeholder={"Please input has free trial"}
                  errors={errors}
                />
              </>
            )}

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

            <FormInput<FormValues>
              type="number"
              min={1}
              name="planRenewalInterval"
              id={"planRenewalInterval"}
              label={"Plan Renewal Interval"}
              register={register}
              placeholder={"Please input plan renewal interval"}
              errors={errors}
            />
          </div>

          <div className="px-3 pb-2">
            <button
              className="btn btn-primary w-full"
              type={"submit"}
              onClick={(e) => {
                e.preventDefault();
                viewOnly ? onSetModalState(false) : onSubmit(watch());
              }}
            >
              {viewOnly ? "Close" : pricing ? "Edit" : "Add"}
            </button>
          </div>
        </form>
      }
    />
  );
};

export default SubscriptionAddModalForm;
