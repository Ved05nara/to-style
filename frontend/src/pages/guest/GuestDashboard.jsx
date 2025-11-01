import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MessageCircle, Settings, Bed, Clock, MapPin, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockReservations = [
  {
    id: 1,
    roomType: "Deluxe Room",
    roomNumber: "305",
    checkIn: "2025-01-20",
    checkOut: "2025-01-25",
    status: "confirmed",
    guests: 2,
    totalPrice: "$995"
  },
  {
    id: 2,
    roomType: "Executive Suite",
    roomNumber: "412",
    checkIn: "2025-02-14",
    checkOut: "2025-02-16",
    status: "pending",
    guests: 2,
    totalPrice: "$698"
  }
];

const mockServiceRequests = [
  {
    id: 1,
    type: "Housekeeping",
    description: "Extra towels needed",
    status: "in-progress",
    timestamp: "2025-01-15 14:30"
  },
  {
    id: 2,
    type: "Room Service",
    description: "Breakfast delivery at 8 AM",
    status: "completed",
    timestamp: "2025-01-15 08:00"
  }
];

const GuestDashboard = () => {
  const { toast } = useToast();
  const [bookingForm, setBookingForm] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
    roomType: "deluxe"
  });

  const [serviceRequest, setServiceRequest] = useState({
    type: "",
    description: ""
  });

  const handleBooking = (e) => {
    e.preventDefault();
    toast({
      title: "Booking Submitted",
      description: "We'll confirm your reservation shortly.",
    });
  };

  const handleServiceRequest = (e) => {
    e.preventDefault();
    toast({
      title: "Service Request Submitted",
      description: "Our staff will attend to your request soon.",
    });
    setServiceRequest({ type: "", description: "" });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "confirmed": return "bg-success text-success-foreground";
      case "pending": return "bg-warning text-warning-foreground";
      case "completed": return "bg-muted text-muted-foreground";
      case "in-progress": return "bg-blue-500 text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Guest Dashboard</h1>
        <p className="text-muted-foreground">Manage your reservations and requests</p>
      </div>
      
      <Tabs defaultValue="reservations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="reservations">
            <Bed className="h-4 w-4 mr-2" />
            Reservations
          </TabsTrigger>
          <TabsTrigger value="book">
            <Calendar className="h-4 w-4 mr-2" />
            Book Room
          </TabsTrigger>
          <TabsTrigger value="services">
            <MessageCircle className="h-4 w-4 mr-2" />
            Services
          </TabsTrigger>
          <TabsTrigger value="profile">
            <Settings className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
        </TabsList>

        {/* Reservations Tab */}
        <TabsContent value="reservations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Reservations</CardTitle>
              <CardDescription>View and manage your current and upcoming stays</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockReservations.map((reservation) => (
                <Card key={reservation.id} className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{reservation.roomType}</h3>
                          <Badge className={getStatusColor(reservation.status)}>
                            {reservation.status}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Room {reservation.roomNumber}
                          </p>
                          <p className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {reservation.checkIn} to {reservation.checkOut}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="text-2xl font-bold text-right">{reservation.totalPrice}</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button variant="outline" size="sm">Cancel</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Book Room Tab */}
        <TabsContent value="book">
          <Card>
            <CardHeader>
              <CardTitle>Book a Room</CardTitle>
              <CardDescription>Reserve your next stay with us</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBooking} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="checkIn">Check-in Date</Label>
                    <Input
                      id="checkIn"
                      type="date"
                      value={bookingForm.checkIn}
                      onChange={(e) => setBookingForm({...bookingForm, checkIn: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkOut">Check-out Date</Label>
                    <Input
                      id="checkOut"
                      type="date"
                      value={bookingForm.checkOut}
                      onChange={(e) => setBookingForm({...bookingForm, checkOut: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="guests">Number of Guests</Label>
                    <Input
                      id="guests"
                      type="number"
                      min="1"
                      max="4"
                      value={bookingForm.guests}
                      onChange={(e) => setBookingForm({...bookingForm, guests: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="roomType">Room Type</Label>
                    <select
                      id="roomType"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={bookingForm.roomType}
                      onChange={(e) => setBookingForm({...bookingForm, roomType: e.target.value})}
                    >
                      <option value="deluxe">Deluxe Room - $199/night</option>
                      <option value="executive">Executive Suite - $349/night</option>
                      <option value="presidential">Presidential Suite - $599/night</option>
                    </select>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Now
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Request Service</CardTitle>
              <CardDescription>Need something? Let our staff know</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleServiceRequest} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="serviceType">Service Type</Label>
                  <select
                    id="serviceType"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={serviceRequest.type}
                    onChange={(e) => setServiceRequest({...serviceRequest, type: e.target.value})}
                    required
                  >
                    <option value="">Select service...</option>
                    <option value="housekeeping">Housekeeping</option>
                    <option value="roomservice">Room Service</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="concierge">Concierge</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Please describe your request..."
                    value={serviceRequest.description}
                    onChange={(e) => setServiceRequest({...serviceRequest, description: e.target.value})}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Submit Request
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Requests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockServiceRequests.map((request) => (
                <div key={request.id} className="flex items-start justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{request.type}</p>
                      <Badge className={getStatusColor(request.status)} variant="outline">
                        {request.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{request.description}</p>
                    <p className="text-xs text-muted-foreground">{request.timestamp}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Manage your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" defaultValue="+1 234 567 8900" />
              </div>
              <Button className="w-full">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default GuestDashboard;