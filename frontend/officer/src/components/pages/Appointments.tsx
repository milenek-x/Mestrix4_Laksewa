// app/settings/page.tsx

import DashboardLayout from "../templates/DashboardLayout";
import { DataTable } from "../organisms/DataTable";

// 1. Define your data and types
type Appointment = {
  appointmentId: string;
  citizenName: string;
  officialName: string;
  department: string;
  date: string; // e.g., "YYYY-MM-DD"
  time: string; // e.g., "HH:MM AM/PM"
  purpose: string;
  status: 'Scheduled' | 'Completed' | 'Canceled' | 'Rescheduled'; // Enforce specific statuses
};

const appointments: Appointment[] = [
  {
    appointmentId: 'A001',
    citizenName: 'John Doe',
    officialName: 'Ms. Ranasinghe',
    department: 'Department of Immigration & Emigration',
    date: '2025-08-15',
    time: '10:00 AM',
    purpose: 'Passport Collection',
    status: 'Scheduled',
  },
  {
    appointmentId: 'A002',
    citizenName: 'Jane Smith',
    officialName: 'Mr. Perera',
    department: 'Ministry of Finance',
    date: '2025-08-15',
    time: '02:30 PM',
    purpose: 'Tax Consultation',
    status: 'Scheduled',
  },
  {
    appointmentId: 'A003',
    citizenName: 'Michael Brown',
    officialName: 'Dr. Silva',
    department: 'Ministry of Health',
    date: '2025-08-16',
    time: '09:00 AM',
    purpose: 'Medical Report Submission',
    status: 'Completed',
  },
  {
    appointmentId: 'A004',
    citizenName: 'Emily White',
    officialName: 'Mr. Fernando',
    department: 'Land Registry Office',
    date: '2025-08-16',
    time: '11:45 AM',
    purpose: 'Deed Verification',
    status: 'Rescheduled',
  },
  {
    appointmentId: 'A005',
    citizenName: 'Zack Johnson',
    officialName: 'Ms. Gunawardena',
    department: 'Department of Motor Traffic',
    date: '2025-08-17',
    time: '01:00 PM',
    purpose: 'Vehicle Registration',
    status: 'Scheduled',
  },
];

// 2. Define your columns with explicit type assertion
const appointmentColumns: { key: keyof Appointment; header: string }[] = [
  { key: 'appointmentId', header: 'Appointment No.' },
  { key: 'citizenName', header: 'Citizen Name' },
  { key: 'officialName', header: 'Official Name' },
  { key: 'department', header: 'Department' },
  { key: 'date', header: 'Date' },
  { key: 'time', header: 'Time' },
  { key: 'purpose', header: 'Purpose of Visit' },
  { key: 'status', header: 'Status' },
];
// 3. Define your actions with a typed parameter
const actions = [
  {
    label: 'Approve Appointment',
    onClick: (appointment: Appointment) => console.log(`Approving appointment for ${appointment.citizenName} with ${appointment.officialName}`),
  },
  {
    label: 'Reschedule Appointment',
    onClick: (appointment: Appointment) => console.log(`Rescheduling appointment for ${appointment.citizenName} with ${appointment.officialName}`),
  },
  {
    label: 'Cancel Appointment',
    onClick: (appointment: Appointment) => console.log(`Canceling appointment for ${appointment.citizenName} with ${appointment.officialName}`),
  },
];


export default function Page() {
  return (
    <DashboardLayout>
      <DataTable
        data={appointments}
        columns={appointmentColumns}
        actions={actions}
        itemsPerPage={10}
        label="Records"
        // Use the new prop to specify which column to filter by
        filterableColumnKey="status"
      />
    </DashboardLayout>
  );
}
