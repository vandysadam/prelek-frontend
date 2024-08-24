import React, { useMemo, useState } from 'react';

import Sidebar from '../../partials/sidebar/Sidebar';
import Header from '../../partials/Header';
import { FaArrowLeft } from 'react-icons/fa';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetPicListQuery } from '../../modules/users/api/user.api';
import {
  useGetCompanyDetailQuery,
  useUpdateCompanyMutation
} from '../../modules/company/company/api/company.api';
import { Company } from '../../modules/company/company/entities/company.entity';

function CompanyEdit() {
  /* SideBar State */
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* Create feature mutation for creating new feature */
  const [updateCompany, createCompanyProcess] = useUpdateCompanyMutation();

  /* Navigate */
  const navigate = useNavigate();

  const { id } = useParams();

  /* Get Pic List */
  const { data: picList } = useGetPicListQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      skip: false
    }
  );

  const { data: companyDetails } = useGetCompanyDetailQuery(
    { id },
    {
      refetchOnMountOrArgChange: true,
      skip: false
    }
  );

  /* Formik Initial State */
  const initialState = useMemo(() => {
    return {
      picId: companyDetails?.data?.picId || '',
      companyName: companyDetails?.data?.companyName || '',
      companyAddress: companyDetails?.data?.companyAddress || ''
    };
  }, [companyDetails?.data]);

  /* Validation Schema for Formik */
  const validationSchema = Yup.object().shape({
    picId: Yup.string().required('Field is required!'),
    companyName: Yup.string().required('Field is required!')
  });

  /* Handle Create New Feature */
  const handleSubmit = async (formValue: Company) => {
    try {
      await updateCompany({
        _id: id,
        ...formValue
      }).unwrap();
      setTimeout(() => {
        toast.success(`${formValue.companyName} Updated!`, {
          theme: 'dark'
        });
      }, 0.1);
      navigate('/company/list');
    } catch (error) {
      setTimeout(() => {
        toast.error('Something went wrong!', {
          theme: 'dark'
        });
      }, 0.1);
    }
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
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">Company Name</h1>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative">
              {/* navigation */}
              <header className="px-5 pt-4 pb-1 flex flex-row">
                <Link
                  to="/company/list"
                  className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-indigo-500">
                  <FaArrowLeft />
                </Link>
                <h2 className="font-semibold text-gray-800 ml-3 mt-1">New Company</h2>
              </header>

              <Formik
                initialValues={initialState}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                {({ isValid, values, setFieldValue }) => (
                  <Form className="p-4">
                    <div className="space-y-4">
                      {/* PIC ID */}
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="picId">
                          PIC
                          <span className="text-red-500"> *</span>
                        </label>
                        <Field
                          as="select"
                          id="picId"
                          name="picId"
                          placeholder="Send From"
                          className="form-input w-full"
                          type="text">
                          <option value="">Select PIC</option>
                          {picList?.data?.length > 0 &&
                            picList?.data?.map((value) => (
                              <option key={value._id} value={value._id}>
                                {value.username || value.fullName}
                              </option>
                            ))}
                        </Field>
                        <div className="h-2">
                          <ErrorMessage
                            name="picId"
                            component="span"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>

                      {/* Company Name */}
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="companyName">
                          Company Name
                          <span className="text-red-500"> *</span>
                        </label>
                        <Field
                          id="companyName"
                          name="companyName"
                          placeholder="Company Name"
                          className="form-input w-full"
                          type="text"
                        />
                        <div className="h-2">
                          <ErrorMessage
                            name="companyName"
                            component="span"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>
                      {/* Company Address */}
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="companyAddress">
                          Company Address
                        </label>
                        <Field
                          id="companyAddress"
                          as="textarea"
                          rows="3"
                          name="companyAddress"
                          placeholder="Company Address"
                          className="form-input w-full"
                        />
                        <div className="h-2">
                          <ErrorMessage
                            name="companyAddress"
                            component="span"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-end mt-6">
                      <button
                        className={`btn bg-indigo-500 hover:bg-indigo-600 text-white disabled:bg-gray-300 disabled:text-gray-400`}
                        disabled={!isValid}
                        type="submit">
                        {isValid ? 'Submit' : 'Please fill out all required fields'}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CompanyEdit;
