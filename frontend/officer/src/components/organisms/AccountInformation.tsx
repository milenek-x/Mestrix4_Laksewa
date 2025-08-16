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
  const [departmentName, setDepartmentName] = React.useState<string>("N/A"); // State to hold department name

  // Effect to fetch department name when userData or departmentId changes
  React.useEffect(() => {
    const fetchDepartmentName = async () => {
      if (userData?.departmentId) {
        try {
          const response = await fetch(`http://localhost:5102/api/Department/${userData.departmentId}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setDepartmentName(data.departmentName);
        } catch (error) {
          console.error('Error fetching department name:', error);
          setDepartmentName("N/A"); // Fallback on error
        }
      } else {
        setDepartmentName("N/A"); // If no departmentId
      }
    };

    fetchDepartmentName();
  }, [userData?.departmentId]); // Dependency array: re-run when departmentId changes

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
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-2xl font-bold">
            Account Information
          </CardTitle>
          <Button
            variant="outline"
            size="icon"
            onClick={handleEditAccount}
            aria-label="Edit Account Information"
            className="sm:px-4 sm:py-2 sm:h-auto"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="grid gap-6">
          {/* Changed grid layout for responsiveness */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <AccountField label="Full Name" value={fullName} />
            <AccountField label="Department" value={departmentName} />
            <AccountField label="Contact Number" value={userData.phoneNumber} />
            <AccountField
              label="Email Address"
              value={userData.email}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AccountInformation;