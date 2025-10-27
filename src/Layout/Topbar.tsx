import { useAuth } from "../contexts/AuthContext";
import { Menu } from "lucide-react";

interface TopbarProps {
  onToggleSidebar: () => void;
}

export default function Topbar({ onToggleSidebar }: TopbarProps) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white border-b flex items-center justify-between px-4 md:px-6 py-4">
      <div className="flex items-center gap-3">
        {/* Tombol Sidebar Mobile */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 hover:bg-slate-100 rounded-lg"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-xl font-semibold text-slate-700 truncate">
          Halo, {user?.name || "Admin"}
        </h1>
      </div>

      <button
        onClick={logout}
        className="px-3 py-1 rounded-md hover:bg-slate-100 text-slate-700"
      >
        Logout
      </button>
    </header>
  );
}
