// components/molecules/ProfileField.jsx
import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming cn utility is available
import { Label } from "@/components/ui/label"; // Shadcn Label component

/**
 * Props for the ProfileField component.
 */
interface AccountFieldProps {
  label: string; // The label for the profile field (e.g., "Employee ID")
  value: string; // The value of the profile field (e.g., "LK-2024-JD-54321")
  className?: string; // Optional className for custom styling
}

/**
 * ProfileField Molecule: Displays a single label-value pair for profile information.
 * This component is memoized to prevent unnecessary re-renders.
 *
 * @param {ProfileFieldProps} props - The component props.
 * @returns {JSX.Element} The rendered label and value.
 */
const AccountField = React.memo(({ label, value, className }: AccountFieldProps) => {
  return (
    <div className={cn("flex flex-col space-y-1.5", className)}>
      <Label className="text-sm text-muted-foreground">{label}</Label>
      <p className="text-base font-medium text-foreground">{value}</p>
    </div>
  );
});

AccountField.displayName = "AccountField"; // Good practice for React DevTools

export default AccountField;