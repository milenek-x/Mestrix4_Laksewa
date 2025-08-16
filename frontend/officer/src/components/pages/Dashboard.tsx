// Dashboard.tsx (or whatever your dashboard page file is named, e.g., src/app/dashboard/page.tsx)

import { SectionCards } from "../organisms/SectionCards";
import { useUser } from "@/components/context/UserContext"; // IMPORT useUser hook
import DashboardLayout from "../templates/DashboardLayout"; // IMPORT DashboardLayout

export default function Page() {
  // Use the useUser hook to get userId from the context
  const { userId } = useUser();

  console.log("User ID on Dashboard (from Context):", userId);

  return (
    // Wrap your page content with DashboardLayout
    <DashboardLayout>
      {/* This content will be passed as 'children' to DashboardLayout */}
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            {/* If SectionCards needs userId, you can pass it here too */}
            <SectionCards />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}