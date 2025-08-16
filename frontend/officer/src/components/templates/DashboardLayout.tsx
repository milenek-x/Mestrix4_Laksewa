// components/layouts/DashboardLayout.tsx
import { AppSidebar } from "@/components/organisms/Sidebar"; // Adjust path as needed
import { SiteHeader } from "@/components/organisms/SiteHeader"; // Adjust path as needed
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"; // Adjust path as needed
import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode; // This will hold the page-specific content
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset"/>
      <SidebarInset>
        <SiteHeader />
        <div className="flex-1 flex flex-col">
              {children} {/* This is where your page-specific content will be rendered */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}