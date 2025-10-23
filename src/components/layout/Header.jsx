import { Button } from "@/components/ui/button";
import { Hotel, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = ({ isAuthenticated, userRole, onLogout }) => {
  const getDashboardRoute = () => {
    switch (userRole) {
      case 'guest': return '/guest/dashboard';
      case 'staff': return '/staff/dashboard';
      case 'management': return '/management/dashboard';
      case 'admin': return '/admin/dashboard';
      default: return '/';
    }
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Hotel className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">GuestHub</span>
        </Link>
        
        <nav className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to={getDashboardRoute()}>
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Button variant="ghost" onClick={onLogout} className="flex items-center space-x-2">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Link to="/auth/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/auth/register">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};