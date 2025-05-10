
import React from 'react';
import Header from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';

const CalendarPage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Calendar" />
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border shadow p-3 pointer-events-auto"
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Upcoming Events</h3>
              <div className="space-y-4">
                <EventItem
                  title="Client Meeting - ABC Corp"
                  date="May 15, 2025"
                  time="10:00 AM - 11:00 AM"
                />
                <EventItem
                  title="Project Deadline - Website Redesign"
                  date="May 20, 2025"
                  time="11:59 PM"
                />
                <EventItem
                  title="Team Weekly Sync"
                  date="May 12, 2025"
                  time="9:00 AM - 10:00 AM"
                />
                <EventItem
                  title="Invoice Payment Due - XYZ Tech"
                  date="May 25, 2025"
                  time="All day"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

interface EventItemProps {
  title: string;
  date: string;
  time: string;
}

const EventItem: React.FC<EventItemProps> = ({ title, date, time }) => {
  return (
    <div className="border-l-2 border-primary pl-4 py-2">
      <h4 className="font-medium">{title}</h4>
      <div className="text-sm text-muted-foreground space-y-1">
        <p>{date}</p>
        <p>{time}</p>
      </div>
    </div>
  );
};

export default CalendarPage;
