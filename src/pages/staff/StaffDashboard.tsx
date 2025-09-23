import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth/AuthProvider";
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Users, 
  MessageCircle, 
  Calendar,
  MapPin,
  Wrench,
  Bed,
  Coffee,
  Phone
} from "lucide-react";

interface Task {
  id: string;
  type: 'housekeeping' | 'maintenance' | 'guest_service' | 'front_desk';
  title: string;
  description: string;
  room?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed';
  assignedTo: string;
  dueTime: string;
  estimatedDuration: number; // in minutes
}

export default function StaffDashboard() {
  const { user } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Mock data - in real app, this would come from API
  const tasks: Task[] = [
    {
      id: 'task_001',
      type: 'housekeeping',
      title: 'Room Cleaning',
      description: 'Standard room cleaning after checkout',
      room: '204',
      priority: 'high',
      status: 'pending',
      assignedTo: user?.id || '',
      dueTime: '14:00',
      estimatedDuration: 45
    },
    {
      id: 'task_002',
      type: 'maintenance',
      title: 'AC Repair',
      description: 'Air conditioning unit not working properly',
      room: '156',
      priority: 'urgent',
      status: 'in_progress',
      assignedTo: user?.id || '',
      dueTime: '12:30',
      estimatedDuration: 90
    },
    {
      id: 'task_003',
      type: 'guest_service',
      title: 'Room Service Delivery',
      description: 'Deliver lunch order to guest',
      room: '302',
      priority: 'medium',
      status: 'pending',
      assignedTo: user?.id || '',
      dueTime: '13:15',
      estimatedDuration: 15
    },
    {
      id: 'task_004',
      type: 'housekeeping',
      title: 'Laundry Collection',
      description: 'Collect laundry from guest room',
      room: '118',
      priority: 'low',
      status: 'completed',
      assignedTo: user?.id || '',
      dueTime: '11:00',
      estimatedDuration: 10
    }
  ];

  const stats = {
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    urgent: tasks.filter(t => t.priority === 'urgent').length,
  };

  const taskIcons = {
    housekeeping: Bed,
    maintenance: Wrench,
    guest_service: Coffee,
    front_desk: Phone
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800'
  };

  const statusColors = {
    pending: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800'
  };

  const filteredTasks = selectedFilter === 'all' 
    ? tasks 
    : tasks.filter(task => task.type === selectedFilter);

  const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    // In real app, this would be an API call
    console.log(`Updating task ${taskId} to status ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome, {user?.name}!
          </h1>
          <p className="text-muted-foreground">
            Here are your tasks and assignments for today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-soft border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Tasks</p>
                  <p className="text-2xl font-bold">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold">{stats.inProgress}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">{stats.completed}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Urgent</p>
                  <p className="text-2xl font-bold">{stats.urgent}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Task Filters */}
          <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle>Task Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant={selectedFilter === 'all' ? 'hotel' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setSelectedFilter('all')}
              >
                <Users className="mr-2 h-4 w-4" />
                All Tasks ({tasks.length})
              </Button>
              <Button
                variant={selectedFilter === 'housekeeping' ? 'hotel' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setSelectedFilter('housekeeping')}
              >
                <Bed className="mr-2 h-4 w-4" />
                Housekeeping ({tasks.filter(t => t.type === 'housekeeping').length})
              </Button>
              <Button
                variant={selectedFilter === 'maintenance' ? 'hotel' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setSelectedFilter('maintenance')}
              >
                <Wrench className="mr-2 h-4 w-4" />
                Maintenance ({tasks.filter(t => t.type === 'maintenance').length})
              </Button>
              <Button
                variant={selectedFilter === 'guest_service' ? 'hotel' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setSelectedFilter('guest_service')}
              >
                <Coffee className="mr-2 h-4 w-4" />
                Guest Service ({tasks.filter(t => t.type === 'guest_service').length})
              </Button>
              <Button
                variant={selectedFilter === 'front_desk' ? 'hotel' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setSelectedFilter('front_desk')}
              >
                <Phone className="mr-2 h-4 w-4" />
                Front Desk ({tasks.filter(t => t.type === 'front_desk').length})
              </Button>
            </CardContent>
          </Card>

          {/* Tasks List */}
          <div className="lg:col-span-3">
            <Card className="shadow-soft border-0">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Task List
                  <Button variant="luxury" size="sm">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Request Help
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredTasks.map((task) => {
                    const TaskIcon = taskIcons[task.type];
                    return (
                      <div key={task.id} className="p-4 border rounded-lg bg-card">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-muted rounded-lg">
                              <TaskIcon className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{task.title}</h3>
                              <p className="text-sm text-muted-foreground">{task.description}</p>
                              {task.room && (
                                <div className="flex items-center gap-1 mt-1">
                                  <MapPin className="h-3 w-3 text-muted-foreground" />
                                  <span className="text-xs text-muted-foreground">Room {task.room}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 items-end">
                            <Badge className={priorityColors[task.priority]}>
                              {task.priority.toUpperCase()}
                            </Badge>
                            <Badge className={statusColors[task.status]}>
                              {task.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Due: {task.dueTime}
                            </div>
                            <div>
                              Est. {task.estimatedDuration} min
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            {task.status === 'pending' && (
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => updateTaskStatus(task.id, 'in_progress')}
                              >
                                Start Task
                              </Button>
                            )}
                            {task.status === 'in_progress' && (
                              <Button
                                size="sm"
                                variant="success"
                                onClick={() => updateTaskStatus(task.id, 'completed')}
                              >
                                <CheckCircle2 className="mr-1 h-3 w-3" />
                                Complete
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}