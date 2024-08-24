import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FaEdit,
  FaEye,
  FaLock,
  FaPlus,
  FaTrash,
  FaUnlock,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import { toast } from "react-toastify";
import ModalBase, { ModalType } from "../../components/modal/ModalBase";
import ReactTable from "../../components/react-table/ReactTable";
import {
  useConfrimOrderMutation,
  useGetAllOrdersQuery,
  useRejectOrderMutation,
  useSendOrderMutation,
} from "../../modules/orders/api/order.api";
import { Order } from "../../modules/orders/dtos/models/order.entity";
import { useDeleteUserMutation } from "../../modules/users/api/user.api";
import { User } from "../../modules/users/dtos/models/user.entity";
import Header from "../../partials/Header";
import Sidebar from "../../partials/sidebar/Sidebar";
import { AiOutlineCloseSquare, AiOutlineCheckSquare } from "react-icons/ai";
import { OrderStatus } from "../../modules/orders/enums/order-status.enum";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { useGetAllSubscriptionQuery } from "../../modules/subscription/api/subscription.api";
import { Subscription } from "../../modules/subscription/entities/subscription.entity";
import { timeParser } from "../../utils/timeParser";

function SubscriptionList() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [selectedItems, setSelectedItems] = useState([]);

  /* Details Modal */
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const [lastPage, setLastPage] = useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const [params, setParams] = useState([]);
  const [filterParams, setFilterParams] = useState({});

  const handleChangePage = (page: number) => {
    setCurrentPage(page + 1);
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
  };

  const [subscriptionList, setSubscriptionList] = useState([]);
  const [totalData, setTotalData] = useState(0);

  const { data, refetch } = useGetAllSubscriptionQuery(
    {
      page: currentPage,
      limit: pageSize,
      ...filterParams,
    },
    { skip: false, refetchOnMountOrArgChange: true }
  );

  const asyncParamsDebounce = React.useCallback(
    AwesomeDebouncePromise(
      (paramsFilter) => {
        setFilterParams(paramsFilter);
        setCurrentPage(1);
      },
      500,
      {
        onlyResolvesLast: true,
      }
    ),
    []
  );

  useEffect(() => {
    const paramsFilter = {};
    for (const key in params) {
      paramsFilter[params[key].id] = params[key].value;
    }
    asyncParamsDebounce(paramsFilter);
  }, [asyncParamsDebounce, params]);

  const fetchData = React.useCallback(async () => {
    try {
      setSubscriptionList(data?.data ?? []);
      setTotalData(data?.total ?? 0);
      setLastPage(data?.lastPage ?? 0);
    } catch (error) {
      console.log(error);
    }
  }, [data?.data, data?.lastPage, data?.total]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const subscriptionColumns = React.useMemo<Column<Subscription>[]>(
    () => [
      {
        Header: "Username",

        disableSortBy: false,
        accessor: (row) => row.userDetails?.username ?? "",
        id: "username",
      },
      {
        Header: "Order Code",
        accessor: (subs) =>
          subs.orderDetails && subs.orderDetails.orderCode
            ? subs.orderDetails.orderCode
            : "",
      },
      {
        Header: "Renewal Interval",
        accessor: "subscriptionRenewalInterval",
      },
      {
        Header: "Renewal Type",
        accessor: "subscriptionRenewalType",
      },
      {
        Header: "Order Status",
        accessor: (subs) =>
          subs.orderDetails && subs.orderDetails.orderStatus
            ? subs.orderDetails.orderStatus
            : "",
      },
      {
        Header: "Payment Method",
        accessor: (subs) =>
          subs.orderDetails && subs.orderDetails.orderId
            ? subs.orderDetails.orderId
            : "",
      },
      {
        Header: "Start At",
        accessor: (subs) => timeParser(subs.startAt),
      },
      {
        Header: "End At",
        accessor: (subs) => (subs.endAt ? timeParser(subs.endAt) : ""),
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div className="space-x-2">
            <Link
              className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-blue-500 py-auto"
              aria-label="detail"
              to={`/subscription/detail/${row.original._id}`}
            >
              <FaEye />
            </Link>
          </div>
        ),
      },
    ],
    []
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
                  Subscription List
                </h1>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative">
              <header className="px-5 py-4 flex justify-between">
                <h2 className="font-semibold text-gray-800 mt-1">
                  Subscriptions
                  <span className="text-gray-400 font-medium text-sm ml-1 pt-1">
                    ({totalData})
                  </span>
                </h2>
              </header>
              <section>
                <div className="px-5 py-4"></div>
              </section>

              {/* Table */}
              <ReactTable
                tableOptions={{
                  disableGlobalFilter: true,
                  data: subscriptionList ?? [],
                  columns: subscriptionColumns,
                  manualPagination: true,
                  disableFilters: true,
                  initialState: {
                    pageIndex: 0,
                    pageSize: pageSize,
                  },
                  pageCount: lastPage ?? 0,
                }}
                onHandlePageChange={handleChangePage}
                onHandlePageSizeChange={handlePageSizeChange}
                onHandleFilterChange={setParams}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SubscriptionList;
