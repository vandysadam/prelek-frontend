import React, { useEffect } from "react";
import { FiCopy } from "react-icons/fi";
import { toast } from "react-toastify";
import { Order } from "../../../modules/orders/dtos/models/order.entity";
import { timeParser } from "../../../utils/timeParser";
import QRCode from "qrcode";

interface Props {
  order: Order;
}

const MainOrderDetail: React.FC<Props> = ({ order }: Props) => {
  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard :" + text);
  }

  const [qrCode, setQrCode] = React.useState<string>("");

  const generateQR = async (username: string) => {
    try {
      const baseUrl = import.meta.env.VITE_APP_CONTAG_URL;
      const url = await QRCode.toDataURL(baseUrl + "/profile/" + username, {
        width: 400,
      });
      setQrCode(url);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    generateQR(order.userDetails.username);
  }, []);

  function downloadURI(uri: string, name: string) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="ml-6 mr-12 mt-6 mb-10 space-y-2">
      <h3 className="text-xl font-bold text-center">{order.orderId}</h3>

      <div className="py-5">
        <h4 className="font-bold uppercase pb-5">Order Information</h4>
        <div className="flex justify-between ">
          <span>Order Status</span>
          <span>{order.orderStatus ?? "-"}</span>
        </div>
        <div className="flex justify-between ">
          <span>Payment Method</span>
          <span>{order.paymentMethod ?? "-"}</span>
        </div>
        <div className="flex justify-between ">
          <span>Redirect Url</span>
          <div>
            <a
              href={order.redirect_url ?? "#"}
              className="underline text-blue-800 hover:text-blue-500 "
              target="_blank"
            >
              Midtrans URL
            </a>
          </div>
        </div>
        <div className="flex justify-between ">
          <span>Created at</span>
          <span>{timeParser(order.createdAt)}</span>
        </div>
        <div className="flex justify-between ">
          <span>Reject Reason</span>
          <span>{order.rejectReason ?? "-"}</span>
        </div>
      </div>

      <hr />

      <div className="py-5">
        <div className="flex flex-col">
          <h4 className="font-bold uppercase pb-5">User Details</h4>
          <div className="flex justify-between ">
            <span>Name</span>
            <span>{order.userDetails.fullName ?? "-"}</span>
          </div>
          <div className="flex justify-between ">
            <span>Email</span>
            <span>{order.userDetails.email ?? "-"}</span>
          </div>
          <div className="flex justify-between ">
            <span>Username</span>
            <span>{order.userDetails.username ?? "-"}</span>
          </div>
          <div className="flex justify-between ">
            <span>Phone Number</span>
            <span>{order.userDetails.phoneNumber ?? "-"}</span>
          </div>
          <div className="flex justify-between ">
            <span>Profile URL</span>
            <span>
              <a
                className="btn-link mr-2"
                href={`${import.meta.env.VITE_APP_CONTAG_URL}/profile/${
                  order.userDetails.username
                }`}
              >
                {`${import.meta.env.VITE_APP_CONTAG_URL}/profile/${
                  order.userDetails.username
                }`}
              </a>
              <button
                onClick={() =>
                  copyToClipboard(
                    `${import.meta.env.VITE_APP_CONTAG_URL}/profile/${
                      order.userDetails.username
                    }`
                  )
                }
              >
                <FiCopy />
              </button>
            </span>
          </div>
        </div>
      </div>

      <div>
        <h2>QR Code Section</h2>
        {qrCode ? (
          <div className="flex justify-center">
            <img src={qrCode} alt="qrCode" className="h-56" />
            <button
              onClick={() =>
                downloadURI(qrCode, `qrcode-${order.userDetails.username}.png`)
              }
            >
              Download QR
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <p>QR Code not found</p>
          </div>
        )}
      </div>

      <hr />

      <div className="py-5">
        <div className="flex flex-col pt-5">
          <h4 className="font-bold uppercase">Subscription & Card Type</h4>
          {order.orderDetails.map((item, index) => (
            <div className="flex flex-col pt-2" key={index}>
              <span className="font-semibold">Item - {index + 1}</span>
              <div className="flex justify-between ">
                <span>Product Name</span>
                <span>{item.productDetails.productName ?? "-"}</span>
              </div>
              <div className="flex justify-between ">
                <span>Product Price</span>
                <span>{item.productDetails.productPrice ?? "-"}</span>
              </div>
              <div className="flex justify-between ">
                <span>Product Description</span>
                <span>{item.productDetails.productDescription ?? "-"}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="py-5">
          <span className="font-semibold py-2">Design Card</span>
          <div>
            <div className="flex justify-between ">
              <span>Card Name</span>
              <span>{order.cardName ?? "-"}</span>
            </div>
            <div>
              <h2>Card Logo</h2>
              <br />
              <div className="flex justify-center text-center py-3">
                <img className="h-56" src={order.cardImage}></img>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between ">
        <span className="font-semibold">Midtrans Transacion Id</span>
        <span>{order.midtransTransactionId ?? "-"}</span>
      </div>
      <div className="flex justify-between ">
        <span className="font-semibold">Order Created At</span>
        <span>{order.orderCreatedAt ?? "-"}</span>
      </div>
      <div className="flex justify-between ">
        <span className="font-semibold">Order Expired At</span>
        <span>{order.orderExpiredAt ?? "-"}</span>
      </div>
      <div className="flex justify-between ">
        <span className="font-semibold">Order Paid At</span>
        <span>{order.orderPaidAt ?? "-"}</span>
      </div>
      <div className="flex justify-between ">
        <span className="font-semibold">Order Refunded At</span>
        <span>{order.orderRefundedAt ?? "-"}</span>
      </div>

      {/* {order.shippingAddress.map((address, index) => ( */}
      <div className="flex flex-col pt-2">
        <span className="font-semibold">Shipping Address</span>
        <div className="flex justify-between ">
          <span>Street Address</span>
          <span className="capitalize">
            {order.shippingAddress.streetAddress ?? "-"}
          </span>
        </div>
        <div className="flex justify-between ">
          <span>Subdistrict</span>
          <span>{order.shippingAddress.subdistrict ?? "-"}</span>
        </div>
        <div className="flex justify-between">
          <span>City</span>
          <span>{order.shippingAddress.city ?? "-"}</span>
        </div>
        <div className="flex justify-between">
          <span>Province</span>
          <span>{order.shippingAddress.province ?? "-"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Midtrans Transaction Status</span>
          <span>{order.midtransTransactionStatus ?? "-"}</span>
        </div>
        <div className="flex justify-between ">
          <span className="font-semibold">Midtrans Transacion Id</span>
          <span>{order.midtransTransactionId ?? "-"}</span>
        </div>
        <div className="flex justify-between ">
          <span className="font-semibold">Order Created At</span>
          <span>{order.orderCreatedAt ?? "-"}</span>
        </div>
        <div className="flex justify-between ">
          <span className="font-semibold">Order Expired At</span>
          <span>{order.orderExpiredAt ?? "-"}</span>
        </div>
        <div className="flex justify-between ">
          <span className="font-semibold">Order Paid At</span>
          <span>{order.orderPaidAt ?? "-"}</span>
        </div>
        <div className="flex justify-between ">
          <span className="font-semibold">Order Refunded At</span>
          <span>{order.orderRefundedAt ?? "-"}</span>
        </div>
      </div>
    </div>
  );
};

export default MainOrderDetail;
