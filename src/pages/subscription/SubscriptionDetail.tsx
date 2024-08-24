import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { ModalType } from "../../components/modal/ModalBase";
import { useGetSubscriptionDetailQuery } from "../../modules/subscription/api/subscription.api";
import Header from "../../partials/Header";
import Sidebar from "../../partials/sidebar/Sidebar";
import { useTypedSelector } from "../../store";
import { timeParser } from "../../utils/timeParser";

function SubscriptionDetail() {
  /* Sidebar State */
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  /* Params */
  const { subscriptionId } = useParams();
  const currentUser = useTypedSelector((state) => state.authSlice.user);
  const [modalState, setModalState] = React.useState(false);
  const [purpose, setPurpose] = React.useState("");
  const [modalType, setModalType] = React.useState(ModalType.INFO);

  /* Get Business Detail Query */
  const { data: subscriptionData, refetch: refetchOrder } =
    useGetSubscriptionDetailQuery(
      { id: subscriptionId },
      {
        skip: false,
        refetchOnMountOrArgChange: true,
      }
    );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                  Subscription
                </h1>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative">
              <header className="px-5 py-4 flex justify-between">
                <div className="flex flex-row">
                  <Link
                    to="/subscription/list"
                    className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-blue-500"
                  >
                    <FaArrowLeft />
                  </Link>
                  <h2 className="font-semibold text-gray-800 ml-3 mt-1">
                    Subscription Details
                  </h2>
                </div>
              </header>
              <div className="ml-6 mr-12 mt-6 mb-10 space-y-2">
                {subscriptionData && subscriptionData.data ? (
                  <>
                    <div className="flex flex-col pt-2">
                      <span className="font-semibold">Pricing Details</span>
                      <div className="flex justify-between ">
                        <span>Name</span>
                        <span>
                          {subscriptionData.data.pricingDetails.planName ?? "-"}
                        </span>
                      </div>
                      <div className="flex justify-between ">
                        <span>Plan price</span>
                        <span>
                          {subscriptionData.data.pricingDetails.planPrice ??
                            "-"}
                        </span>
                      </div>
                      <div className="flex justify-between ">
                        <span>Renewal Interval</span>
                        <span>
                          {subscriptionData.data.pricingDetails
                            .planRenewalInterval ?? "-"}
                        </span>
                      </div>
                      <div className="flex justify-between ">
                        <span>Renewal Type</span>
                        <span>
                          {subscriptionData.data.pricingDetails
                            .planRenewalType ?? "-"}
                        </span>
                      </div>
                      <div className="flex justify-between ">
                        <span>Has Free Trial</span>
                        <span>
                          {subscriptionData.data.pricingDetails.hasFreeTrial ??
                            "-"}
                        </span>
                      </div>
                      <div className="flex justify-between ">
                        <span>Free Trial Renewal Interval</span>
                        <span>
                          {subscriptionData.data.pricingDetails
                            .planRenewalInterval ?? "-"}
                        </span>
                      </div>
                      <div className="flex justify-between ">
                        <span>Free Trial Type</span>
                        <span>
                          {subscriptionData.data.pricingDetails.freeTrialType ??
                            "-"}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between pt-5">
                      <span className="font-semibold">Subscription Status</span>
                      <span>
                        {subscriptionData.data.subscriptionStatus ?? "-"}
                      </span>
                    </div>
                    <div className="flex justify-between ">
                      <span className="font-semibold">Renewal Interval</span>
                      <span>
                        {subscriptionData.data.subscriptionRenewalInterval ??
                          "-"}
                      </span>
                    </div>
                    <div className="flex justify-between ">
                      <span className="font-semibold">Renewal Type</span>
                      <span>
                        {subscriptionData.data.subscriptionRenewalType ?? "-"}
                      </span>
                    </div>
                    <div className="flex justify-between ">
                      <span className="font-semibold">Created at</span>
                      <span>
                        {timeParser(subscriptionData.data.createdAt) ?? "-"}
                      </span>
                    </div>
                    <div className="flex justify-between ">
                      <span className="font-semibold">Updated at</span>
                      <span>
                        {timeParser(subscriptionData.data.updatedAt) ?? "-"}
                      </span>
                    </div>

                    {subscriptionData.data.userDetails && (
                      <div className="flex flex-col pt-2">
                        <span className="font-semibold">User Details</span>
                        <div className="flex justify-between ">
                          <span>Name</span>
                          <span>
                            {subscriptionData.data.userDetails.fullName ?? "-"}
                          </span>
                        </div>
                        <div className="flex justify-between ">
                          <span>Email</span>
                          <span>
                            {subscriptionData.data.userDetails.email ?? "-"}
                          </span>
                        </div>
                        <div className="flex justify-between ">
                          <span>Username</span>
                          <span>
                            {subscriptionData.data.userDetails.username ?? "-"}
                          </span>
                        </div>
                        <div className="flex justify-between ">
                          <span>Phone Number</span>
                          <span>
                            {subscriptionData.data.userDetails.phoneNumber ??
                              "-"}
                          </span>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex w-full justify-center font-bold">
                    Details Not Found!
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SubscriptionDetail;
