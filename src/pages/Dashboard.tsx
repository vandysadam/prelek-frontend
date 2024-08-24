import React, { useState } from "react";

import Sidebar from "../partials/sidebar/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import AnalyticsCard01 from "../partials/analytics/AnalyticsCard01";
import AnalyticsCard02 from "../partials/analytics/AnalyticsCard02";
import AnalyticsCard07 from "../partials/analytics/AnalyticsCard07";
import AnalyticsCard09 from "../partials/analytics/AnalyticsCard09";
import AnalyticsCard10 from "../partials/analytics/AnalyticsCard10";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              {/* Polar chart (Sessions By Gender) */}
              <AnalyticsCard10 />
              {/* Doughnut chart (Visit By Age Category) */}
              <AnalyticsCard09 />
              {/* Report card (Top Countries) */}
              <AnalyticsCard07 />
              {/* Line chart (Analytics) */}
              <AnalyticsCard01 />
              {/*  Line chart (Active Users Right Now) */}
              <AnalyticsCard02 />

              {/* Doughnut chart (Sessions By Device) */}
              {/* <AnalyticsCard08 /> */}
              {/* Doughnut chart (Top Countries) */}
              {/* <DashboardCard06 /> */}
              {/* Bar chart (Direct vs Indirect) */}
              {/* <DashboardCard04 /> */}
              {/* Line chart (Acme Plus) */}
              {/* <DashboardCard01 /> */}
              {/* Line chart (Acme Advanced) */}
              {/* <DashboardCard02 /> */}
              {/* Line chart (Acme Professional) */}
              {/* <DashboardCard03 /> */}
              {/* Line chart (Real Time Value) */}
              {/* <DashboardCard05 /> */}
              {/* Table (Top Channels) */}
              {/* <AnalyticsCard05 /> */}
              {/* <DashboardCard07 /> */}
              {/* Line chart (Sales Over Time) */}
              {/* <DashboardCard08 /> */}
              {/* Stacked bar chart (Sales VS Refunds) */}
              {/* <DashboardCard09 /> */}
              {/* Card (Recent Activity) */}
              {/* <DashboardCard10 /> */}
              {/* Card (Income/Expenses) */}
              {/* <DashboardCard11 /> */}
              {/* Stacked bar chart (Acquisition Channels) */}
              {/* <AnalyticsCard03 /> */}
              {/* Horizontal bar chart (Audience Overview) */}
              {/* <AnalyticsCard04 /> */}
              {/* Report card (Top Channels) */}
              {/* Report card (Top Pages) */}
              {/* <AnalyticsCard06 /> */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
