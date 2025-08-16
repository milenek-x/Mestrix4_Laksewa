// app/settings/page.tsx

import DashboardLayout from "../templates/DashboardLayout";
import { DataTable } from "../organisms/DataTable";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext"; // Adjust the import path as necessary

// 1. Define your data and types based on API responses
type ServiceRequest = {
  id: string;
  serviceId: string;
  requestedById: string;
  status: string;
  submittedAt: string;
  completedAt: string | null;
};

type Service = {
  id: string;
  serviceName: string;
  description: string;
  requirements: string;
  processingTime: number;
  feeAmount: number;
  departmentId: string;
};

// Define the type for the combined data you want to display
type DisplayServiceRequest = {
  id: string;
  serviceName: string; // Renamed from 'service' for clarity based on API
  status: string;
  submittedAt: string;
  departmentId: string; // To allow filtering by department
};

// 2. Define your columns with explicit type assertion
const serviceRequestColumns: { key: keyof DisplayServiceRequest; header: string }[] = [
  { key: 'id', header: 'Service Request ID' },
  { key: 'serviceName', header: 'Service Name' },
  { key: 'status', header: 'Status' },
  { key: 'submittedAt', header: 'Submitted At' },
];

// 3. Define your actions with a typed parameter
const actions = [
  {
    label: 'View Details',
    onClick: (request: DisplayServiceRequest) => console.log(`Viewing details for service request: ${request.id}`),
  },
  // You can add more actions here if needed
];

export default function ReviewPage() {
  const [serviceRequests, setServiceRequests] = useState<DisplayServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- NEW: Get departmentId from UserContext ---
  const { userData } = useUser();
  const departmentIdFromUser = userData?.departmentId;
  // ----------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      // --- NEW: Check if departmentIdFromUser is available ---
      if (!departmentIdFromUser) {
        setLoading(false); // Stop loading if departmentId is not available
        setError("User department ID not found or not logged in.");
        return;
      }
      // -----------------------------------------------------

      try {
        const [serviceRequestsResponse, servicesResponse] = await Promise.all([
          fetch("http://localhost:5102/api/ServiceRequest"),
          fetch("http://localhost:5102/api/Service"),
        ]);

        if (!serviceRequestsResponse.ok) {
          throw new Error(`HTTP error! status: ${serviceRequestsResponse.status} from ServiceRequest`);
        }
        if (!servicesResponse.ok) {
          throw new Error(`HTTP error! status: ${servicesResponse.status} from Service`);
        }

        const serviceRequestsData: ServiceRequest[] = await serviceRequestsResponse.json();
        const servicesData: Service[] = await servicesResponse.json();

        // Create a map for quick lookup of service names and department IDs by serviceId
        const serviceMap = new Map<string, Service>();
        servicesData.forEach(service => {
          serviceMap.set(service.id, service);
        });

        // Combine service requests with service names and department IDs
        let combinedData: DisplayServiceRequest[] = serviceRequestsData.map(sr => {
          const service = serviceMap.get(sr.serviceId);
          return {
            id: sr.id,
            serviceName: service ? service.serviceName : 'Unknown Service',
            status: sr.status,
            submittedAt: new Date(sr.submittedAt).toLocaleString(), // Format date for display
            departmentId: service ? service.departmentId : 'Unknown Department', // Include departmentId for filtering
          };
        });

        // --- UPDATED: Filter service requests by the department ID from user context ---
        combinedData = combinedData.filter(request => request.departmentId === departmentIdFromUser);
        // -----------------------------------------------------------------------------

        setServiceRequests(combinedData);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    // --- UPDATED: Add departmentIdFromUser to the dependency array ---
    fetchData();
  }, [departmentIdFromUser]); // Re-run effect when the department ID from user context changes

  if (loading) {
    return <DashboardLayout>Loading service requests...</DashboardLayout>;
  }

  if (error) {
    return <DashboardLayout>Error: {error}</DashboardLayout>;
  }

  // Optional: Add a message if no service requests are found for the department
  if (serviceRequests.length === 0) {
    return (
      <DashboardLayout>
        <p>No service requests found for your department.</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DataTable
        data={serviceRequests}
        columns={serviceRequestColumns}
        actions={actions}
        itemsPerPage={10}
        label="Service Requests"
        filterableColumnKey="status"
      />
    </DashboardLayout>
  );
}