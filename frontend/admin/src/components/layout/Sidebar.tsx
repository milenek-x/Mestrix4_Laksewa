import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  Handshake,
  Settings,
} from "lucide-react";
import logo from "@/assets/logo-h.png";

const nav = [
  { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/users", label: "User Management", icon: Users },
  { to: "/app/departments", label: "Department Management", icon: Building2 },
  { to: "/app/services", label: "Service Management", icon: Handshake },
  { to: "/app/settings", label: "Setting", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside
      className="fixed inset-y-0 left-0 w-64 bg-[#0E3A6F] text-white flex flex-col justify-between"
      aria-label="Sidebar"
    >
      <nav className="mt-4">
        <ul className="px-2">
          {nav.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
                    "hover:bg-white/10",
                    isActive ? "bg-white/10" : "bg-transparent",
                  ].join(" ")
                }
              >
                <Icon className="size-5" />
                <span className="font-medium">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Brand at bottom */}
      <div className="px-4 py-6 flex items-center gap-3 opacity-90">
        <img src={logo} alt="Laksewa" className="h-8 w-8 object-contain" />
        <span className="text-xl font-semibold tracking-wide">LAKSEWA</span>
      </div>
    </aside>
  );
}
