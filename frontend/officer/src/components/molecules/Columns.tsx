// src/lib/documents-columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define the Document data type
export type Document = {
  id: string;
  title: string;
  applicant: string;
  submissionDate: string; // ISO string or similar
  status: "Pending Review" | "Approved" | "Rejected" | "Requires More Info";
  lastUpdated: string;
  dueDate?: string; // Optional
  // ... any other document properties
};

// Define the columns for the Documents table
export const documentsColumns: ColumnDef<Document>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "documentId", // Example accessor, assuming 'id' maps to this
    header: "Document ID",
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Document Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "applicant",
    header: "Applicant",
  },
  {
    accessorKey: "submissionDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Submitted On
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("submissionDate"));
      return <div className="font-medium">{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const document = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Document Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => console.log("View details for", document.id)}>
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => console.log("Approve", document.id)}>
              Approve Document
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Reject", document.id)} className="text-red-600">
              Reject Document
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Request info", document.id)}>
              Request More Information
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => console.log("Assign", document.id)}>
              Assign to Colleague
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Download", document.id)}>
              Download Document
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];