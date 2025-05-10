
import React, { useEffect, useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getFromLocalStorage, STORAGE_KEYS } from '@/utils/localStorage';

interface Task {
  id: number;
  title: string;
  dueDate: string;
  client: string;
  status: string;
}

const UpcomingTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Get data from localStorage
    const projects = getFromLocalStorage(STORAGE_KEYS.PROJECTS, []);
    const events = getFromLocalStorage(STORAGE_KEYS.EVENTS, []);
    const invoices = getFromLocalStorage(STORAGE_KEYS.INVOICES, []);
    
    const combinedTasks: Task[] = [];
    
    // Add projects as tasks
    projects.forEach(project => {
      combinedTasks.push({
        id: project.id,
        title: `Project: ${project.name}`,
        dueDate: project.deadline,
        client: project.client,
        status: project.status
      });
    });
    
    // Add events as tasks
    events.forEach(event => {
      combinedTasks.push({
        id: event.id,
        title: event.title,
        dueDate: new Date(event.date).toISOString().split('T')[0], // Convert to YYYY-MM-DD
        client: 'Calendar Event',
        status: new Date(event.date) < new Date() ? 'completed' : 'not-started'
      });
    });
    
    // Add invoices as tasks
    invoices.forEach(invoice => {
      combinedTasks.push({
        id: invoice.id,
        title: `Invoice #${invoice.id}`,
        dueDate: invoice.dueDate,
        client: invoice.client,
        status: invoice.status === 'paid' ? 'completed' : 
                invoice.status === 'pending' ? 'in-progress' : 
                invoice.status === 'overdue' ? 'overdue' : 'not-started'
      });
    });
    
    // Sort by date (upcoming first) and limit to 5 items
    const sortedTasks = combinedTasks
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      .slice(0, 5);
    
    setTasks(sortedTasks);
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'No date';
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
        {tasks.length > 0 ? (
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
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            No upcoming tasks. Add clients, projects or events to see them here.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingTasks;
