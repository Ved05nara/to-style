import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Hotel, Users, Calendar, BarChart, Wifi, Coffee, Car, Utensils, Shield, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import hotelHero from "@/assets/hotel-hero.jpg";
import hotelRoom from "@/assets/hotel-room.jpg";

const roomTypes = [
  {
    name: "Deluxe Room",
    price: "$199",
    features: ["King Bed", "City View", "32 sqm", "2 Guests"],
    image: hotelRoom
  },
  {
    name: "Executive Suite",
    price: "$349",
    features: ["King Bed", "Ocean View", "48 sqm", "3 Guests"],
    image: hotelRoom
  },
  {
    name: "Presidential Suite",
    price: "$599",
    features: ["2 King Beds", "Panoramic View", "85 sqm", "4 Guests"],
    image: hotelRoom
  }
];

const amenities = [
  { icon: Wifi, name: "Free WiFi" },
  { icon: Coffee, name: "Breakfast" },
  { icon: Car, name: "Free Parking" },
  { icon: Utensils, name: "Restaurant" },
  { icon: Shield, name: "24/7 Security" },
  { icon: Clock, name: "Room Service" }
];

const Landing = () => {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={hotelHero} 
            alt="Luxury Hotel" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/50" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <Badge className="mb-4 bg-secondary text-secondary-foreground">
              Premium Hotel Management
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Welcome to GuestHub
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Experience seamless hotel operations with our comprehensive management platform. From guest bookings to staff coordination.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth/register">
                <Button size="lg" className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary-hover">
                  Book Your Stay
                </Button>
              </Link>
              <Link to="/auth/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary">
                  Staff Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Complete Hotel Management Solution
            </h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to run a successful hotel operation
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Hotel className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Room Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Real-time room status, housekeeping schedules, and maintenance tracking
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Guest Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Handle guest requests, preferences, and provide personalized experiences
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Smart Reservations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Automated booking system with instant confirmations and reminders
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <BarChart className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Business Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Revenue insights, occupancy rates, and performance metrics
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Room Types Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Rooms</h2>
            <p className="text-muted-foreground text-lg">
              Choose from our selection of luxury accommodations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roomTypes.map((room, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={room.image} 
                    alt={room.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{room.name}</CardTitle>
                    <Badge variant="secondary" className="text-lg font-bold">
                      {room.price}<span className="text-sm font-normal">/night</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {room.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-muted-foreground">
                        <Star className="h-4 w-4 mr-2 text-secondary fill-secondary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to="/auth/register" className="w-full">
                    <Button className="w-full">Book Now</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Hotel Amenities</h2>
            <p className="text-muted-foreground text-lg">
              Everything you need for a comfortable stay
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {amenities.map((amenity, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <amenity.icon className="h-10 w-10 text-primary mx-auto mb-3" />
                  <p className="font-medium">{amenity.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of hotels using GuestHub for better operations
          </p>
          <Link to="/auth/register">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary-hover">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Landing;