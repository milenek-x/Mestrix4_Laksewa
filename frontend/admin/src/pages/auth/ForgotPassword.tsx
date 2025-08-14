import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

// your shadcn-style components already in the project
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Schema = z.object({
  email: z.string().email("Enter a valid email address"),
});
type FormData = z.infer<typeof Schema>;

export default function ForgotPassword() {
  const [submitting, setSubmitting] = useState(false);
  const [serverMsg, setServerMsg] = useState<null | {
    type: "success" | "error";
    text: string;
  }>(null);

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
    setSubmitting(true);
    setServerMsg(null);
    try {
      // No backend yet — tiny delay so the spinner is visible
      await new Promise((r) => setTimeout(r, 150));

      setServerMsg({
        type: "success",
        text: "If the email is registered, a reset link (and code) has been sent.",
      });

      // Navigate to Step 2 with the email in the query string
      navigate(`/forgot-password-code?email=${encodeURIComponent(values.email)}`);
    } catch {
      setServerMsg({
        type: "error",
        text: "We couldn't send the link. Please try again.",
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
            FORGET PASSWORD
          </CardTitle>
          <p className="text-green-600 font-semibold">Step 1 of 3</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-center text-sm text-[#0F1A47]/80">
            Enter the email address associated <br /> with your account
          </p>

          {serverMsg && (
            <Alert variant={serverMsg.type === "error" ? "destructive" : "default"}>
              <AlertTitle>{serverMsg.type === "error" ? "Error" : "Success"}</AlertTitle>
              <AlertDescription>{serverMsg.text}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium">
                Enter the email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 opacity-60" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter the email address"
                  {...register("email")}
                  className="w-full rounded-md border border-input bg-white pl-10 pr-3 h-10 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600">{errors.email.message}</p>
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
                  Sending…
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>

          <div className="text-center">
            <a href="/" className="text-[#10029A] hover:underline">
              Back to Login
            </a>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
