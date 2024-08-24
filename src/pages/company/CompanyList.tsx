import React, { useEffect, useState } from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Column } from 'react-table';
import { toast } from 'react-toastify';

import ModalBase, { ModalType } from '../../components/modal/ModalBase';
import ReactTable from '../../components/react-table/ReactTable';
import {
  useDeleteCompanyMutation,
  useGetAllUserCompanyPaginatedQuery
} from '../../modules/company/company/api/company.api';
import { Company } from '../../modules/company/company/entities/company.entity';
import Header from '../../partials/Header';
import Sidebar from '../../partials/sidebar/Sidebar';

function CompanyList() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [selectedItems, setSelectedItems] = useState([]);

  /* Details Modal */
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  /* Feature Details */
  const [companyDetails, setCompanyDetails] = useState<Company>();

  const [deleteCompany] = useDeleteCompanyMutation();

  const [companyList, setCompanyList] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const { data, refetch } = useGetAllUserCompanyPaginatedQuery(
    {},
    {
      skip: false,
      refetchOnMountOrArgChange: true
    }
  );

  const handleDelete = async (company: Company) => {
    try {
      await deleteCompany({
        id: company._id
      }).unwrap();
      toast.success(`${company.companyName} Deleted Successfully!`, {
        theme: 'dark'
      });
      refetch();
    } catch (error) {
      toast.error('Something went wrong!', {
        theme: 'dark'
      });
      console.log(error);
    }
  };

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

  const companyColumns = React.useMemo<Column<Company>[]>(
    () => [
      {
        Header: 'Company Name',
        accessor: (company) => company.companyName || ''
      },
      {
        Header: 'PIC Name',
        accessor: (company) => (company.picData ? company.picData.username : '')
      },
      {
        Header: 'Action',
        Cell: ({ row }) => (
          <div>
            <Link
              className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-yellow-500 mx-2"
              aria-label="edit"
              to={`/company/edit/${row.original._id}`}>
              <FaEdit />
            </Link>
            <button
              className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-red-500"
              aria-label="delete"
              onClick={(event) => {
                event.stopPropagation();
                setConfirmModalOpen(true);
                setCompanyDetails(row.original);
              }}>
              <FaTrash />
            </button>
          </div>
        )
      }
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
                <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">Company Lists</h1>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative">
              <header className="px-5 py-4 flex justify-between">
                <h2 className="font-semibold text-gray-800 mt-1">
                  Company List
                  <span className="text-gray-400 font-medium text-sm ml-1 pt-1">({totalData})</span>
                </h2>
                <Link
                  to="/company/add"
                  className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-indigo-500">
                  <FaPlus />
                </Link>
              </header>
              {/* Table */}
              <ReactTable
                tableOptions={{
                  disableGlobalFilter: true,
                  data: companyList,
                  columns: companyColumns
                }}
              />
            </div>
          </div>

          <ModalBase
            isOpen={confirmModalOpen}
            setIsOpen={setConfirmModalOpen}
            modalType={ModalType.DELETE}
            modalHeader={
              <h2 className="text-xl font-bold text-gray-800">
                Delete {(companyDetails && companyDetails.companyName) ?? 'Company'}
              </h2>
            }
            modalContent={
              <span className="w-full">
                Are you sure?, the data you have been delete can't be restored.
              </span>
            }
            modalFooter={
              <div className="flex lg:justify-end">
                <div>
                  <button
                    className="w-full m-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setConfirmModalOpen(false);
                      handleDelete(companyDetails);
                    }}>
                    Delete
                  </button>
                  <button
                    className="m-4 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setConfirmModalOpen(false);
                    }}>
                    Cancel
                  </button>
                </div>
              </div>
            }
          />
        </main>
      </div>
    </div>
  );
}

export default CompanyList;
