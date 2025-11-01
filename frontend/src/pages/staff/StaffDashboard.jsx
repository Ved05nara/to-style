import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Bed, Calendar, ClipboardList, CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockRooms = [
  { number: "101", type: "Deluxe", status: "occupied", guest: "John Doe", cleanStatus: "clean" },
  { number: "102", type: "Deluxe", status: "vacant", guest: null, cleanStatus: "dirty" },
  { number: "103", type: "Executive", status: "occupied", guest: "Jane Smith", cleanStatus: "clean" },
  { number: "104", type: "Deluxe", status: "maintenance", guest: null, cleanStatus: "clean" },
  { number: "201", type: "Executive", status: "vacant", guest: null, cleanStatus: "clean" },
  { number: "202", type: "Presidential", status: "occupied", guest: "Bob Johnson", cleanStatus: "in-progress" },
];

const mockGuestRequests = [
  { id: 1, room: "101", guest: "John Doe", type: "Room Service", description: "Breakfast order", priority: "normal", status: "pending" },
  { id: 2, room: "203", guest: "Alice Brown", type: "Maintenance", description: "AC not working", priority: "high", status: "in-progress" },
  { id: 3, room: "305", guest: "Charlie Wilson", type: "Housekeeping", description: "Extra pillows", priority: "low", status: "pending" },
];

const mockTasks = [
  { id: 1, title: "Clean Room 102", room: "102", status: "pending", assignedTo: "Maria" },
  { id: 2, title: "Repair AC in 203", room: "203", status: "in-progress", assignedTo: "John" },
  { id: 3, title: "Restock minibar 305", room: "305", status: "pending", assignedTo: "You" },
  { id: 4, title: "Check-in preparation 401", room: "401", status: "completed", assignedTo: "Sarah" },
];

const StaffDashboard = () => {
  const { toast } = useToast();
  const [rooms, setRooms] = useState(mockRooms);
  const [requests, setRequests] = useState(mockGuestRequests);
  const [tasks, setTasks] = useState(mockTasks);

  const getStatusColor = (status) => {
    switch(status) {
      case "occupied": return "bg-blue-500 text-white";
      case "vacant": return "bg-success text-success-foreground";
      case "maintenance": return "bg-warning text-warning-foreground";
      case "clean": return "bg-success text-success-foreground";
      case "dirty": return "bg-destructive text-destructive-foreground";
      case "in-progress": return "bg-blue-500 text-white";
      case "pending": return "bg-warning text-warning-foreground";
      case "completed": return "bg-muted text-muted-foreground";
      case "high": return "bg-destructive text-destructive-foreground";
      case "normal": return "bg-blue-500 text-white";
      case "low": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleCompleteTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: "completed" } : task
    ));
    toast({
      title: "Task Completed",
      description: "The task has been marked as complete.",
    });
  };

  const handleRequestAction = (requestId, action) => {
    setRequests(requests.map(request => 
      request.id === requestId ? { ...request, status: action } : request
    ));
    toast({
      title: `Request ${action}`,
      description: `The guest request has been ${action}.`,
    });
  };

  const updateRoomStatus = (roomNumber, field, value) => {
    setRooms(rooms.map(room => 
      room.number === roomNumber ? { ...room, [field]: value } : room
    ));
    toast({
      title: "Room Updated",
      description: `Room ${roomNumber} ${field} updated to ${value}.`,
    });
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Staff Dashboard</h1>
        <p className="text-muted-foreground">Manage hotel operations efficiently</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Occupied Rooms</p>
                <p className="text-3xl font-bold">{rooms.filter(r => r.status === "occupied").length}</p>
              </div>
              <Bed className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Requests</p>
                <p className="text-3xl font-bold">{requests.filter(r => r.status === "pending").length}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Tasks</p>
                <p className="text-3xl font-bold">{tasks.filter(t => t.status !== "completed").length}</p>
              </div>
              <ClipboardList className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rooms to Clean</p>
                <p className="text-3xl font-bold">{rooms.filter(r => r.cleanStatus === "dirty").length}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="rooms" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="rooms">
            <Bed className="h-4 w-4 mr-2" />
            Rooms
          </TabsTrigger>
          <TabsTrigger value="requests">
            <Users className="h-4 w-4 mr-2" />
            Requests
          </TabsTrigger>
          <TabsTrigger value="tasks">
            <ClipboardList className="h-4 w-4 mr-2" />
            Tasks
          </TabsTrigger>
          <TabsTrigger value="reservations">
            <Calendar className="h-4 w-4 mr-2" />
            Reservations
          </TabsTrigger>
        </TabsList>

        {/* Rooms Tab */}
        <TabsContent value="rooms">
          <Card>
            <CardHeader>
              <CardTitle>Room Management</CardTitle>
              <CardDescription>Monitor and update room status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rooms.map((room) => (
                  <Card key={room.number} className="border-2">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">Room {room.number}</CardTitle>
                        <Badge className={getStatusColor(room.status)}>
                          {room.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{room.type}</p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {room.guest && (
                        <p className="text-sm">
                          <span className="font-medium">Guest:</span> {room.guest}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Clean Status:</span>
                        <Badge className={getStatusColor(room.cleanStatus)} variant="outline">
                          {room.cleanStatus}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        {room.cleanStatus === "dirty" && (
                          <Button size="sm" onClick={() => updateRoomStatus(room.number, "cleanStatus", "clean")}>
                            Mark Clean
                          </Button>
                        )}
                        {room.status === "vacant" && (
                          <Button size="sm" variant="outline">
                            Check In
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Requests Tab */}
        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Guest Requests</CardTitle>
              <CardDescription>Handle guest service requests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {requests.map((request) => (
                <Card key={request.id} className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge>Room {request.room}</Badge>
                          <Badge className={getStatusColor(request.priority)}>
                            {request.priority}
                          </Badge>
                          <Badge className={getStatusColor(request.status)} variant="outline">
                            {request.status}
                          </Badge>
                        </div>
                        <p className="font-medium">{request.guest} - {request.type}</p>
                        <p className="text-sm text-muted-foreground">{request.description}</p>
                      </div>
                      <div className="flex gap-2">
                        {request.status === "pending" && (
                          <>
                            <Button size="sm" onClick={() => handleRequestAction(request.id, "in-progress")}>
                              Accept
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleRequestAction(request.id, "completed")}>
                              Complete
                            </Button>
                          </>
                        )}
                        {request.status === "in-progress" && (
                          <Button size="sm" onClick={() => handleRequestAction(request.id, "completed")}>
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Daily Tasks</CardTitle>
              <CardDescription>Your assigned tasks and duties</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{task.title}</p>
                      <Badge className={getStatusColor(task.status)} variant="outline">
                        {task.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Room {task.room} • Assigned to: {task.assignedTo}
                    </p>
                  </div>
                  {task.status !== "completed" && (
                    <Button size="sm" onClick={() => handleCompleteTask(task.id)}>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Complete
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reservations Tab */}
        <TabsContent value="reservations">
          <Card>
            <CardHeader>
              <CardTitle>Today's Check-ins & Check-outs</CardTitle>
              <CardDescription>Manage guest arrivals and departures</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Check-ins (3)</h3>
                  <div className="space-y-2">
                    {[
                      { name: "Michael Chen", room: "305", time: "14:00", status: "pending" },
                      { name: "Sarah Parker", room: "412", time: "15:30", status: "checked-in" },
                      { name: "David Lee", room: "201", time: "16:00", status: "pending" },
                    ].map((checkin, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">{checkin.name}</p>
                          <p className="text-sm text-muted-foreground">Room {checkin.room} • {checkin.time}</p>
                        </div>
                        {checkin.status === "pending" ? (
                          <Button size="sm">Check In</Button>
                        ) : (
                          <Badge className={getStatusColor("completed")}>Checked In</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Check-outs (2)</h3>
                  <div className="space-y-2">
                    {[
                      { name: "Emma Wilson", room: "108", time: "11:00", status: "pending" },
                      { name: "James Brown", room: "215", time: "10:30", status: "checked-out" },
                    ].map((checkout, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">{checkout.name}</p>
                          <p className="text-sm text-muted-foreground">Room {checkout.room} • {checkout.time}</p>
                        </div>
                        {checkout.status === "pending" ? (
                          <Button size="sm" variant="outline">Check Out</Button>
                        ) : (
                          <Badge className={getStatusColor("completed")}>Checked Out</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default StaffDashboard;