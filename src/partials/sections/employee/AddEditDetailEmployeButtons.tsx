import React from "react";

interface Props {
  totalData: number;
  purpose: "add" | "edit" | "detail" | "lists";
  onPurposeChange: (state: "add" | "edit" | "detail" | "lists") => void;
  addEditDetailState: boolean;
  onAddEditDetailState: (state: boolean) => void;
}

const AddEditDetailEmployeeButtons: React.FC<Props> = ({
  totalData,
  purpose,
  onPurposeChange,
  addEditDetailState,
  onAddEditDetailState,
}: Props) => {
  return (
    <header className="px-5 py-4 flex justify-between">
      <h2 className="font-semibold text-gray-800 mt-1">
        {purpose === "lists" && (
          <div>
            <span>Employee List</span>
            <span className="text-gray-400 font-medium text-sm ml-1 pt-1">
              ({totalData})
            </span>
          </div>
        )}
        {purpose === "add" && <span>Create Employee</span>}
        {purpose === "edit" && <span>Edit Employee</span>}
        {purpose === "detail" && <span>Employee Details</span>}
      </h2>

      <div className="mr-6">
        {addEditDetailState === false ? (
          <div className="space-x-2">
            <button
              className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-green-500 py-auto"
              aria-label="confirm"
              onClick={(event) => {
                event.stopPropagation();
                onAddEditDetailState(true);
                onPurposeChange("add");
              }}
            >
              Add
            </button>
          </div>
        ) : (
          <div>
            {purpose !== "lists" && (
              <button
                className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-green-500 py-auto"
                aria-label="back"
                onClick={(event) => {
                  event.stopPropagation();
                  onAddEditDetailState(false);
                  onPurposeChange("lists");
                }}
              >
                Back to lists
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default AddEditDetailEmployeeButtons;
