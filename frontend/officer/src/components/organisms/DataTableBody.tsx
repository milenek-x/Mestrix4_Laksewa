// DataTableBody.tsx
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'; // Adjust path as per your project structure
import { Checkbox } from '@/components/ui/checkbox';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Action<TData> {
  label: string;
  onClick: (row: TData) => void;
}

interface DataTableBodyProps<TData> {
  columns: {
    key: keyof TData;
    header: string;
  }[];
  data: TData[];
  actions?: Action<TData>[];
  selectedRows: TData[];
  onSelectAll: (isSelected: boolean) => void;
  onRowSelect: (row: TData, isSelected: boolean) => void;
}

export function DataTableBody<TData extends { [key: string]: any }>({
  columns,
  data,
  actions,
  selectedRows,
  onSelectAll,
  onRowSelect,
}: DataTableBodyProps<TData>) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] text-center">
              <Checkbox
                checked={selectedRows.length === data.length && data.length > 0}
                onCheckedChange={(checked) => onSelectAll(checked as boolean)}
                aria-label="Select all"
              />
            </TableHead>
            {columns.map((column) => (
              <TableHead key={String(column.key)} className="text-left">
                {column.header}
              </TableHead>
            ))}
            {actions && actions.length > 0 && (
              <TableHead className="w-[50px] text-right">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell className="w-[50px] text-center">
                  <Checkbox
                    checked={selectedRows.includes(row)}
                    onCheckedChange={(checked) => onRowSelect(row, checked as boolean)}
                    aria-label={`Select row ${rowIndex}`}
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell key={String(column.key)} className="text-left">
                    {row[column.key] as React.ReactNode}
                  </TableCell>
                ))}
                {actions && actions.length > 0 && (
                  <TableCell className="w-[50px] text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {actions.map((action, actionIndex) => (
                          <DropdownMenuItem
                            key={actionIndex}
                            onClick={() => action.onClick(row)}
                          >
                            {action.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + (actions && actions.length > 0 ? 2 : 1)} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
