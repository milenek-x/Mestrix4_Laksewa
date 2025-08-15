import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority" // Import cva and VariantProps

// Define the input variants using cva
const inputVariants = cva(
  "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-4 focus-visible:outline-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      errorHighlight: {
        default: "aria-invalid:outline-destructive/60 aria-invalid:ring-destructive/20 dark:aria-invalid:outline-destructive dark:aria-invalid:ring-destructive/50 aria-invalid:outline-destructive/60 dark:aria-invalid:outline-destructive dark:aria-invalid:ring-destructive/40 aria-invalid:ring-destructive/20 aria-invalid:border-destructive/60 dark:aria-invalid:border-destructive aria-invalid:focus-visible:ring-[3px] aria-invalid:focus-visible:outline-none dark:aria-invalid:focus-visible:ring-4",
        none: "aria-invalid:outline-none aria-invalid:ring-0 aria-invalid:border-input dark:aria-invalid:outline-none dark:aria-invalid:ring-0 dark:aria-invalid:border-input aria-invalid:focus-visible:ring-4 aria-invalid:focus-visible:outline-1 dark:aria-invalid:focus-visible:ring-4", // Revert to default focus-visible for invalid
      },
    },
    defaultVariants: {
      errorHighlight: "default",
    },
  }
)

// Extend the InputProps to include our new variant prop
export interface InputProps
  extends React.ComponentProps<"input">,
    VariantProps<typeof inputVariants> {}

function Input({ className, type, errorHighlight, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      // Use the inputVariants to apply classes based on the errorHighlight prop
      className={cn(inputVariants({ errorHighlight, className }))}
      {...props}
    />
  )
}

export { Input }