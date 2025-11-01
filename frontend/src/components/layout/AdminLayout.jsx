import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Calendar, DoorOpen, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export const AdminLayout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Bookings",
      href: "/admin/bookings",
      icon: Calendar,
    },
    {
      title: "Rooms",
      href: "/admin/rooms",
      icon: DoorOpen,
    },
    {
      title: "Staff",
      href: "/admin/staff",
      icon: Users,
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border">
        <div className="p-6">
          <h2 className="text-lg font-bold text-foreground">Admin Panel</h2>
          <p className="text-sm text-muted-foreground">Management Tools</p>
        </div>
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};
