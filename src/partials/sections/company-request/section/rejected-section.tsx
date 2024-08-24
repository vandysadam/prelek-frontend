import React from "react";
import { CompanyRequest } from "../../../../modules/company/company-request/entities/company-request.entity";
import { timeParser } from "../../../../utils/timeParser";

interface Props {
  companyRequest: CompanyRequest;
}

const RejectedSection: React.FC<Props> = ({ companyRequest }: Props) => {
  return (
    <div className="py-5">
      <h4 className="font-bold uppercase pb-5">Reject Information</h4>
      <div className="flex justify-between ">
        <span>Rejected At</span>
        <span>
          {companyRequest.rejected_at
            ? timeParser(companyRequest.rejected_at)
            : "-"}
        </span>
      </div>
      <div className="flex justify-between ">
        <span>Reject Reason</span>
        <span>{companyRequest.reject_reason || "-"}</span>
      </div>
    </div>
  );
};

export default RejectedSection;
