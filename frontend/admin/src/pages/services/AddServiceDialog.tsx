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
  serviceName: z.string().min(2, "Service name is required"),
  description: z.string().optional(),
  requirements: z.string().optional(),
  processingTime: z.string().min(1, "Processing time is required"), // e.g., "3 days"
  feeAmount: z.number().min(0, "Fee must be 0 or more"),
  departmentId: z.string().min(1, "Select a department"),
});

export type AddServiceForm = z.infer<typeof Schema>;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: (payload: AddServiceForm) => void;
};

// demo list (replace with API later)
const DEPARTMENTS = [
  { id: "10", name: "Health" },
  { id: "11", name: "Education" },
  { id: "12", name: "Finance" },
];

export default function AddServiceDialog({ open, onOpenChange, onCreated }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<AddServiceForm>({
    resolver: zodResolver(Schema),
    mode: "onChange",
  });

  const [submitting, setSubmitting] = useState(false);

  const submit = async (values: AddServiceForm) => {
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 200)); // demo delay
      console.log("NEW SERVICE (demo):", values);
      onCreated?.(values);
      onOpenChange(false);
      reset();
      alert("Demo: Service created (not persisted).");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-white rounded-xl">
        <DialogHeader>
          <DialogTitle>Add New Service</DialogTitle>
          <DialogDescription>Enter the service details below.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1 sm:col-span-2">
              <label className="text-sm font-medium" htmlFor="serviceName">
                Service Name
              </label>
              <input
                id="serviceName"
                {...register("serviceName")}
                placeholder="Birth Certificate"
                className="w-full h-10 rounded-md border border-input bg-white px-3 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40"
              />
              {errors.serviceName && (
                <p className="text-xs text-red-600">{errors.serviceName.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="processingTime">
                Processing Time
              </label>
              <input
                id="processingTime"
                {...register("processingTime")}
                placeholder="3 days"
                className="w-full h-10 rounded-md border border-input bg-white px-3 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40"
              />
              {errors.processingTime && (
                <p className="text-xs text-red-600">{errors.processingTime.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="feeAmount">
                Fee Amount (LKR)
              </label>
              <input
                id="feeAmount"
                type="number"
                step="1"
                min="0"
                {...register("feeAmount", { valueAsNumber: true })}
                placeholder="1000"
                className="w-full h-10 rounded-md border border-input bg-white px-3 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40"
              />
              {errors.feeAmount && (
                <p className="text-xs text-red-600">{errors.feeAmount.message}</p>
              )}
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-sm font-medium" htmlFor="departmentId">
                Department
              </label>
              <select
                id="departmentId"
                defaultValue=""
                {...register("departmentId")}
                className="w-full h-10 rounded-md border border-input bg-white px-3 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40"
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
                <p className="text-xs text-red-600">{errors.departmentId.message}</p>
              )}
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-sm font-medium" htmlFor="requirements">
                Requirements
              </label>
              <textarea
                id="requirements"
                rows={3}
                placeholder="NIC, application form…"
                {...register("requirements")}
                className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40 resize-y"
              />
              {errors.requirements && (
                <p className="text-xs text-red-600">{errors.requirements.message}</p>
              )}
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-sm font-medium" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                placeholder="Short description…"
                {...register("description")}
                className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40 resize-y"
              />
              {errors.description && (
                <p className="text-xs text-red-600">{errors.description.message}</p>
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