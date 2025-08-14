// components/organisms/AccountInformation.jsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AccountField from "@/components/molecules/AccountField"; // Ensure this path is correct
import { Pencil } from "lucide-react"; // Import the Pencil icon from lucide-react
import { useUser } from "../context/UserContext";

/**
 * Defines the structure for a user's account data.
 */
export interface AccountData {
  fullName: string;
  position: string;
  division: string;
  department: string;
  employeeId: string;
  contactNumber: string;
  email: string;
}

/**
 * Props for the AccountInformation organism component.
 */
interface AccountInformationProps extends React.ComponentPropsWithoutRef<"div"> {
  profileData: AccountData; // The data to display
  onEditAccount?: () => void; // Optional callback for when the "Edit Account" button is clicked
}

/**
 * AccountInformation Organism: Displays a user's account details within a card.
 * It integrates a header with a responsive edit button (text on larger screens, icon on small)
 * and a structured grid of account fields.
 *
 * @param {AccountInformationProps} props - The component props.
 * @returns {JSX.Element} The rendered account information card.
 */
export function AccountInformation({
  onEditAccount,
  className,
  ...props
}: AccountInformationProps) {

  const { userData } = useUser();

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading account information...</p>
      </div>
    );
  }

  const handleEditAccount = React.useCallback(() => {
    console.log("Edit Account button clicked!");
    if (onEditAccount) {
      onEditAccount(); // Call the prop function if provided
    }
  }, [onEditAccount]);

  const fullName = `${userData.firstName} ${userData.lastName}`;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-full"> {/* Card now always takes the available width */}
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-2xl font-bold">
            Account Information
          </CardTitle>
          <Button
            variant="outline"
            size="icon" // Default to icon size for smaller screens
            onClick={handleEditAccount}
            aria-label="Edit Account Information"
            className="sm:px-4 sm:py-2 sm:h-auto" // Adjust padding for larger screens to fit text
          >
            {/* Pencil icon will now always be visible */}
            <Pencil className="h-4 w-4" /> 
            {/* The text "Edit Account" will no longer be displayed */}
            {/* <span className="hidden sm:inline">Edit Account</span> */}
          </Button>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
             <AccountField label="Employee ID" value={userData.id} />
            <AccountField label="Full Name" value={fullName} />
            {/* These fields are not in the API response, so we'll use placeholders for now */}
            <AccountField label="Position" value="N/A" />
            <AccountField label="Division" value="N/A" />
            <AccountField label="Department" value="N/A" />
            <AccountField label="Contact Number" value={userData.phoneNumber} />
            <AccountField
              label="Email Address"
              value={userData.email}
              className="col-span-1 sm:col-span-2 lg:col-span-3"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AccountInformation;