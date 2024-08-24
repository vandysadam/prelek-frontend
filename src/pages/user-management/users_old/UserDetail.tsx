import React, { useState } from "react";
import { useParams } from "react-router";
import Header from "../../../partials/Header";
import Sidebar from "../../../partials/sidebar/Sidebar";
const UserDetail: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileSidebarOpen, setProfileSidebarOpen] = useState(false);

  const { id } = useParams();

  // const { data } = useGetUserByIdQuery(
  //   { id },
  //   {
  //     skip: false,
  //     refetchOnMountOrArgChange: true,
  //   }
  // );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="relative flex">
            {/* Profile sidebar */}
            {/* <ProfileSidebar
              profileSidebarOpen={profileSidebarOpen}
              setProfileSidebarOpen={setProfileSidebarOpen}
            /> */}

            {/* Profile body */}
            {/* <UserDetailBody
              profileSidebarOpen={profileSidebarOpen}
              setProfileSidebarOpen={setProfileSidebarOpen}
              user={data?.data}
            /> */}
          </div>
        </main>
      </div>
    </div>
  );
};
