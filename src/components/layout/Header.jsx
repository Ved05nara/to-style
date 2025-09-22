import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Hotel, 
  Menu, 
  X, 
  User, 
  Settings, 
  LogOut,
  Calendar,
  Users,
  BarChart3
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export const Header = ({ isAuthenticated = false, userRole = null, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const getDashboardPath = () => {
    switch (userRole) {
      case 'guest': return '/guest/dashboard';
      case 'staff': return '/staff/dashboard';
      case 'management': return '/management/dashboard';
      default: return '/';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Hotel className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold bg-gradient-luxury bg-clip-text text-transparent">
            GuestHub
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <Button
                variant="ghost"
                onClick={() => handleNavigation(getDashboardPath())}
                className="text-muted-foreground hover:text-foreground"
              >
                Dashboard
              </Button>
              
              {userRole === 'guest' && (
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation('/guest/bookings')}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  My Bookings
                </Button>
              )}
              
              {(userRole === 'staff' || userRole === 'management') && (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => handleNavigation('/staff/tasks')}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Tasks
                  </Button>
                  
                  {userRole === 'management' && (
                    <Button
                      variant="ghost"
                      onClick={() => handleNavigation('/management/analytics')}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Analytics
                    </Button>
                  )}
                </>
              )}

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem onClick={() => handleNavigation('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigation('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => handleNavigation('/auth/login')}
              >
                Sign In
              </Button>
              <Button
                variant="luxury"
                onClick={() => handleNavigation('/auth/register')}
              >
                Get Started
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 space-y-2">
            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleNavigation(getDashboardPath())}
                >
                  Dashboard
                </Button>
                
                {userRole === 'guest' && (
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleNavigation('/guest/bookings')}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    My Bookings
                  </Button>
                )}
                
                {(userRole === 'staff' || userRole === 'management') && (
                  <>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => handleNavigation('/staff/tasks')}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Tasks
                    </Button>
                    
                    {userRole === 'management' && (
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => handleNavigation('/management/analytics')}
                      >
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Analytics
                      </Button>
                    )}
                  </>
                )}
                
                <div className="border-t pt-2 mt-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleNavigation('/profile')}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleNavigation('/settings')}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-destructive"
                    onClick={onLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleNavigation('/auth/login')}
                >
                  Sign In
                </Button>
                <Button
                  variant="luxury"
                  className="w-full"
                  onClick={() => handleNavigation('/auth/register')}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};