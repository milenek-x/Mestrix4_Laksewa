"use client"

import * as React from "react"

import {
  Camera,
  BarChart,
  LayoutDashboard,
  FileText,
  Layers,
  UserCircle,
  Bot,
  CalendarCheck, // Lucide equivalent for appointments
  MessageSquare, // Lucide equivalent for communication
  LogOut, // Import LogOut icon
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

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
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
  ],
  navClouds: [
    {
      title: "Capture",
      icon: Camera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: FileText,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: Bot,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Account",
      url: "/account",
      icon: UserCircle,
    },
    {
      title: "Log out",
      url: "/",
      icon: LogOut,
    },
  ],
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <Layers className="!size-5" />
                <span className="text-base font-semibold">ලක්seவா Gov.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}