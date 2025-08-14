import { AppSidebar } from "../organisms/Sidebar"
import { SectionCards } from "../organisms/SectionCards"
import { SiteHeader } from "../organisms/SiteHeader"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { useUser } from '@/components/context/UserContext'; // IMPORT useUser hook

export default function Page() {
  // const location = useLocation(); // REMOVE this line
  // const userId = location.state?.userId; // REMOVE this line

  // Use the useUser hook to get userId from the context
  const { userId } = useUser();

  console.log("User ID on Dashboard (from Context):", userId);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      {/* Pass userId to AppSidebar from the context */}
      <AppSidebar variant="inset"/>
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* If SectionCards needs userId, you can pass it here too */}
              <SectionCards />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}