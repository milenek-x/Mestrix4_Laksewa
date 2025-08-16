import { useMemo, useState } from "react";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddUserDialog, { AddUserForm } from "./AddUserDialog";

type User = {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  role: string;
  department: string;
};

// demo data (replace with API later)
const SEED: User[] = [
  { id: "1", fullName: "Adithya Rosayru", username: "adithya", email: "adithya@laksewa.gov.lk", phone: "+94712345670", role: "Admin", department: "ICT" },
  { id: "2", fullName: "Sathsara Perera", username: "sathsarya", email: "sathsarya@laksewa.gov.lk", phone: "+94712345671", role: "Officer", department: "Health" },
  { id: "3", fullName: "Sithija Fernando", username: "sithija", email: "sithija@laksewa.gov.lk", phone: "+94712345672", role: "Supervisor", department: "Transport" },
  { id: "4", fullName: "Shamal Jayasinghe", username: "shamal", email: "shamal@laksewa.gov.lk", phone: "+94712345673", role: "Admin", department: "Education" },
  { id: "5", fullName: "Nimali Ranasinghe", username: "nimali", email: "nimali@laksewa.gov.lk", phone: "+94712345674", role: "Officer", department: "Agriculture" },
  { id: "6", fullName: "Kasun Weerasinghe", username: "kasunw", email: "kasunw@laksewa.gov.lk", phone: "+94712345675", role: "Clerk", department: "Finance" },
  { id: "7", fullName: "Ishara Wickramasinghe", username: "isharaw", email: "isharaw@laksewa.gov.lk", phone: "+94712345676", role: "Supervisor", department: "Health" },
  { id: "8", fullName: "Tharindu Silva", username: "tharindu", email: "tharindu@laksewa.gov.lk", phone: "+94712345677", role: "Officer", department: "ICT" },
  { id: "9", fullName: "Madhavi Gunasekara", username: "madhavi", email: "madhavi@laksewa.gov.lk", phone: "+94712345678", role: "Clerk", department: "Transport" },
  { id: "10", fullName: "Chanuka Dissanayake", username: "chanuka", email: "chanuka@laksewa.gov.lk", phone: "+94712345679", role: "Admin", department: "Revenue" },
];

export default function UserList() {
  const [q, setQ] = useState("");
  const [openAdd, setOpenAdd] = useState(false);

  const users = useMemo(() => {
    if (!q.trim()) return SEED;
    const s = q.toLowerCase();
    return SEED.filter(
      (u) =>
        u.fullName.toLowerCase().includes(s) ||
        u.username.toLowerCase().includes(s) ||
        u.email.toLowerCase().includes(s) ||
        u.phone.toLowerCase().includes(s) ||
        u.role.toLowerCase().includes(s) ||
        u.department.toLowerCase().includes(s)
    );
  }, [q]);

  const onAdd = () => setOpenAdd(true);
  const onCreated = (payload: AddUserForm) => {
    // later: POST to API and refetch
    console.log("Created (demo):", payload);
  };
  const onEdit = (u: User) => console.log("Edit", u.id);
  const onDelete = (u: User) => console.log("Delete", u.id);

  return (
    <div className="space-y-4">
      {/* top actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
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

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-[980px] w-full">
              <thead>
                <tr className="bg-[#0E3A6F] text-white text-left">
                  <th className="px-6 py-3 text-sm font-semibold">Full Name</th>
                  <th className="px-6 py-3 text-sm font-semibold">Username</th>
                  <th className="px-6 py-3 text-sm font-semibold">Email</th>
                  <th className="px-6 py-3 text-sm font-semibold">Phone No</th>
                  <th className="px-6 py-3 text-sm font-semibold">User Role</th>
                  <th className="px-6 py-3 text-sm font-semibold">Department</th>
                  <th className="px-6 py-3 text-sm font-semibold text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="bg-white border-b last:border-b-0"
                    style={{ boxShadow: "0 1px 0 0 rgba(0,0,0,0.06) inset" }}
                  >
                    <td className="px-6 py-4 text-sm">{u.fullName}</td>
                    <td className="px-6 py-4 text-sm">{u.username}</td>
                    <td className="px-6 py-4 text-sm">{u.email}</td>
                    <td className="px-6 py-4 text-sm">{u.phone}</td>
                    <td className="px-6 py-4 text-sm">{u.role}</td>
                    <td className="px-6 py-4 text-sm">{u.department}</td>
                    <td className="px-6 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onEdit(u)}
                          className="p-2 rounded-md hover:bg-black/5"
                          aria-label={`Edit ${u.fullName}`}
                          title="Edit"
                        >
                          <Pencil className="size-4" />
                        </button>
                        <button
                          onClick={() => onDelete(u)}
                          className="p-2 rounded-md hover:bg-black/5"
                          aria-label={`Delete ${u.fullName}`}
                          title="Delete"
                        >
                          <Trash2 className="size-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {users.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
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

      {/* Add User modal */}
      <AddUserDialog
        open={openAdd}
        onOpenChange={setOpenAdd}
        onCreated={onCreated}
      />
    </div>
  );
}
