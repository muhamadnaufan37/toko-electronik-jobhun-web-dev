import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const NavItem: React.FC<{ to: string; children: React.ReactNode }> = ({
  to,
  children,
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-4 py-2 rounded-lg mb-1 text-sm font-medium transition-colors ${
        isActive
          ? "bg-indigo-600 text-white"
          : "text-slate-700 hover:bg-indigo-50"
      }`
    }
  >
    {children}
  </NavLink>
);

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* Sidebar Desktop */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r z-40 hidden md:flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-indigo-600">TOKO ALIM RUGI</h2>
          <p className="text-xs text-slate-500 mt-1">Dashboard panel</p>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <NavItem to="/">Dashboard</NavItem>
          <NavItem to="/products">Produk</NavItem>
        </nav>
      </aside>

      {/* Sidebar Mobile */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            {/* Drawer */}
            <motion.aside
              className="fixed inset-y-0 left-0 w-64 bg-white z-50 shadow-lg flex flex-col md:hidden"
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "spring", stiffness: 250, damping: 30 }}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-bold text-indigo-600">
                  Admin Elektronik
                </h2>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-slate-100 rounded"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-4">
                <NavItem to="/">Dashboard</NavItem>
                <NavItem to="/products">Produk</NavItem>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
