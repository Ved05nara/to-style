import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, UserRole } from "@/components/auth/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import { Hotel, Loader2, User, Users, BarChart3 } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AuthPage() {
  const { mode } = useParams<{ mode: 'login' | 'register' }>();
  const isLogin = mode === 'login';
  const navigate = useNavigate();
  const { login, register, loading } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'guest' as UserRole,
  });

  const roleOptions = [
    { value: 'guest', label: 'Guest', icon: User, description: 'Book rooms and enjoy services' },
    { value: 'staff', label: 'Hotel Staff', icon: Users, description: 'Manage daily operations' },
    { value: 'management', label: 'Management', icon: BarChart3, description: 'Oversee hotel operations' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isLogin) {
        await login(formData.email, formData.password, formData.role);
        toast({
          title: "Welcome back!",
          description: "You have been successfully signed in.",
        });
      } else {
        await register(formData.email, formData.password, formData.name, formData.role);
        toast({
          title: "Account created!",
          description: "Welcome to GuestHub. Your account has been created successfully.",
        });
      }
      
      // Navigate based on role
      const dashboardPath = {
        guest: '/guest/dashboard',
        staff: '/staff/dashboard',
        management: '/management/dashboard',
      }[formData.role];
      
      navigate(dashboardPath);
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-luxury rounded-2xl mb-4">
            <Hotel className="h-8 w-8 text-secondary-foreground" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-luxury bg-clip-text text-transparent">
            GuestHub
          </h1>
          <p className="text-muted-foreground mt-2">
            {isLogin ? 'Welcome back to your hotel management system' : 'Create your GuestHub account'}
          </p>
        </div>

        <Card className="shadow-medium border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {isLogin ? 'Sign In' : 'Create Account'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Account Type</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleInputChange('role', value)}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-3">
                          <option.icon className="h-4 w-4" />
                          <div>
                            <div className="font-medium">{option.label}</div>
                            <div className="text-xs text-muted-foreground">{option.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                size="lg"
                variant="hotel"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                  </>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </Button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <Button
                    variant="link"
                    className="pl-1 h-auto p-0 text-primary"
                    onClick={() => navigate(isLogin ? '/auth/register' : '/auth/login')}
                  >
                    {isLogin ? 'Create one' : 'Sign in'}
                  </Button>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}