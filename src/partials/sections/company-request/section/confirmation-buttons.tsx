import React from "react";
import { CompanyRequest } from "../../../../modules/company/company-request/entities/company-request.entity";
import { UserRoleEnum } from "../../../../modules/users/enums/user-role.enum";
import { useTypedSelector } from "../../../../store";

interface Props {
  companyRequest: CompanyRequest;
  purpose: "approve" | "reject" | "detail";
  onPurposeChange: (state: "approve" | "reject" | "detail") => void;
  confirmPageState: boolean;
  onConfirmPageChange: (state: boolean) => void;
}

const ConfirmationButtons: React.FC<Props> = (props: Props) => {
  const currentUser = useTypedSelector((state) => state.authSlice.user);
  return (
    <div className="mr-6">
      {[
        UserRoleEnum.SUPER_USER,
        UserRoleEnum.ADMIN,
        UserRoleEnum.MARKETING,
      ].includes(currentUser.role as UserRoleEnum) && (
        <div>
          {props.confirmPageState === false ? (
            <div className="space-x-2">
              <button
                className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-red-500 py-auto"
                aria-label="reject"
                onClick={(event) => {
                  event.stopPropagation();
                  props.onConfirmPageChange(true);
                  props.onPurposeChange("reject");
                }}
              >
                Reject
              </button>

              <button
                className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-green-500 py-auto"
                aria-label="confirm"
                onClick={(event) => {
                  event.stopPropagation();
                  props.onConfirmPageChange(true);
                  props.onPurposeChange("approve");
                }}
              >
                Approve
              </button>
            </div>
          ) : (
            <div>
              {props.purpose === "approve" ? (
                <button
                  className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-green-500 py-auto"
                  aria-label="back"
                  onClick={(event) => {
                    event.stopPropagation();
                    props.onConfirmPageChange(false);
                    props.onPurposeChange("detail");
                  }}
                >
                  Back to details
                </button>
              ) : (
                <button
                  className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-green-500 py-auto"
                  aria-label="back"
                  onClick={(event) => {
                    event.stopPropagation();
                    props.onConfirmPageChange(false);
                    props.onPurposeChange("detail");
                  }}
                >
                  Back to details
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConfirmationButtons;
