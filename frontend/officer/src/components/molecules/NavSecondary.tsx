// src/molecules/NavSecondary.tsx
"use client"

import * as React from "react"
import { type LucideIcon } from "lucide-react"
import { Link, useLocation } from "react-router-dom" // Import Link and useLocation
import { cn } from "@/lib/utils"; // Import cn for conditional classNames

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const location = useLocation() // Get the current location object

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent className="flex flex-col gap-2 bg-[#0E3A6F]"> {/* Applied background color here */}
        <SidebarMenu>
          {items.map((item) => {
            // Determine if the current item's URL matches the current location's pathname
            const isSelected = location.pathname === item.url

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  // Remove className from SidebarMenuButton if 'asChild' is used
                  // and apply it directly to the Link component below
                >
                  <Link
                    to={item.url}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-md transition-colors w-full",
                      "hover:bg-white/10",
                      isSelected ? "bg-white/10" : "bg-transparent"
                    )}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}