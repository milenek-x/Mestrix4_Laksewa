// app/settings/page.tsx
import DashboardLayout from "../templates/DashboardLayout";
import { CommunicationModule } from "../organisms/CommunicationModule";

export default function Page() {
  return (
    <DashboardLayout>
      <CommunicationModule/>
    </DashboardLayout>
  );
}