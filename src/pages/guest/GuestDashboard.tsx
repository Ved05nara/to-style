import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Star, 
  MessageCircle, 
  CreditCard,
  Bell,
  Search,
  Filter
} from "lucide-react";
import { Input } from "@/components/ui/input";
import roomImage from "@/assets/hotel-room.jpg";

interface Booking {
  id: string;
  roomType: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'checked-in' | 'completed';
  nights: number;
  total: number;
}

interface RoomType {
  id: string;
  name: string;
  price: number;
  features: string[];
  available: boolean;
}

export default function GuestDashboard() {
  const { user } = useAuth();
  const [searchDates, setSearchDates] = useState({
    checkIn: '',
    checkOut: ''
  });

  // Mock data - in real app, this would come from API
  const currentBookings: Booking[] = [
    {
      id: 'book_001',
      roomType: 'Deluxe Suite',
      roomNumber: '204',
      checkIn: '2024-09-25',
      checkOut: '2024-09-28',
      status: 'confirmed',
      nights: 3,
      total: 899
    }
  ];

  const availableRooms: RoomType[] = [
    {
      id: 'room_001',
      name: 'Standard Room',
      price: 149,
      features: ['Free WiFi', 'Air Conditioning', 'Room Service'],
      available: true
    },
    {
      id: 'room_002',
      name: 'Deluxe Suite',
      price: 299,
      features: ['Ocean View', 'Balcony', 'Mini Bar', 'Spa Access'],
      available: true
    },
    {
      id: 'room_003',
      name: 'Premium Suite',
      price: 449,
      features: ['City View', 'Living Room', 'Kitchen', 'Butler Service'],
      available: false
    }
  ];

  const recentActivity = [
    { id: 1, message: "Booking confirmed for Deluxe Suite", time: "2 hours ago", type: "booking" },
    { id: 2, message: "Welcome message from hotel staff", time: "1 day ago", type: "message" },
    { id: 3, message: "Payment processed successfully", time: "1 day ago", type: "payment" },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground">
            Manage your bookings and discover amazing experiences at our hotel.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Button variant="hotel" size="lg" className="h-20 flex-col">
            <Calendar className="h-6 w-6 mb-2" />
            Book Room
          </Button>
          <Button variant="outline" size="lg" className="h-20 flex-col">
            <MessageCircle className="h-6 w-6 mb-2" />
            Chat Support
          </Button>
          <Button variant="outline" size="lg" className="h-20 flex-col">
            <MapPin className="h-6 w-6 mb-2" />
            Hotel Services
          </Button>
          <Button variant="outline" size="lg" className="h-20 flex-col">
            <Star className="h-6 w-6 mb-2" />
            Leave Review
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Current Bookings */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-soft border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Current Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentBookings.length > 0 ? (
                  <div className="space-y-4">
                    {currentBookings.map((booking) => (
                      <div key={booking.id} className="p-4 border rounded-lg bg-muted/50">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold">{booking.roomType}</h3>
                            <p className="text-sm text-muted-foreground">Room {booking.roomNumber}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'confirmed' ? 'bg-success/10 text-success' :
                            booking.status === 'checked-in' ? 'bg-warning/10 text-warning' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Check-in</p>
                            <p className="font-medium">{new Date(booking.checkIn).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Check-out</p>
                            <p className="font-medium">{new Date(booking.checkOut).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <p className="text-sm text-muted-foreground">
                            {booking.nights} nights • ${booking.total}
                          </p>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                            <Button size="sm" variant="secondary">
                              Modify
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No current bookings</p>
                    <Button variant="hotel" className="mt-4">
                      Book Your Stay
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Available Rooms */}
            <Card className="shadow-soft border-0">
              <CardHeader>
                <CardTitle>Available Rooms</CardTitle>
                <div className="flex gap-2">
                  <Input
                    type="date"
                    placeholder="Check-in"
                    value={searchDates.checkIn}
                    onChange={(e) => setSearchDates(prev => ({ ...prev, checkIn: e.target.value }))}
                    className="flex-1"
                  />
                  <Input
                    type="date"
                    placeholder="Check-out"
                    value={searchDates.checkOut}
                    onChange={(e) => setSearchDates(prev => ({ ...prev, checkOut: e.target.value }))}
                    className="flex-1"
                  />
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {availableRooms.map((room) => (
                    <div key={room.id} className="flex gap-4 p-4 border rounded-lg">
                      <img
                        src={roomImage}
                        alt={room.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{room.name}</h3>
                          <p className="text-xl font-bold text-secondary">
                            ${room.price}
                            <span className="text-sm font-normal text-muted-foreground">/night</span>
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {room.features.map((feature, index) => (
                            <span key={index} className="px-2 py-1 bg-muted rounded-full text-xs">
                              {feature}
                            </span>
                          ))}
                        </div>
                        <Button
                          size="sm"
                          variant={room.available ? "luxury" : "outline"}
                          disabled={!room.available}
                        >
                          {room.available ? 'Book Now' : 'Not Available'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card className="shadow-soft border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'booking' ? 'bg-success' :
                        activity.type === 'message' ? 'bg-primary' :
                        'bg-secondary'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-soft border-0">
              <CardHeader>
                <CardTitle>Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Bookings</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nights Stayed</span>
                  <span className="font-semibold">28</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Loyalty Points</span>
                  <span className="font-semibold text-secondary">2,450</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member Since</span>
                  <span className="font-semibold">Jan 2024</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}