import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserRoleEnum } from '../../../modules/users/enums/user-role.enum';
import UserListIcon from '../../../images/sidebar-icons/user-list-icon.png';
import CompanyIcon from '../../../images/sidebar-icons/company-icon.png';
interface Props {
  userRole: UserRoleEnum;
  pathname: string;
}

const UserAndCompanyManagementSideBar: React.FC<Props> = ({ userRole, pathname }: Props) => {
  // console.log('userRole', userRole);
  return (
    <>
      {/* {[
        UserRoleEnum.SUPER_USER,
        UserRoleEnum.ADMIN,
        UserRoleEnum.MARKETING,
        UserRoleEnum.COMPANY_ADMIN,
        UserRoleEnum.COMPANY_PIC
      ].includes(userRole as UserRoleEnum) && ( */}
      <div className="space-y-4">
        {/* if not a HRD (Super admin, admin, marketing) */}
        {![UserRoleEnum.COMPANY_ADMIN, UserRoleEnum.COMPANY_PIC].includes(
          userRole as UserRoleEnum
        ) && (
          <>
            {/* User Management Group  */}
            <div>
              <h3 className="text-xs uppercase text-white font-semibold pl-3">
                <span
                  className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                  aria-hidden="true">
                  •••
                </span>
                <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                  User Management
                </span>
              </h3>
              <ul className="mt-3">
                {/* Company List */}
                <li
                  className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                    pathname.includes('/user/list') && 'bg-gray-900'
                  }`}>
                  <NavLink
                    to="/user/list"
                    className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                      pathname.includes('/user/list') && 'hover:text-gray-200'
                    }`}>
                    <div className="flex items-center">
                      {/* <FaNewspaper className={`shrink-0 h-6 w-6 `} /> */}
                      <img src={UserListIcon} alt="user-list-icon" />
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        User List
                      </span>
                    </div>
                  </NavLink>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
      {/* )} */}
    </>
  );
};

export default UserAndCompanyManagementSideBar;
