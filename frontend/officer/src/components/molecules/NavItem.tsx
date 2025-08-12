// src/components/molecules/NavItem.tsx
import React from 'react';
import { Button } from '@/components/ui/button'; // Adjust import path
import { Badge } from '@/components/ui/badge';   // Adjust import path
import { cn } from '@/lib/utils'; // For conditional classNames

interface NavItemProps {
  label: string;
  icon: React.ReactNode;
  to: string; // For routing
  isActive: boolean;
  notificationCount?: number;
  onClick?: () => void; // Optional click handler
}

export const NavItem: React.FC<NavItemProps> = ({
  label,
  icon,
  to,
  isActive,
  notificationCount,
  onClick,
}) => {
  return (
    // Use Button as a link, with appropriate styling based on 'isActive'
    <Button
      asChild // Renders as its child, assuming a Router Link component
      variant="ghost" // Or a custom variant for sidebar items
      className={cn(
        "w-full justify-start gap-3 py-2 px-4 rounded-lg",
        "hover:bg-primary/10 transition-colors duration-200",
        isActive ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-muted-foreground"
      )}
      onClick={onClick}
    >
      {/* If using a router link, it would wrap the content inside Button */}
      {/* Example with Next.js Link: <Link href={to}>...</Link> */}
      <a href={to} className="flex items-center w-full"> {/* For basic anchor or replace with router Link */}
        {icon}
        <span className="flex-grow text-left">{label}</span>
        {notificationCount && (
          <Badge variant="secondary" className="ml-auto">
            {notificationCount}
          </Badge>
        )}
      </a>
    </Button>
  );
};