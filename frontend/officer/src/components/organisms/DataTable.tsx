// DataTable.tsx
import { useState, useMemo } from 'react';
import { DataTableFilter } from '../molecules/DataTableFilter';
import { DataTablePagination } from '../molecules/DataTablePagination';
import { DataTableBody } from './DataTableBody';

// Define the shape of the actions for the dropdown menu
interface Action<TData> {
  label: string;
  onClick: (row: TData) => void;
}

interface DataTableProps<TData> {
  // Main data and columns for the table
  data: TData[];
  columns: {
    key: keyof TData;
    header: string;
  }[];

  // The key of the column to filter by. The values from this column will populate the dropdown.
  filterableColumnKey?: keyof TData;

  // Pagination props
  itemsPerPage?: number;
  label?: string; // e.g., "Users", "Documents"

  // Actions props for the dropdown menu
  actions?: Action<TData>[];

  // Callback for row selection
  onRowSelect?: (selectedRows: TData[]) => void;
}

export function DataTable<TData extends { [key: string]: any }>({
  data,
  columns,
  filterableColumnKey,
  itemsPerPage = 10,
  label = 'Items',
  actions = [],
  onRowSelect,
}: DataTableProps<TData>) {
  // State management for internal component logic
  const [currentPage, setCurrentPage] = useState(1);
  const [filterText, setFilterText] = useState('');
  const [columnFilterValue, setColumnFilterValue] = useState('All');
  const [selectedRows, setSelectedRows] = useState<TData[]>([]);

  // Dynamically get unique values for the filter dropdown from the specified column
  const uniqueColumnValues = useMemo(() => {
    if (!filterableColumnKey) {
      return [];
    }
    const values = Array.from(new Set(data.map((item) => String(item[filterableColumnKey]))));
    return [{ value: 'All', label: 'All' }, ...values.map(value => ({ value, label: value }))];
  }, [data, filterableColumnKey]);

  // Filtering and Pagination Logic
  const filteredData = useMemo(() => {
    // Start with the full dataset
    let result = data;

    // Apply column filter first if a column is specified and a value is selected
    if (filterableColumnKey && columnFilterValue !== 'All') {
      result = result.filter((item) => String(item[filterableColumnKey]) === columnFilterValue);
    }

    // Apply text filter to the results of the column filter
    if (filterText.trim()) {
      const lowerCaseFilter = filterText.toLowerCase().trim();
      result = result.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(lowerCaseFilter)
        )
      );
    }

    // Always reset the current page to 1 when filters change
    setCurrentPage(1);

    return result;
  }, [data, filterText, filterableColumnKey, columnFilterValue]);

  const totalFilteredItems = filteredData.length;

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, itemsPerPage]);

  // Determine the start and end item for the pagination label
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalFilteredItems);

  // Toggle selection for a single row
  const toggleRowSelection = (row: TData, isSelected: boolean) => {
    let newSelectedRows;
    if (isSelected) {
      newSelectedRows = [...selectedRows, row];
    } else {
      newSelectedRows = selectedRows.filter((selectedRow) => selectedRow !== row);
    }
    setSelectedRows(newSelectedRows);
    if (onRowSelect) {
      onRowSelect(newSelectedRows);
    }
  };

  // Toggle selection for all visible rows
  const toggleSelectAll = (isSelected: boolean) => {
    const newSelectedRows = isSelected ? [...paginatedData] : [];
    setSelectedRows(newSelectedRows);
    if (onRowSelect) {
      onRowSelect(newSelectedRows);
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter Section */}
      <DataTableFilter
        filterText={filterText}
        onFilterTextChange={setFilterText}
        columnFilterValue={columnFilterValue}
        onColumnFilterChange={setColumnFilterValue}
        columnFilterOptions={uniqueColumnValues}
        filterColumnLabel={columns.find(c => c.key === filterableColumnKey)?.header || '...'}
      />
      {/* Table Body Section */}
      <DataTableBody
        columns={columns}
        data={paginatedData}
        actions={actions}
        selectedRows={selectedRows}
        onSelectAll={toggleSelectAll}
        onRowSelect={toggleRowSelection}
      />
      {/* Pagination Section */}
      <DataTablePagination
        totalItems={totalFilteredItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        label={label}
        startItem={startIndex + 1}
        endItem={endIndex}
      />
    </div>
  );
}
