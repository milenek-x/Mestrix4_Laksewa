// app/settings/page.tsx
import DashboardLayout from "../templates/DashboardLayout";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  "Requests": { // Key must match the dataKey of your Bar component
    label: "Services",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

const chartData = [
  { "Service": "Passport Renewal", "Requests": 450 },
  { "Service": "Driver's License Application", "Requests": 380 },
  { "Service": "Birth Certificate Request", "Requests": 320 },
  { "Service": "Tax Filing Assistance", "Requests": 290 },
  { "Service": "Property Deed Registration", "Requests": 250 },
  { "Service": "Vehicle Registration", "Requests": 210 },
  { "Service": "Medical Report Submission", "Requests": 180 },
  { "Service": "Deed Verification", "Requests": 150 },
  { "Service": "Pension Fund Inquiry", "Requests": 120 },
  { "Service": "Business Registration", "Requests": 90 },
];

export default function Page() {
  return (
    <DashboardLayout>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="Service"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {/* Corrected fill property */}
        <Bar dataKey="Requests" fill="var(--color-Requests)" radius={4} />
      </BarChart>
    </ChartContainer>
    </DashboardLayout>
  );
}