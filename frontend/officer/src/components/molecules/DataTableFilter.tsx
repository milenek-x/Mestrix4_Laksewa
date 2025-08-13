// DataTableFilter.tsx
import { Input } from '@/components/ui/input'; // Adjust path as per your project structure
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'; // Adjust path as per your project structure

interface FilterOption {
  value: string;
  label: string;
}

interface DataTableFilterProps {
  // Props for the text search input
  filterText: string;
  onFilterTextChange: (value: string) => void;
  textPlaceholder?: string;

  // Props for the column filter dropdown
  columnFilterValue: string;
  onColumnFilterChange: (value: string) => void;
  columnFilterOptions: FilterOption[];
  filterColumnLabel?: string;
}

export function DataTableFilter({
  filterText,
  onFilterTextChange,
  textPlaceholder = 'Filter...',
  columnFilterValue,
  onColumnFilterChange,
  columnFilterOptions,
  filterColumnLabel = 'Select column',
}: DataTableFilterProps) {
  return (
    <div className="flex w-full items-center justify-between space-x-2 p-8">
      <Input
        placeholder={textPlaceholder}
        value={filterText}
        onChange={(event) => onFilterTextChange(event.target.value)}
        className="max-w-sm"
      />
      {columnFilterOptions.length > 0 && (
        <Select
          value={columnFilterValue}
          onValueChange={onColumnFilterChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={filterColumnLabel} />
          </SelectTrigger>
          <SelectContent>
            {columnFilterOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
