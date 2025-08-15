import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

/**
 * App shell used for all authenticated/inner pages.
 */
export default function MainLayout() {
  const sidebarWidth = 256; // 64 * 4 = 256px (w-64)
  return (
    <div>
      <Sidebar />
      <div
        className="min-h-screen bg-[#F5F7F9]"
        style={{ paddingLeft: sidebarWidth }}
      >
        <Header />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
