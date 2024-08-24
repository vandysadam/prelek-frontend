import React from "react";
import { Route, Routes } from "react-router-dom";
import UserAdd from "./users/UserAdd";
import UserEdit from "./users/UserEdit";
import UserList from "./users/UserList";

const UserManagementRoutes: React.FC = () => {
  return (
    <div>
      <Routes>
        {/* User */}
        <Route path="/list" element={<UserList />}></Route>
        <Route path="/add" element={<UserAdd />}></Route>
        <Route path="/edit/:id" element={<UserEdit />}></Route>
        {/* <Route path="/user/detail/:id" element={<UserDetail />}></Route> */}

        {/* Cool */}
        {/* <Route path="/cools" element={<CoolList />}></Route>
        <Route path="/cools/add" element={<CoolForm />}></Route>
        <Route path="/cools/edit/:id" element={<CoolForm />}></Route>

        <Route path="/families" element={<FamilyList />}></Route>
        <Route path="/families/add" element={<FamilyForm />}></Route>
        <Route path="/families/edit/:id" element={<FamilyForm />}></Route> */}
      </Routes>
    </div>
  );
};

export default UserManagementRoutes;
