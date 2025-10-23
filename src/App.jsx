import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/components/auth/AuthProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Pages
import Landing from "./pages/Landing";
import AuthPage from "./pages/auth/AuthPage";
import GuestDashboard from "./pages/guest/GuestDashboard";
import StaffDashboard from "./pages/staff/StaffDashboard";
import ManagementDashboard from "./pages/management/ManagementDashboard";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminRooms from "./pages/admin/AdminRooms";
import AdminStaff from "./pages/admin/AdminStaff";
import { AdminLayout } from "./components/layout/AdminLayout";

const queryClient = new QueryClient();

// Main App Content
const AppContent = () => {
  const { user, isAuthenticated, logout } = useAuth();

  // Protected Route Component - moved inside AppContent to have access to AuthProvider
  const ProtectedRoute = ({ 
    children, 
    allowedRoles 
  }) => {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" replace />;
    }
    
    if (user && !allowedRoles.includes(user.role)) {
      return <Navigate to="/" replace />;
    }
    
    return <>{children}</>;
  };

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header 
        isAuthenticated={isAuthenticated}
        userRole={user?.role || null}
        onLogout={logout}
      />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/:mode" element={<AuthPage />} />
        
        {/* Guest Routes */}
        <Route 
          path="/guest/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['guest']}>
              <GuestDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Staff Routes */}
        <Route 
          path="/staff/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['staff', 'management']}>
              <StaffDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Management Routes */}
        <Route 
          path="/management/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['management']}>
              <ManagementDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Admin Routes */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/bookings" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <AdminBookings />
              </AdminLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/rooms" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <AdminRooms />
              </AdminLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/staff" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout>
                <AdminStaff />
              </AdminLayout>
            </ProtectedRoute>
          } 
        />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;