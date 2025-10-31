import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BarChart, Users, Settings, FileText, TrendingUp, DollarSign, Hotel, Star } from "lucide-react";

const mockAnalytics = {
  revenue: {
    today: 12450,
    week: 87320,
    month: 345600,
    growth: 12.5
  },
  occupancy: {
    current: 78,
    target: 85,
    available: 22
  },
  satisfaction: {
    rating: 4.6,
    reviews: 234,
    trend: "up"
  }
};

const mockStaff = [
  { id: 1, name: "Maria Garcia", role: "Housekeeper", shift: "Morning", status: "active", performance: 95 },
  { id: 2, name: "John Smith", role: "Maintenance", shift: "Day", status: "active", performance: 88 },
  { id: 3, name: "Sarah Johnson", role: "Front Desk", shift: "Evening", status: "active", performance: 92 },
  { id: 4, name: "Mike Wilson", role: "Housekeeper", shift: "Afternoon", status: "off", performance: 90 },
  { id: 5, name: "Emily Brown", role: "Concierge", shift: "Day", status: "active", performance: 96 },
];

const mockRevenueByCategory = [
  { category: "Room Bookings", amount: 245000, percentage: 71 },
  { category: "Food & Beverage", amount: 62000, percentage: 18 },
  { category: "Services", amount: 28600, percentage: 8 },
  { category: "Events", amount: 10000, percentage: 3 },
];

const mockRecentBookings = [
  { id: 1, guest: "Alice Johnson", room: "Executive Suite", checkIn: "2025-01-20", amount: 10470, status: "confirmed" },
  { id: 2, guest: "Bob Smith", room: "Deluxe Room", checkIn: "2025-01-21", amount: 5970, status: "confirmed" },
  { id: 3, guest: "Carol White", room: "Presidential Suite", checkIn: "2025-01-22", amount: 29940, status: "pending" },
];

const ManagementDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const getStatusColor = (status) => {
    switch(status) {
      case "active": return "bg-success text-success-foreground";
      case "off": return "bg-muted text-muted-foreground";
      case "confirmed": return "bg-success text-success-foreground";
      case "pending": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Management Dashboard</h1>
        <p className="text-muted-foreground">Overview of hotel performance and operations</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-8 w-8" />
              <Badge className="bg-success text-success-foreground">
                +{mockAnalytics.revenue.growth}%
              </Badge>
            </div>
            <p className="text-sm opacity-90 mb-1">Monthly Revenue</p>
            <p className="text-3xl font-bold">₹{mockAnalytics.revenue.month.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Hotel className="h-8 w-8" />
              <TrendingUp className="h-5 w-5" />
            </div>
            <p className="text-sm opacity-90 mb-1">Occupancy Rate</p>
            <p className="text-3xl font-bold">{mockAnalytics.occupancy.current}%</p>
            <Progress value={mockAnalytics.occupancy.current} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Star className="h-8 w-8" />
              <span className="text-sm">234 reviews</span>
            </div>
            <p className="text-sm opacity-90 mb-1">Guest Satisfaction</p>
            <p className="text-3xl font-bold">{mockAnalytics.satisfaction.rating}/5.0</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-8 w-8" />
              <Badge className="bg-white text-purple-600">
                {mockStaff.filter(s => s.status === "active").length} Active
              </Badge>
            </div>
            <p className="text-sm opacity-90 mb-1">Staff Members</p>
            <p className="text-3xl font-bold">{mockStaff.length}</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="analytics">
            <BarChart className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="staff">
            <Users className="h-4 w-4 mr-2" />
            Staff
          </TabsTrigger>
          <TabsTrigger value="reports">
            <FileText className="h-4 w-4 mr-2" />
            Reports
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Income by category this month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockRevenueByCategory.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.category}</span>
                      <span className="text-muted-foreground">₹{item.amount.toLocaleString()}</span>
                    </div>
                    <Progress value={item.percentage} />
                    <p className="text-xs text-muted-foreground text-right">{item.percentage}% of total</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Latest reservations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockRecentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{booking.guest}</p>
                      <p className="text-sm text-muted-foreground">
                        {booking.room} • {booking.checkIn}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-bold">₹{booking.amount}</p>
                      <Badge className={getStatusColor(booking.status)} variant="outline">
                        {booking.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Key metrics over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 border rounded-lg">
                  <p className="text-4xl font-bold text-primary mb-2">92%</p>
                  <p className="text-sm text-muted-foreground">Average Occupancy</p>
                  <p className="text-xs text-success mt-1">↑ 5% from last month</p>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <p className="text-4xl font-bold text-primary mb-2">₹5850</p>
                  <p className="text-sm text-muted-foreground">Avg. Daily Rate</p>
                  <p className="text-xs text-success mt-1">↑ 8% from last month</p>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <p className="text-4xl font-bold text-primary mb-2">3.2</p>
                  <p className="text-sm text-muted-foreground">Avg. Length of Stay</p>
                  <p className="text-xs text-muted-foreground mt-1">→ No change</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Staff Tab */}
        <TabsContent value="staff">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Staff Management</CardTitle>
                  <CardDescription>Manage team members and performance</CardDescription>
                </div>
                <Button>
                  <Users className="h-4 w-4 mr-2" />
                  Add Staff
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockStaff.map((staff) => (
                  <Card key={staff.id} className="border-2">
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-lg">{staff.name}</h3>
                            <Badge className={getStatusColor(staff.status)}>
                              {staff.status}
                            </Badge>
                          </div>
                          <div className="flex gap-4 text-sm text-muted-foreground">
                            <span>{staff.role}</span>
                            <span>•</span>
                            <span>{staff.shift} Shift</span>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>Performance Score</span>
                              <span className="font-medium">{staff.performance}%</span>
                            </div>
                            <Progress value={staff.performance} />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button variant="outline" size="sm">Schedule</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Generate Reports</CardTitle>
              <CardDescription>Download detailed business reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Revenue Report", description: "Detailed revenue breakdown by source", icon: DollarSign },
                  { name: "Occupancy Report", description: "Room occupancy trends and forecasts", icon: Hotel },
                  { name: "Staff Performance", description: "Employee productivity and ratings", icon: Users },
                  { name: "Guest Feedback", description: "Reviews and satisfaction scores", icon: Star },
                  { name: "Operations Report", description: "Daily operations summary", icon: FileText },
                  { name: "Financial Summary", description: "Profit and loss statements", icon: BarChart },
                ].map((report, idx) => (
                  <Card key={idx} className="border-2 hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <report.icon className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold">{report.name}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">{report.description}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure hotel management preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Booking System</p>
                    <p className="text-sm text-muted-foreground">Manage reservation settings</p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Pricing Rules</p>
                    <p className="text-sm text-muted-foreground">Set dynamic pricing and seasons</p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Staff Permissions</p>
                    <p className="text-sm text-muted-foreground">Manage role-based access</p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Notifications</p>
                    <p className="text-sm text-muted-foreground">Email and SMS alert settings</p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default ManagementDashboard;