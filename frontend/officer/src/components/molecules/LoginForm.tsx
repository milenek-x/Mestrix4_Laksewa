"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom"; // Assuming you've set up react-router-dom
import { Loader2Icon } from "lucide-react";
import Logo from '../../assets/Logo.png';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    if (!identifier) {
      toast.error("Please enter your username or email.");
      setIsLoading(false);
      return;
    }

    if (!password) {
      toast.error("Please enter your password.");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Sending request body:", JSON.stringify({ UsernameOrEmail: identifier, Password: password }));
      console.log("To URL:", "http://localhost:5102/api/User/authenticate");
      const response = await fetch("http://localhost:5102/api/User/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UsernameOrEmail: identifier,
          Password: password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Login successful! Redirecting...");
        console.log("Login successful:", result);
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Invalid username/email or password.");
        console.error("Login failed:", errorData);
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          {/* Add the logo image here */}
          <img
            src={Logo}
            alt="LakSewa Logo"
            className="mx-auto h-24 w-24 object-contain mb-4" // Tailwind classes for centering, size, and bottom margin
          />
          <CardTitle className="text-center text-app-login">Officer Login</CardTitle>
        </CardHeader>
        <CardContent className="">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-start gap-3"> {/* Use flex column to stack label and input, center horizontally */}
                <Label htmlFor="identifier" className="text-center">Username/Email</Label> {/* Ensure label text is centered */}
                <Input
                  id="identifier"
                  type="text"
                  placeholder="m@example.com or username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  disabled={isLoading}
                  className="w-full max-w-xs" // Input takes full width of its constrained container, centered by parent flex
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button variant="login" type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}