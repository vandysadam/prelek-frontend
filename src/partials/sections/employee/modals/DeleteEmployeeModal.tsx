import React from "react";
import { LoadingButton } from "@mui/lab";
import { Box, Typography, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import ModalBase, { ModalType } from "../../../../components/modal/ModalBase";
import { useDeleteEmployeeMutation } from "../../../../modules/employee/api/employee.api";
import { Employee } from "../../../../modules/employee/entities/employee.entity";

interface Props {
  employeeData: Employee | null;
  modalState: boolean;
  onModalStateChange: (modalState: boolean) => void;
  successCallback: (purpose: "add" | "edit" | "detail" | "lists") => void;
}

const DeleteEmployeeModal: React.FC<Props> = ({
  employeeData,
  modalState,
  onModalStateChange,
  successCallback,
}: Props) => {
  const [deleteEmployee, { isLoading: deleting }] = useDeleteEmployeeMutation();

  const handleDelete = async () => {
    if (employeeData) {
      try {
        await deleteEmployee({
          id: employeeData._id,
        }).unwrap();
        toast.success(`${employeeData.name} Deleted Successfully!`, {
          theme: "dark",
        });
        onModalStateChange(false);
        successCallback("lists");
      } catch (error) {
        toast.error("Something went wrong!", {
          theme: "dark",
        });
        console.log(error);
      }
    }
  };
  return (
    <ModalBase
      isOpen={modalState}
      setIsOpen={onModalStateChange}
      modalType={ModalType.DELETE}
      modalHeader={
        <h2 className="text-xl font-bold text-gray-800">
          Delete{" "}
          {(employeeData && `${employeeData.name} ?`) ?? "this Employee?"}
        </h2>
      }
      modalContent={
        <span className="w-full">
          Are you sure?, the data you have been delete can't be restored.
        </span>
      }
      modalFooter={
        <div className="flex lg:justify-end">
          <div>
            <LoadingButton
              loading={deleting}
              loadingIndicator={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CircularProgress
                    size={20}
                    sx={{ color: "white" }}
                    thickness={4}
                  />
                  <Typography sx={{ color: "white", fontSize: "1em", ml: 1 }}>
                    {"Deleting ..."}
                  </Typography>
                </Box>
              }
              type="submit"
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              className={
                "w-full m-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              }
              sx={{ backgroundColor: "red !important" }}
              disabled={deleting}
            >
              Save
            </LoadingButton>

            <button
              className="m-4 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => {
                onModalStateChange(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      }
    />
  );
};
export default DeleteEmployeeModal;
