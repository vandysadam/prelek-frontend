import React, { useState, useEffect } from "react";
import SitePages from "./SitePagesTableItem";

function SitePagesTable({ selectedItems }) {
  const sitePages = [
    {
      id: "0",
      pageName: "Privacy Policy",
      userVisit: "200",
    },
    {
      id: "2",
      pageName: "Terms & Conditions",
      userVisit: "200",
    },
    {
      id: "3",
      pageName: "About us",
      userVisit: "200",
    },
    {
      id: "4",
      pageName: "Career",
      userVisit: "200",
    },
  ];

  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(sitePages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(list.map((li) => li.id));
    if (selectAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setSelectAll(false);
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  useEffect(() => {
    selectedItems(isCheck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck]);

  return (
    <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-gray-800">
          All Site Pages <span className="text-gray-400 font-medium">2</span>
        </h2>
      </header>
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-500 bg-gray-50 border-t border-b border-gray-200">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select all</span>
                      <input
                        className="form-checkbox"
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </label>
                  </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Page Name</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Total Visit</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-10 py-3 whitespace-nowrap">
                  <span className="font-semibold text-left">Actions</span>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-200">
              {list.map((sitePages) => {
                return (
                  <SitePages
                    key={sitePages.id}
                    id={sitePages.id}
                    pageName={sitePages.pageName}
                    userVisit={sitePages.userVisit}
                    handleClick={handleClick}
                    isChecked={isCheck.includes(sitePages.id)}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SitePagesTable;
