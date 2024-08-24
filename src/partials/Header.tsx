import React, { useEffect, useState } from 'react';

import SearchModal from '../components/modal/ModalSearch';
import Notifications from '../components/dropdown/DropdownNotifications';
import Help from '../components/dropdown/DropdownHelp';
import UserMenu from '../components/dropdown/DropdownProfile';
import { useTypedDispatch, useTypedSelector } from '../store';

import { useGetCurrentUserQuery } from '../modules/users/api/user.api';
// import { useProfileQuery } from "../modules/auth/auth.api";

function Header({ sidebarOpen, setSidebarOpen }) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // const { data: userResponse } = useProfileQuery(null);

  const currentUser = useTypedSelector((state) => state.authSlice.user);

  const dispatch = useTypedDispatch();

  useEffect(() => {
    // if (selectedBusiness == null) {
    //   const getBusiness =
    //     userResponse?.data?.businesses &&
    //     userResponse?.data?.businesses.length > 0
    //       ? userResponse?.data?.businesses[0]
    //       : null;
    //   dispatch(businessSlice.actions.setSelectedBusiness(getBusiness));
    // }
  });

  // const onSelectedBusiness = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const businessId = event.target.value;
  //   const getBusiness =
  //     userResponse?.data?.businesses.find(
  //       (value) => value._id === businessId
  //     ) ?? null;
  //   dispatch(businessSlice.actions.setSelectedBusiness(getBusiness));
  // };

  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-gray-500 hover:text-gray-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(!sidebarOpen)}>
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            {/* <button
              className={`w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition duration-150 rounded-full ml-3 ${
                searchModalOpen && "bg-gray-200"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setSearchModalOpen(true);
              }}
              aria-controls="search-modal"
            >
              <span className="sr-only">Search</span>
              <svg
                className="w-4 h-4"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="fill-current text-gray-500"
                  d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"
                />
                <path
                  className="fill-current text-gray-400"
                  d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z"
                />
              </svg>
            </button> */}

            {/* <select
              className="form-select"
              value={selectedBusiness._id}
              onChange={onSelectedBusiness}
            >
              {userResponse?.data?.businesses?.map((business, index) => (
                <option key={index} value={business._id}>
                  {business.businessName}
                </option>
              ))}
            </select> */}

            {/* <SearchModal id="search-modal" searchId="search" modalOpen={searchModalOpen} setModalOpen={setSearchModalOpen} /> */}
            {/* <Notifications align="right" /> */}
            {/* <Help align="right" /> */}
            {/*  Divider */}
            <hr className="w-px h-6 bg-gray-200 mx-3" />
            <UserMenu currentUser={currentUser} align="right" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
