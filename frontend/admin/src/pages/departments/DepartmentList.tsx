import { useMemo, useState } from "react";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddDepartmentDialog from "./AddDepartmentDialog";
import type { AddDepartmentForm } from "./AddDepartmentDialog";

type Department = {
  id: string;
  departmentName: string;
  description: string;
  location: string;
  headOfDepartment: string;
};

// demo data (replace with API later)
const SEED: Department[] = [
  {
    id: "1",
    departmentName: "Health",
    description: "Public health services and clinics",
    location: "Colombo",
    headOfDepartment: "Dr. Anne Silva",
  },
  {
    id: "2",
    departmentName: "Education",
    description: "Schools and higher education",
    location: "Galle",
    headOfDepartment: "Mr. John Perera",
  },
  {
    id: "3",
    departmentName: "Finance",
    description: "Budgeting and accounting",
    location: "Kandy",
    headOfDepartment: "Ms. Kavindi Fernando",
  },
];

export default function DepartmentList() {
  const [q, setQ] = useState("");
  const [openAdd, setOpenAdd] = useState(false);

  const departments = useMemo(() => {
    if (!q.trim()) return SEED;
    const s = q.toLowerCase();
    return SEED.filter(
      (d) =>
        d.departmentName.toLowerCase().includes(s) ||
        d.description.toLowerCase().includes(s) ||
        d.location.toLowerCase().includes(s) ||
        d.headOfDepartment.toLowerCase().includes(s)
    );
  }, [q]);

  const onAdd = () => setOpenAdd(true);
  const onCreated = (payload: AddDepartmentForm) => {
    // later: POST to API and refetch
    console.log("Created department (demo):", payload);
  };
  const onEdit = (d: Department) => console.log("Edit", d.id);
  const onDelete = (d: Department) => console.log("Delete", d.id);

  return (
    <div className="space-y-4">
      {/* Top actions */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 opacity-60" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search..."
            className="w-full h-10 pl-10 pr-3 rounded-md border border-input bg-white text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40"
          />
        </div>

        <Button
          onClick={onAdd}
          className="h-10 rounded-md bg-[#0E3A6F] hover:bg-[#0E3A6F]/90 text-white"
        >
          Add
          <Plus className="ml-2 size-4" />
        </Button>
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-[980px] w-full">
              <thead>
                <tr className="bg-[#0E3A6F] text-white text-left">
                  <th className="px-6 py-3 text-sm font-semibold">Department</th>
                  <th className="px-6 py-3 text-sm font-semibold">Description</th>
                  <th className="px-6 py-3 text-sm font-semibold">Location</th>
                  <th className="px-6 py-3 text-sm font-semibold">Head of Department</th>
                  <th className="px-6 py-3 text-sm font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((d) => (
                  <tr
                    key={d.id}
                    className="bg-white border-b last:border-b-0"
                    style={{ boxShadow: "0 1px 0 0 rgba(0,0,0,0.06) inset" }}
                  >
                    <td className="px-6 py-4 text-sm">{d.departmentName}</td>
                    <td className="px-6 py-4 text-sm">{d.description}</td>
                    <td className="px-6 py-4 text-sm">{d.location}</td>
                    <td className="px-6 py-4 text-sm">{d.headOfDepartment}</td>
                    <td className="px-6 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onEdit(d)}
                          className="p-2 rounded-md hover:bg-black/5"
                          aria-label={`Edit ${d.departmentName}`}
                          title="Edit"
                        >
                          <Pencil className="size-4" />
                        </button>
                        <button
                          onClick={() => onDelete(d)}
                          className="p-2 rounded-md hover:bg-black/5"
                          aria-label={`Delete ${d.departmentName}`}
                          title="Delete"
                        >
                          <Trash2 className="size-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {departments.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-10 text-center text-sm text-muted-foreground"
                    >
                      No results found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Department modal */}
      <AddDepartmentDialog
        open={openAdd}
        onOpenChange={setOpenAdd}
        onCreated={onCreated}
      />
    </div>
  );
}
