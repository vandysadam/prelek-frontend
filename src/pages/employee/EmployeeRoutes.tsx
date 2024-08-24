import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserRoleEnum } from '../../modules/users/enums/user-role.enum';
import { useTypedSelector } from '../../store';
import AdminEmployeeList from './admin/AdminEmployeeList';
import TenantEmployeeList from './tenant/EmployeeList';
import AdminEmployeeCreate from './admin/AdminEmployeeCreate';
import AdminEmployeeEdit from './admin/AdminEmployeeEdit';

const EmployeeRoutes: React.FC = () => {
  const currentUser = useTypedSelector((state) => state.authSlice.user);
  return (
    <div>
      {[UserRoleEnum.COMPANY_ADMIN, UserRoleEnum.COMPANY_PIC].indexOf(
        currentUser.role as UserRoleEnum
      ) > -1 ? (
        <Routes>
          <Route path="/list" element={<TenantEmployeeList />}></Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/list" element={<AdminEmployeeList />}></Route>
          <Route path="/add" element={<AdminEmployeeCreate />}></Route>
          <Route path="/edit/:id" element={<AdminEmployeeEdit />}></Route>
        </Routes>
      )}
    </div>
  );
};

export default EmployeeRoutes;
