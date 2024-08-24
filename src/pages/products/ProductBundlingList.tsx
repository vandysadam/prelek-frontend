import React, { useEffect, useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import ReactTable from "../../components/react-table/ReactTable";

import AwesomeDebouncePromise from "awesome-debounce-promise";
import { useGetAllProductFamiliesQuery } from "../../modules/product/api/product-family.api";
import { ProductFamily } from "../../modules/product/entity/product-family.entity";
import Header from "../../partials/Header";
import Sidebar from "../../partials/sidebar/Sidebar";

function ProductBundlingList() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const [productList, setProductList] = useState([]);
  const [totalData, setTotalData] = useState(0);

  const { data, refetch } = useGetAllProductFamiliesQuery(
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
      setProductList(data?.data ?? []);
      setTotalData(data?.total ?? 0);
      setLastPage(data?.lastPage ?? 0);
    } catch (error) {
      console.log(error);
    }
  }, [data?.data, data?.lastPage, data?.total]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const featureColumns = React.useMemo<Column<ProductFamily>[]>(
    () => [
      {
        accessor: "productFamilyName",
        Header: "Product Family Name",
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div className="space-x-2">
            <Link
              className="btn btn-sm bg-white bproduct-gray-200 hover:bg-white hover:bproduct-slate-400 text-blue-500 py-auto"
              aria-label="detail"
              to={`/product/bundling-package/detail/${row.original._id}`}
            >
              <FaEye />
            </Link>
            <Link
              className="btn btn-sm bg-white bproduct-gray-200 hover:bg-white hover:bproduct-slate-400 text-yellow-400 py-auto"
              aria-label="detail"
              to={`/product/bundling-package/edit/${row.original._id}`}
            >
              <FaEdit />
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
                  Product Bundling Package
                </h1>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-sm bproduct bproduct-gray-200 relative">
              <header className="px-5 py-4 flex justify-between">
                <h2 className="font-semibold text-gray-800 mt-1">
                  Bundling Package List
                  <span className="text-gray-400 font-medium text-sm ml-1 pt-1">
                    ({totalData})
                  </span>
                </h2>
                <div className="flex">
                  <Link to={"/product/bundling-package/add"}>
                    <button
                      className="btn btn-sm bg-white bproduct-gray-200 hover:bg-white hover:bproduct-slate-400 text-blue-500 py-auto"
                      aria-label="detail"
                    >
                      Add
                    </button>
                  </Link>
                </div>
              </header>
              {/* Table */}
              <ReactTable
                tableOptions={{
                  disableGlobalFilter: true,
                  data: productList ?? [],
                  columns: featureColumns,
                  manualPagination: true,
                  disableFilters: false,
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

export default ProductBundlingList;
