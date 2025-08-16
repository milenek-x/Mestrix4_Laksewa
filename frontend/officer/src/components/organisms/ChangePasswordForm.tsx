"use client";

 import * as React from "react";
 import { cn } from "@/lib/utils";
 import { Button } from "@/components/ui/button";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
 } from "@/components/ui/form";
 import { Input } from "@/components/ui/input"; // Assuming you use shadcn's Input
 import { useForm } from "react-hook-form";
 import { zodResolver } from "@hookform/resolvers/zod";
 import { ChangePasswordSchema, ChangePasswordFormValues } from "../schemas/auth-schemas"; // Adjust the import path as necessary

 /**
  * Props for the ChangePasswordForm organism component.
  */
 interface ChangePasswordFormProps extends React.ComponentPropsWithoutRef<"div"> {
  // Optional callback for when the password update form is submitted
  onSubmitPasswordChange?: (passwords: ChangePasswordFormValues) => void;
 }

 /**
  * ChangePasswordForm Organism: Displays a form for changing the user's password.
  * It integrates password input fields using shadcn/ui's Form components.
  *
  * @param {ChangePasswordFormProps} props - The component props.
  * @returns {JSX.Element} The rendered password change form card.
  */
 export function ChangePasswordForm({
  onSubmitPasswordChange,
  className,
  ...props
 }: ChangePasswordFormProps) {
  // 1. Define your form with React Hook Form and Zod resolver
  const form = useForm<ChangePasswordFormValues>({
   resolver: zodResolver(ChangePasswordSchema),
   defaultValues: {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
   },
  });

  // 2. Define a submit handler
  const onSubmit = (values: ChangePasswordFormValues) => {
   console.log("Change Password submitted!", values);

   if (onSubmitPasswordChange) {
    onSubmitPasswordChange(values);
   }

   // You can reset the form after successful submission if needed
   // form.reset();
  };

  return (
   <div className={cn("flex flex-col gap-6 w-full items-start", className)} {...props}>
    <Card className="w-full max-w-full">
     <CardHeader>
      <CardTitle className="text-2xl font-bold text-left">Change Password</CardTitle>
     </CardHeader>
     <CardContent>
      <Form {...form}> {/* Wrap your form with the shadcn Form context */}
       <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 w-full">
        {/* Current Password Field */}
        <FormField
         control={form.control}
         name="currentPassword"
         render={({ field }) => (
          <FormItem className="w-full">
           <FormLabel className="text-left">Current Password</FormLabel>
           <FormControl>
            <Input type="password" placeholder="Enter your current password" {...field} className="w-full" />
           </FormControl>
           <FormMessage />
          </FormItem>
         )}
        />

        {/* New Password Field */}
        <FormField
         control={form.control}
         name="newPassword"
         render={({ field }) => (
          <FormItem className="w-full">
           <FormLabel className="text-left">New Password</FormLabel>
           <FormControl>
            <Input type="password" placeholder="Enter your new password" {...field} className="w-full" />
           </FormControl>
           <FormMessage />
          </FormItem>
         )}
        />

        {/* Confirm New Password Field */}
        <FormField
         control={form.control}
         name="confirmNewPassword"
         render={({ field }) => (
          <FormItem className="w-full">
           <FormLabel className="text-left">Confirm New Password</FormLabel>
           <FormControl>
            <Input type="password" placeholder="Confirm your new password" {...field} className="w-full" />
           </FormControl>
           <FormMessage />
          </FormItem>
         )}
        />

        <Button type="submit" className="w-fit bg-[#0E3A6F] justify-start">
         Update Password
        </Button>
       </form>
      </Form>
     </CardContent>
    </Card>
   </div>
  );
 }

 export default ChangePasswordForm;