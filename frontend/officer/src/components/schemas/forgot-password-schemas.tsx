import { z } from "zod";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"; // For OTP pattern validation

export const emailSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

export const otpSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be 6 digits." }).regex(new RegExp(REGEXP_ONLY_DIGITS_AND_CHARS), {
    message: "OTP must contain only digits and characters.",
  }),
});

export const passwordSchema = z.object({
  newPassword: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

export type EmailFormData = z.infer<typeof emailSchema>;
export type OtpFormData = z.infer<typeof otpSchema>;
export type PasswordFormData = z.infer<typeof passwordSchema>;