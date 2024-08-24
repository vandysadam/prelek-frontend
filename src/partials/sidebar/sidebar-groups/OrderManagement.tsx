import React from "react";
import { NavLink } from "react-router-dom";
import { UserRoleEnum } from "../../../modules/users/enums/user-role.enum";
import OrderIcon from "../../../images/sidebar-icons/order-icon.png";
interface Props {
  userRole: UserRoleEnum;
  pathname: string;
}

const OrderManagementSidebar: React.FC<Props> = ({
  userRole,
  pathname,
}: Props) => {
  return (
    <div>
      {[
        UserRoleEnum.SUPER_USER,
        UserRoleEnum.ADMIN,
        UserRoleEnum.PACKING_ADMIN,
        UserRoleEnum.SHIPPING_ADMIN,
      ].includes(userRole as UserRoleEnum) && (
        <div className="space-y-4">
          <h3 className="text-xs uppercase text-white font-semibold pl-3">
            <span
              className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
              aria-hidden="true"
            >
              •••
            </span>
            <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
              Order
            </span>
          </h3>
          <ul className="mt-3">
            {/* Company List */}
            <li
              className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                pathname.includes("/order/list") && "bg-gray-900"
              }`}
            >
              <NavLink
                to="/order/list"
                className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                  pathname.includes("/order/list") && "hover:text-gray-200"
                }`}
              >
                <div className="flex items-center">
                  {/* <FaNewspaper className={`shrink-0 h-6 w-6 `} /> */}
                  <img src={OrderIcon} alt="user-list-icon" />
                  <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    Order List
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

export default OrderManagementSidebar;
