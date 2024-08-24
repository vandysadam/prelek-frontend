import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetRequestDetailQuery } from "../../../modules/company/company-request/api/company-request.api";
import { CompanyRequestStatus } from "../../../modules/company/company-request/enums/company-status.enum";
import Header from "../../../partials/Header";
import ConfirmCompanyRequest from "../../../partials/sections/company-request/forms/ConfirmCompanyRequest";
import RejectCompanyRequest from "../../../partials/sections/company-request/forms/RejectCompanyRequest";
import ConfirmationButtons from "../../../partials/sections/company-request/section/confirmation-buttons";
import RequestDetails from "../../../partials/sections/company-request/section/request-details";
import Sidebar from "../../../partials/sidebar/Sidebar";
import DashboardLoader from "../../utility/DashboardLoader";

function CompanyRequestDetail() {
  /* Sidebar State */
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  /* Params */
  const [confirmPage, setConfirmPageOpen] = React.useState(false);
  const [purpose, setPurpose] = React.useState<"approve" | "reject" | "detail">(
    "detail"
  );

  const { company_request_id } = useParams();
  const [errorDetails, setErrorDetails] = React.useState<any>(null);

  /* Get Business Detail Query */
  const {
    isError,
    error,
    data: requestDetails,
    refetch,
    isLoading: loadingDetails,
  } = useGetRequestDetailQuery(
    { company_request_id },
    {
      skip: false,
      refetchOnMountOrArgChange: true,
    }
  );

  React.useEffect(() => {
    if (isError && error) {
      const errorDetails: any = error;
      toast.error(errorDetails.data.message, {
        theme: "colored",
      });
    }
  }, [isError, error]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {loadingDetails ? (
          <DashboardLoader />
        ) : (
          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              {/* Page header */}
              <div className="sm:flex sm:justify-between sm:items-center mb-8">
                {/* Left: Title */}
                <div className="mb-4 sm:mb-0">
                  <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                    Company Request
                  </h1>
                </div>
              </div>

              <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative">
                <header className="px-5 py-4 flex justify-between">
                  <div className="flex flex-row">
                    <Link
                      to="/company/create-request"
                      className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-blue-500"
                    >
                      <FaArrowLeft />
                    </Link>
                    <h2 className="font-semibold text-gray-800 ml-3 mt-1">
                      Company Request Details
                    </h2>
                  </div>
                  {requestDetails.data.status ===
                    CompanyRequestStatus.PENDING && (
                    <ConfirmationButtons
                      companyRequest={requestDetails.data}
                      purpose={purpose}
                      onPurposeChange={(value) => setPurpose(value)}
                      confirmPageState={confirmPage}
                      onConfirmPageChange={(value) => setConfirmPageOpen(value)}
                    />
                  )}
                </header>

                {isError && error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-3">
                    <span className="block sm:inline">
                      Something went wrong when fetching data
                    </span>
                  </div>
                )}

                {requestDetails && requestDetails.data && (
                  <div>
                    {purpose === "detail" && (
                      <RequestDetails companyRequest={requestDetails.data} />
                    )}
                    {purpose === "approve" && (
                      <ConfirmCompanyRequest
                        companyRequest={requestDetails.data}
                        successCallback={(toLayout) => {
                          refetch();
                          setPurpose(toLayout);
                        }}
                      />
                    )}
                    {purpose === "reject" && (
                      <RejectCompanyRequest
                        companyRequest={requestDetails.data}
                        successCallback={(toLayout) => {
                          refetch();
                          setPurpose(toLayout);
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}

export default CompanyRequestDetail;
