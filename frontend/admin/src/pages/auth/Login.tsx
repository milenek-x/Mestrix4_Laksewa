// src/pages/auth/Login.tsx
import { useState, useContext } from "react"; // Add useContext
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User2, Lock, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// Your shadcn-style components that already exist in your repo
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import logo from "@/assets/laksewa-logo.png";

// Import AuthContext
import { AuthContext } from "@/context/AuthContext"; // Adjust the path as per your file structure

// ---- Validation schema ----
const LoginSchema = z.object({
  identity: z.string().min(1, "Please enter your username or email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  remember: z.boolean().optional(),
});

// ---- Types ----
type LoginForm = z.infer<typeof LoginSchema>;

export default function Login() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Consume AuthContext
  const { setUserId } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(LoginSchema) });

  const onSubmit = async (data: LoginForm) => {
    setSubmitting(true);
    setLoginError(null);
    try {
      const response = await fetch("http://localhost:5102/api/User/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UsernameOrEmail: data.identity,
          Password: data.password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Login successful:", result);

        const userId = result.userId;
        // Set userId in the AuthContext
        setUserId(userId);
        // Optionally, store the token and userId in localStorage for persistence across browser sessions
        localStorage.setItem("authToken", result.token);
        localStorage.setItem("userId", userId);

        navigate("/app");
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || "Invalid username/email or password.";
        setLoginError(errorMessage);
        console.error("Login failed:", errorMessage);
      }
    } catch (err) {
      setLoginError("An unexpected error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen grid place-items-center bg-[#F5F7F9] p-4">
      <Card className="w-full max-w-md rounded-2xl shadow-lg">
        <CardHeader className="items-center space-y-4">
          <img src={logo} alt="Laksewa" className="h-30 w-30 object-contain" />
          <div className="text-center">
            <CardTitle className="text-2xl mt-1">LOGIN</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="identity">
                Username or email
              </label>
              <div className="relative">
                <User2 className="absolute left-3 top-1/2 -translate-y-1/2 size-4 opacity-60" />
                <input
                  id="identity"
                  type="text"
                  autoComplete="username"
                  {...register("identity")}
                  className="w-full rounded-md border border-input bg-white pl-10 pr-3 h-10 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40"
                  placeholder="Username or email"
                />
              </div>
              {errors.identity && (
                <p className="text-xs text-red-600">{errors.identity.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 opacity-60" />
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  {...register("password")}
                  className="w-full rounded-md border border-input bg-white pl-10 pr-3 h-10 text-sm outline-none focus:ring-4 focus:outline-1 ring-[#78ACF1]/20 outline-[#78ACF1]/40"
                  placeholder="Password"
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" className="size-4" {...register("remember")} />
                Remember me
              </label>

              <Link to="/forgot-password" className="text-[#231F44] hover:underline">
                Forget Password?
              </Link>
            </div>

            {loginError && (
              <p className="text-sm text-red-600 text-center">{loginError}</p>
            )}

            <Button
              type="submit"
              disabled={submitting}
              className="w-full h-11 rounded-lg bg-[#007EED] hover:bg-[#007EED]/90 text-white"
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}