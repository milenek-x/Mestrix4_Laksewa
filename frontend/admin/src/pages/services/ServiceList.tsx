import { useMemo, useState } from "react";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Service = {
  id: string;
  serviceName: string;
  description: string;
  requirements: string;
  processingTime: string; // e.g., "3 days"
  feeAmount: number;      // currency
  department: string;     // shown name for now (later: FK -> department)
};

// demo data (replace with API later)
const SEED: Service[] = [
  {
    id: "s1",
    serviceName: "Birth Certificate",
    description: "Issue of birth certificate copy",
    requirements: "NIC, application form",
    processingTime: "3 days",
    feeAmount: 1000,
    department: "Health",
  },
  {
    id: "s2",
    serviceName: "Business Registration",
    description: "Register a new business",
    requirements: "NIC, company docs",
    processingTime: "5 days",
    feeAmount: 3500,
    department: "Finance",
  },
  {
    id: "s3",
    serviceName: "School Admission",
    description: "Grade 1 admission",
    requirements: "Birth certificate, address proof",
    processingTime: "7 days",
    feeAmount: 0,
    department: "Education",
  },
];

const money = (n: number) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency: "LKR", maximumFractionDigits: 0 }).format(n);

export default function ServiceList() {
  const [q, setQ] = useState("");

  const services = useMemo(() => {
    if (!q.trim()) return SEED;
    const s = q.toLowerCase();
    return SEED.filter(
      (x) =>
        x.serviceName.toLowerCase().includes(s) ||
        x.description.toLowerCase().includes(s) ||
        x.requirements.toLowerCase().includes(s) ||
        x.processingTime.toLowerCase().includes(s) ||
        x.department.toLowerCase().includes(s) ||
        String(x.feeAmount).includes(s)
    );
  }, [q]);

  const onAdd = () => {
    // later: open Add Service modal / navigate to /app/services/new
    console.log("Add service");
  };
  const onEdit = (sv: Service) => console.log("Edit", sv.id);
  const onDelete = (sv: Service) => console.log("Delete", sv.id);

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

      {/* table */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-[980px] w-full">
              <thead>
                <tr className="bg-[#0E3A6F] text-white text-left">
                  <th className="px-6 py-3 text-sm font-semibold">Service Name</th>
                  <th className="px-6 py-3 text-sm font-semibold">Description</th>
                  <th className="px-6 py-3 text-sm font-semibold">Requirements</th>
                  <th className="px-6 py-3 text-sm font-semibold">Processing Time</th>
                  <th className="px-6 py-3 text-sm font-semibold">Fee Amount</th>
                  <th className="px-6 py-3 text-sm font-semibold">Department</th>
                  <th className="px-6 py-3 text-sm font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {services.map((sv) => (
                  <tr
                    key={sv.id}
                    className="bg-white border-b last:border-b-0"
                    style={{ boxShadow: "0 1px 0 0 rgba(0,0,0,0.06) inset" }}
                  >
                    <td className="px-6 py-4 text-sm">{sv.serviceName}</td>
                    <td className="px-6 py-4 text-sm">{sv.description}</td>
                    <td className="px-6 py-4 text-sm">{sv.requirements}</td>
                    <td className="px-6 py-4 text-sm">{sv.processingTime}</td>
                    <td className="px-6 py-4 text-sm">{money(sv.feeAmount)}</td>
                    <td className="px-6 py-4 text-sm">{sv.department}</td>
                    <td className="px-6 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onEdit(sv)}
                          className="p-2 rounded-md hover:bg-black/5"
                          aria-label={`Edit ${sv.serviceName}`}
                          title="Edit"
                        >
                          <Pencil className="size-4" />
                        </button>
                        <button
                          onClick={() => onDelete(sv)}
                          className="p-2 rounded-md hover:bg-black/5"
                          aria-label={`Delete ${sv.serviceName}`}
                          title="Delete"
                        >
                          <Trash2 className="size-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {services.length === 0 && (
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
    </div>
  );
}
