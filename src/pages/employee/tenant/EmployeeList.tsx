import AwesomeDebouncePromise from 'awesome-debounce-promise';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { Column } from 'react-table';

import ReactTable from '../../../components/react-table/ReactTable';
import { useGetEmployeesQuery } from '../../../modules/employee/api/employee.api';
import { Employee } from '../../../modules/employee/entities/employee.entity';
import { companyRoleToReadable, UserRoleEnum } from '../../../modules/users/enums/user-role.enum';
import Header from '../../../partials/Header';
import AddEditDetailEmployeeButtons from '../../../partials/sections/employee/AddEditDetailEmployeButtons';
import EmployeeDetail from '../../../partials/sections/employee/EmployeeDetail';
import TenantEmployeeForm from '../../../partials/sections/employee/forms/EmployeeForm';
import DeleteEmployeeModal from '../../../partials/sections/employee/modals/DeleteEmployeeModal';
import Sidebar from '../../../partials/sidebar/Sidebar';
import { useTypedSelector } from '../../../store';

function TenantEmployeeList() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentUser = useTypedSelector((state) => state.authSlice.user);
  // console.log('test', import.meta.env.VITE_APP_CONTAG_ORIGIN_URL as string);

  /* Details Modal */
  const [deleteModalState, setDeleteModalState] = useState(false);
  const [purpose, setPurpose] = React.useState<'add' | 'edit' | 'detail' | 'lists'>('lists');

  const [addEditDetailState, setAddEditDeleteState] = React.useState<boolean>(false);

  const [companyList, setCompanyList] = useState([]);

  const [selectedEmployee, setSelectedEmployee] = React.useState<Employee | null>(null);

  const [totalData, setTotalData] = useState(0);

  //pagination
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [params, setParams] = useState([]);
  const [filterParams, setFilterParams] = useState({});

  const { data, refetch: refetchList } = useGetEmployeesQuery(
    { page: currentPage, limit: pageSize },
    {
      skip: false,
      refetchOnMountOrArgChange: true
    }
  );

  const handleRefetch = () => {
    setPurpose('lists');
    setAddEditDeleteState(false);
    refetchList();
  };

  const fetchData = React.useCallback(async () => {
    try {
      setCompanyList(data?.data ?? []);
      setTotalData(data?.total ?? 0);
      setLastPage(data?.lastPage ?? 1);
      setPageSize(data?.limit ?? 10);
      if (purpose === 'lists') setSelectedEmployee(null);
    } catch (error) {
      console.log(error);
    }
  }, [data?.data, data?.total, purpose]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChangePage = (page: number) => {
    setCurrentPage(page + 1);
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
  };

  const asyncParamsDebounce = React.useCallback(
    AwesomeDebouncePromise(
      (paramsFilter) => {
        setFilterParams(paramsFilter);
        setCurrentPage(1);
      },
      500,
      {
        onlyResolvesLast: true
      }
    ),
    []
  );

  React.useEffect(() => {
    const paramsFilter = {};
    for (const key in params) {
      paramsFilter[params[key].id] = params[key].value;
    }
    asyncParamsDebounce(paramsFilter);
  }, [asyncParamsDebounce, params]);

  const companyColumns = React.useMemo<Column<Employee>[]>(
    () => [
      {
        Header: 'Name',
        accessor: (employee) => employee.name || ''
      },
      {
        Header: 'Role',
        accessor: (employee) => companyRoleToReadable(employee?.role)
      },
      {
        Header: 'Action',
        Cell: ({ row: { original } }) => (
          <div>
            <button
              className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-blue-500"
              aria-label="detail"
              onClick={(event) => {
                event.stopPropagation();
                setSelectedEmployee(original);
                setPurpose('detail');
                setAddEditDeleteState(true);
              }}>
              <FaEye />
            </button>
            <button
              className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400  text-yellow-500 mx-2"
              aria-label="edit"
              onClick={(event) => {
                event.stopPropagation();
                setSelectedEmployee(original);
                setPurpose('edit');
                setAddEditDeleteState(true);
              }}>
              <FaEdit />
            </button>

            {original._id !== currentUser._id && original.role !== UserRoleEnum.COMPANY_ADMIN && (
              <button
                className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-red-500"
                aria-label="delete"
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedEmployee(original);
                  setDeleteModalState(true);
                }}>
                <FaTrash />
              </button>
            )}
          </div>
        )
      }
    ],
    []
  );

  // if (selectedEmployee) {
  //   console.log({ selectedEmployee });
  // }

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
            <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative">
              <AddEditDetailEmployeeButtons
                totalData={totalData}
                purpose={purpose}
                onPurposeChange={(purpose) => {
                  setPurpose(purpose);
                }}
                addEditDetailState={addEditDetailState}
                onAddEditDetailState={setAddEditDeleteState}
              />

              {purpose === 'lists' && (
                <ReactTable
                  tableOptions={{
                    disableGlobalFilter: true,
                    data: companyList,
                    columns: companyColumns,

                    manualPagination: true,
                    initialState: {
                      pageIndex: 0,
                      pageSize: pageSize
                    },
                    pageCount: lastPage ?? 0
                  }}
                  onHandlePageChange={handleChangePage}
                  onHandlePageSizeChange={handlePageSizeChange}
                  onHandleFilterChange={setParams}
                />
              )}

              {['add', 'edit'].indexOf(purpose) > -1 && (
                <TenantEmployeeForm
                  employee={selectedEmployee}
                  successCallback={(purpose) => {
                    if (purpose === 'lists') {
                      handleRefetch();
                    }
                  }}
                />
              )}

              {purpose === 'detail' && <EmployeeDetail employeeData={selectedEmployee} />}
            </div>
          </div>

          <DeleteEmployeeModal
            employeeData={selectedEmployee}
            modalState={deleteModalState}
            onModalStateChange={setDeleteModalState}
            successCallback={(purpose) => {
              if (purpose === 'lists') {
                handleRefetch();
              }
            }}
          />
        </main>
      </div>
    </div>
  );
}

export default TenantEmployeeList;
