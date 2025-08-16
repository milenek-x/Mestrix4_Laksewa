// src/templates/DepartmentAnalyticsTemplate.tsx
import React, { useState, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useUser } from "../context/UserContext";

// Define types for API responses
interface ServiceRequest {
  id: string;
  serviceId: string;
  requestedById: string;
  status: string;
  submittedAt: string;
  completedAt: string | null;
}

interface Service {
  id: string;
  serviceName: string;
  description: string;
  requirements: string;
  processingTime: number;
  feeAmount: number;
  departmentId: string;
}

// Data structure for the chart
interface ChartData {
  Service: string;
  Requests: number;
}

const chartConfig = {
  Requests: {
    label: "Service Requests",
    color: "#0E3A6F",
  },
} satisfies ChartConfig;

interface DepartmentAnalyticsTemplateProps {
  departmentId: string;
  departmentName: string; // The department name is now passed as a prop
}

// Main component for the analytics page
const DepartmentAnalyticsTemplate: React.FC<DepartmentAnalyticsTemplateProps> = ({ departmentId, departmentName }) => {
  const { userData } = useUser();
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setLoading(true);
      setError(false);

      // Ensure userData is available
      if (!userData) {
        setLoading(false);
        setError(true);
        return;
      }

      // Authorization check: User's departmentId must match the departmentId for the analytics being viewed
      if (userData.departmentId !== departmentId) {
        setLoading(false);
        setError(true); // Not authorized
        console.warn(`User is not authorized to view analytics for department: ${departmentName}.`);
        return;
      }

      try {
        // Fetch Services to get names and department associations
        const servicesResponse = await fetch('http://localhost:5102/api/Service');
        if (!servicesResponse.ok) throw new Error('Failed to fetch services');
        const services: Service[] = await servicesResponse.json();

        // Filter services belonging to the current departmentId
        const departmentServices = services.filter(service => service.departmentId === departmentId);
        const departmentServiceIds = new Set(departmentServices.map(s => s.id));
        const serviceMap = new Map<string, string>(); // Map serviceId to serviceName
        departmentServices.forEach(s => serviceMap.set(s.id, s.serviceName));

        // Fetch Service Requests
        const serviceRequestsResponse = await fetch('http://localhost:5102/api/ServiceRequest');
        if (!serviceRequestsResponse.ok) throw new Error('Failed to fetch service requests');
        const serviceRequests: ServiceRequest[] = await serviceRequestsResponse.json();

        // Filter service requests for the current department
        const filteredDepartmentRequests = serviceRequests.filter(request =>
          departmentServiceIds.has(request.serviceId)
        );

        // Aggregate requests by service name
        const serviceRequestCounts: { [key: string]: number } = {};
        filteredDepartmentRequests.forEach(request => {
          const serviceName = serviceMap.get(request.serviceId);
          if (serviceName) {
            serviceRequestCounts[serviceName] = (serviceRequestCounts[serviceName] || 0) + 1;
          }
        });

        // Prepare data for the chart dynamically based on available services
        const chartData: ChartData[] = departmentServices.map(service => ({
          Service: service.serviceName,
          Requests: serviceRequestCounts[service.serviceName] || 0,
        }));

        setData(chartData);

      } catch (err) {
        console.error("Error fetching analytics data:", err);
        setError(true);
        setData([]); // Clear data on error
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [departmentId, userData]); // Re-run when departmentId or userData changes

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[300px]">
          <p>Loading analytics data...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[300px] text-red-500">
          <p>Error loading analytics data or you are not authorized to view analytics for {departmentName}.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">{departmentName} Analytics</h2>
      <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="Service"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            angle={-45}
            textAnchor="end"
            interval={0}
          />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="Requests" fill="var(--color-Requests)" radius={4} />
        </BarChart>
      </ChartContainer>
    </DashboardLayout>
  );
};

export default DepartmentAnalyticsTemplate;
