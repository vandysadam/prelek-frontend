import React from "react";
import { CompanyRequest } from "../../../../modules/company/company-request/entities/company-request.entity";

interface Props {
  companyRequest: CompanyRequest;
}

const PendingSection: React.FC<Props> = ({ companyRequest }: Props) => {
  return (
    <div className="py-5">
      <h4 className="font-bold uppercase pb-5">Request Information</h4>
      <div className="flex justify-between ">
        <span>Company Name</span>
        <span>{companyRequest.requested_company_name}</span>
      </div>
      <div className="flex justify-between ">
        <span>Pic name</span>
        <span>{companyRequest.requested_pic_name}</span>
      </div>
      <div className="flex justify-between ">
        <span>Company Phone</span>
        <span>{companyRequest.requested_company_phone}</span>
      </div>
      <div className="flex justify-between ">
        <span>Company E-mail</span>
        <span>{companyRequest.requested_company_email}</span>
      </div>
      <div className="flex justify-between ">
        <span>Company Address</span>
        <span>{companyRequest.requested_company_address ?? "-"}</span>
      </div>
    </div>
  );
};

export default PendingSection;
