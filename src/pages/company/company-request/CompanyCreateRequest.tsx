import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Column } from "react-table";

import ReactTable from "../../../components/react-table/ReactTable";
import { useGetAllCompanyRequestQuery } from "../../../modules/company/company-request/api/company-request.api";
import { CompanyRequest } from "../../../modules/company/company-request/entities/company-request.entity";
import Header from "../../../partials/Header";
import Sidebar from "../../../partials/sidebar/Sidebar";

function CompanyCreateRequest() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [companyList, setCompanyList] = useState([]);
  const [totalData, setTotalData] = useState(0);

  const { data, refetch } = useGetAllCompanyRequestQuery(
    {},
    {
      skip: false,
      refetchOnMountOrArgChange: true,
    }
  );

  const fetchData = React.useCallback(async () => {
    try {
      setCompanyList(data?.data ?? []);
      setTotalData(data?.total ?? 0);
    } catch (error) {
      console.log(error);
    }
  }, [data?.data, data?.total]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const companyColumns = React.useMemo<Column<CompanyRequest>[]>(
    () => [
      {
        Header: "Company Name",
        accessor: (companyRequest) =>
          companyRequest.requested_company_name || "",
      },
      {
        Header: "PIC Name",
        accessor: (companyRequest) =>
          companyRequest.requested_company_name || "",
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div className="space-x-1">
            <Link
              className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-blue-500 py-auto"
              aria-label="detail"
              to={`detail/${row.original._id}`}
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
                  Company Create Request Lists
                </h1>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative">
              <header className="px-5 py-4 flex justify-between">
                <h2 className="font-semibold text-gray-800 mt-1">
                  Total Request
                  <span className="text-gray-400 font-medium text-sm ml-1 pt-1">
                    ({totalData})
                  </span>
                </h2>
              </header>
              {/* Table */}
              <ReactTable
                tableOptions={{
                  disableGlobalFilter: true,
                  data: companyList,
                  columns: companyColumns,
                }}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CompanyCreateRequest;
