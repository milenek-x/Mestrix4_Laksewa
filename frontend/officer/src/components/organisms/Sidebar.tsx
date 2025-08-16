"use client"

import * as React from "react"

import {
  BarChart,
  LayoutDashboard,
  FileText,
  UserCircle,
  CalendarCheck,
  MessageSquare,
  LogOut,
  Building2,
} from "lucide-react"

import { NavMain } from "../molecules/NavMain"
import { NavSecondary } from "../molecules/NavSecondary"
import { NavUser } from "../molecules/NavUser"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


// IMPORT YOUR CUSTOM LOGO
import LogoWhite from '../../assets/Logo-White.png'

// Import Link from react-router-dom
import { Link } from "react-router-dom";

// IMPORT useUser from your context
import { useUser } from '@/components/context/UserContext';


// Define a default user for display before context data is loaded or if there's an error
const defaultDisplayUser = {
  name: "Loading...",
  email: "",
  avatar: "/avatars/placeholder.jpg",
};

const navMainItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  // {
  //   title: "Appointments",
  //   url: "/appointments",
  //   icon: CalendarCheck,
  // },
  {
    title: "Service Requests",
    url: "/review",
    icon: FileText,
  },
  {
    title: "Communication",
    url: "/communication",
    icon: MessageSquare,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart,
    subItems: [
      {
        title: "Motor Traffic",
        url: "/analytics/motor-traffic",
        icon: Building2, // Example icon for a department
      },
      {
        title: "Immigration & Emigration",
        url: "/analytics/immigration",
        icon: Building2,
      },
      {
        title: "Registrar General",
        url: "/analytics/registrar-general",
        icon: Building2,
      },
      {
        title: "Election Commission",
        url: "/analytics/election-commission",
        icon: Building2,
      },
    ],
  },
];


const navSecondaryItems = [
  {
    title: "Account",
    url: "/account",
    icon: UserCircle,
  },
  {
    title: "Log out",
    url: "/", // Assuming / is the logout or home page
    icon: LogOut,
  },
];


// Remove userId from props as it will be consumed from context directly
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Get userData directly from the UserContext
  const { userData } = useUser();

  // Create the user object for NavUser based on fetched data or default
  const currentUserData = React.useMemo(() => {
    if (userData) {
      return {
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        avatar: "https://placehold.co/600x400/0E3A6F/0E3A6F?text=ME",
      };
    }
    return defaultDisplayUser; // Display "Loading..." or placeholder
  }, [userData]); // Re-calculate when userData from context changes

  // You can still log if needed for debugging, but the logic relies on context
  console.log("AppSidebar re-rendered. Current user data state:", currentUserData);


  return (
    <Sidebar
      collapsible="offcanvas"
      className="bg-[#0E3A6F] text-white"
      {...props}
    >
      <SidebarHeader className="bg-[#0E3A6F]">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 h-auto"
            >
              <Link to="/dashboard" className="hover:bg-transparent active:bg-transparent">
                <img
                  src={LogoWhite}
                  alt="Laksewa Gov. Logo"
                  className="w-auto h-20 object-contain mr-2"
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-[#0E3A6F]">
        <NavMain items={navMainItems} />
        <NavSecondary items={navSecondaryItems} className="mt-auto" />
      </SidebarContent>
      {/* <Separator className="my-4 bg-red-500" /> */}
      <SidebarFooter className="bg-[#0E3A6F]">
        <NavUser user={currentUserData} />
      </SidebarFooter>
    </Sidebar>
  )
}