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
import { useNavigate } from "react-router-dom";
import { Loader2Icon } from "lucide-react";
import Logo from '../../assets/Logo.png';

// Import the useUser hook from your context
import { useUser } from '@/components/context/UserContext';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserId } = useUser(); // Get the setUserId function from the context

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
      const authResponse = await fetch("http://localhost:5102/api/User/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UsernameOrEmail: identifier,
          Password: password,
        }),
      });

      if (authResponse.ok) {
        const authResult = await authResponse.json();
        console.log("Login successful:", authResult);

        const userId = authResult.userId;
        const roleId = authResult.roleId; // Get roleId from authentication response

        if (!roleId) {
          toast.error("Role information is missing. Please contact support.");
          setIsLoading(false);
          return;
        }

        // Fetch role details
        const roleResponse = await fetch(`http://localhost:5102/api/Role/${roleId}`);
        if (roleResponse.ok) {
          const roleData = await roleResponse.json();
          const roleName = roleData.roleName; // Assuming the role API returns 'roleName'

          if (roleName === "Department Head") {
            toast.success("Login successful! Redirecting...");
            setUserId(userId);
            navigate("/dashboard");
          } else {
            toast.error("Access denied. Only Department Heads can log in here.");
          }
        } else {
          toast.error("Failed to retrieve role information. Please try again.");
          console.error("Failed to fetch role:", roleResponse.statusText);
        }
      } else {
        const errorData = await authResponse.json();
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
          <img
            src={Logo}
            alt="LakSewa Logo"
            className="mx-auto h-24 w-24 object-contain mb-4"
          />
          <CardTitle className="text-center text-app-login">Officer Login</CardTitle>
        </CardHeader>
        <CardContent className="">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-start gap-3">
                <Label htmlFor="identifier" className="text-center">Username or Email</Label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="Enter your username or email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  disabled={isLoading}
                  className="w-full max-w-xs"
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  < Button
                    type="button"
                    variant="link"
                    onClick={() => navigate('/forgot-password')}
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot Password?
                  </Button>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  placeholder="Enter your password"
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