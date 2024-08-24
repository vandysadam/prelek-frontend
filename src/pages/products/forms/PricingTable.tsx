import React from "react";

import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Column } from "react-table";
import ReactTable from "../../../components/react-table/ReactTable";
import { tmpProductPricing } from "../../../modules/product/entity/types";

interface PricingTableProps {
  pricingList: tmpProductPricing[] | [];
  onViewPricing: (data: tmpProductPricing) => void;
  onEditPricing: (data: tmpProductPricing) => void;
  onDeletePricing: (data: tmpProductPricing) => void;
}

const PricingTable: React.FC<PricingTableProps> = ({
  pricingList,
  onEditPricing,
  onViewPricing,
  onDeletePricing,
}: PricingTableProps) => {
  const productPricingColumns = React.useMemo<Column<tmpProductPricing>[]>(
    () => [
      {
        Header: "Plan name",
        Cell: ({ row }) => (
          <span className="pt-5">{row.original.planName}</span>
        ),
      },
      {
        Header: "Action",
        Cell: ({ row }: { row: { original: tmpProductPricing } }) => (
          <div>
            <button
              className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-blue-500 mx-2"
              aria-label="view"
              onClick={(e) => {
                e.preventDefault();
                onViewPricing(row.original);
              }}
            >
              <FaEye />
            </button>
            <button
              className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-yellow-500 mx-2"
              aria-label="edit"
              onClick={(e) => {
                e.preventDefault();
                onEditPricing(row.original);
              }}
            >
              <FaEdit />
            </button>
            <button
              className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-red-500"
              aria-label="delete"
              onClick={(e) => {
                e.preventDefault();
                onDeletePricing(row.original);
              }}
            >
              <FaTrash />
            </button>
          </div>
        ),
      },
    ],
    [onEditPricing, onViewPricing, onDeletePricing]
  );

  return (
    <section className="px-5 pb-2 w-full overflow-x-auto mt-5">
      <ReactTable
        tableOptions={{
          disableGlobalFilter: true,
          data: pricingList,
          columns: productPricingColumns,
        }}
      />
    </section>
  );
};

export default PricingTable;
