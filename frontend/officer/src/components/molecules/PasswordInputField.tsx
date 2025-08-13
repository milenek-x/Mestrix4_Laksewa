"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

/**
 * Props for the PasswordInputField component.
 */
interface PasswordInputFieldProps extends React.ComponentPropsWithoutRef<typeof Input> {
  id: string;
  label: string;
  placeholder?: string;
}

/**
 * PasswordInputField Molecule: A reusable component for a single password input field
 * with a label.
 *
 * @param {PasswordInputFieldProps} props - The component props.
 * @returns {JSX.Element} The rendered label and password input.
 */
const PasswordInputField = React.forwardRef<HTMLInputElement, PasswordInputFieldProps>(
  ({ id, label, placeholder, className, ...props }, ref) => {
    return (
      <div className={cn("space-y-2", className)}>
        <Label htmlFor={id}>{label}</Label>
        <Input
          id={id}
          type="password"
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

PasswordInputField.displayName = "PasswordInputField";

export default PasswordInputField;