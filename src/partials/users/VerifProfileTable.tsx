import React, { useState, useEffect } from "react";
import Users from "./VerifProfileTableItem";

import Image01 from "../../images/user-40-01.jpg";
import Image02 from "../../images/user-40-02.jpg";
import Image03 from "../../images/user-40-03.jpg";
import Image04 from "../../images/user-40-04.jpg";
import Image05 from "../../images/user-40-05.jpg";
import Image06 from "../../images/user-40-06.jpg";
import Image07 from "../../images/user-40-07.jpg";
import Image08 from "../../images/user-40-08.jpg";
import Image09 from "../../images/user-40-09.jpg";
import Image10 from "../../images/user-40-10.jpg";

import Photo01 from "../../images/avatar-01.jpg";
import Photo02 from "../../images/avatar-02.jpg";
import Photo03 from "../../images/avatar-03.jpg";
import Photo04 from "../../images/avatar-04.jpg";
import Photo05 from "../../images/avatar-05.jpg";
import Photo06 from "../../images/avatar-06.jpg";

function VerifProfileTable({ selectedItems }) {
  const users = [
    {
      id: "0",
      image: Photo01,
      name: "Patricia Semklo",
      photo: Photo01,
      uploadDate: "2022-01-17 17:48:35",
    },
    {
      id: "0",
      image: Photo02,
      name: "Dominik Lamakani",
      photo: Photo02,
      uploadDate: "2022-01-17 17:48:35",
    },
    {
      id: "1",
      image: Photo03,
      name: "Ivan Mesaros",
      photo: Photo03,
      uploadDate: "2022-01-17 17:48:35",
    },
    {
      id: "2",
      image: Photo04,
      name: "Maria Martinez",
      photo: Photo04,
      uploadDate: "2022-01-17 17:48:35",
    },
    {
      id: "3",
      image: Photo05,
      name: "Vicky Jung",
      photo: Photo05,
      uploadDate: "2022-01-17 17:48:35",
    },
    {
      id: "4",
      image: Photo06,
      name: "Tisho Yanchev",
      photo: Photo06,
      uploadDate: "2022-01-17 17:48:35",
    },
  ];

  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(users);
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
          All users <span className="text-gray-400 font-medium">6</span>
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
                  <div className="font-semibold text-left">User</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Photo</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Upload Date</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Actions</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <span className="sr-only">Menu</span>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-200">
              {list.map((users) => {
                return (
                  <Users
                    key={users.id}
                    id={users.id}
                    image={users.image}
                    name={users.name}
                    photo={users.photo}
                    uploadDate={users.uploadDate}
                    handleClick={handleClick}
                    isChecked={isCheck.includes(users.id)}
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

export default VerifProfileTable;
