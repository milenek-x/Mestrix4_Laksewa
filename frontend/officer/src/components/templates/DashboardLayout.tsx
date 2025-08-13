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
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col gap-2"> {/* Removed @container/main for broader applicability, add if specific pages need it */}
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {children} {/* This is where your page-specific content will be rendered */}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}