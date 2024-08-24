import React from "react";
import { CompanyRequest } from "../../../../modules/company/company-request/entities/company-request.entity";
import { timeParser } from "../../../../utils/timeParser";

interface Props {
  companyRequest: CompanyRequest;
}

const ApprovedSection: React.FC<Props> = ({ companyRequest }: Props) => {
  return (
    <div className="py-5">
      <h4 className="font-bold uppercase pb-5">Approval Information</h4>
      <div className="flex justify-between ">
        <span>Company Name</span>
        <span>{companyRequest?.approved_company_name || "-"}</span>
      </div>
      <div className="flex justify-between ">
        <span>Pic name</span>
        <span>{companyRequest?.approved_pic_name || "-"}</span>
      </div>
      <div className="flex justify-between ">
        <span>Company Phone</span>
        <span>{companyRequest?.approved_company_phone || "-"}</span>
      </div>
      <div className="flex justify-between ">
        <span>Company Address</span>
        <span>{companyRequest.approved_company_address || "-"}</span>
      </div>
      <div className="flex justify-between ">
        <span>Total Employee</span>
        <span>{companyRequest.approved_total_employee || "-"}</span>
      </div>
      <div className="flex justify-between ">
        <span>Approved at</span>
        <span>{timeParser(companyRequest?.approved_at) || "-"}</span>
      </div>
      <div className="flex justify-between ">
        <span>Valid Until</span>
        <span>{timeParser(companyRequest?.expired_date) || "-"}</span>
      </div>
      <div className="flex justify-between ">
        <span>Payment Files</span>
        <div>
          <a
            href={(companyRequest.payment_file as string) ?? "#"}
            className="underline text-blue-800 hover:text-blue-500 "
            target="_blank"
          >
            Payment File Url
          </a>
        </div>
      </div>
    </div>
  );
};

export default ApprovedSection;
