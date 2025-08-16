// File: ForgotPasswordForm.tsx

"use client"

import { useState, useEffect } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useNavigate } from 'react-router-dom';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import Logo from '../../assets/Logo.png';

// Assuming your schema file is correctly located at this path
import { emailSchema, otpSchema, passwordSchema, EmailFormData, OtpFormData, PasswordFormData } from "../schemas/forgot-password-schemas";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { CardTitle } from "../ui/card";

type FormState = "email" | "otp" | "newPassword" | "success";

// --- API Base URL ---
const API_BASE_URL = "http://localhost:5102/api/User"; // Your API base URL
// --- End API Base URL ---

export function ForgotPasswordForm() {
  const [currentStep, setCurrentStep] = useState<FormState>("email");
  // Include userId in formData state
  const [formData, setFormData] = useState<Partial<EmailFormData & OtpFormData & PasswordFormData & { userId?: string }>>({});
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const otpForm = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Effect for the resend OTP timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimer > 0) {
      setCanResendOtp(false); // Disable button while timer is active
      timer = setTimeout(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    } else {
      setCanResendOtp(true); // Enable button when timer reaches 0
    }
    return () => clearTimeout(timer); // Cleanup timer on component unmount or timer reset
  }, [resendTimer]);

  // Helper function to start the resend OTP timer
  const startResendTimer = () => {
    setResendTimer(30); // Set timer to 30 seconds
  };

  // Helper function to show Zod errors as toasts
  const showZodErrors = (errors: FieldErrors<any>) => {
    toast.dismiss(); // Dismiss all current toasts

    const errorMessages = new Set<string>();
    Object.values(errors).forEach(errorField => {
      if (Array.isArray(errorField)) {
        errorField.forEach(err => {
          if (err && typeof err === 'object' && 'message' in err) {
            errorMessages.add(err.message as string);
          }
        });
      } else if (errorField && typeof errorField === 'object' && 'message' in errorField) {
        errorMessages.add(errorField.message as string);
      }
    });

    errorMessages.forEach(message => {
      toast.error(message);
    });
  };

  const handleEmailSubmit = async (data: EmailFormData) => {
    console.log("Submitting email:", data.email);
    emailForm.clearErrors("email");
    toast.loading("Checking email and sending OTP...", { id: "email-check" });

    try {
      // 1. Check if user exists
      const existsResponse = await fetch(`${API_BASE_URL}/exists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      const existsData = await existsResponse.json();

      // Check if the response is OK and if userId is present
      // existsData.userId will be present if user exists, and it'll be null if not found
      if (!existsResponse.ok || !existsData.userId) { // Check for existsData.userId
        toast.error("We could not find an account with that email address. Please try again.", { id: "email-check" });
        return;
      }

      // 2. Send OTP if user exists
      const sendOtpResponse = await fetch(`${API_BASE_URL}/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      if (!sendOtpResponse.ok) {
        const errorData = await sendOtpResponse.json();
        throw new Error(errorData.message || "Failed to send OTP. Please try again.");
      }

      // Store email and userId in formData
      setFormData((prev) => ({ ...prev, ...data, userId: existsData.userId }));
      setCurrentStep("otp");
      toast.success("OTP sent to your email!", { id: "email-check" });
      startResendTimer(); // Start timer after OTP is sent
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred. Please try again.", { id: "email-check" });
      console.error("Email submission error:", error);
    }
  };

  const handleOtpSubmit = async (data: OtpFormData) => {
    console.log("Verifying OTP:", data.otp);
    otpForm.clearErrors("otp");
    toast.loading("Verifying OTP...", { id: "otp-verify" });

    try {
      const verifyOtpResponse = await fetch(`${API_BASE_URL}/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, otpCode: data.otp }),
      });

      if (!verifyOtpResponse.ok) {
        const errorData = await verifyOtpResponse.json();
        throw new Error(errorData.message || "Invalid or expired OTP. Please try again.");
      }

      setFormData((prev) => ({ ...prev, ...data }));
      setCurrentStep("newPassword");
      toast.success("OTP verified successfully!", { id: "otp-verify" });
      setResendTimer(0); // Reset timer when moving past OTP step
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred during OTP verification. Please try again.", { id: "otp-verify" });
      console.error("OTP verification error:", error);
    }
  };

  const handleResendOtp = async () => {
    console.log("Resending OTP to:", formData.email);
    toast.info("Resending OTP...", { id: "resend-otp" });

    try {
      const sendOtpResponse = await fetch(`${API_BASE_URL}/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (!sendOtpResponse.ok) {
        const errorData = await sendOtpResponse.json();
        throw new Error(errorData.message || "Failed to resend OTP. Please try again.");
      }

      startResendTimer(); // Restart the timer
      toast.success("New OTP sent!", { id: "resend-otp" });
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred while resending OTP. Please try again.", { id: "resend-otp" });
      console.error("Resend OTP error:", error);
    }
  };

  const handlePasswordSubmit = async (data: PasswordFormData) => {
    console.log("Setting new password:", data.newPassword);
    toast.loading("Resetting password...", { id: "password-reset" });

    if (!formData.userId) {
      toast.error("User ID not found. Please restart the password reset process.", { id: "password-reset" });
      console.error("User ID is missing from formData for password reset.");
      return;
    }

    try {
      const resetPasswordResponse = await fetch(`${API_BASE_URL}/${formData.userId}/reset-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword: data.newPassword }), // Send only newPassword
      });

      if (!resetPasswordResponse.ok) {
        const errorData = await resetPasswordResponse.json();
        throw new Error(errorData.message || "Failed to reset password. Please try again.");
      }

      setFormData((prev) => ({ ...prev, ...data }));
      setCurrentStep("success");
      toast.success("Your password has been successfully reset!", { id: "password-reset" });
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred during password reset. Please try again.", { id: "password-reset" });
      console.error("Password reset error:", error);
    }
  };

  // --- Dynamic Title Logic ---
  const getCardTitle = () => {
    switch (currentStep) {
      case "email":
        return "Forgot Password";
      case "otp":
        return "Verify OTP";
      case "newPassword":
        return "Update Password";
      case "success":
        return "Password Reset Successful!";
      default:
        return "Forgot Password";
    }
  };
  // --- End Dynamic Title Logic ---

  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto p-6 bg-background rounded-lg shadow-md border">
      <img
        src={Logo}
        alt="LakSewa Logo"
        className="mx-auto h-24 w-24 object-contain mb-4"
      />
      <CardTitle className="text-center text-app-login">{getCardTitle()}</CardTitle>

      {currentStep === "email" && (
        <Form {...emailForm}>
          <form onSubmit={emailForm.handleSubmit(handleEmailSubmit, showZodErrors)} className="space-y-6 pt-8">
            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-left">Email</Label>
                  <FormControl>
                    <Input errorHighlight="none" placeholder="Enter your registered email address" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" variant="login" className="w-full">Send OTP</Button>
            <Button type="button" variant="link" onClick={() => navigate('/')} className="w-full">
              Back to Login
            </Button>
          </form>
        </Form>
      )}

      {currentStep === "otp" && (
        <Form {...otpForm}>
          <form onSubmit={otpForm.handleSubmit(handleOtpSubmit, showZodErrors)} className="space-y-6 pt-8">
            <FormField
              control={otpForm.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormDescription className="text-center w-full">
                    Please enter the 6-digit OTP sent to your email.
                  </FormDescription>
                  <FormControl>
                    <div className="flex justify-center">
                      <InputOTP
                        maxLength={6}
                        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                        {...field}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" variant="login" className="w-full">Verify OTP</Button>
            {/* Resend OTP Button */}
            <Button
              type="button"
              variant="link"
              onClick={handleResendOtp}
              className="w-full"
              disabled={!canResendOtp}
            >
              {canResendOtp ? "Resend OTP" : `Resend OTP in ${resendTimer}s`}
            </Button>
            <Button type="button" variant="link" onClick={() => setCurrentStep("email")} className="w-full">
              Back to Email
            </Button>
          </form>
        </Form>
      )}

      {currentStep === "newPassword" && (
        <Form {...passwordForm}>
          <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit, showZodErrors)} className="space-y-6 pt-8">
            <FormField
              control={passwordForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-left">New Password</Label>
                  <FormControl>
                    <Input errorHighlight="none" type="password" placeholder="Enter your new password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={passwordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-left">Confirm New Password</Label>
                  <FormControl>
                    <Input errorHighlight="none" type="password" placeholder="Confirm your new password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" variant="login" className="w-full">Reset Password</Button>
            <Button type="button" variant="link" onClick={() => setCurrentStep("otp")} className="w-full">
              Back to OTP
            </Button>
          </form>
        </Form>
      )}

      {currentStep === "success" && (
        <div className="text-center space-y-4 pt-8">
          <Button variant="login" className="w-full" onClick={() => {
            setCurrentStep("email");
            emailForm.reset();
            otpForm.reset();
            passwordForm.reset();
            setFormData({}); // Clear all form data, including userId
            navigate('/');
          }}>
            Go back to Login
          </Button>
        </div>
      )}
    </div>
  );
}