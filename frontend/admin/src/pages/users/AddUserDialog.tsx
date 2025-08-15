import { useState } from "react";
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
    departmentId: z.string().min(1, "Select a department"),
    userTypeId: z.string().min(1, "Select a user type"),
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

// demo option lists (replace with API later)
const ROLES = [
  { id: "1", name: "Admin" },
  { id: "2", name: "Officer" },
  { id: "3", name: "Viewer" },
];
const DEPARTMENTS = [
  { id: "10", name: "Health" },
  { id: "11", name: "Education" },
  { id: "12", name: "Finance" },
];
const USER_TYPES = [
  { id: "100", name: "Internal" },
  { id: "101", name: "External" },
];

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

  const submit = async (values: AddUserForm) => {
    setSubmitting(true);
    try {
      // No backend yet — just a tiny delay for UX
      await new Promise((r) => setTimeout(r, 200));
      console.log("NEW USER (demo):", values);
      onCreated?.(values);
      onOpenChange(false);
      reset();
      alert("Demo: User created (not persisted)."); // temporary
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
                <p className="text-xs text-red-600">{errors.firstName.message}</p>
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
                <p className="text-xs text-red-600">{errors.lastName.message}</p>
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
                <p className="text-xs text-red-600">{errors.username.message}</p>
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
                {ROLES.map((r) => (
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
                defaultValue=""
              >
                <option value="" disabled>
                  Select department
                </option>
                {DEPARTMENTS.map((d) => (
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
                {USER_TYPES.map((t) => (
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
                <p className="text-xs text-red-600">{errors.password.message}</p>
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
      </DialogContent>
    </Dialog>
  );
}
