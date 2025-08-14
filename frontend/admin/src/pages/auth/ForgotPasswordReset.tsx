import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Loader2 } from "lucide-react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Schema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm your new password"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FormData = z.infer<typeof Schema>;

export default function ForgotPasswordReset() {
  const [submitting, setSubmitting] = useState(false);
  const [serverMsg, setServerMsg] = useState<null | {
    type: "success" | "error";
    text: string;
  }>(null);

  // not used yet, but available if you need to display/email later
  const [params] = useSearchParams();
  const email = params.get("email") || "";
  const code = params.get("code") || "";

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
    mode: "onChange",
  });

  const navigate = useNavigate();

  const onSubmit = async (values: FormData) => {
    // silence unused for now; integrate with API later
    void values; void email; void code;

    setSubmitting(true);
    setServerMsg(null);
    try {
      // No backend yet — tiny delay so the spinner shows
      await new Promise((r) => setTimeout(r, 150));

      setServerMsg({
        type: "success",
        text: "Your password has been updated.",
      });

      // For now, go back to Login
      navigate("/");
    } catch {
      setServerMsg({
        type: "error",
        text: "We couldn't update your password. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen grid place-items-center bg-[#F5F7F9] p-4">
      <Card className="w-full max-w-md rounded-2xl shadow-lg">
        <CardHeader className="items-center space-y-2">
          <CardTitle className="text-2xl text-center tracking-tight uppercase">
            ENTER NEW PASSWORD
          </CardTitle>
          <p className="text-green-600 font-semibold">Step 3 of 3</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-center text-sm text-[#0F1A47]/80">
            Your new password must be different <br /> from previously used passwords
          </p>

          {serverMsg && (
            <Alert variant={serverMsg.type === "error" ? "destructive" : "default"}>
              <AlertTitle>{serverMsg.type === "error" ? "Error" : "Success"}</AlertTitle>
              <AlertDescription>{serverMsg.text}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Password */}
            <div className="space-y-1">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 opacity-60" />
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Password"
                  {...register("password")}
                  className="w-full rounded-md border border-input bg-white pl-10 pr-3 h-10 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40"
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 opacity-60" />
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                  className="w-full rounded-md border border-input bg-white pl-10 pr-3 h-10 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={submitting || !isValid}
              className="w-full h-11 rounded-lg bg-teal-600 hover:bg-teal-700 text-white"
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Verifying and Proceeding…
                </>
              ) : (
                "Verify and Proceed"
              )}
            </Button>
          </form>

          <div className="text-center">
            <Link to="/forgot-password-code" className="text-[#10029A] hover:underline">
              Back
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
