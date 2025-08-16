// src/molecules/NavMain.tsx
"use client"

import { useState, useEffect, useCallback } from "react"; // Import useEffect and useCallback
import { type LucideIcon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useUser } from '@/components/context/UserContext';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
}

interface Department {
  id: string;
  departmentName: string;
  description: string;
  address: string;
  headOfDepartmentId: string | null;
}

export function NavMain({
  items,
}: {
  items: NavItem[];
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = useUser();
  const [userDepartmentName, setUserDepartmentName] = useState<string | null>(null);
  const [loadingDepartment, setLoadingDepartment] = useState<boolean>(true); // Track loading state

  // Function to convert department name to URL slug
  // This needs to match the `case` values in Analytics.tsx
  const getDepartmentSlug = (departmentName: string): string | null => {
    switch (departmentName) {
      case "Department of Motor Traffic":
        return "motor-traffic";
      case "Department of Immigration and Emigration": // Ensure exact match
        return "immigration";
      case "Registrar General's Department":
        return "registrar-general";
      case "Election Commission of Sri Lanka":
        return "election-commission";
      // Add more cases for other departments as needed
      default:
        return null; // For unrecognized department names
    }
  };

  // Effect to fetch department name when userData.departmentId changes
  useEffect(() => {
    const fetchDepartmentName = async () => {
      if (userData?.departmentId) {
        setLoadingDepartment(true);
        try {
          const response = await fetch(`http://localhost:5102/api/Department/${userData.departmentId}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data: Department = await response.json();
          setUserDepartmentName(data.departmentName);
        } catch (error) {
          console.error("Error fetching department name:", error);
          setUserDepartmentName(null); // Clear on error
        } finally {
          setLoadingDepartment(false);
        }
      } else {
        setUserDepartmentName(null);
        setLoadingDepartment(false);
      }
    };

    fetchDepartmentName();
  }, [userData?.departmentId]); // Re-run when departmentId changes


  const handleAnalyticsClick = useCallback(() => {
    if (loadingDepartment) {
      // Optionally show a loading spinner or disable the button
      console.log("Department data still loading, please wait...");
      return;
    }

    if (userDepartmentName) {
      const slug = getDepartmentSlug(userDepartmentName);
      if (slug) {
        navigate(`/analytics/${slug}`);
      } else {
        console.warn(`Unrecognized department name: ${userDepartmentName}. Navigating to general analytics.`);
        navigate("/analytics");
      }
    } else {
      console.log("No specific department found for user, navigating to general analytics.");
      navigate("/analytics");
    }
  }, [loadingDepartment, userDepartmentName, navigate]); // Dependencies for useCallback

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2 bg-[#0E3A6F]">
        <SidebarMenu>
          {items.map((item) => {
            // Determine if the current item is active
            // For analytics, we check if the path starts with /analytics
            // For other items, we check for exact path match
            const isSelected = item.title === "Analytics"
              ? location.pathname.startsWith('/analytics')
              : location.pathname === item.url;

            return (
              <SidebarMenuItem key={item.title}>
                {item.title === "Analytics" ? (
                  <SidebarMenuButton
                    onClick={handleAnalyticsClick}
                    tooltip={item.title}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-md transition-colors w-full",
                      "hover:bg-white/10 hover:text-white",
                      isSelected ? "bg-white/10" : "bg-transparent",
                      loadingDepartment ? "opacity-50 cursor-not-allowed" : "" // Disable if loading
                    )}
                    disabled={loadingDepartment} // Disable button while loading
                  >
                    {item.icon && <item.icon />}
                    <span>{loadingDepartment ? "Analytics" : item.title}</span>
                  </SidebarMenuButton>
                ) : (
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                  >
                    <Link
                      to={item.url}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-md transition-colors w-full",
                        "hover:bg-white/10 hover:text-white",
                        isSelected ? "bg-white/10" : "bg-transparent",
                        "text-white"
                      )}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}