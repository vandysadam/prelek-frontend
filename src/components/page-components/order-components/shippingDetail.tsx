import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

import { toast } from "react-toastify";
import { Box } from "@mui/material";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import { Order } from "../../../modules/orders/dtos/models/order.entity";
import { useTraceOrderMutation } from "../../../modules/orders/api/order.api";

interface Props {
  order: Order;
}

const ShippingDetail: React.FC<Props> = ({ order }: Props) => {
  const [
    trace,
    { isLoading: loadingTrace, isError: traceError, data: shippingInfo },
  ] = useTraceOrderMutation();

  // const [shippingInfo, setShippingInfo] =
  //   React.useState<RajaOngkirWaybillModel>({});

  const validateTrackingNumber = async (
    trackingNumber: string,
    courier: string
  ) => {
    try {
      await trace({ trackingNumber, courier });
    } catch (err) {
      console.log(err);
      if (err.data.statusCode < 500) {
        toast.error(err.data.message, {
          theme: "dark",
        });
      }
      if (err.data.statusCode >= 500) {
        toast.error("Something went wrong, please try again later!");
      }
      return false;
    }
  };

  React.useEffect(() => {
    if (order.trackingNumber) {
      validateTrackingNumber(order.trackingNumber, order.courier);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen">
      {loadingTrace ? (
        <span>loading</span>
      ) : (
        <>
          {shippingInfo && shippingInfo.data ? (
            <div>
              <Timeline
                sx={{
                  [`& .${timelineOppositeContentClasses.root}`]: {
                    flex: 0.2,
                  },
                }}
              >
                {/* map with index */}
                {shippingInfo.data.manifest.map((item, index) => (
                  <TimelineItem key={index}>
                    <TimelineOppositeContent color="textSecondary">
                      {item.manifest_time}
                    </TimelineOppositeContent>

                    <TimelineSeparator>
                      <TimelineDot
                        variant={index % 2 === 0 ? "outlined" : "filled"}
                        color="primary"
                      />
                      {index !== shippingInfo.data.manifest.length - 1 && (
                        <TimelineConnector />
                      )}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <span>{item.manifest_description}</span>
                        <span>{item.city_name}</span>
                      </Box>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>

              <div className="flex justify-end text-sm text-white mr-5">
                <div className="flex flex-col bg-contag-primary opacity-90 p-5 w-1/3 rounded-3xl">
                  <div className="flex justify-between">
                    <span>Courier Code:</span>
                    <span>{shippingInfo.data.summary.courier_code || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Courier Name:</span>
                    <span>{shippingInfo.data.summary.courier_name || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Waybill Number:</span>
                    <span>
                      {shippingInfo.data.summary.waybill_number || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Code:</span>
                    <span>{shippingInfo.data.summary.service_code || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Waybill Date:</span>
                    <span>
                      {(shippingInfo.data.summary.waybill_date as string) ||
                        "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipper Name:</span>
                    <span>{shippingInfo.data.summary.shipper_name || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Receiver Name:</span>
                    <span>
                      {shippingInfo.data.summary.receiver_name || "-"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span>Origin:</span>
                    <span>{shippingInfo.data.summary.origin || "-"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span>Destination:</span>
                    <span>{shippingInfo.data.summary.destination || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span>{shippingInfo.data.summary.status || "-"}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <span>no data</span>
          )}
        </>
      )}
    </div>
  );
};

export default ShippingDetail;
