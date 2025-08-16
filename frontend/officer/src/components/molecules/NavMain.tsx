// src/molecules/NavMain.tsx
"use client"

import { type LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation
import { cn } from "@/lib/utils"; // Import cn for conditional classNames

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  const location = useLocation(); // Get the current location

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2 bg-[#0E3A6F]"> {/* Applied background color here */}
        <SidebarMenu>
          {items.map((item) => {
            // Determine if the current item is active
            const isSelected = location.pathname === item.url;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                >
                  <Link
                    to={item.url}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-md transition-colors w-full",
                      "hover:bg-white/10 hover:text-white",
                      isSelected ? "bg-white/10" : "bg-transparent"
                    )}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}