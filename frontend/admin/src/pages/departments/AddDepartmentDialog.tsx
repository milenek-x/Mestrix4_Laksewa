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
  departmentName: z.string().min(2, "Department name is required"),
  description: z.string().optional(),
  location: z.string().min(2, "Location is required"),
  headOfDepartmentId: z.string().min(1, "Select a head of department"),
});

export type AddDepartmentForm = z.infer<typeof Schema>;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: (payload: AddDepartmentForm) => void;
};

// Demo options — replace with API data later
const HEADS = [
  { id: "u1", name: "Dr. Anne Silva" },
  { id: "u2", name: "Mr. John Perera" },
  { id: "u3", name: "Ms. Kavindi Fernando" },
];

export default function AddDepartmentDialog({
  open,
  onOpenChange,
  onCreated,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<AddDepartmentForm>({
    resolver: zodResolver(Schema),
    mode: "onChange",
  });

  const [submitting, setSubmitting] = useState(false);

  const submit = async (values: AddDepartmentForm) => {
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 200)); // no backend yet
      console.log("NEW DEPARTMENT (demo):", values);
      onCreated?.(values);
      onOpenChange(false);
      reset();
      alert("Demo: Department created (not persisted).");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* solid white background to match the rest */}
      <DialogContent className="sm:max-w-xl bg-white rounded-xl">
        <DialogHeader>
          <DialogTitle>Add New Department</DialogTitle>
          <DialogDescription>
            Enter the department details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1 sm:col-span-2">
              <label className="text-sm font-medium" htmlFor="departmentName">
                Department Name
              </label>
              <input
                id="departmentName"
                {...register("departmentName")}
                placeholder="Finance"
                className="w-full h-10 rounded-md border border-input bg-white px-3 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40"
              />
              {errors.departmentName && (
                <p className="text-xs text-red-600">
                  {errors.departmentName.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="location">
                Location
              </label>
              <input
                id="location"
                {...register("location")}
                placeholder="Colombo"
                className="w-full h-10 rounded-md border border-input bg-white px-3 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40"
              />
              {errors.location && (
                <p className="text-xs text-red-600">{errors.location.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="headOfDepartmentId">
                Head of Department
              </label>
              <select
                id="headOfDepartmentId"
                defaultValue=""
                {...register("headOfDepartmentId")}
                className="w-full h-10 rounded-md border border-input bg-white px-3 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40"
              >
                <option value="" disabled>
                  Select head of department
                </option>
                {HEADS.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name}
                  </option>
                ))}
              </select>
              {errors.headOfDepartmentId && (
                <p className="text-xs text-red-600">
                  {errors.headOfDepartmentId.message}
                </p>
              )}
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-sm font-medium" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                placeholder="Short description..."
                {...register("description")}
                className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40 resize-y"
              />
              {errors.description && (
                <p className="text-xs text-red-600">
                  {errors.description.message}
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
