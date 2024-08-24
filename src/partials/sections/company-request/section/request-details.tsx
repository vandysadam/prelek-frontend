import React from "react";
import { CompanyRequest } from "../../../../modules/company/company-request/entities/company-request.entity";
import { CompanyRequestStatus } from "../../../../modules/company/company-request/enums/company-status.enum";

import ApprovedSection from "./approved-section";
import PendingSection from "./pending-section";
import RejectedSection from "./rejected-section";
import ReviewerSection from "./reviewer-section";

interface Props {
  companyRequest: CompanyRequest;
}

const RequestDetails: React.FC<Props> = ({ companyRequest }: Props) => {
  return (
    <div className="ml-6 mr-12 mt-2 space-y-2">
      <hr />
      <div className="flex justify-between">
        <h3 className="text-xl font-bold text-center py-3">
          RequestId: {companyRequest._id}
        </h3>
        <div
          className={`px-4 py-3 rounded ${
            companyRequest.status === CompanyRequestStatus.APPROVED
              ? "bg-green-100 border border-green-400 text-green-700"
              : companyRequest.status === CompanyRequestStatus.PENDING
              ? "bg-yellow-100 border border-yellow-400 text-yellow-700"
              : "bg-red-100 border border-red-400 text-red-700"
          }`}
        >
          <span className="block sm:inline">{companyRequest.status}</span>
        </div>
      </div>

      <hr />
      <PendingSection companyRequest={companyRequest} />

      {companyRequest.status === CompanyRequestStatus.APPROVED && (
        <>
          <hr />
          <ApprovedSection companyRequest={companyRequest} />
        </>
      )}

      {companyRequest.status === CompanyRequestStatus.REJECTED && (
        <>
          <hr />
          <RejectedSection companyRequest={companyRequest} />
        </>
      )}

      {companyRequest.reviewerDetail && (
        <>
          <hr />
          <ReviewerSection companyRequest={companyRequest} />
        </>
      )}
    </div>
  );
};

export default RequestDetails;
