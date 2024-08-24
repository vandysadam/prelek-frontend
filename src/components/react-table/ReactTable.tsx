import { matchSorter } from "match-sorter";
import React, { ChangeEvent, ReactNode, useCallback, useEffect } from "react";
// import styled from "styled-components";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  Column,
  TableOptions,
  Row,
  usePagination,
  TableProps,
  useAsyncDebounce,
  useRowSelect,
  useSortBy,
} from "react-table";
import { json } from "stream/consumers";
import useDeepCompareEffect from "use-deep-compare-effect";

// import {
//   DefaultColumnFilter,
//   filterGreaterThan,
//   fuzzyTextFilterFn,
//   GlobalFilter,
//   NumberRangeColumnFilter,
//   SelectColumnFilter,
//   SliderColumnFilter,
// } from "./react-table-filter";

interface TableResultProps<T extends object> {
  tableOptions?: TableOptions<T>;

  // updateMyData?: (rowIndex: any, columnId: any, value: any) => Promise<void>;
  children?: ReactNode;
  onHandlePageChange?: (page: number) => void;
  onHandlePageSizeChange?: (pageSize: number) => void;
  onHandleFilterChange?: (filters: any) => void;
  // customPagination?: CustomPagination;
}

// Our table component
const ReactTable = <T extends object>(props: TableResultProps<T>) => {
  // const TableResult: React.FC<TableResultProps<T extends object>> = ({
  //   columns, data, defaultPageSize, manualFilters, manualGlobalFilter, manualPagination,
  // }: TableResultProps<ExampleData>) => {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
      setGlobalFilter(value || undefined);
    }, 200);

    return (
      <div className="p-2">
        Search:{" "}
        <input
          value={value || ""}
          className="form-input w-full"
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
          style={{
            fontSize: "1.1rem",
            border: "0",
          }}
        />
      </div>
    );
  }

  // Define a default UI for filtering
  function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length;

    return (
      <input
        className="form-input w-full"
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined); // Set the filter on the table
          // onChangeFilter(state.filters);

          // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    );
  }

  // This is a custom filter UI for selecting
  // a unique option from a list
  function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach((row) => {
        options.add(row.values[id]);
      });
      return [...options.values()];
    }, [id, preFilteredRows]);

    // Render a multi-select box
    return (
      <select
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {options.map((option: any, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  // This is a custom filter UI that uses a
  // slider to set the filter value between a column's
  // min and max values
  function SliderColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    // Calculate the min and max
    // using the preFilteredRows

    const [min, max] = React.useMemo(() => {
      let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
      let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
      preFilteredRows.forEach((row) => {
        min = Math.min(row.values[id], min);
        max = Math.max(row.values[id], max);
      });
      return [min, max];
    }, [id, preFilteredRows]);

    return (
      <>
        <input
          type="range"
          min={min}
          max={max}
          value={filterValue || min}
          onChange={(e) => {
            console.log(e.target.value);
            setFilter(parseInt(e.target.value, 10));
          }}
        />
        <button onClick={() => setFilter(undefined)}>Off</button>
      </>
    );
  }

  // This is a custom UI for our 'between' or number range
  // filter. It uses two number boxes and filters rows to
  // ones that have values between the two
  function NumberRangeColumnFilter({
    column: { filterValue = [], preFilteredRows, setFilter, id },
  }) {
    const [min, max] = React.useMemo(() => {
      let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
      let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
      preFilteredRows.forEach((row) => {
        min = Math.min(row.values[id], min);
        max = Math.max(row.values[id], max);
      });
      return [min, max];
    }, [id, preFilteredRows]);

    return (
      <div
        style={{
          display: "flex",
        }}
      >
        <input
          value={filterValue[0] || ""}
          type="number"
          className="form-input w-1/3"
          onChange={(e) => {
            const val = e.target.value;
            setFilter((old = []) => [
              val ? parseInt(val, 10) : undefined,
              old[1],
            ]);
          }}
          placeholder={`Min (${min})`}
          // style={{
          //   width: "70px",
          //   marginRight: "0.5rem",
          // }}
        />
        to
        <input
          value={filterValue[1] || ""}
          type="number"
          className="form-input w-full"
          onChange={(e) => {
            const val = e.target.value;
            setFilter((old = []) => [
              old[0],
              val ? parseInt(val, 10) : undefined,
            ]);
          }}
          placeholder={`Max (${max})`}
          // style={{
          //   width: "70px",
          //   marginLeft: "0.5rem",
          // }}
        />
      </div>
    );
  }

  function fuzzyTextFilterFn(rows: any, id, filterValue) {
    return matchSorter(rows, filterValue, {
      keys: [(row: any) => row.values[id]],
    });
  }

  // Let the table remove the filter if the string is empty
  fuzzyTextFilterFn.autoRemove = (val) => !val;

  // Define a custom filter filter function!
  function filterGreaterThan(rows: any, id, filterValue) {
    return rows.filter((row) => {
      const rowValue = row.values[id];
      return rowValue >= filterValue;
    });
  }

  // This is an autoRemove method on the filter function that
  // when given the new filter value and returns true, the filter
  // will be automatically removed. Normally this is just an undefined
  // check, but here, we want to remove the filter if it's not a number
  filterGreaterThan.autoRemove = (val) => typeof val !== "number";

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  enum PageChangeType {
    Previous = "previous",
    Next = "next",
    Go = "go",
  }

  interface IndeterminateCheckboxProps {
    indeterminate?: any;
    [key: string]: any;
    ref?: React.ForwardedRef<HTMLInputElement>;
  }

  const IndeterminateCheckbox: React.FC<IndeterminateCheckboxProps> =
    React.forwardRef(({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef<HTMLInputElement>();
      const resolvedRef = defaultRef;

      React.useEffect(() => {
        resolvedRef!.current!.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return (
        <>
          <input
            className="form-check"
            type="checkbox"
            ref={resolvedRef}
            {...rest}
          />
        </>
      );
    });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    // setFilter,
    // the rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,

    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      // columns: props.tableOptions?.columns || [],
      data: props.tableOptions?.data || [],
      defaultColumn,
      // filterTypes,
      // ...props.tableOptions,
      initialState: props.tableOptions?.initialState,
      disableFilters: props.tableOptions?.disableFilters,
      disableGlobalFilter: props.tableOptions?.disableGlobalFilter,
      disableMultiSort: props.tableOptions?.disableMultiSort,
      disableSortBy: props.tableOptions?.disableSortBy,
      manualSortBy: props.tableOptions?.manualSortBy,
      manualFilters: props.tableOptions?.manualFilters,
      manualGlobalFilter: props.tableOptions?.manualGlobalFilter,
      manualPagination: props.tableOptions?.manualPagination || false,
      pageCount: props.tableOptions?.pageCount ?? -1,
      autoResetPage: false,
      columns: props.tableOptions?.columns as Column<object>[],
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!,
    useSortBy,
    usePagination, // usePagination!,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  /**
   * @description custom on change page handler
   * @param page
   * @param type
   */
  const onChangePage = (
    page: number | null,
    type: PageChangeType = PageChangeType.Go
  ) => {
    if (type === PageChangeType.Go) {
      console.log("go");
      gotoPage(page!);
    } else if (type === PageChangeType.Previous) {
      console.log("prev");
      previousPage();
    } else if (type === PageChangeType.Next) {
      console.log("next");
      nextPage();
      // gotoPage((pageIndex) => pageIndex + 1);
      // gotoPage(pageIndex + 1);
    }
  };

  /**
   * Watch for change in page index
   */
  useEffect(() => {
    if (props.onHandlePageChange) {
      props.onHandlePageChange(state.pageIndex);
    }
  }, [state.pageIndex, props]);

  /**
   * Watch for change in filter value
   */
  useDeepCompareEffect(() => {
    if (props.onHandleFilterChange && state.filters) {
      props.onHandleFilterChange(state.filters);
    }
  }, [state.filters, props]);

  /**
   * Handle PageSize Change event
   * @param event
   */
  const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const pageSize = Number(event.target.value);

    setPageSize(pageSize);

    props.onHandlePageSizeChange && props.onHandlePageSizeChange(pageSize);
  };

  return (
    <>
      {/* Table Section */}
      <div className="overflow-auto">
        <table className="table-auto w-full" {...getTableProps()}>
          <thead className="text-xs font-semibold uppercase text-gray-500 bg-gray-50 border-t border-b border-gray-200">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    <div className="font-semibold text-left">
                      {column.render("Header")}
                      {/* Add a sort direction indicator */}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </div>
                    {/* Render the columns filter UI */}
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
            {props!.tableOptions!.disableGlobalFilter ? null : (
              <tr>
                <th
                  colSpan={visibleColumns.length}
                  style={{
                    textAlign: "left",
                  }}
                >
                  <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                  />
                </th>
              </tr>
            )}
          </thead>
          <tbody
            className="text-sm divide-y divide-gray-200 overflow-auto"
            {...getTableBodyProps()}
          >
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-8 px-5 pb-5">
        <div className="flex w-full flex-col sm:flex-row sm:mb-0">
          <div className="">
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
            | Go to page:{" "}
            <input
              type="number"
              className="form-input w-full border border-gray-200 rounded-lg active:border-none"
              value={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                onChangePage(page);
              }}
              style={{ width: "100px" }}
            />
          </div>

          <select
            value={pageSize}
            className="form-select border border-gray-200 rounded-lg h-full select-sm ml-2 text-sm font-normal active:none"
            onChange={handlePageSizeChange}
          >
            {[2, 5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full flex justify-center sm:justify-end space-x-1">
          <button
            className={`btn btn-sm bg-white border-gray-200 hover:border-gray-300 text-indigo-500 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:border-gray-200`}
            onClick={() => onChangePage(0)}
            disabled={!canPreviousPage}
          >
            {"<<"}
          </button>{" "}
          <button
            className="btn btn-sm bg-white border-gray-200 hover:border-gray-300 text-indigo-500 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:border-gray-200"
            onClick={() => onChangePage(null, PageChangeType.Previous)}
            disabled={!canPreviousPage}
          >
            {"<"}
          </button>{" "}
          <button
            className="btn btn-sm bg-white border-gray-200 hover:border-gray-300 text-indigo-500 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:border-gray-200"
            onClick={() => onChangePage(null, PageChangeType.Next)}
            disabled={!canNextPage}
          >
            {">"}
          </button>{" "}
          <button
            className="btn btn-sm bg-white border-gray-200 hover:border-gray-300 text-indigo-500 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:border-gray-200"
            onClick={() => onChangePage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>{" "}
        </div>
      </div>
    </>
  );
};

export default ReactTable;
