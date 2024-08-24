import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { ModalType } from "../../components/modal/ModalBase";
import { useGetOrderDetailQuery } from "../../modules/orders/api/order.api";
import { OrderStatus } from "../../modules/orders/enums/order-status.enum";
import { UserRoleEnum } from "../../modules/users/enums/user-role.enum";
import Header from "../../partials/Header";
import ConfirmOrder from "../../partials/sections/order/confirmOrder";
import MainOrderDetail from "../../partials/sections/order/mainOrderDetail";
import SendOrder from "../../partials/sections/order/sendOrder";
import ShippingDetail from "../../partials/sections/order/shippingDetail";
import Sidebar from "../../partials/sidebar/Sidebar";
import { useTypedSelector } from "../../store";

function OrderDetail() {
  /* Sidebar State */
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  /* Params */
  const { orderId } = useParams();
  const currentUser = useTypedSelector((state) => state.authSlice.user);
  const [modalState, setModalState] = React.useState(false);
  const [purpose, setPurpose] = React.useState("");
  const [modalType, setModalType] = React.useState(ModalType.INFO);

  const [tab, setTab] = React.useState(1);

  /* Get Business Detail Query */
  const {
    data: orderData,
    refetch: refetchOrder,
    isLoading: loadingDetails,
  } = useGetOrderDetailQuery(
    { orderId: orderId },
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
                  Order
                </h1>
              </div>
            </div>
            {loadingDetails ? (
              <span>loading...</span>
            ) : (
              <>
                {orderData && orderData.data ? (
                  <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative">
                    <header className="px-5 py-4 flex justify-between">
                      <div className="flex flex-row">
                        <Link
                          to="/order/list"
                          className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-blue-500"
                        >
                          <FaArrowLeft />
                        </Link>
                        <h2 className="font-semibold text-gray-800 ml-3 mt-1">
                          Order Details
                        </h2>
                      </div>
                      <div className="space-x-2">
                        {orderData.data.orderStatus ===
                          OrderStatus.PROCESSING &&
                          [
                            UserRoleEnum.SUPER_USER,
                            UserRoleEnum.ADMIN,
                            UserRoleEnum.SUPERVISOR,
                            UserRoleEnum.SHIPPING_ADMIN,
                          ].includes(currentUser.role as UserRoleEnum) && (
                            <div>
                              <button
                                className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-green-500 py-auto"
                                aria-label="confirm"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  setModalState(true);
                                  setPurpose("approve");
                                  setModalType(ModalType.INFO);
                                }}
                              >
                                Send Order
                              </button>
                              <button
                                className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-red-500 py-auto"
                                aria-label="reject"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  setModalState(true);
                                  setPurpose("reject");
                                  setModalType(ModalType.DELETE);
                                }}
                              >
                                Reject Order
                              </button>

                              <SendOrder
                                modalState={modalState}
                                onSetModalState={(modalState) =>
                                  setModalState(modalState)
                                }
                                purpose={purpose}
                                modalType={modalType}
                                courier={orderData.data.courier}
                                order={
                                  orderData && orderData.data
                                    ? orderData.data
                                    : null
                                }
                                onApiCall={(status) => {
                                  if (status === "success") {
                                    refetchOrder();
                                  }
                                }}
                              />
                            </div>
                          )}

                        {/* Packing Order Confirm / Reject */}
                        {orderData.data.orderStatus === OrderStatus.PAID &&
                          [
                            UserRoleEnum.SUPER_USER,
                            UserRoleEnum.ADMIN,
                            UserRoleEnum.SUPERVISOR,
                            UserRoleEnum.PACKING_ADMIN,
                          ].includes(currentUser.role as UserRoleEnum) && (
                            <div className="space-x-2">
                              <button
                                className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-green-500 py-auto"
                                aria-label="send"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  setModalState(true);
                                  setPurpose("approve");
                                  setModalType(ModalType.INFO);
                                }}
                              >
                                Confirm Order
                              </button>
                              <button
                                className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-red-500 py-auto"
                                aria-label="delete"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  setModalState(true);
                                  setPurpose("reject");
                                  setModalType(ModalType.DELETE);
                                }}
                              >
                                Reject Order
                              </button>

                              {/* confirm */}
                              <ConfirmOrder
                                modalState={modalState}
                                onSetModalState={(modalState) =>
                                  setModalState(modalState)
                                }
                                purpose={purpose}
                                modalType={modalType}
                                order={
                                  orderData && orderData.data
                                    ? orderData.data
                                    : null
                                }
                                onApiCall={(status) => {
                                  if (status === "success") {
                                    refetchOrder();
                                  }
                                }}
                              />
                            </div>
                          )}

                        {orderData.data.orderStatus ===
                          OrderStatus.SHIPPING && (
                          <>
                            {tab === 1 && (
                              <button
                                className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-green-500 py-auto"
                                aria-label="send"
                                onClick={() => {
                                  setTab(2);
                                }}
                              >
                                Shipping Details
                              </button>
                            )}
                            {tab === 2 && (
                              <button
                                className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-green-500 py-auto"
                                aria-label="send"
                                onClick={() => {
                                  setTab(1);
                                }}
                              >
                                Back to Details
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </header>

                    {tab === 1 && <MainOrderDetail order={orderData.data} />}
                    {tab === 2 && <ShippingDetail order={orderData.data} />}
                  </div>
                ) : (
                  <span>data not found</span>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default OrderDetail;
