// src/pages/Analytics.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DepartmentAnalyticsTemplate from '../templates/DepartmentAnalyticsTemplate';
import DashboardLayout from '../templates/DashboardLayout';

interface Department {
  id: string;
  departmentName: string;
}

// Helper function to create a URL-friendly slug from the department name
const createSlug = (name: string): string => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
};

const Analytics = () => {
  const { type } = useParams();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    console.log("Current URL parameter 'type':", type);
    
    // Fetch department data dynamically from the API
    const fetchDepartments = async () => {
      try {
        const response = await fetch('http://localhost:5102/api/Department');
        if (!response.ok) {
          throw new Error('Failed to fetch departments');
        }
        const data: Department[] = await response.json();
        setDepartments(data);
        console.log("Successfully fetched departments:", data);
      } catch (err) {
        console.error('Error fetching departments:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, [type]);

  // Handle loading state
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full text-gray-600">
          <p>Loading departments...</p>
        </div>
      </DashboardLayout>
    );
  }

  // Handle error state
  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full text-red-500">
          <p>Error: Could not load department data. Please check the API.</p>
        </div>
      </DashboardLayout>
    );
  }

  // Find the department that matches the URL slug
  const selectedDepartment = departments.find(dept => {
    const slug = createSlug(dept.departmentName);
    // Check if the generated slug includes the URL parameter for a more flexible match
    console.log(`Checking department: ${dept.departmentName} (Slug: ${slug}) against URL type: ${type}`);
    return slug.includes(type || '');
  });

  console.log("Selected Department:", selectedDepartment);

  // If a department is found, render the analytics template with its ID and name
  if (selectedDepartment) {
    return <DepartmentAnalyticsTemplate departmentId={selectedDepartment.id} departmentName={selectedDepartment.departmentName} />;
  }

  // Default content to display if no specific analytics type is provided or found
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center h-full text-gray-600">
        <p className="text-xl font-semibold mb-4">📊 Select an Analytics Report</p>
        <p className="text-center">Please choose a department from the navigation to view its specific analytics dashboard.</p>
        {/* Dynamic links for quick navigation */}
        <div className="mt-6 space-x-4">
          {departments.map(dept => (
            <a key={dept.id} href={`/analytics/${createSlug(dept.departmentName)}`} className="text-blue-500 hover:underline">
              {dept.departmentName}
            </a>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
