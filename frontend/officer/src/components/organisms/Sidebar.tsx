"use client"

import * as React from "react"
// No longer need useEffect and useState here, as data is from context
// import { useEffect, useState } from "react"

import {
  BarChart,
  LayoutDashboard,
  FileText,
  UserCircle,
  CalendarCheck,
  MessageSquare,
  LogOut,
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

import { Separator } from "@/components/ui/separator"

// IMPORT YOUR CUSTOM LOGO
import Logo from '../../assets/Logo.png';

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

// ... (your navMainItems and navSecondaryItems remain unchanged)
const navMainItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Appointments",
    url: "/appointments",
    icon: CalendarCheck,
  },
  {
    title: "Review",
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
        avatar: "https://placehold.co/600x400?text=N/A",
      };
    }
    return defaultDisplayUser; // Display "Loading..." or placeholder
  }, [userData]); // Re-calculate when userData from context changes

  // You can still log if needed for debugging, but the logic relies on context
  console.log("AppSidebar re-rendered. Current user data state:", currentUserData);


  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/dashboard">
                <img
                  src={Logo}
                  alt="Laksewa Gov. Logo"
                  className="!size-7 object-contain mr-2"
                />
                <span className="text-base font-semibold">LakSewa Officer</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainItems} />
        <NavSecondary items={navSecondaryItems} className="mt-auto" />
      </SidebarContent>
      <Separator className="my-4" />
      <SidebarFooter>
        <NavUser user={currentUserData} />
      </SidebarFooter>
    </Sidebar>
  )
}