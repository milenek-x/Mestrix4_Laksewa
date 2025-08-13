// app/settings/page.tsx

import DashboardLayout from "../templates/DashboardLayout";
import { DataTable } from "../organisms/DataTable";

// 1. Define your data and types
type User = {
  id: string;
  citizenName: string;
  service: string; // This could represent the specific service requested if needed
  status: string; // New column for government service status
};

const users: User[] = [
  { id: '1', citizenName: 'John Doe', service: 'Passport Renewal', status: 'Pending Review' },
  { id: '2', citizenName: 'Jane Smith', service: 'Driver\'s License Application', status: 'Approved' },
  { id: '3', citizenName: 'Michael Brown', service: 'Birth Certificate Request', status: 'Processing' },
  { id: '4', citizenName: 'Emily White', service: 'Tax Filing Assistance', status: 'Completed' },
  { id: '100', citizenName: 'Zack Johnson', service: 'Property Deed Registration', status: 'On Hold' },
];

// 2. Define your columns with explicit type assertion
const userColumns: { key: keyof User; header: string }[] = [
  { key: 'id', header: 'Document No.' },
  { key: 'citizenName', header: 'Citizen Name' },
  { key: 'service', header: 'Service Type' }, // Renamed for clarity
  { key: 'status', header: 'Service Status' }, // New column
];

// 3. Define your actions with a typed parameter
const actions = [
  {
    label: 'View Documents',
    onClick: (user: User) => console.log(`Viewing documents for user: ${user.citizenName}`),
  },
  {
    label: 'Reject Request',
    onClick: (user: User) => console.log(`Rejecting documents for user: ${user.citizenName}`),
  },
  {
    label: 'Edit Documents',
    onClick: (user: User) => console.log(`Editing documents for user: ${user.citizenName}`),
  },
];

export default function ReviewPage() {
  return (
    <DashboardLayout>
      <DataTable
        data={users}
        columns={userColumns}
        actions={actions}
        itemsPerPage={10}
        label="Records"
        // Use the new prop to specify which column to filter by
        filterableColumnKey="status"
      />
    </DashboardLayout>
  );
}
