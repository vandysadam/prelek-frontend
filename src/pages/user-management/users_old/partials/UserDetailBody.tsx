import React from "react";
import { FaCheck, FaLink, FaMapMarker } from "react-icons/fa";

import Icon02 from "../../../../images/icon-02.svg";
import Icon03 from "../../../../images/icon-03.svg";
import ProfileBg from "../../../../images/profile-bg.jpg";
import { User } from "../../../../modules/users/dtos/models/user.entity";

interface IUserDetailBodyProps {
  user: User;
  profileSidebarOpen: boolean;
  setProfileSidebarOpen: (open: boolean) => void;
}

const UserDetailBody: React.FC<IUserDetailBodyProps> = ({
  profileSidebarOpen,
  setProfileSidebarOpen,
  user,
}) => {
  return (
    <div
      className={`grow flex flex-col md:translate-x-0 transform transition-transform duration-300 ease-in-out ${
        profileSidebarOpen ? "translate-x-1/3" : "translate-x-0"
      }`}
    >
      {/* Profile background */}
      <div className="relative h-56 bg-gray-200">
        <img
          className="object-cover h-full w-full"
          src={ProfileBg}
          width="979"
          height="220"
          alt="Profile background"
        />
        {/* Close button */}
        <button
          className="md:hidden absolute top-4 left-4 sm:left-6 text-white opacity-80 hover:opacity-100"
          onClick={() => setProfileSidebarOpen(!profileSidebarOpen)}
          aria-controls="profile-sidebar"
          aria-expanded={profileSidebarOpen}
        >
          <span className="sr-only">Close sidebar</span>
          <svg
            className="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="relative px-4 sm:px-6 pb-8">
        {/* Pre-header */}
        <div className="-mt-16 mb-6 sm:mb-3">
          <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-end">
            {/* Avatar */}
            <div className="inline-flex -ml-1 -mt-1 mb-4 sm:mb-0">
              <img
                className="rounded-full border-4 border-white"
                src={`https://ui-avatars.com/api/?name=${user?.username}`}
                width="128"
                height="128"
                alt="Avatar"
              />
            </div>

            {/* Actions */}
            <div className="flex space-x-2 sm:mb-2">
              <button className="p-1.5 shrink-0 rounded border border-gray-200 hover:border-gray-300 shadow-sm">
                <svg
                  className="w-4 h-1 fill-current text-gray-400"
                  viewBox="0 0 16 4"
                >
                  <circle cx="8" cy="2" r="2" />
                  <circle cx="2" cy="2" r="2" />
                  <circle cx="14" cy="2" r="2" />
                </svg>
              </button>
              <button className="p-1.5 shrink-0 rounded border border-gray-200 hover:border-gray-300 shadow-sm">
                <svg
                  className="w-4 h-4 fill-current text-indigo-500"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.6 0 0 3.1 0 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7Zm4 10.8v2.3L8.9 12H8c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8Z" />
                </svg>
              </button>
              <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">
                <svg
                  className="fill-current shrink-0"
                  width="11"
                  height="8"
                  viewBox="0 0 11 8"
                >
                  <path d="m.457 4.516.969-.99 2.516 2.481L9.266.702l.985.99-6.309 6.284z" />
                </svg>
                <span className="ml-2">Following</span>
              </button>
            </div>
          </div>
        </div>

        {/* Header */}
        <header className="text-center sm:text-left mb-6">
          {/* Name */}
          <div className="inline-flex items-start mb-2">
            <h1 className="text-2xl text-gray-800 font-bold">
              {user?.username}
              <span className="ml-2">
                <button className="btn bg-blue-400 hover:bg-blue-500 text-white">
                  <FaCheck className="text-md" />
                </button>
              </span>
            </h1>
          </div>
          {/* Bio */}
          <div className="text-sm mb-3">
            Fitness Fanatic, Design Enthusiast, Mentor, Meetup Organizer & PHP
            Lover.
          </div>

          {/* Meta */}
          <div className="flex flex-wrap justify-center sm:justify-start space-x-4">
            <div className="flex items-center">
              <FaMapMarker />
              <span className="text-sm font-medium whitespace-nowrap text-gray-500 ml-2">
                Milan, IT
              </span>
            </div>
            <div className="flex items-center">
              <FaLink />
              <a
                className="text-sm font-medium whitespace-nowrap text-indigo-500 hover:text-indigo-600 ml-2"
                href="#0"
              >
                carolinmcneail.com
              </a>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="relative mb-6">
          <div
            className="absolute bottom-0 w-full h-px bg-gray-200"
            aria-hidden="true"
          ></div>
          <ul className="relative text-sm font-medium flex flex-nowrap -mx-4 sm:-mx-6 lg:-mx-8 overflow-x-scroll no-scrollbar">
            <li className="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
              <a
                className="block pb-3 text-indigo-500 whitespace-nowrap border-b-2 border-indigo-500"
                href="#0"
              >
                General
              </a>
            </li>
            <li className="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
              <a
                className="block pb-3 text-gray-500 hover:text-gray-600 whitespace-nowrap"
                href="#0"
              >
                Connections
              </a>
            </li>
            <li className="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
              <a
                className="block pb-3 text-gray-500 hover:text-gray-600 whitespace-nowrap"
                href="#0"
              >
                Contributions
              </a>
            </li>
          </ul>
        </div>

        {/* Profile content */}
        <main className="flex flex-col xl:flex-row xl:space-x-16">
          {/* Main content */}
          <div className="space-y-5 mb-8 xl:mb-0">
            {/* About Me */}
            <div>
              <h2 className="text-gray-800 font-semibold mb-2">About Me</h2>
              <div className="text-sm space-y-2">
                <p>about_me</p>
              </div>
            </div>
            {/* Profile Information */}
            <div className="flex flex-col">
              <h2 className="text-gray-800 font-semibold mb-2">
                Profile Information
              </h2>
              <div className="flex flex-row justify-between border-t py-2">
                <div>Email</div>
                <div>email</div>
              </div>
              <div className="flex flex-row justify-between border-t py-2">
                <div>Phone Number</div>
                <div>phone_number</div>
              </div>
              <div className="flex flex-row justify-between border-t py-2">
                <div>Gender</div>
                <div>gender</div>
              </div>
              <div className="flex flex-row justify-between border-t py-2">
                <div>Preferred Gender</div>
                <div>preferred_gender</div>
              </div>
              <div className="flex flex-row justify-between border-t py-2">
                <div>Looking For</div>
                <div>Looking For</div>
              </div>
              <div className="flex flex-row justify-between border-t py-2">
                <div>Birthday</div>
                <div>
                  {/* {user?.birthday ? new Date(user?.birthday).toUTCString() : ""} */}
                  {new Date().toUTCString()}
                </div>
              </div>
              <div className="flex flex-row justify-between border-t py-2">
                <div>Education</div>
                <div>Education</div>
              </div>
              <div className="flex flex-row justify-between border-t py-2">
                <div>Religion</div>
                <div>Religion</div>
              </div>
              <div className="flex flex-row justify-between border-t py-2">
                <div>Zodiac</div>
                <div>Zodiac</div>
              </div>
              <div className="flex flex-row justify-between border-t py-2">
                <div>Drinking</div>
                <div>Drinking</div>
              </div>
              <div className="flex flex-row justify-between border-t py-2">
                <div>Smoking</div>
                <div>Smoking</div>
              </div>
              <div className="flex flex-row justify-between border-t py-2">
                <div>Exercise</div>
                <div>Exercise</div>
              </div>
            </div>

            {/* Galleries */}
            <div>
              <h2 className="text-gray-800 font-semibold mb-2">Gallery</h2>
              <div className="text-sm flex flex-row flex-wrap">
                {/* {user?.photos.map((photo, index) => (
                  <div className="w-full lg:w-4/12 md:w-6/12 pr-2">
                    <div className="rounded overflow-hidden border bg-white mx-3 md:mx-0 lg:mx-0">
                      <div className="w-full flex justify-end py-3 px-2">
                        <div className="px-2 py-1 hover:bg-gray-300 cursor-pointer rounded">
                          <FaEllipsisV className="text-xl py-1" />
                        </div>
                      </div>
                      <img alt="" className="w-full bg-cover" src={photo} />
                    </div>
                  </div>
                ))} */}
              </div>
            </div>

            {/* Departments */}
            <div>
              <h2 className="text-gray-800 font-semibold mb-2">Departments</h2>
              {/* Cards */}
              <div className="grid xl:grid-cols-2 gap-4">
                {/* Card */}
                <div className="bg-white p-4 border border-gray-200 rounded-sm shadow-sm">
                  {/* Card header */}
                  <div className="grow flex items-center truncate mb-2">
                    <div className="w-8 h-8 shrink-0 flex items-center justify-center bg-gray-700 rounded-full mr-2">
                      <img
                        className="ml-1"
                        src={Icon03}
                        width="14"
                        height="14"
                        alt="Icon 03"
                      />
                    </div>
                    <div className="truncate">
                      <span className="text-sm font-medium text-gray-800">
                        Acme Marketing
                      </span>
                    </div>
                  </div>
                  {/* Card content */}
                  <div className="text-sm mb-3">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore.
                  </div>
                  {/* Card footer */}
                  <div className="flex justify-between items-center">
                    {/* Avatars group */}
                    <div className="flex -space-x-3 -ml-0.5">
                      <img
                        className="rounded-full border-2 border-white box-content"
                        src=""
                        width="24"
                        height="24"
                        alt="Avatar"
                      />
                      <img
                        className="rounded-full border-2 border-white box-content"
                        src=""
                        width="24"
                        height="24"
                        alt="Avatar"
                      />
                      <img
                        className="rounded-full border-2 border-white box-content"
                        src=""
                        width="24"
                        height="24"
                        alt="Avatar"
                      />
                      <img
                        className="rounded-full border-2 border-white box-content"
                        src=""
                        width="24"
                        height="24"
                        alt="Avatar"
                      />
                    </div>
                    {/* Link */}
                    <div>
                      <a
                        className="text-sm font-medium text-indigo-500 hover:text-indigo-600"
                        href="#0"
                      >
                        View -&gt;
                      </a>
                    </div>
                  </div>
                </div>

                {/* Card */}
                <div className="bg-white p-4 border border-gray-200 rounded-sm shadow-sm">
                  {/* Card header */}
                  <div className="grow flex items-center truncate mb-2">
                    <div className="w-8 h-8 shrink-0 flex items-center justify-center bg-gray-700 rounded-full mr-2">
                      <img
                        className="ml-1"
                        src={Icon02}
                        width="14"
                        height="14"
                        alt="Icon 02"
                      />
                    </div>
                    <div className="truncate">
                      <span className="text-sm font-medium text-gray-800">
                        Acme Product
                      </span>
                    </div>
                  </div>
                  {/* Card content */}
                  <div className="text-sm mb-3">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore.
                  </div>
                  {/* Card footer */}
                  <div className="flex justify-between items-center">
                    {/* Avatars group */}
                    <div className="flex -space-x-3 -ml-0.5">
                      <img
                        className="rounded-full border-2 border-white box-content"
                        src=""
                        width="24"
                        height="24"
                        alt="Avatar"
                      />
                      <img
                        className="rounded-full border-2 border-white box-content"
                        src=""
                        width="24"
                        height="24"
                        alt="Avatar"
                      />
                      <img
                        className="rounded-full border-2 border-white box-content"
                        src=""
                        width="24"
                        height="24"
                        alt="Avatar"
                      />
                    </div>
                    {/* Link */}
                    <div>
                      <a
                        className="text-sm font-medium text-indigo-500 hover:text-indigo-600"
                        href="#0"
                      >
                        View -&gt;
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Work History */}
            <div>
              <h2 className="text-gray-800 font-semibold mb-2">Work History</h2>
              <div className="bg-white p-4 border border-gray-200 rounded-sm shadow-sm">
                <ul className="space-y-3">
                  {/* Item */}
                  <li className="sm:flex sm:items-center sm:justify-between">
                    <div className="sm:grow flex items-center text-sm">
                      {/* Icon */}
                      <div className="w-8 h-8 rounded-full shrink-0 bg-yellow-500 my-2 mr-3">
                        <svg
                          className="w-8 h-8 fill-current text-yellow-50"
                          viewBox="0 0 32 32"
                        >
                          <path d="M21 14a.75.75 0 0 1-.75-.75 1.5 1.5 0 0 0-1.5-1.5.75.75 0 1 1 0-1.5 1.5 1.5 0 0 0 1.5-1.5.75.75 0 1 1 1.5 0 1.5 1.5 0 0 0 1.5 1.5.75.75 0 1 1 0 1.5 1.5 1.5 0 0 0-1.5 1.5.75.75 0 0 1-.75.75Zm-7 10a1 1 0 0 1-1-1 4 4 0 0 0-4-4 1 1 0 0 1 0-2 4 4 0 0 0 4-4 1 1 0 0 1 2 0 4 4 0 0 0 4 4 1 1 0 0 1 0 2 4 4 0 0 0-4 4 1 1 0 0 1-1 1Z" />
                        </svg>
                      </div>
                      {/* Position */}
                      <div>
                        <div className="font-medium text-gray-800">
                          Senior Product Designer
                        </div>
                        <div className="flex flex-nowrap items-center space-x-2 whitespace-nowrap">
                          <div>Remote</div>
                          <div className="text-gray-400">·</div>
                          <div>April, 2020 - Today</div>
                        </div>
                      </div>
                    </div>
                    {/* Tags */}
                    <div className="sm:ml-2 mt-2 sm:mt-0">
                      <ul className="flex flex-wrap sm:justify-end -m-1">
                        <li className="m-1">
                          <button className="inline-flex items-center justify-center text-xs font-medium leading-5 rounded-full px-2.5 py-0.5 border border-gray-200 hover:border-gray-300 shadow-sm bg-white text-gray-500 duration-150 ease-in-out">
                            Marketing
                          </button>
                        </li>
                        <li className="m-1">
                          <button className="inline-flex items-center justify-center text-xs font-medium leading-5 rounded-full px-2.5 py-0.5 border border-gray-200 hover:border-gray-300 shadow-sm bg-white text-gray-500 duration-150 ease-in-out">
                            +4
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>

                  {/* Item */}
                  <li className="sm:flex sm:items-center sm:justify-between">
                    <div className="sm:grow flex items-center text-sm">
                      {/* Icon */}
                      <div className="w-8 h-8 rounded-full shrink-0 bg-indigo-500 my-2 mr-3">
                        <svg
                          className="w-8 h-8 fill-current text-indigo-50"
                          viewBox="0 0 32 32"
                        >
                          <path d="M8.994 20.006a1 1 0 0 1-.707-1.707l4.5-4.5a1 1 0 0 1 1.414 0l3.293 3.293 4.793-4.793a1 1 0 1 1 1.414 1.414l-5.5 5.5a1 1 0 0 1-1.414 0l-3.293-3.293L9.7 19.713a1 1 0 0 1-.707.293Z" />
                        </svg>
                      </div>
                      {/* Position */}
                      <div>
                        <div className="font-medium text-gray-800">
                          Product Designer
                        </div>
                        <div className="flex flex-nowrap items-center space-x-2 whitespace-nowrap">
                          <div>Milan, IT</div>
                          <div className="text-gray-400">·</div>
                          <div>April, 2018 - April 2020</div>
                        </div>
                      </div>
                    </div>
                    {/* Tags */}
                    <div className="sm:ml-2 mt-2 sm:mt-0">
                      <ul className="flex flex-wrap sm:justify-end -m-1">
                        <li className="m-1">
                          <button className="inline-flex items-center justify-center text-xs font-medium leading-5 rounded-full px-2.5 py-0.5 border border-gray-200 hover:border-gray-300 shadow-sm bg-white text-gray-500 duration-150 ease-in-out">
                            Marketing
                          </button>
                        </li>
                        <li className="m-1">
                          <button className="inline-flex items-center justify-center text-xs font-medium leading-5 rounded-full px-2.5 py-0.5 border border-gray-200 hover:border-gray-300 shadow-sm bg-white text-gray-500 duration-150 ease-in-out">
                            +4
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>

                  {/* Item */}
                  <li className="sm:flex sm:items-center sm:justify-between">
                    <div className="sm:grow flex items-center text-sm">
                      {/* Icon */}
                      <div className="w-8 h-8 rounded-full shrink-0 bg-indigo-500 my-2 mr-3">
                        <svg
                          className="w-8 h-8 fill-current text-indigo-50"
                          viewBox="0 0 32 32"
                        >
                          <path d="M8.994 20.006a1 1 0 0 1-.707-1.707l4.5-4.5a1 1 0 0 1 1.414 0l3.293 3.293 4.793-4.793a1 1 0 1 1 1.414 1.414l-5.5 5.5a1 1 0 0 1-1.414 0l-3.293-3.293L9.7 19.713a1 1 0 0 1-.707.293Z" />
                        </svg>
                      </div>
                      {/* Position */}
                      <div>
                        <div className="font-medium text-gray-800">
                          Product Designer
                        </div>
                        <div className="flex flex-nowrap items-center space-x-2 whitespace-nowrap">
                          <div>Milan, IT</div>
                          <div className="text-gray-400">·</div>
                          <div>April, 2018 - April 2020</div>
                        </div>
                      </div>
                    </div>
                    {/* Tags */}
                    <div className="sm:ml-2 mt-2 sm:mt-0">
                      <ul className="flex flex-wrap sm:justify-end -m-1">
                        <li className="m-1">
                          <button className="inline-flex items-center justify-center text-xs font-medium leading-5 rounded-full px-2.5 py-0.5 border border-gray-200 hover:border-gray-300 shadow-sm bg-white text-gray-500 duration-150 ease-in-out">
                            Marketing
                          </button>
                        </li>
                        <li className="m-1">
                          <button className="inline-flex items-center justify-center text-xs font-medium leading-5 rounded-full px-2.5 py-0.5 border border-gray-200 hover:border-gray-300 shadow-sm bg-white text-gray-500 duration-150 ease-in-out">
                            +4
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="xl:min-w-56 xl:w-56 space-y-3">
            <div className="text-sm">
              <h3 className="font-medium text-gray-800">Title</h3>
              <div>Senior Product Designer</div>
            </div>
            <div className="text-sm">
              <h3 className="font-medium text-gray-800">Location</h3>
              <div>Milan, IT - Remote</div>
            </div>
            <div className="text-sm">
              <h3 className="font-medium text-gray-800">Email</h3>
              <div>carolinmcneail@acme.com</div>
            </div>
            <div className="text-sm">
              <h3 className="font-medium text-gray-800">Birthdate</h3>
              <div>4 April, 1987</div>
            </div>
            <div className="text-sm">
              <h3 className="font-medium text-gray-800">Joined Acme</h3>
              <div>7 April, 2017</div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default UserDetailBody;
