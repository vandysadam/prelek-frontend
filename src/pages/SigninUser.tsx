// import { ErrorMessage, Field, Form, Formik } from 'formik';
// import React, { useState } from 'react';
// import { FaLock, FaUnlock } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import * as Yup from 'yup';
// import { useAuthLoginMutation } from '../modules/auth/auth.api';
// import { authSlice } from '../modules/auth/auth.slice';
// import { useTypedDispatch } from '../store';

// interface SigninState {
//   username: string;
//   password: string;
//   source: string;
// }

// const SigninUser: React.FC = () => {
//   const initialState: SigninState = {
//     username: '',
//     password: '',
//     source: ''
//   };

//   /**
//    * Typed dispatch
//    */
//   const dispatch = useTypedDispatch();
//   const router = useNavigate();

//   const [authLogin, loginProcess] = useAuthLoginMutation();

//   const validationSchema = Yup.object().shape({
//     username: Yup.string().required('Username field is required!'),
//     password: Yup.string().required('Password field is required!')
//   });

//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = async (formValue) => {
//     const { username, password } = formValue;
//     try {
//       // send email and password to server
//       if (!import.meta.env.VITE_APP_SKIP_LOGIN) {
//         const payload = await authLogin({
//           login_id: username,
//           password: password,
//           source: 'user'
//         }).unwrap();

//         const accessToken = payload?.data.accessToken;
//         const currentUser = payload?.data.user;

//         dispatch(authSlice.actions.updateAccessToken(accessToken));
//         dispatch(authSlice.actions.updateCurrentUser(currentUser));
//       }
//       router('/');
//     } catch (error) {
//       if (error.status === 401) {
//         toast.error('Wrong Credentials!', {
//           theme: 'colored'
//         });
//       } else {
//         toast.error('Something went wrong!', {
//           theme: 'colored'
//         });
//         console.log('login gagal');
//       }
//     }
//   };

//   return (
//     <main className="bg-white">
//       <div className="relative md:flex">
//         {/* Content */}
//         <div className="md:w-1/2">
//           <div className="min-h-screen h-full flex flex-col after:flex-1">
//             {/* Header */}
//             <div className="flex-1">
//               <div className="flex items-center justify-center md:justify-between h-16 px-2 sm:px-2 lg:px-2">
//                 {/* Logo */}
//                 <Link className="block" to="/">
//                   <img
//                     src="https://firebasestorage.googleapis.com/v0/b/contag-c8b18.appspot.com/o/logo_white.png?alt=media&token=7f2ce481-ea63-429f-abc7-570106a77526"
//                     className="object-cover w-72"
//                     alt="logo"
//                   />
//                 </Link>
//               </div>
//             </div>

//             <div className="w-3/4 md:w-1/2 mx-auto px-4 py-8">
//               <h1 className="text-3xl text-gray-800 font-bold mb-6">Welcome back!</h1>
//               {/* Form */}
//               <Formik
//                 initialValues={initialState}
//                 validationSchema={validationSchema}
//                 onSubmit={handleSubmit}>
//                 <Form>
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium mb-1" htmlFor="email">
//                         Email Address
//                       </label>
//                       <Field
//                         id="email"
//                         name="username"
//                         placeholder="jhon.doe@gmail.com"
//                         className="form-input w-full"
//                         type="email"
//                       />
//                       <div className="h-2">
//                         <ErrorMessage
//                           name="username"
//                           component="span"
//                           className="text-red-500 text-sm"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-1" htmlFor="password">
//                         Password
//                       </label>
//                       <div className="relative w-full">
//                         <Field
//                           id="password"
//                           name="password"
//                           placeholder="Password"
//                           className="form-input w-full"
//                           type={showPassword ? 'text' : 'password'}
//                           as="input"
//                           autoComplete="off"
//                         />
//                         <div className="absolute inset-y-0 right-2 top-1">
//                           <button
//                             type="button"
//                             onClick={(event) => {
//                               event.preventDefault();
//                               setShowPassword(!showPassword);
//                             }}>
//                             {showPassword ? (
//                               <FaUnlock size="23" className="mt-1" />
//                             ) : (
//                               <FaLock size="23" className="mt-1" />
//                             )}
//                           </button>
//                         </div>
//                       </div>
//                       <div className="h-2">
//                         <ErrorMessage
//                           name="password"
//                           component="span"
//                           className="text-red-500 text-sm"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between mt-6">
//                     <div className="mr-1">
//                       <Link
//                         className="text-sm underline hover:no-underline"
//                         to="/reset-password"
//                         onClick={() => {
//                           localStorage.setItem('source', 'user');
//                         }}>
//                         Forgot Password?
//                       </Link>
//                     </div>

//                     {loginProcess.isLoading ? (
//                       <button
//                         className="btn loading hover:bg-indigo-600  disabled:bg-indigo-600 disabled:text-white"
//                         disabled={true}>
//                         loading
//                       </button>
//                     ) : (
//                       <button
//                         className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
//                         type="submit">
//                         Sign In
//                       </button>
//                     )}
//                   </div>
//                 </Form>
//               </Formik>
//               {/* Footer */}
//               <div className="pt-5 mt-6 border-t border-gray-200">
//                 <div className="text-sm">
//                   Don’t you have an account?{' '}
//                   <Link className="font-medium text-indigo-500 hover:text-indigo-600" to="/signup">
//                     Sign Up
//                   </Link>
//                 </div>
//                 {/* Warning */}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Image */}
//         <div
//           className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2"
//           aria-hidden="true">
//           <img
//             className="object-cover object-center w-full h-full"
//             src="https://images.pexels.com/photos/2733680/pexels-photo-2733680.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=1920&w=1280"
//             width="760"
//             height="1024"
//             alt="Authentication"
//           />
//         </div>
//       </div>
//     </main>
//   );
// };

// export default SigninUser;
