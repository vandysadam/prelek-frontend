import React, { useState } from "react";
import Sidebar from "../../partials/sidebar/Sidebar";

function DashboardError() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <main>
          <div className="m-auto">
            <span className="text-xl md:text-4xl lg:text-5xl text-white">
              Oops!, Something Went Wrong!
            </span>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardError;
