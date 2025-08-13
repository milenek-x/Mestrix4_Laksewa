// schemas/auth-schemas.ts (or similar file)
import { z } from "zod";

export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, { message: "Current password is required." }),
  newPassword: z.string().min(6, { message: "New password must be at least 6 characters." }),
  confirmNewPassword: z.string().min(1, { message: "Confirm new password is required." }),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "New password and confirm password do not match.",
  path: ["confirmNewPassword"], // Path of the error
});

export type ChangePasswordFormValues = z.infer<typeof ChangePasswordSchema>;