import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/context/AuthContext";

// --- Validation schema ---
const Schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone number"),
  nic: z.string().min(5, "Enter a valid NIC number"),
});

type FormData = z.infer<typeof Schema>;

export default function ProfileSettings() {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [serverMsg, setServerMsg] = useState<null | { type: "success" | "error"; text: string }>(null);

  // Fallback demo values (replace with real profile fetch later)
  const defaults: FormData = {
    firstName: user?.name?.split(" ")?.[0] || "John",
    lastName: user?.name?.split(" ")?.slice(1).join(" ") || "Robert",
    username: "john29",
    email: "john@gmail.com",
    phone: "+94702581212",
    nic: "199012345678",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
    mode: "onChange",
    defaultValues: defaults,
  });

  useEffect(() => {
    reset(defaults);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.name]);

  const onSubmit = async (values: FormData) => {
    // mark as intentionally used until we wire backend
    void values;

    setSubmitting(true);
    setServerMsg(null);
    try {
      // TODO: call your .NET API here:
      // await api.put('/me', values)
      await new Promise((r) => setTimeout(r, 300)); // tiny delay to show spinner

      setServerMsg({ type: "success", text: "Profile updated successfully." });
    } catch {
      setServerMsg({ type: "error", text: "We couldn't save your changes. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Profile Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-[#0F1A47]/80">
            Update your personal information. You can change these details later.
          </p>

          {serverMsg && (
            <Alert variant={serverMsg.type === "error" ? "destructive" : "default"}>
              <AlertTitle>{serverMsg.type === "error" ? "Error" : "Success"}</AlertTitle>
              <AlertDescription>{serverMsg.text}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="firstName" className="text-sm font-medium">
                  First Name
                </label>
                <input
                  id="firstName"
                  {...register("firstName")}
                  placeholder="First name"
                  className="w-full h-10 rounded-md border border-input bg-white px-3 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40"
                />
                {errors.firstName && <p className="text-xs text-red-600">{errors.firstName.message}</p>}
              </div>

              <div className="space-y-1">
                <label htmlFor="lastName" className="text-sm font-medium">
                  Last Name
                </label>
                <input
                  id="lastName"
                  {...register("lastName")}
                  placeholder="Last name"
                  className="w-full h-10 rounded-md border border-input bg-white px-3 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40"
                />
                {errors.lastName && <p className="text-xs text-red-600">{errors.lastName.message}</p>}
              </div>

              <div className="space-y-1">
                <label htmlFor="username" className="text-sm font-medium">
                  Username
                </label>
                <input
                  id="username"
                  {...register("username")}
                  placeholder="john29"
                  className="w-full h-10 rounded-md border border-input bg-white px-3 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40"
                />
                {errors.username && <p className="text-xs text-red-600">{errors.username.message}</p>}
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="name@example.com"
                  className="w-full h-10 rounded-md border border-input bg-white px-3 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40"
                />
                {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
              </div>

              <div className="space-y-1">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </label>
                <input
                  id="phone"
                  {...register("phone")}
                  placeholder="+94XXXXXXXXX"
                  className="w-full h-10 rounded-md border border-input bg-white px-3 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40"
                />
                {errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}
              </div>

              <div className="space-y-1">
                <label htmlFor="nic" className="text-sm font-medium">
                  NIC Number
                </label>
                <input
                  id="nic"
                  {...register("nic")}
                  placeholder="199012345678"
                  className="w-full h-10 rounded-md border border-input bg-white px-3 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40"
                />
                {errors.nic && <p className="text-xs text-red-600">{errors.nic.message}</p>}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <Button type="button" variant="outline" className="h-10" onClick={() => reset(defaults)}>
                Reset
              </Button>
              <Button
                type="submit"
                disabled={!isValid || submitting}
                className="h-10 bg-[#0E3A6F] hover:bg-[#0E3A6F]/90 text-white"
              >
                {submitting ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Saving…
                  </>
                ) : (
                  "Save changes"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
