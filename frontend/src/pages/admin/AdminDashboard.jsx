import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, Calendar, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+20.1%",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Occupancy Rate",
      value: "78%",
      change: "+12.5%",
      icon: TrendingUp,
      color: "text-blue-600",
    },
    {
      title: "Active Guests",
      value: "156",
      change: "+8 today",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Bookings Today",
      value: "23",
      change: "+4 pending",
      icon: Calendar,
      color: "text-orange-600",
    },
  ];

  const recentBookings = [
    { id: "BK001", guest: "Sarah Johnson", room: "101", status: "Checked In", date: "2024-01-15" },
    { id: "BK002", guest: "Michael Chen", room: "205", status: "Confirmed", date: "2024-01-16" },
    { id: "BK003", guest: "Emma Davis", room: "312", status: "Pending", date: "2024-01-17" },
    { id: "BK004", guest: "James Wilson", room: "108", status: "Checked In", date: "2024-01-15" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Checked In":
        return "bg-green-100 text-green-800";
      case "Confirmed":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's your hotel overview.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                    Booking ID
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                    Guest Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                    Room
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4 text-sm font-medium">{booking.id}</td>
                    <td className="py-3 px-4 text-sm">{booking.guest}</td>
                    <td className="py-3 px-4 text-sm">{booking.room}</td>
                    <td className="py-3 px-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">{booking.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
