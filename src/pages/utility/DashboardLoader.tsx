import React, { useState } from "react";

import Sidebar from "../../partials/sidebar/Sidebar";

function DashboardLoader() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <main>
          <button className="w-full h-screen btn btn-lg loading text-xl">
            Loading
          </button>
        </main>
      </div>
    </div>
  );
}

export default DashboardLoader;
