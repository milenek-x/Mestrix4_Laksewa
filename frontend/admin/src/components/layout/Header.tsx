import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-white border-b">
      <div className="h-14 flex items-center justify-end px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#0F1A47] hover:opacity-80"
        >
          <LogOut className="size-5" />
          <span className="font-medium">Logout</span>
        </Link>
      </div>
    </header>
  );
}
