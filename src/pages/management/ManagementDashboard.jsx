import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  Calendar, 
  DollarSign,
  Hotel,
  Star,
  AlertTriangle,
  MessageCircle,
  Settings
} from "lucide-react";

export default function ManagementDashboard() {
  const { user } = useAuth();

  // Mock data - in real app, this would come from API
  const kpis = [
    {
      title: 'Total Revenue',
      value: '$124,580',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign
    },
    {
      title: 'Occupancy Rate',
      value: '87.3%',
      change: '+5.2%',
      trend: 'up',
      icon: Hotel
    },
    {
      title: 'Active Bookings',
      value: '156',
      change: '+8.1%',
      trend: 'up',
      icon: Calendar
    },
    {
      title: 'Guest Satisfaction',
      value: '4.7/5',
      change: '+0.3',
      trend: 'up',
      icon: Star
    },
    {
      title: 'Staff Utilization',
      value: '92%',
      change: '-2.1%',
      trend: 'down',
      icon: Users
    },
    {
      title: 'Avg Daily Rate',
      value: '$285',
      change: '+7.8%',
      trend: 'up',
      icon: TrendingUp
    }
  ];

  const recentActivity = [
    {
      id: '1',
      message: 'New booking: Premium Suite for 3 nights',
      time: '5 minutes ago',
      type: 'booking'
    },
    {
      id: '2',
      message: 'Staff shift change: Evening crew check-in',
      time: '15 minutes ago',
      type: 'staff'
    },
    {
      id: '3',
      message: 'Maintenance request: AC repair in Room 204',
      time: '32 minutes ago',
      type: 'maintenance',
      priority: 'high'
    },
    {
      id: '4',
      message: 'Guest feedback: 5-star review submitted',
      time: '1 hour ago',
      type: 'guest'
    },
    {
      id: '5',
      message: 'Payment processed: $1,245 for corporate booking',
      time: '2 hours ago',
      type: 'booking'
    }
  ];

  const roomStatus = {
    occupied: 87,
    available: 23,
    maintenance: 5,
    outOfOrder: 2
  };

  const totalRooms = Object.values(roomStatus).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Management Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name}. Here's your hotel overview.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="luxury">
              <BarChart3 className="mr-2 h-4 w-4" />
              Full Report
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {kpis.map((kpi, index) => (
            <Card key={index} className="shadow-soft border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                    <p className="text-2xl font-bold">{kpi.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {kpi.trend === 'up' ? (
                        <TrendingUp className="h-3 w-3 text-success" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-destructive" />
                      )}
                      <span className={`text-xs font-medium ${
                        kpi.trend === 'up' ? 'text-success' : 'text-destructive'
                      }`}>
                        {kpi.change}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-gradient-luxury rounded-xl">
                    <kpi.icon className="h-6 w-6 text-secondary-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Room Status Overview */}
          <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hotel className="h-5 w-5" />
                Room Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Occupied</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div 
                        className="h-2 bg-primary rounded-full" 
                        style={{ width: `${(roomStatus.occupied / totalRooms) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold">{roomStatus.occupied}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Available</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div 
                        className="h-2 bg-success rounded-full" 
                        style={{ width: `${(roomStatus.available / totalRooms) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold">{roomStatus.available}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Maintenance</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div 
                        className="h-2 bg-warning rounded-full" 
                        style={{ width: `${(roomStatus.maintenance / totalRooms) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold">{roomStatus.maintenance}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Out of Order</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div 
                        className="h-2 bg-destructive rounded-full" 
                        style={{ width: `${(roomStatus.outOfOrder / totalRooms) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold">{roomStatus.outOfOrder}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <div className="text-center">
                  <p className="text-2xl font-bold">{totalRooms}</p>
                  <p className="text-sm text-muted-foreground">Total Rooms</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="shadow-soft border-0">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Recent Activity
                  </span>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'booking' ? 'bg-primary' :
                        activity.type === 'staff' ? 'bg-secondary' :
                        activity.type === 'maintenance' ? 'bg-warning' :
                        'bg-success'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <p className="text-sm font-medium">{activity.message}</p>
                          {activity.priority && (
                            <div className="flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3 text-destructive" />
                              <span className="text-xs text-destructive font-medium">
                                {activity.priority.toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="mt-8 grid md:grid-cols-2 gap-4">
              <Card className="shadow-soft border-0">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Manage Staff
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="mr-2 h-4 w-4" />
                      View Bookings
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Hotel className="mr-2 h-4 w-4" />
                      Room Management
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft border-0">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Reports</h3>
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Financial Report
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Occupancy Report
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Star className="mr-2 h-4 w-4" />
                      Guest Feedback
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}