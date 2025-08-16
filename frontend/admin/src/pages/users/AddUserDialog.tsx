import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Schema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Enter a valid email"),
    phone: z.string().min(7, "Enter a valid phone"),
    nic: z.string().min(5, "Enter a valid NIC number"),
    roleId: z.string().min(1, "Select a role"),
    // departmentId can be empty string for "No Department"
    departmentId: z.string().nullable().optional(), // Allow null or undefined for "No Department"
    userTypeId: z.string().min(1, "Select a user type"),
    // Change 'password' to 'passwordHash' in the schema
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm your password"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type AddUserForm = z.infer<typeof Schema>;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: (payload: AddUserForm) => void; // optional callback
};

// Define types for API responses for select options
type ApiOption = {
  id: string;
  name: string; // Generic name for role, department, user type
};

// Specific types for API responses
type ApiRole = { id: string; roleName: string; description: string };
type ApiDepartment = { id: string; departmentName: string; description: string; address: string; headOfDepartmentId: string | null };
type ApiUserType = { id: string; typeName: string };

export default function AddUserDialog({ open, onOpenChange, onCreated }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<AddUserForm>({
    resolver: zodResolver(Schema),
    mode: "onChange",
  });

  const [submitting, setSubmitting] = useState(false);
  const [roles, setRoles] = useState<ApiOption[]>([]);
  const [departments, setDepartments] = useState<ApiOption[]>([]); // New state for departments
  const [userTypes, setUserTypes] = useState<ApiOption[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [optionsError, setOptionsError] = useState<string | null>(null);

  // Function to fetch roles
  const fetchRoles = async () => {
    try {
      const response = await fetch("http://localhost:5102/api/Role");
      if (!response.ok) {
        throw new Error(`Failed to fetch roles: ${response.status}`);
      }
      const data: ApiRole[] = await response.json();
      const filteredRoles = data
        .filter(role => role.roleName.toLowerCase() !== "super admin") // Filter out Super Admin
        .map(role => ({ id: role.id, name: role.roleName }));
      setRoles(filteredRoles);
    } catch (err) {
      console.error("Error fetching roles:", err);
      setOptionsError("Failed to load roles.");
    }
  };

  // Function to fetch departments
  const fetchDepartments = async () => {
    try {
      const response = await fetch("http://localhost:5102/api/Department");
      if (!response.ok) {
        throw new Error(`Failed to fetch departments: ${response.status}`);
      }
      const data: ApiDepartment[] = await response.json();
      setDepartments(data.map(dept => ({ id: dept.id, name: dept.departmentName })));
    } catch (err) {
      console.error("Error fetching departments:", err);
      setOptionsError("Failed to load departments.");
    }
  };

  // Function to fetch user types
  const fetchUserTypes = async () => {
    try {
      const response = await fetch("http://localhost:5102/api/UserType");
      if (!response.ok) {
        throw new Error(`Failed to fetch user types: ${response.status}`);
      }
      const data: ApiUserType[] = await response.json();
      setUserTypes(data.map(type => ({ id: type.id, name: type.typeName })));
    } catch (err) {
      console.error("Error fetching user types:", err);
      setOptionsError("Failed to load user types.");
    }
  };

  // Fetch all options when the dialog opens
  useEffect(() => {
    if (open) {
      setLoadingOptions(true);
      setOptionsError(null);
      Promise.all([fetchRoles(), fetchDepartments(), fetchUserTypes()]) // Fetch departments here
        .finally(() => setLoadingOptions(false));
    } else {
      reset();
      setRoles([]);
      setDepartments([]); // Clear departments state on close
      setUserTypes([]);
      setOptionsError(null);
    }
  }, [open, reset]);

  const submit = async (values: AddUserForm) => {
    setSubmitting(true);
    try {
      // If departmentId is an empty string, set it to null for the API
      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        email: values.email,
        phoneNumber: values.phone,
        nicNumber: values.nic,
        roleId: values.roleId,
        departmentId: values.departmentId === "" ? null : values.departmentId, // Set to null if "No Department" is chosen
        userTypeId: values.userTypeId,
        passwordHash: values.password, // Send the plain password here for the API to hash
      };

      const response = await fetch("http://localhost:5102/api/User", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add authorization header if needed
        },
        body: JSON.stringify(payload), // Send the payload with passwordHash
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to create user: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("User created:", result);
      onCreated?.(values); // onCreated might expect the original form values
      onOpenChange(false);
      reset();
      alert("User created successfully!");
    } catch (err: any) {
      console.error("Error creating user:", err);
      alert(`Error: ${err.message || "An unexpected error occurred."}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-[#F5F7F9]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Fill in the details below. You can change these later.
          </DialogDescription>
        </DialogHeader>

        {loadingOptions ? (
          <div className="flex items-center justify-center p-6 text-sm text-gray-500">
            Loading options...
          </div>
        ) : optionsError ? (
          <div className="p-6 text-sm text-red-600 text-center">
            {optionsError}
          </div>
        ) : (
          <form onSubmit={handleSubmit(submit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First / Last name */}
              <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="firstName">
                  First Name
                </label>
                <input
                  id="firstName"
                  {...register("firstName")}
                  className="w-full h-10 rounded-md border border-input bg-white px-3 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40"
                  placeholder="First name"
                />
                {errors.firstName && (
                  <p className="text-xs text-red-600">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  id="lastName"
                  {...register("lastName")}
                  className="w-full h-10 rounded-md border border-input bg-white px-3 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40"
                  placeholder="Last name"
                />
                {errors.lastName && (
                  <p className="text-xs text-red-600">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              {/* Username / Email */}
              <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  {...register("username")}
                  className="w-full h-10 rounded-md border border-input bg-white px-3 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40"
                  placeholder="Username"
                />
                {errors.username && (
                  <p className="text-xs text-red-600">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="w-full h-10 rounded-md border border-input bg-white px-3 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40"
                  placeholder="name@example.com"
                />
                {errors.email && (
                  <p className="text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Phone / NIC */}
              <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  className="w-full h-10 rounded-md border border-input bg-white px-3 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40"
                  placeholder="+94XXXXXXXXX"
                />
                {errors.phone && (
                  <p className="text-xs text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="nic">
                  NIC Number
                </label>
                <input
                  id="nic"
                  {...register("nic")}
                  className="w-full h-10 rounded-md border border-input bg-white px-3 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40"
                  placeholder="NIC number"
                />
                {errors.nic && (
                  <p className="text-xs text-red-600">{errors.nic.message}</p>
                )}
              </div>

              {/* Role / Department / User Type */}
              <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="roleId">
                  User Role
                </label>
                <select
                  id="roleId"
                  {...register("roleId")}
                  className="w-full h-10 rounded-md border border-input bg-white px-3 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select role
                  </option>
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
                {errors.roleId && (
                  <p className="text-xs text-red-600">{errors.roleId.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="departmentId">
                  Department
                </label>
                <select
                  id="departmentId"
                  {...register("departmentId")}
                  className="w-full h-10 rounded-md border border-input bg-white px-3 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40"
                  // Default value for optional fields should reflect the empty option
                  defaultValue=""
                >
                  <option value="">
                    No Department
                  </option> {/* Option for no department */}
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
                {errors.departmentId && (
                  <p className="text-xs text-red-600">
                    {errors.departmentId.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="userTypeId">
                  User Type
                </label>
                <select
                  id="userTypeId"
                  {...register("userTypeId")}
                  className="w-full h-10 rounded-md border border-input bg-white px-3 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select user type
                  </option>
                  {userTypes.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
                {errors.userTypeId && (
                  <p className="text-xs text-red-600">
                    {errors.userTypeId.message}
                  </p>
                )}
              </div>

              {/* Passwords */}
              <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="w-full h-10 rounded-md border border-input bg-white px-3 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40"
                  placeholder="New password"
                />
                {errors.password && (
                  <p className="text-xs text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                  className="w-full h-10 rounded-md border border-input bg-white px-3 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40"
                  placeholder="Confirm password"
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                onClick={() => onOpenChange(false)}
                variant="outline"
                className="h-10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!isValid || submitting}
                className="h-10 bg-[#0E3A6F] hover:bg-[#0E3A6F]/90 text-white"
              >
                {submitting ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}