import { useMemo, useState, useEffect, useRef } from "react"; // Import useRef
import { Search, Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddUserDialog, { AddUserForm } from "./AddUserDialog";

// Define the API response type for a single user
type ApiUser = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  passwordHash: string; // Though not used in display, good to have if it's in the response
  email: string;
  phoneNumber: string;
  nicNumber: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  roleId: string;
  departmentId: string | null;
  userTypeId: string;
};

// Define the API response type for a role
type ApiRole = {
  id: string;
  roleName: string;
  description: string;
};

// Define the API response type for a department
type ApiDepartment = {
  id: string;
  departmentName: string;
  description: string;
  address: string;
  headOfDepartmentId: string | null;
};

// Existing User type for the display
type User = {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  role: string; // This will now store the actual role name
  department: string; // This will now store the actual department name
};

export default function UserList() {
  const [q, setQ] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use refs for maps so they don't cause re-renders when updated internally
  const rolesMapRef = useRef<Map<string, string>>(new Map());
  const departmentsMapRef = useRef<Map<string, string>>(new Map()); // New ref for departments

  // Function to fetch a single role by ID
  const fetchRoleById = async (roleId: string): Promise<ApiRole | null> => {
    if (rolesMapRef.current.has(roleId)) {
      return { id: roleId, roleName: rolesMapRef.current.get(roleId)!, description: "" };
    }
    try {
      const response = await fetch(`http://localhost:5102/api/Role/${roleId}`);
      if (!response.ok) {
        console.warn(`Failed to fetch role for ID: ${roleId}, status: ${response.status}`);
        return null;
      }
      const roleData: ApiRole = await response.json();
      rolesMapRef.current.set(roleData.id, roleData.roleName); // Store in ref
      return roleData;
    } catch (err) {
      console.error(`Error fetching role ${roleId}:`, err);
      return null;
    }
  };

  // Function to fetch a single department by ID
  const fetchDepartmentById = async (departmentId: string): Promise<ApiDepartment | null> => {
    if (departmentsMapRef.current.has(departmentId)) {
      return { id: departmentId, departmentName: departmentsMapRef.current.get(departmentId)!, description: "", address: "", headOfDepartmentId: null };
    }
    try {
      const response = await fetch(`http://localhost:5102/api/Department/${departmentId}`);
      if (!response.ok) {
        console.warn(`Failed to fetch department for ID: ${departmentId}, status: ${response.status}`);
        return null;
      }
      const departmentData: ApiDepartment = await response.json();
      departmentsMapRef.current.set(departmentData.id, departmentData.departmentName); // Store in ref
      return departmentData;
    } catch (err) {
      console.error(`Error fetching department ${departmentId}:`, err);
      return null;
    }
  };

  // Function to fetch users from the API and then their roles and departments
  const fetchUsersAndRelatedData = async () => {
    setLoading(true);
    setError(null);
    try {
      const userResponse = await fetch("http://localhost:5102/api/User");
      if (!userResponse.ok) {
        throw new Error(`HTTP error! status: ${userResponse.status}`);
      }
      const apiUsers: ApiUser[] = await userResponse.json();

      // Extract unique role IDs
      const uniqueRoleIds = Array.from(new Set(apiUsers.map((user) => user.roleId)));

      // Extract unique department IDs (handle nulls)
      const uniqueDepartmentIds = Array.from(
        new Set(apiUsers.map((user) => user.departmentId).filter((id) => id !== null) as string[])
      );

      // Fetch all unique roles and departments concurrently
      const rolePromises = uniqueRoleIds.map((id) => fetchRoleById(id));
      const departmentPromises = uniqueDepartmentIds.map((id) => fetchDepartmentById(id));

      await Promise.all([...rolePromises, ...departmentPromises]); // Wait for all fetches to complete

      // Map API response to your User type, using rolesMapRef and departmentsMapRef for names
      const mappedUsers: User[] = apiUsers.map((apiUser) => ({
        id: apiUser.id,
        fullName: `${apiUser.firstName} ${apiUser.lastName}`,
        username: apiUser.username,
        email: apiUser.email,
        phone: apiUser.phoneNumber,
        // Get roleName from the ref's map
        role: rolesMapRef.current.get(apiUser.roleId) || "Unknown Role",
        // Get departmentName from the ref's map, or "No Department"
        department: apiUser.departmentId
          ? departmentsMapRef.current.get(apiUser.departmentId) || "Unknown Department"
          : "No Department",
      }));

      setAllUsers(mappedUsers);
    } catch (err) {
      console.error("Failed to fetch users, roles, or departments:", err);
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch users, roles, and departments when the component mounts
  useEffect(() => {
    fetchUsersAndRelatedData();
  }, []); // Empty dependency array means this runs once on mount

  const users = useMemo(() => {
    if (!q.trim()) return allUsers;
    const s = q.toLowerCase();
    return allUsers.filter(
      (u) =>
        u.fullName.toLowerCase().includes(s) ||
        u.username.toLowerCase().includes(s) ||
        u.email.toLowerCase().includes(s) ||
        u.phone.toLowerCase().includes(s) ||
        u.role.toLowerCase().includes(s) ||
        u.department.toLowerCase().includes(s)
    );
  }, [q, allUsers]); // Depend on allUsers so filtering updates when data is fetched

  const onAdd = () => setOpenAdd(true);
  const onCreated = (payload: AddUserForm) => {
    console.log("Created (demo):", payload);
    // After successful creation via API, refetch the user list and their roles
    fetchUsersAndRelatedData(); // Now fetches departments too
  };
  const onEdit = (u: User) => console.log("Edit", u.id);
  const onDelete = (u: User) => console.log("Delete", u.id);

  return (
    <div className="space-y-4">
      {/* top actions */}
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

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {loading && (
            <div className="flex items-center justify-center p-6 text-sm text-gray-500">
              <Loader2 className="animate-spin mr-2" /> Loading users...
            </div>
          )}

          {error && (
            <div className="p-6 text-sm text-red-600 text-center">
              {error}
            </div>
          )}

          {!loading && !error && (
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
                      <td className="px-6 py-4 text-sm">{u.role}</td>{" "}
                      {/* Display role name */}
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
                        {loading ? "Loading users..." : "No results found."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
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