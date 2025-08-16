"use client"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// New interface for a single metric card's props
export interface MetricCardProps {
  title: string;
  value: number;
}

// SectionCards is now designed to render a single card
export function SectionCards({ title, value }: MetricCardProps) {
  // Function to format the title from camelCase to a readable string
  const formatTitle = (text: string) => {
    return text
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
  };

  return (
    <Card className="@container/card">
      <CardHeader className="text-center">
        <CardDescription className="flex items-center gap-2 text-base justify-center">
          {formatTitle(title)}
        </CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {value.toLocaleString()}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
