// import React, { useCallback, useEffect, useState } from "react";

// import { FaEye, FaTrash, FaUserEdit } from "react-icons/fa";

// import { Column } from "react-table";

// import AwesomeDebouncePromise from "awesome-debounce-promise";
// import { Link } from "react-router-dom";
// import { useGetAllUserQuery } from "../../../modules/users/api/user.api";
// import DateSelect from "../../../components/DateSelect";
// import ReactTable from "../../../components/react-table/ReactTable";

// import DeleteButton from "../../../partials/actions/DeleteButton";
// // import FilterButton from "../../../partials/actions/FilterButton";
// import Header from "../../../partials/Header";
// import Sidebar from "../../../partials/Sidebar";
// import FilterButton from "../../../partials/actions/FilterButton";
// import { User } from "../../../modules/users/dtos/models/user.entity";

// function UserList() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [userList, setUserList] = useState<User[]>([]);
//   const [totalData, setTotalData] = useState(0);

//   const [lastPage, setLastPage] = useState(0);
//   const [currentPage, setCurrentPage] = React.useState(1);
//   const [pageSize, setPageSize] = React.useState(10);

//   const [params, setParams] = React.useState<Record<string, any>>([]);

//   const [filterParams, setFilterParams] = React.useState({});

//   const { data } = useGetAllUserQuery(
//     {
//       page: currentPage,
//       limit: pageSize,
//       ...filterParams,
//     },
//     {
//       skip: false,
//       refetchOnMountOrArgChange: true,
//     }
//   );

//   useEffect(() => {
//     if (data) {
//       setUserList(data?.data);
//       setTotalData(data.total);
//       setLastPage(data.lastPage);
//       // setTotalData(data.total);
//     }
//   }, [data]);

//   const handleChangePage = (page: number) => {
//     setCurrentPage(page + 1);
//   };

//   const handlePageSizeChange = (pageSize: number) => {
//     setPageSize(pageSize);
//   };

//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const asyncParamsDebounce = useCallback(
//     AwesomeDebouncePromise(
//       (paramsFilter) => {
//         setFilterParams(paramsFilter);
//       },
//       500,
//       {
//         onlyResolvesLast: true,
//       }
//     ),
//     []
//   );

//   useEffect(() => {
//     const paramsFilter = {};

//     for (const key in params) {
//       paramsFilter[params[key].id] = params[key].value;
//     }

//     asyncParamsDebounce(paramsFilter);
//   }, [asyncParamsDebounce, params]);

//   const userColumns = React.useMemo<Column<User>[]>(
//     () =>
//       [
//         {
//           Header: "Name",
//           accessor: "name",
//         },
//         {
//           Header: "Phone",
//           accessor: "phoneNumber",
//         },
//         {
//           Header: "Gender",
//           accessor: "gender",
//         },
//         {
//           Header: "Email",
//           accessor: "email",
//         },
//         {
//           Header: "Created At",
//           accessor: "createdAt",
//         },
//         {
//           Header: "Action",
//           accessor: "_id",
//           Cell: ({ row }) => (
//             <div>
//               <Link
//                 className="btn bg-white border-gray-200 hover:border-gray-300 text-indigo-500 mr-2"
//                 aria-label="detail"
//                 to={`/users/detail/${row.original._id}`}
//               >
//                 <FaEye />
//               </Link>
//               <button
//                 className="btn bg-white border-gray-200 hover:border-gray-300 text-yellow-500 mr-2"
//                 aria-label="edit"
//                 onClick={() => {}}
//               >
//                 <FaUserEdit />
//               </button>
//               <button
//                 className="btn bg-white border-gray-200 hover:border-gray-300 text-red-500"
//                 aria-label="delete"
//                 onClick={() => {}}
//               >
//                 <FaTrash />
//               </button>
//             </div>
//           ),
//         },
//       ] as Column<User>[],
//     []
//   );

//   const handleSelectedItems = (selectedItems) => {
//     setSelectedItems([...selectedItems]);
//   };

//   return (
//     <div className="flex h-screen overflow-hidden">
//       {/* Sidebar */}
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//       {/* Content area */}
//       <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
//         {/*  Site header */}
//         <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//         <main>
//           <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
//             {/* Page header */}
//             <div className="sm:flex sm:justify-between sm:items-center mb-8">
//               {/* Left: Title */}
//               <div className="mb-4 sm:mb-0">
//                 <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
//                   Users ✨
//                 </h1>
//               </div>

//               {/* Right: Actions */}
//               <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
//                 {/* Delete button */}
//                 <DeleteButton selectedItems={selectedItems} />
//                 {/* Dropdown */}
//                 <DateSelect />
//                 {/* Filter button */}
//                 <FilterButton />
//               </div>
//             </div>
//             {/* Table */}
//             {/* <UserListTable
//               totalData={totalData}
//               data={userList}
//               selectedItems={handleSelectedItems}
//             /> */}
//             <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative">
//               <header className="px-5 py-4">
//                 <h2 className="font-semibold text-gray-800">
//                   All users{" "}
//                   <span className="text-gray-400 font-medium">{totalData}</span>
//                 </h2>
//               </header>
//               <ReactTable
//                 tableOptions={{
//                   columns: userColumns,
//                   data: userList,
//                   manualFilters: true,
//                   disableGlobalFilter: true,
//                   disableFilters: false,
//                   manualPagination: true,
//                   initialState: {
//                     pageIndex: 0,
//                     pageSize: pageSize,
//                   },
//                   pageCount: lastPage,
//                 }}
//                 onHandlePageChange={handleChangePage}
//                 onHandlePageSizeChange={handlePageSizeChange}
//                 onHandleFilterChange={setParams}
//               />
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default UserList;
import React, { useCallback, useEffect, useState } from "react";

import { FaEye, FaTrash, FaUserEdit } from "react-icons/fa";

import { Column } from "react-table";

import AwesomeDebouncePromise from "awesome-debounce-promise";
import { Link } from "react-router-dom";
import { useGetAllUserQuery } from "../../../modules/users/api/user.api";
import DateSelect from "../../../components/DateSelect";
import ReactTable from "../../../components/react-table/ReactTable";

import DeleteButton from "../../../partials/actions/DeleteButton";
// import FilterButton from "../../../partials/actions/FilterButton";
import Header from "../../../partials/Header";
import Sidebar from "../../../partials/sidebar/Sidebar";
import FilterButton from "../../../partials/actions/FilterButton";
import { User } from "../../../modules/users/dtos/models/user.entity";

function UserListOld() {}

export default UserListOld;
