import QRCode from "qrcode";
import React, { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ModalType } from "../../components/modal/ModalBase";
import { useGetOrderDetailQuery } from "../../modules/orders/api/order.api";
import { OrderStatus } from "../../modules/orders/enums/order-status.enum";
import { UserRoleEnum } from "../../modules/users/enums/user-role.enum";
import Header from "../../partials/Header";
import Sidebar from "../../partials/sidebar/Sidebar";
import { useTypedSelector } from "../../store";
import { validateRoles } from "../../utils/validate-roles";

function OrderDetail() {
  /* Sidebar State */
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  /* Params */
  const { orderId } = useParams();
  const currentUser = useTypedSelector((state) => state.authSlice.user);
  const [modalState, setModalState] = React.useState(false);
  const [purpose, setPurpose] = React.useState("");
  const [modalType, setModalType] = React.useState(ModalType.INFO);

  /* Get Business Detail Query */
  const { data: orderData, refetch: refetchOrder } = useGetOrderDetailQuery(
    { orderId: orderId },
    {
      skip: false,
      refetchOnMountOrArgChange: true,
    }
  );

  const [qrCode, setQrCode] = React.useState<string>("");

  const generateQR = async (username: string) => {
    try {
      // return await QRCode.toDataURL(text)
      const baseUrl = import.meta.env.VITE_APP_CONTAG_URL;
      // setQrCode(baseUrl + "/profile");
      const url = await QRCode.toDataURL(baseUrl + "/profile/" + username, {
        width: 400,
      });
      setQrCode(url);
    } catch (error) {
      console.error(error);
    }
  };

  function downloadURI(uri: string, name: string) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);

    toast("Copied to clipboard :" + text);
  }

  useEffect(() => {
    if (currentUser) {
      generateQR(currentUser.username);
    }
  }, [currentUser]);

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
                  Product
                </h1>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative">
              <header className="px-5 py-4 flex justify-between">
                <div className="flex flex-row">
                  <Link
                    to="/product/list"
                    className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-blue-500"
                  >
                    <FaArrowLeft />
                  </Link>
                  <h2 className="font-semibold text-gray-800 ml-3 mt-1">
                    Product Details
                  </h2>
                </div>
                <div className="space-x-2">
                  {orderData &&
                    orderData.data &&
                    orderData.data.orderStatus === OrderStatus.PROCESSING &&
                    validateRoles(currentUser.role as UserRoleEnum, [
                      UserRoleEnum.SUPER_USER,
                      UserRoleEnum.ADMIN,
                      UserRoleEnum.SUPERVISOR,
                      UserRoleEnum.SHIPPING_ADMIN,
                    ]) && (
                      <>
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
                      </>
                    )}

                  {/* Packing Order Confirm / Reject */}
                  {orderData &&
                    orderData.data &&
                    orderData.data.orderStatus === OrderStatus.PAID &&
                    validateRoles(currentUser.role as UserRoleEnum, [
                      UserRoleEnum.SUPER_USER,
                      UserRoleEnum.ADMIN,
                      UserRoleEnum.SUPERVISOR,
                      UserRoleEnum.PACKING_ADMIN,
                    ]) && (
                      <>
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
                      </>
                    )}
                </div>
              </header>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default OrderDetail;
