import React from "react";
import { BiPackage } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { UserRoleEnum } from "../../../modules/users/enums/user-role.enum";
interface Props {
  userRole: UserRoleEnum;
  pathname: string;
}

const ProductManagementSidebar: React.FC<Props> = ({
  userRole,
  pathname,
}: Props) => {
  return (
    <div>
      {[UserRoleEnum.SUPER_USER, UserRoleEnum.ADMIN].includes(
        userRole as UserRoleEnum
      ) && (
        <div className="space-y-4">
          <h3 className="text-xs uppercase text-white font-semibold pl-3">
            <span
              className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
              aria-hidden="true"
            >
              •••
            </span>
            <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
              Product
            </span>
          </h3>
          <ul className="mt-3">
            <li
              className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                pathname.includes("/product/family/list") && "bg-gray-900"
              }`}
            >
              <NavLink
                to="/product/bundling-package/list"
                className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                  pathname.includes("/product/bundling-package/list") &&
                  "hover:text-gray-200"
                }`}
              >
                <div className="flex items-center">
                  <BiPackage className={`shrink-0 h-6 w-6 `} />
                  <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    Bundling Package
                  </span>
                </div>
              </NavLink>
            </li>
            <li
              className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                pathname.includes("/product/list") && "bg-gray-900"
              }`}
            >
              <NavLink
                to="/product/list"
                className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                  pathname.includes("/product/list") && "hover:text-gray-200"
                }`}
              >
                <div className="flex items-center">
                  <BiPackage className={`shrink-0 h-6 w-6 `} />
                  <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    Product List
                  </span>
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductManagementSidebar;
