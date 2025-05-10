
import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const UpcomingTasks = () => {
  const tasks = [
    {
      id: 1,
      title: 'Client Meeting - ABC Corp',
      dueDate: '2025-05-15',
      client: 'ABC Corporation',
      status: 'not-started',
    },
    {
      id: 2,
      title: 'Design Homepage - XYZ Tech',
      dueDate: '2025-05-12',
      client: 'XYZ Technologies',
      status: 'in-progress',
    },
    {
      id: 3,
      title: 'Invoice #INV-001 - ABC Corp',
      dueDate: '2025-05-11',
      client: 'ABC Corporation',
      status: 'completed',
    },
    {
      id: 4,
      title: 'Project Proposal - New Client',
      dueDate: '2025-05-09',
      client: 'Potential Client',
      status: 'overdue',
    },
  ];

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Helper function to determine status label
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'not-started': return 'Not Started';
      case 'overdue': return 'Overdue';
      default: return status;
    }
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-primary" />
          Upcoming Tasks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
              <div className="space-y-1">
                <p className="font-medium">{task.title}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>{task.client}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className={`status-badge ${task.status}`}>
                  {getStatusLabel(task.status)}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>{formatDate(task.dueDate)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingTasks;
