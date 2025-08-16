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
    <Button
      asChild
      variant="ghost"
      onClick={onClick}
    >
      {/* For basic anchor or replace with router Link */}
      <a
        href={to}
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-md transition-colors w-full", // Added w-full here for full width
          "hover:bg-white/10",
          isActive ? "bg-white/10" : "bg-transparent"
        )}
      >
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