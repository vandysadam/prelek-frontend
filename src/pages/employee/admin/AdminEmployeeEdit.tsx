import React, { useState } from 'react';
import { useTypedSelector } from '../../../store';
import { Company } from '../../../modules/company/company/entities/company.entity';
import { Employee } from '../../../modules/employee/entities/employee.entity';
import { useCreateEmployeeMutation } from '../../../modules/employee/api/employee.api';
import Sidebar from '../../../partials/sidebar/Sidebar';
import Header from '../../../partials/Header';
import ModalBase, { ModalType } from '../../../components/modal/ModalBase';
import { Link } from 'react-router-dom';
import { CreateEmployeeDto } from '../../../modules/employee/dtos/requests/create-employee.request';
import { removeEmptyKey } from '../../../utils/remove-empty-key';
import { toast } from 'react-toastify';
import TenantEmployeeForm from '../../../partials/sections/employee/forms/EmployeeForm';

const AdminEmployeeEdit = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [selectedItems, setSelectedItems] = useState([]);
  const currentUser = useTypedSelector((state) => state.authSlice.user);

  /* Details Modal */
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  /* Feature Details */
  const [companyDetails, setCompanyDetails] = useState<Company>();
  const [purpose, setPurpose] = React.useState<'add' | 'edit' | 'detail' | 'lists'>('lists');

  const [addEditDetailState, setAddEditDeleteState] = React.useState<boolean>(false);

  const [selectedEmployee, setSelectedEmployee] = React.useState<Employee | null>(null);

  const [create, { isLoading }] = useCreateEmployeeMutation();

  const handleRefetch = () => {
    // setPurpose('lists');
    setAddEditDeleteState(false);
    // refetchList();
  };

  const onSubmit = async (formValue: CreateEmployeeDto) => {
    console.log('form submitted');

    const company_id: string | undefined = formValue.company_id
      ? formValue.company_id
      : (currentUser as Employee).company_id
      ? (currentUser as Employee).company_id
      : undefined;

    // if (!employee && !!company_id) {
    if (company_id) {
      try {
        let createEmployeePayload: CreateEmployeeDto = {
          ...formValue,
          company_id
        };
        // if (avatarImageFile) {
        //   createEmployeePayload.avatar_url = {
        //     ...avatarImageFile
        //   };
        // }

        createEmployeePayload = removeEmptyKey(createEmployeePayload);

        // console.log({ createEmployeePayload });
        const createdEmployee = await create(createEmployeePayload).unwrap();
        console.log(createdEmployee);

        toast.success(`${formValue.name} Created Successfully!`, {
          theme: 'dark'
        });
        // successCallback('lists');
      } catch (error) {
        // console.log(error);
        if (error.data.statusCode < 500) {
          toast.error(error.data.message, {
            theme: 'dark'
          });
        }
        if (error.data.statusCode >= 500) {
          toast.error('Something went wrong', {
            theme: 'dark'
          });
        }
      }
    }
    // if employee exist (edit).
  };

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
              <header className="px-5 py-4 flex justify-between">
                <h2 className="font-semibold text-gray-800 mt-1">Create Employee</h2>

                <div className="mr-6">
                  <div>
                    <Link to={'/employee/list'}>
                      <button
                        className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-green-500 py-auto"
                        aria-label="back">
                        Back to lists
                      </button>
                    </Link>
                  </div>
                </div>
              </header>

              <TenantEmployeeForm
                // onSubmit={onSubmit}
                employee={selectedEmployee}
                successCallback={(purpose) => {
                  if (purpose === 'lists') {
                    handleRefetch();
                  }
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
                Are you sure?, the data you have been delete can`t be restored.
              </span>
            }
            modalFooter={
              <div className="flex lg:justify-end">
                <div>
                  <button
                    className="w-full m-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setConfirmModalOpen(false);
                      // handleDelete(companyDetails);
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
};

export default AdminEmployeeEdit;
