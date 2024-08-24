import React from "react";
import { CompanyRequest } from "../../../../modules/company/company-request/entities/company-request.entity";
import { timeParser } from "../../../../utils/timeParser";

interface Props {
  companyRequest: CompanyRequest;
}

const ReviewerSection: React.FC<Props> = ({ companyRequest }: Props) => {
  return (
    <div className="py-5">
      <div className="flex flex-col">
        <h4 className="font-bold uppercase pb-5">Reviewer Detail</h4>
        <div className="flex justify-between ">
          <span>Name</span>
          <span>{companyRequest.reviewerDetail.fullName ?? "-"}</span>
        </div>
        <div className="flex justify-between ">
          <span>Email</span>
          <span>{companyRequest.reviewerDetail.email ?? "-"}</span>
        </div>
        <div className="flex justify-between ">
          <span>Username</span>
          <span>{companyRequest.reviewerDetail.username ?? "-"}</span>
        </div>
        <div className="flex justify-between ">
          <span>Phone Number</span>
          <span>{companyRequest.reviewerDetail.phoneNumber ?? "-"}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewerSection;
