"use client"

import * as React from "react"
import {
  Camera,           // Lucide equivalent for IconCamera
  BarChart,         // Lucide equivalent for IconChartBar
  LayoutDashboard,  // Lucide equivalent for IconDashboard
  Database,         // Lucide equivalent for IconDatabase
  FileText,         // Lucide equivalent for IconFileDescription (often used for docs)
  FilePenLine,      // Lucide equivalent for IconFileWord (could also be FileEdit or FileText)
  Folder,           // Lucide equivalent for IconFolder
  HelpCircle,       // Lucide equivalent for IconHelp
  Layers,           // Lucide equivalent for IconInnerShadowTop (or SquareStack, depending on desired visual)
  List,             // Lucide equivalent for IconListDetails
  FileWarning,      // Lucide equivalent for IconReport (or FileBarChart)
  Search,           // Lucide equivalent for IconSearch
  Settings,         // Lucide equivalent for IconSettings
  Users,            // Lucide equivalent for IconUsers
  Bot,              // Lucide equivalent for IconFileAi (Bot is a common AI icon)
} from "lucide-react"

import { NavDocuments } from "../molecules/NavDocuments"
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
      url: "#",
      icon: LayoutDashboard, // Changed to Lucide icon
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: List, // Changed to Lucide icon
    },
    {
      title: "Analytics",
      url: "#",
      icon: BarChart, // Changed to Lucide icon
    },
    {
      title: "Projects",
      url: "#",
      icon: Folder, // Changed to Lucide icon
    },
    {
      title: "Team",
      url: "#",
      icon: Users, // Changed to Lucide icon
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: Camera, // Changed to Lucide icon
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
      icon: FileText, // Changed to Lucide icon
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
      icon: Bot, // Changed to Lucide icon (Bot is a good fit for AI)
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
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Settings, // Changed to Lucide icon
    },
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircle, // Changed to Lucide icon
    },
    {
      title: "Search",
      url: "#",
      icon: Search, // Changed to Lucide icon
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: Database, // Changed to Lucide icon
    },
    {
      name: "Reports",
      url: "#",
      icon: FileWarning, // Changed to Lucide icon (FileWarning or FileBarChart for reports)
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: FilePenLine, // Changed to Lucide icon (FilePenLine or FileText for word docs)
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
                <Layers className="!size-5" /> {/* Changed to Lucide icon (Layers is a good alternative for InnerShadowTop) */}
                <span className="text-base font-semibold">LakSewa Gov.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* These components are already updated in previous responses to use Lucide icons internally */}
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}