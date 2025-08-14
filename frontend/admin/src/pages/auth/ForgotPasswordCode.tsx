import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Schema = z.object({
  code: z.string().regex(/^\d{6}$/, "Enter the 6-digit code"),
});
type FormData = z.infer<typeof Schema>;

export default function ForgotPasswordCode() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const [serverMsg, setServerMsg] = useState<null | {
    type: "success" | "error";
    text: string;
  }>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
    mode: "onChange",
    defaultValues: { code: "" },
  });

  // --- 6 separate inputs with auto-advance/backspace ---
  const length = 6;
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [digits, setDigits] = useState<string[]>(() => Array(length).fill(""));

  const code = useMemo(() => digits.join(""), [digits]);
  useEffect(() => {
    setValue("code", code, { shouldValidate: true, shouldDirty: true });
  }, [code, setValue]);

  const handleChange =
    (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      const next = raw.replace(/\D/g, ""); // digits only
      if (!next) {
        setDigits((d) => {
          const copy = [...d];
          copy[idx] = "";
          return copy;
        });
        return;
      }
      const digit = next[0];
      setDigits((d) => {
        const copy = [...d];
        copy[idx] = digit;
        return copy;
      });
      if (idx < length - 1) {
        inputsRef.current[idx + 1]?.focus();
        inputsRef.current[idx + 1]?.select();
      }
    };

  const handleKeyDown =
    (idx: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !digits[idx] && idx > 0) {
        inputsRef.current[idx - 1]?.focus();
        setDigits((d) => {
          const copy = [...d];
          copy[idx - 1] = "";
          return copy;
        });
      }
      if (e.key === "ArrowLeft" && idx > 0) {
        inputsRef.current[idx - 1]?.focus();
      }
      if (e.key === "ArrowRight" && idx < length - 1) {
        inputsRef.current[idx + 1]?.focus();
      }
    };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "");
    if (text.length === length) {
      e.preventDefault();
      const arr = text.split("").slice(0, length);
      setDigits(arr);
      inputsRef.current[length - 1]?.focus();
    }
  };

  const onSubmit = async (values: FormData) => {
    setSubmitting(true);
    setServerMsg(null);
    try {
      await new Promise((r) => setTimeout(r, 150)); // no backend yet
      // 👉 Navigate to your Step 3 route with query params
      navigate(
        `/forgot-password-reset?email=${encodeURIComponent(email)}&code=${encodeURIComponent(
          values.code
        )}`
      );
    } catch {
      setServerMsg({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const resend = async () => {
    setServerMsg(null);
    await new Promise((r) => setTimeout(r, 150));
    setServerMsg({
      type: "success",
      text: `A new code has been sent to ${email || "your email"}.`,
    });
  };

  return (
    <main className="min-h-screen grid place-items-center bg-[#F5F7F9] p-4">
      <Card className="w-full max-w-md rounded-2xl shadow-lg">
        <CardHeader className="items-center space-y-2">
          <CardTitle className="text-2xl text-center tracking-tight uppercase">
            FORGET PASSWORD
          </CardTitle>
          <p className="text-green-600 font-semibold">Step 2 of 3</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-center text-sm text-[#0F1A47]/80">
            <p>Please enter the code sent to your email address</p>
            <p className="font-medium">{email || "your email"}</p>
          </div>

          {serverMsg && (
            <Alert variant={serverMsg.type === "error" ? "destructive" : "default"}>
              <AlertTitle>{serverMsg.type === "error" ? "Error" : "Success"}</AlertTitle>
              <AlertDescription>{serverMsg.text}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Hidden field bound to RHF for validation */}
            <input type="hidden" {...register("code")} value={watch("code")} readOnly />

            <div className="flex items-center justify-center gap-2">
              {Array.from({ length }).map((_, idx) => (
                <input
                  key={idx}
                  ref={(el: HTMLInputElement | null) => {
                    inputsRef.current[idx] = el; // <-- returns void
                  }}
                  value={digits[idx] ?? ""}
                  onChange={handleChange(idx)}
                  onKeyDown={handleKeyDown(idx)}
                  onPaste={idx === 0 ? handlePaste : undefined}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  className="w-12 h-12 text-center text-lg rounded-md border border-input bg-white outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40"
                />
              ))}
            </div>
            {errors.code && (
              <p className="text-center text-xs text-red-600">{errors.code.message}</p>
            )}

            <Button
              type="submit"
              disabled={submitting || !isValid}
              className="w-full h-11 rounded-lg bg-[#007EED] hover:bg-[#007EED]/90 text-white"
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Verifying…
                </>
              ) : (
                "Verify Code"
              )}
            </Button>

            <div className="text-center text-sm">
              If you don’t receive the code?{" "}
              <button
                type="button"
                onClick={resend}
                className="text-[#10029A] hover:underline"
              >
                Resend
              </button>
            </div>
          </form>

          <div className="text-center">
            <Link to="/forgot-password" className="text-[#10029A] hover:underline">
              Back
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
