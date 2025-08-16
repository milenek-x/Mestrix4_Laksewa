import { useMemo, useState } from "react";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddRoleDialog from "./AddRoleDialog";
import type { AddRoleForm } from "./AddRoleDialog";

type Role = {
  id: string;
  roleName: string;
  description: string;
};

// Demo data — replace with API later
const SEED: Role[] = [
  { id: "r1", roleName: "Admin", description: "Full access to the system" },
  { id: "r2", roleName: "Manager", description: "Manage users & departments" },
  { id: "r3", roleName: "Clerk", description: "Create and update records" },
];

export default function RoleList() {
  const [q, setQ] = useState("");
  const [openAdd, setOpenAdd] = useState(false);

  const roles = useMemo(() => {
    if (!q.trim()) return SEED;
    const s = q.toLowerCase();
    return SEED.filter(
      (r) =>
        r.roleName.toLowerCase().includes(s) ||
        r.description.toLowerCase().includes(s)
    );
  }, [q]);

  const onAdd = () => setOpenAdd(true);
  const onCreated = (payload: AddRoleForm) => {
    // later: POST to API and refetch
    console.log("Created role (demo):", payload);
  };
  const onEdit = (r: Role) => console.log("Edit role", r.id);
  const onDelete = (r: Role) => console.log("Delete role", r.id);

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
            <table className="min-w-[720px] w-full">
              <thead>
                <tr className="bg-[#0E3A6F] text-white text-left">
                  <th className="px-6 py-3 text-sm font-semibold">Role Name</th>
                  <th className="px-6 py-3 text-sm font-semibold">Description</th>
                  <th className="px-6 py-3 text-sm font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((r) => (
                  <tr
                    key={r.id}
                    className="bg-white border-b last:border-b-0"
                    style={{ boxShadow: "0 1px 0 0 rgba(0,0,0,0.06) inset" }}
                  >
                    <td className="px-6 py-4 text-sm">{r.roleName}</td>
                    <td className="px-6 py-4 text-sm">{r.description}</td>
                    <td className="px-6 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onEdit(r)}
                          className="p-2 rounded-md hover:bg-black/5"
                          aria-label={`Edit ${r.roleName}`}
                          title="Edit"
                        >
                          <Pencil className="size-4" />
                        </button>
                        <button
                          onClick={() => onDelete(r)}
                          className="p-2 rounded-md hover:bg-black/5"
                          aria-label={`Delete ${r.roleName}`}
                          title="Delete"
                        >
                          <Trash2 className="size-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {roles.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
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

      {/* Add Role modal */}
      <AddRoleDialog open={openAdd} onOpenChange={setOpenAdd} onCreated={onCreated} />
    </div>
  );
}
