import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DoorOpen, Users, DollarSign } from "lucide-react";

const AdminRooms = () => {
  const rooms = [
    {
      number: "101",
      type: "Deluxe Suite",
      capacity: 2,
      price: "$170",
      status: "Occupied",
      amenities: ["WiFi", "TV", "Mini Bar", "King Bed"],
    },
    {
      number: "102",
      type: "Standard Room",
      capacity: 2,
      price: "$120",
      status: "Available",
      amenities: ["WiFi", "TV", "Queen Bed"],
    },
    {
      number: "203",
      type: "Deluxe Room",
      capacity: 2,
      price: "$150",
      status: "Maintenance",
      amenities: ["WiFi", "TV", "Mini Bar", "King Bed"],
    },
    {
      number: "205",
      type: "Executive Room",
      capacity: 3,
      price: "$210",
      status: "Occupied",
      amenities: ["WiFi", "TV", "Mini Bar", "Work Desk", "King Bed"],
    },
    {
      number: "312",
      type: "Premium Suite",
      capacity: 4,
      price: "$240",
      status: "Reserved",
      amenities: ["WiFi", "TV", "Mini Bar", "Jacuzzi", "King Bed", "Living Room"],
    },
    {
      number: "401",
      type: "Presidential Suite",
      capacity: 4,
      price: "$300",
      status: "Available",
      amenities: ["WiFi", "TV", "Mini Bar", "Jacuzzi", "King Bed", "Living Room", "Balcony"],
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "Occupied":
        return "bg-blue-100 text-blue-800";
      case "Reserved":
        return "bg-yellow-100 text-yellow-800";
      case "Maintenance":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Rooms</h1>
        <p className="text-muted-foreground mt-1">Manage room inventory and availability</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <Card key={room.number} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <DoorOpen className="h-5 w-5 text-primary" />
                    Room {room.number}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{room.type}</p>
                </div>
                <Badge className={getStatusColor(room.status)}>{room.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Up to {room.capacity} guests</span>
                </div>
                <div className="flex items-center gap-1 text-lg font-bold text-primary">
                  <DollarSign className="h-4 w-4" />
                  <span>{room.price.replace("$", "")}</span>
                  <span className="text-xs text-muted-foreground font-normal">/night</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground mb-2">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminRooms;
