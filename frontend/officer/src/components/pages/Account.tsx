// app/settings/page.tsx
import DashboardLayout from "../templates/DashboardLayout";
import AccountInformation from "../organisms/AccountInformation"; // Your existing component
import ChangePasswordForm from "../organisms/ChangePasswordForm"; // Import the new organism

// Import the Zod inferred type for your form values
import { ChangePasswordFormValues } from "../schemas/auth-schemas";

export default function Page() {
  // Example profile data (replace with actual data fetching)
  const userProfile = {
    fullName: "Jane Doe",
    position: "Senior Analyst",
    division: "Planning & Policy",
    department: "Immigration & Emigration",
    employeeId: "LK-2024-JD-54321",
    contactNumber: "+94 11 234 5678",
    email: "jane.doe@gov.lk",
  };

  const handleProfileEdit = () => {
    console.log("Profile Edit requested!");
    // Logic to open profile edit form/modal
  };

  // 1. **FIX HERE:** Update the type of the 'passwords' parameter
  const handleChangePassword = (passwords: ChangePasswordFormValues) => {
    console.log("Password change request received:", passwords);
    // Here you would typically send an API request to update the password
    // Handle success/failure (e.g., show a toast notification)
    // Example:
    // fetch('/api/change-password', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(passwords),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   if (data.success) {
    //     alert('Password changed successfully!');
    //   } else {
    //     alert('Failed to change password: ' + data.message);
    //   }
    // })
    // .catch(error => {
    //   console.error('Error changing password:', error);
    //   alert('An error occurred while changing password.');
    // });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 p-4 md:p-6">
        <AccountInformation
          profileData={userProfile}
          onEditAccount={handleProfileEdit}
          className="mx-auto w-full"
        />
        <ChangePasswordForm
          onSubmitPasswordChange={handleChangePassword} // This will now match the expected type
          className="mx-auto w-full"
        />
      </div>
    </DashboardLayout>
  );
}