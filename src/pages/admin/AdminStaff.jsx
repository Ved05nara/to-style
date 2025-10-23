import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone } from "lucide-react";

const AdminStaff = () => {
  const staff = [
    {
      id: 1,
      name: "Jennifer Martinez",
      role: "Hotel Manager",
      email: "jennifer.m@guesthub.com",
      phone: "+1 (555) 123-4567",
      status: "Active",
      shift: "Day",
    },
    {
      id: 2,
      name: "David Thompson",
      role: "Front Desk",
      email: "david.t@guesthub.com",
      phone: "+1 (555) 234-5678",
      status: "Active",
      shift: "Night",
    },
    {
      id: 3,
      name: "Maria Garcia",
      role: "Housekeeping",
      email: "maria.g@guesthub.com",
      phone: "+1 (555) 345-6789",
      status: "Active",
      shift: "Day",
    },
    {
      id: 4,
      name: "Robert Kim",
      role: "Maintenance",
      email: "robert.k@guesthub.com",
      phone: "+1 (555) 456-7890",
      status: "On Leave",
      shift: "Day",
    },
    {
      id: 5,
      name: "Amanda Foster",
      role: "Front Desk",
      email: "amanda.f@guesthub.com",
      phone: "+1 (555) 567-8901",
      status: "Active",
      shift: "Day",
    },
    {
      id: 6,
      name: "Carlos Rodriguez",
      role: "Concierge",
      email: "carlos.r@guesthub.com",
      phone: "+1 (555) 678-9012",
      status: "Active",
      shift: "Evening",
    },
  ];

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getStatusColor = (status) => {
    return status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800";
  };

  const getRoleColor = (role) => {
    const colors = {
      "Hotel Manager": "bg-purple-100 text-purple-800",
      "Front Desk": "bg-blue-100 text-blue-800",
      Housekeeping: "bg-pink-100 text-pink-800",
      Maintenance: "bg-orange-100 text-orange-800",
      Concierge: "bg-cyan-100 text-cyan-800",
    };
    return colors[role] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Staff Management</h1>
        <p className="text-muted-foreground mt-1">Manage hotel staff and their schedules</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {staff.map((member) => (
          <Card key={member.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge className={getRoleColor(member.role)}>{member.role}</Badge>
                    <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{member.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{member.phone}</span>
              </div>
              <div className="pt-2 border-t border-border">
                <p className="text-sm">
                  <span className="font-semibold text-foreground">Shift: </span>
                  <span className="text-muted-foreground">{member.shift}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminStaff;
