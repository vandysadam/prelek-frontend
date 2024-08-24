import { MenuItem, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import ReactTable from "../../components/react-table/ReactTable";
import { useGetAllOrdersQuery } from "../../modules/orders/api/order.api";
import { Order } from "../../modules/orders/dtos/models/order.entity";
import Header from "../../partials/Header";
import Sidebar from "../../partials/sidebar/Sidebar";
import { timeParser } from "../../utils/timeParser";

function OrderList() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [selectedItems, setSelectedItems] = useState([]);

  /* Details Modal */
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [searchBy, setSearchBy] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchByDate, setSearchByDate] = useState<string>("");
  const [dateRange, setDateRange] = useState<string[]>([null, null]);
  const [orderStatus, setOrderStatus] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<string>("");

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

  const [orderList, setOrderList] = useState([]);
  const [totalData, setTotalData] = useState(0);

  const { data, refetch } = useGetAllOrdersQuery(
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
      setOrderList(data?.data ?? []);
      setTotalData(data?.total ?? 0);
      setLastPage(data?.lastPage ?? 0);
    } catch (error) {
      console.log(error);
    }
  }, [data?.data, data?.lastPage, data?.total]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onChangeSearchByDate = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchByDate(event.target.value);

    const newParamsFilter = {
      ...filterParams,
      searchByDate: event.target.value,
    };

    asyncParamsDebounce(newParamsFilter);
  };

  const onChangeDateRange = (date: Date | null, index: number) => {
    const newDateRange = [...dateRange];
    newDateRange[index] = date.toISOString();

    setDateRange(newDateRange);

    if (newDateRange.length >= 2 && newDateRange[0] && newDateRange[1]) {
      const newParamsFilter = {
        ...filterParams,
        dateFrom: newDateRange[0],
        dateTo: newDateRange[1],
      };

      asyncParamsDebounce(newParamsFilter);
    }
  };

  const onChangeSearchValue = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchValue(e.target.value);

    const newParamsFilter = {
      ...filterParams,
      [searchBy]: e.target.value,
    };

    asyncParamsDebounce(newParamsFilter);
  };

  const onChangeOrderStatus = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setOrderStatus(e.target.value);

    const newParamsFilter = {
      ...filterParams,
      orderStatus: e.target.value,
    };

    asyncParamsDebounce(newParamsFilter);
  };

  const onChangePaymentStatus = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPaymentStatus(e.target.value);

    const newParamsFilter = {
      ...filterParams,
      paymentStatus: e.target.value,
    };

    asyncParamsDebounce(newParamsFilter);
  };

  const featureColumns = React.useMemo<Column<Order>[]>(
    () => [
      // {
      //   Header: "ID",
      //   accessor: "_id",
      // },
      {
        Header: "Order Code",
        accessor: "orderCode",
      },
      {
        Header: "Username",
        Cell: ({ row }) => (
          <div className="flex flex-row space-x-2">
            <span>{row.original.userDetails?.username ?? ""}</span>
          </div>
        ),
        id: "username",
        accessor: (row) => row.userDetails?.username ?? "",
      },
      {
        Header: "Payment Method",
        accessor: "paymentMethod",
      },
      {
        Header: "Order Status",
        accessor: "orderStatus",
      },
      {
        Header: "created at",
        accessor: ({ createdAt }) => timeParser(createdAt),
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div className="space-x-2">
            <Link
              className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-blue-500 py-auto"
              aria-label="detail"
              to={`/order/detail/${row.original._id}`}
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
                  Order List
                </h1>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative">
              <header className="px-5 py-4 flex justify-between">
                <h2 className="font-semibold text-gray-800 mt-1">
                  Incoming Order
                  <span className="text-gray-400 font-medium text-sm ml-1 pt-1">
                    ({totalData})
                  </span>
                </h2>
              </header>
              <section>
                <div className={"py-2 px-5"}>
                  {/* Search */}
                  <div className={"flex flex-row"}>
                    <div className={"w-1/4"}>
                      <TextField
                        select={true}
                        label="Search By"
                        value={searchBy}
                        fullWidth={true}
                        size={"small"}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => setSearchBy(e.target.value)}
                      >
                        <MenuItem value={"username"}>Username</MenuItem>
                        <MenuItem value={"orderStatus"}>Order Status</MenuItem>
                      </TextField>
                    </div>
                    <div className={"w-3/4"}>
                      <TextField
                        variant={"outlined"}
                        value={searchValue}
                        onChange={(event) => onChangeSearchValue(event)}
                        placeholder={"Search in column"}
                        size={"small"}
                      />
                    </div>
                  </div>
                  {/* Filter By Date */}
                  <div className={"flex flex-row mt-2"}>
                    <div className={"w-1/4"}>
                      <TextField
                        select={true}
                        label="Search By Date"
                        value={searchByDate}
                        fullWidth={true}
                        size={"small"}
                        onChange={(e) => onChangeSearchByDate(e)}
                      >
                        <MenuItem value={"createdAt"}>Created At</MenuItem>
                        <MenuItem value={"orderPaidAt"}>Paid At</MenuItem>
                      </TextField>
                    </div>
                    <div className={"w-3/4"}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Date From"
                          value={dateRange[0]}
                          onChange={(newValue) => {
                            onChangeDateRange(new Date(newValue), 0);
                          }}
                          renderInput={(params) => (
                            <TextField size={"small"} {...params} />
                          )}
                        />
                      </LocalizationProvider>

                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Date To"
                          value={dateRange[1]}
                          onChange={(newValue) => {
                            // setDateRange([dateRange[0], newValue]);
                            onChangeDateRange(new Date(newValue), 1);
                          }}
                          renderInput={(params) => (
                            <TextField size={"small"} {...params} />
                          )}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
                  <div className={"flex flex-row mt-2"}>
                    <div className={"w-1/2"}>
                      <TextField
                        variant={"outlined"}
                        value={orderStatus}
                        select={true}
                        onChange={(event) => onChangeOrderStatus(event)}
                        placeholder={"Search in column"}
                        size={"small"}
                        label={"Order Status"}
                        fullWidth={true}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        SelectProps={{
                          displayEmpty: true,
                        }}
                      >
                        <MenuItem value={""}>All</MenuItem>
                        <MenuItem value={"pending"}>Pending</MenuItem>
                        <MenuItem value={"paid"}>Paid</MenuItem>
                        <MenuItem value={"canceled"}>Canceled</MenuItem>
                        <MenuItem value={"shipping"}>Shipping</MenuItem>
                      </TextField>
                    </div>
                    <div className={"w-1/2"}>
                      <TextField
                        variant={"outlined"}
                        value={paymentStatus}
                        select={true}
                        onChange={(event) => onChangePaymentStatus(event)}
                        placeholder={"Search in column"}
                        size={"small"}
                        label={"Payment Status"}
                        fullWidth={true}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        SelectProps={{
                          displayEmpty: true,
                        }}
                      >
                        <MenuItem value={""}>All</MenuItem>
                        <MenuItem value={"pending"}>Pending</MenuItem>
                        <MenuItem value={"expired"}>Expired</MenuItem>
                        <MenuItem value={"settlement"}>Settlement</MenuItem>
                      </TextField>
                    </div>
                  </div>
                </div>
              </section>

              {/* Table */}
              <ReactTable
                tableOptions={{
                  disableGlobalFilter: true,
                  data: orderList ?? [],
                  columns: featureColumns,
                  manualPagination: true,
                  disableFilters: true,
                  manualFilters: true,
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

export default OrderList;
