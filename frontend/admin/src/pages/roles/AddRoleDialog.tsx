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

const Schema = z.object({
  roleName: z.string().min(2, "Role name is required"),
  description: z.string().optional(),
});

export type AddRoleForm = z.infer<typeof Schema>;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: (payload: AddRoleForm) => void;
};

export default function AddRoleDialog({ open, onOpenChange, onCreated }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<AddRoleForm>({ resolver: zodResolver(Schema), mode: "onChange" });

  const [submitting, setSubmitting] = useState(false);

  const submit = async (values: AddRoleForm) => {
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 200)); // demo delay (no backend yet)
      console.log("NEW ROLE (demo):", values);
      onCreated?.(values);
      onOpenChange(false);
      reset();
      alert("Demo: Role created (not persisted).");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-white rounded-xl">
        <DialogHeader>
          <DialogTitle>Add New Role</DialogTitle>
          <DialogDescription>Enter role details below.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="roleName">
              Role Name
            </label>
            <input
              id="roleName"
              {...register("roleName")}
              placeholder="Supervisor"
              className="w-full h-10 rounded-md border border-input bg-white px-3 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40"
            />
            {errors.roleName && (
              <p className="text-xs text-red-600">{errors.roleName.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              {...register("description")}
              placeholder="Describe responsibilities and permissions…"
              className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40 resize-y"
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" onClick={() => onOpenChange(false)} variant="outline" className="h-10">
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
