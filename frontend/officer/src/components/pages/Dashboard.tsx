// src/components/pages/Dashboard.tsx
"use client"

import { useUser } from "@/components/context/UserContext";
import DashboardLayout from "../templates/DashboardLayout";
import { useState, useEffect } from "react";
// Assuming SectionCards is designed to display a single metric based on your current usage
import { SectionCards } from "../organisms/SectionCards"; // Renamed for clarity, assuming it displays a single card
import useDepartmentKPIs from '../context/departmentKPIs'; // Correct import for the custom hook


export default function Page() {
  const { userId, userData } = useUser(); // Get userData from context
  const [departmentName, setDepartmentName] = useState<string | null>(null);
  const [loadingDepartment, setLoadingDepartment] = useState(true);
  const [errorDepartment, setErrorDepartment] = useState(false);

  // Use the custom hook to get the KPIs for the user's department
  // This hook will handle fetching service requests and services,
  // and filtering based on userData.departmentId
  const departmentKPIsData = useDepartmentKPIs();

  console.log("User ID on Dashboard (from Context):", userId);
  console.log("Department KPIs Data:", departmentKPIsData); // Log the fetched KPIs

  useEffect(() => {
    // This effect is still useful for getting the department name to display in the header
    // and for the initial loading state, as useDepartmentKPIs depends on userData.
    // If userData is available, we can get the department name directly.
    if (userData && userData.departmentId) {
      const fetchDepartmentName = async () => {
        try {
          const departmentResponse = await fetch(`http://localhost:5102/api/department/${userData.departmentId}`);
          if (!departmentResponse.ok) {
            throw new Error(`HTTP error! status: ${departmentResponse.status}`);
          }
          const departmentData = await departmentResponse.json();
          setDepartmentName(departmentData.departmentName || "Unknown Department");
        } catch (error) {
          console.error("Error fetching department name:", error);
          setErrorDepartment(true);
          setDepartmentName("Error Loading Department");
        } finally {
          setLoadingDepartment(false);
        }
      };
      fetchDepartmentName();
    } else if (userId === null) {
      // If userId is explicitly null, means not logged in or no user data
      setLoadingDepartment(false);
      setDepartmentName(null); // No department to display
    }
  }, [userId, userData]); // Depend on userId and userData

  // The `departmentKPIsData` will now contain an array with either
  // one DepartmentKPI object (for the user's department) or be empty.
  const department = departmentKPIsData.length > 0 ? departmentKPIsData[0] : null;

  return (
    <DashboardLayout>
      <div className="p-4">
        {loadingDepartment ? (
          <p>Loading department dashboard...</p>
        ) : errorDepartment ? (
          <p className="text-red-500">Error loading department data. Please try again.</p>
        ) : !departmentName || departmentName === "No Department Found" || departmentName === "Unknown Department" ? (
          <p>No specific department dashboard available for your account or department name could not be determined.</p>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-6">
              {departmentName} Dashboard
            </h1>
            {department ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Iterate over the metrics object and render a SectionCard for each */}
                {Object.entries(department.metrics).map(([key, value]) => {
                  // Don't render 'trend' as a separate card unless you have a specific component for it
                  if (key === 'trend') return null;

                  // Format the key for display (e.g., "totalRequests" -> "Total Requests")
                  const formattedTitle = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

                  return (
                    <SectionCards
                      key={key}
                      title={formattedTitle}
                      value={value as number} // Ensure value is treated as a number
                    />
                  );
                })}
              </div>
            ) : (
              <p>No dashboard data available for {departmentName}.</p>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}