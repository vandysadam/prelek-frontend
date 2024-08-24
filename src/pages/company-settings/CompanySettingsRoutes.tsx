import React from "react";
import { Route, Routes } from "react-router-dom";
import CompanySettings from ".";

const CompanySettingsRoutes: React.FC = () => {
  return (
    <div>
      <Routes>
        {/* Blasts */}
        <Route path="/" element={<CompanySettings />}></Route>
      </Routes>
    </div>
  );
};

export default CompanySettingsRoutes;
