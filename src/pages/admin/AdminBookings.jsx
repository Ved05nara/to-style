import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

const AdminBookings = () => {
  const bookings = [
    {
      id: "BK001",
      guest: "Sarah Johnson",
      email: "sarah.j@email.com",
      room: "101 - Deluxe Suite",
      checkIn: "2024-01-15",
      checkOut: "2024-01-20",
      status: "Checked In",
      amount: "$850",
    },
    {
      id: "BK002",
      guest: "Michael Chen",
      email: "m.chen@email.com",
      room: "205 - Executive Room",
      checkIn: "2024-01-16",
      checkOut: "2024-01-18",
      status: "Confirmed",
      amount: "$420",
    },
    {
      id: "BK003",
      guest: "Emma Davis",
      email: "emma.d@email.com",
      room: "312 - Premium Suite",
      checkIn: "2024-01-17",
      checkOut: "2024-01-22",
      status: "Pending",
      amount: "$1,200",
    },
    {
      id: "BK004",
      guest: "James Wilson",
      email: "j.wilson@email.com",
      room: "108 - Standard Room",
      checkIn: "2024-01-15",
      checkOut: "2024-01-19",
      status: "Checked In",
      amount: "$560",
    },
    {
      id: "BK005",
      guest: "Lisa Anderson",
      email: "lisa.a@email.com",
      room: "401 - Presidential Suite",
      checkIn: "2024-01-18",
      checkOut: "2024-01-25",
      status: "Confirmed",
      amount: "$2,100",
    },
    {
      id: "BK006",
      guest: "Robert Taylor",
      email: "r.taylor@email.com",
      room: "203 - Deluxe Room",
      checkIn: "2024-01-16",
      checkOut: "2024-01-19",
      status: "Checked Out",
      amount: "$450",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Checked In":
        return "bg-green-100 text-green-800";
      case "Confirmed":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Checked Out":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Bookings</h1>
        <p className="text-muted-foreground mt-1">Manage all guest bookings and reservations</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle>All Bookings</CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search bookings..." className="pl-10" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
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
                    Guest Details
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                    Room
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                    Check In
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                    Check Out
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 px-4 text-sm font-medium">{booking.id}</td>
                    <td className="py-4 px-4 text-sm">
                      <div>
                        <div className="font-medium">{booking.guest}</div>
                        <div className="text-muted-foreground text-xs">{booking.email}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm">{booking.room}</td>
                    <td className="py-4 px-4 text-sm">{booking.checkIn}</td>
                    <td className="py-4 px-4 text-sm">{booking.checkOut}</td>
                    <td className="py-4 px-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm font-semibold">{booking.amount}</td>
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

export default AdminBookings;
