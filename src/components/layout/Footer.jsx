import { Hotel, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Hotel className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">GuestHub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Transform your hotel operations with the next-generation management system.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
              <li><Link to="/auth/login" className="text-muted-foreground hover:text-primary">Login</Link></li>
              <li><Link to="/auth/register" className="text-muted-foreground hover:text-primary">Register</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="text-muted-foreground">Room Management</span></li>
              <li><span className="text-muted-foreground">Guest Services</span></li>
              <li><span className="text-muted-foreground">Staff Management</span></li>
              <li><span className="text-muted-foreground">Analytics</span></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Contact</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@guesthub.com</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 GuestHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};