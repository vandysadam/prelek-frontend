import React, { useEffect, useMemo, useState } from 'react';

import { FaArrowLeft, FaLock, FaUnlock } from 'react-icons/fa';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from '../../../partials/sidebar/Sidebar';
import Header from '../../../partials/Header';
import { User } from '../../../modules/users/dtos/models/user.entity';
import { UserRoleEnum } from '../../../modules/users/enums/user-role.enum';
import { useTypedSelector } from '../../../store';
import { useGetUserDetailQuery, useUpdateUserMutation } from '../../../modules/users/api/user.api';

function UserEdit() {
  /* SideBar State */
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* Create feature mutation for creating new feature */
  const [updateUser] = useUpdateUserMutation<User>();

  /* Navigate */
  const navigate = useNavigate();

  /* get feature id from params */
  const { id } = useParams();

  const currentUserRole = useTypedSelector((state) => state.authSlice.user.role);

  const [showPassword, setShowPassword] = useState(false);

  /* Get User Detail */
  const { data: userData, refetch } = useGetUserDetailQuery({
    id
  });

  /* Formik Initial State */
  const initialState = useMemo(() => {
    return {
      username: userData?.data?.username || '',
      email: userData?.data?.email || '',
      fullName: userData?.data?.fullName || '',
      phoneNumber: userData?.data?.phoneNumber || '',
      role: userData?.data?.role.toString() || ''
    };
  }, [userData?.data]);

  /* Validation Schema for Formik */
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Field is required!'),
    email: Yup.string()
      .trim()
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Invalid Email Format')
      .required('Field is required!'),
    phoneNumber: Yup.string()
      .trim()
      .matches(
        /^(\+62|62)?0?8[0-9]\d{7,10}$/,
        'Invalid number, start with (+62/62/08/8), and must be 10-13 digits'
      )
      .required('Field is required!'),
    role: Yup.string().required('Field is required!')
  });

  /* Handle Create New User */
  const handleSubmit = async (formValue: User) => {
    try {
      const { ...userData } = formValue;
      await updateUser({
        _id: id,
        ...userData
      }).unwrap();
      setTimeout(() => {
        toast.success(`${formValue.username} Updated!`, {
          theme: 'dark'
        });
      }, 0.1);
      refetch();
      navigate('/user/list');
    } catch (error) {
      setTimeout(() => {
        toast.error('Something went wrong!', {
          theme: 'dark'
        });
      }, 0.1);
      console.log(error);
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
                <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">Edit User</h1>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative">
              {/* navigation */}
              <header className="px-5 pt-4 pb-1 flex flex-row">
                <Link
                  to="/user/list"
                  className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-indigo-500">
                  <FaArrowLeft />
                </Link>
                <h2 className="font-semibold text-gray-800 ml-3 mt-1">Edit User</h2>
              </header>

              <Formik
                initialValues={initialState}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                <Form className="p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="username">
                        Username
                        <span className="text-red-500"> *</span>
                      </label>
                      <Field
                        id="username"
                        name="username"
                        placeholder="ex: Jhon"
                        className="form-input w-full"
                        type="text"
                      />
                      <div className="h-2">
                        <ErrorMessage
                          name="username"
                          component="span"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="fullName">
                        Full Name
                      </label>
                      <Field
                        id="fullName"
                        name="fullName"
                        placeholder="ex: Jhon Doe"
                        className="form-input w-full"
                        type="text"
                      />
                      <div className="h-2">
                        <ErrorMessage
                          name="fullName"
                          component="span"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="phoneNumber">
                        Phone
                        <span className="text-red-500"> *</span>
                      </label>
                      <Field
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="+62xxxx / 62xxxx / 08xxxx / 8xxxx"
                        className="form-input w-full"
                        type="text"
                      />
                      <div className="h-2">
                        <ErrorMessage
                          name="phoneNumber"
                          className="text-red-600 text-sm"
                          component="div"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="role">
                        User Roles
                        <span className="text-red-500"> *</span>
                      </label>
                      <Field
                        as="select"
                        id="role"
                        name="role"
                        className="form-input w-full"
                        type="select">
                        <option value="">Select Roles</option>
                        {currentUserRole !== UserRoleEnum.CUSTOMER &&
                          currentUserRole !== UserRoleEnum.EMPLOYEE && (
                            <>
                              {currentUserRole === UserRoleEnum.SUPER_USER && (
                                <>
                                  <option value="admin">Admin</option>
                                  <option value="marketing">Marketing</option>
                                  <option value="hrd">HRD</option>
                                  <option value="customer">Customer</option>
                                </>
                              )}
                              {currentUserRole === UserRoleEnum.ADMIN && (
                                <>
                                  <option value="marketing">Marketing</option>
                                  <option value="hrd">HRD</option>
                                  <option value="customer">Customer</option>
                                </>
                              )}
                              {currentUserRole === UserRoleEnum.MARKETING && (
                                <>
                                  <option value="hrd">HRD</option>
                                  <option value="customer">Customer</option>
                                </>
                              )}
                              <option value="employee">Employee</option>
                            </>
                          )}
                      </Field>
                      <div className="h-2">
                        <ErrorMessage
                          name="role"
                          className="text-red-600 text-sm"
                          component="div"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="email">
                        E-mail
                        <span className="text-red-500"> *</span>
                      </label>
                      <Field
                        id="email"
                        name="email"
                        placeholder="ex: jhon.doe@gmail.com"
                        className="form-input w-full input-disabled bg-gray-200"
                        type="email"
                        disabled={true}
                      />
                      <div className="h-2">
                        <ErrorMessage
                          name="email"
                          component="span"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="password">
                        Password
                        <span className="text-red-500"> *</span>
                      </label>
                      <div className="relative w-full">
                        <Field
                          id="password"
                          name="password"
                          placeholder="Fill in your password to change it"
                          className="form-input w-full"
                          type={showPassword ? 'text' : 'password'}
                          as="input"
                          autoComplete="off"
                        />
                        <div className="absolute inset-y-0 right-2 top-1">
                          <button
                            type="button"
                            onClick={(event) => {
                              event.preventDefault();
                              setShowPassword(!showPassword);
                            }}>
                            {showPassword ? (
                              <FaUnlock size="23" className="mt-1" />
                            ) : (
                              <FaLock size="23" className="mt-1" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="h-2">
                        <ErrorMessage
                          name="password"
                          component="span"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end mt-6">
                    {/* {createUserProcess.isLoading ? (
                      <button
                        className="btn loading hover:bg-indigo-600  disabled:bg-indigo-600 disabled:text-white"
                        disabled={true}
                      >
                        loading
                      </button>
                    ) : ( */}
                    <button
                      className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
                      type="submit">
                      Submit
                    </button>
                    {/* )} */}
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserEdit;
