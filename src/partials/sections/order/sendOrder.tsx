import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import ModalBase, { ModalType } from "../../../components/modal/ModalBase";
import {
  useRejectOrderMutation,
  useSendOrderMutation,
  useTraceOrderMutation,
} from "../../../modules/orders/api/order.api";
import { Order } from "../../../modules/orders/dtos/models/order.entity";

interface Props {
  modalState: boolean;
  modalType: ModalType;
  purpose: string;
  courier: string;
  order: Order | null;
  onSetModalState: (modalState: boolean) => void;
  onApiCall: (status: string) => void;
}

const SendOrder: React.FC<Props> = (props: Props) => {
  const [trace, { isLoading: loadingTrace, isError: traceError }] =
    useTraceOrderMutation();
  const [send] = useSendOrderMutation();
  const [reject] = useRejectOrderMutation();

  const validateTrackingNumber = async (
    trackingNumber: string,
    courier: string
  ) => {
    try {
      await trace({ trackingNumber, courier }).unwrap();
      return true;
    } catch (err) {
      console.log(err);
      if (err.data.statusCode < 500) {
        toast.error(err.data.message, {
          theme: "dark",
        });
      }
      if (err.data.statusCode >= 500) {
        toast.error("Something went wrong, please try again later!");
      }
      return false;
    }
  };

  const handleSubmit = async (formValue: any) => {
    const validNumber = await validateTrackingNumber(
      formValue.trackingNumber,
      props.courier
    );
    try {
      if (props.order && props.order !== null && validNumber) {
        if (props.purpose === "approve") {
          await send({
            orderId: props.order._id,
            trackingNumber: formValue.trackingNumber,
          });
          toast.success(
            `${
              props.order.userDetails.username + " order" ?? ""
            } order confimed!`,
            {
              theme: "dark",
            }
          );
        }
        if (props.purpose === "reject") {
          await reject({
            orderId: props.order._id,
            rejectReason: formValue.rejectReason,
          });
        }
        props.onApiCall("success");
        props.onSetModalState(false);
        formValue.resetForm();
      }
    } catch (error) {
      console.log(error);
      props.onApiCall("fail");
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

  /* Initial State for Formik form */
  const initialState = {
    trackingNumber: "",
    rejectOptions: "",
    rejectReason: "",
  };

  /* Validation Schema for Formik */
  const validationSchema = React.useMemo(() => {
    if (props.purpose === "reject") {
      return Yup.object().shape({
        rejectOptions: Yup.string().required("Reject reason is required!"),
        rejectReason: Yup.string().required("Note is required!"),
      });
    }
    if (props.purpose === "approve") {
      return Yup.object().shape({
        trackingNumber: Yup.string().required("Tracking number is required!"),
      });
    }
  }, [props.purpose]);

  return (
    <Formik
      initialValues={initialState}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isValid, values, setFieldValue }) => (
        <Form>
          <ModalBase
            isOpen={props.modalState}
            setIsOpen={props.onSetModalState}
            modalType={props.modalType}
            modalHeader={
              <h2 className="text-xl font-bold text-gray-800">
                {props.purpose === "approve" ? "Confirm Order" : "Reject Order"}
              </h2>
            }
            modalContent={
              <div className="text-gray-600">
                {props.purpose === "approve" ? (
                  <div className="space-y-4">
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="trackingNumber"
                      >
                        Nomer Resi <span className="text-red-500">*</span>
                      </label>
                      <Field
                        id="trackingNumber"
                        name="trackingNumber"
                        placeholder="021020074257518"
                        className="form-input w-full"
                        type="trackingNumber"
                      />
                      <div className="h-2">
                        <ErrorMessage
                          name="trackingNumber"
                          component="span"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="rejectOptions"
                      >
                        Reject Reason
                        <span className="text-red-500"> *</span>
                      </label>
                      <Field
                        as="select"
                        id="rejectOptions"
                        name="rejectOptions"
                        className="form-input w-full"
                        type="text"
                        onChange={(event) => {
                          if (event.target.value !== "") {
                            setFieldValue("rejectOptions", event.target.value);
                            if (event.target.value === "out_of_stock") {
                              setFieldValue("rejectReason", "Out of Stock");
                            } else if (event.target.value === "not_available") {
                              setFieldValue("rejectReason", "Not Available");
                            } else {
                              setFieldValue("rejectReason", "");
                            }
                          } else {
                            setFieldValue("rejectOptions", "");
                            setFieldValue("rejectReason", "");
                          }
                        }}
                      >
                        <option value="">Select Reason</option>
                        <option value="out_of_stock">Out Of Stock</option>
                        <option value="not_available">Not Available</option>
                        <option value="other">Other</option>
                      </Field>
                      <div className="h-2">
                        <ErrorMessage
                          name="rejectOptions"
                          component="span"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="rejectReason"
                      >
                        rejectReason
                        <span className="text-red-500"> *</span>
                      </label>
                      <Field
                        id="rejectReason"
                        as="textarea"
                        rows="3"
                        name="rejectReason"
                        placeholder="rejectReason"
                        className="form-input w-full"
                        disabled={values.rejectOptions !== "other"}
                      />
                      <div className="h-2">
                        <ErrorMessage
                          name="rejectReason"
                          component="span"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            }
            modalFooter={
              <div className="flex lg:justify-end pt-3">
                <div>
                  <button
                    className={`w-full m-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2  sm:ml-3 sm:w-auto sm:text-sm ${
                      props.purpose === "approve"
                        ? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                        : "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                    }`}
                    type="submit"
                    disabled={!isValid}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit(values);
                    }}
                  >
                    {props.purpose === "approve" ? (
                      <span>Confirm</span>
                    ) : (
                      <>
                        {isValid ? "Reject" : "Please fill all required field"}
                      </>
                    )}
                  </button>
                  <button
                    className="m-4 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      props.onSetModalState(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            }
          />
        </Form>
      )}
    </Formik>
  );
};

export default SendOrder;
