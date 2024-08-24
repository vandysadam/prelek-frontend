import React from "react";

function SitePagesTableItem(props) {
  return (
    <tr>
      <td className="px-3 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="flex items-center">
          <label className="inline-flex">
            <span className="sr-only">Select</span>
            <input
              id={props.id}
              className="form-checkbox"
              type="checkbox"
              onChange={props.handleClick}
              checked={props.isChecked}
            />
          </label>
        </div>
      </td>
      <td className="px-3 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <div className="font-medium text-gray-800">{props.pageName}</div>
        </div>
      </td>
      <td className="px-3 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{props.userVisit}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        {/* Menu button */}
        <button className="btn border-gray-200 hover:border-gray-300">
          <svg
            className="w-4 h-4 fill-current text-indigo-500 shrink-0"
            viewBox="0 0 16 16"
          >
            <path d="M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z" />
          </svg>
          <span className="ml-2">Detail</span>
        </button>

        <button className="ml-3 btn border-gray-200 hover:border-gray-300">
          <svg
            className="w-4 h-4 fill-current text-gray-500 shrink-0"
            viewBox="0 0 16 16"
          >
            <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
          </svg>
          <span className="ml-2">Update</span>
        </button>

        <button className="ml-3 btn border-gray-200 hover:border-gray-300">
          <svg
            className="w-4 h-4 fill-current text-red-500 shrink-0"
            viewBox="0 0 16 16"
          >
            <path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z" />
          </svg>
          <span className="ml-2">Delete</span>
        </button>
      </td>
    </tr>
  );
}

export default SitePagesTableItem;
