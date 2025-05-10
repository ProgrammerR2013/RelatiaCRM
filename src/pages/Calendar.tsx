
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AddEventModal from '@/components/modals/AddEventModal';
import { getFromLocalStorage, saveToLocalStorage, STORAGE_KEYS } from '@/utils/localStorage';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
}

const CalendarPage = () => {
  const { toast } = useToast();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  // Load events from local storage on initial render
  useEffect(() => {
    const savedEvents = getFromLocalStorage<Event[]>(STORAGE_KEYS.EVENTS, []);
    setEvents(savedEvents);
  }, []);

  // Save events to local storage when they change
  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.EVENTS, events);
  }, [events]);

  const handleAddEvent = () => {
    setIsAddModalOpen(true);
  };

  const handleEventAdded = (newEvent: Event) => {
    setEvents([newEvent, ...events]);
  };

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      const formattedDate = newDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      toast({
        title: `Selected ${formattedDate}`,
        description: "You can add events on this date",
      });
    }
  };

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
                onSelect={handleDateSelect}
                className="rounded-md border shadow p-3 pointer-events-auto"
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Upcoming Events</h3>
                <Button variant="outline" size="sm" onClick={handleAddEvent}>
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Add Event
                </Button>
              </div>
              <div className="space-y-4">
                {events.length > 0 ? (
                  events.map((event) => (
                    <EventItem
                      key={event.id}
                      title={event.title}
                      date={event.date}
                      time={event.time}
                    />
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    No events scheduled
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <AddEventModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onEventAdded={handleEventAdded}
        selectedDate={date}
      />
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
    <div className="border-l-2 border-primary pl-4 py-2 hover:bg-muted/50 rounded-r cursor-pointer transition-colors">
      <h4 className="font-medium">{title}</h4>
      <div className="text-sm text-muted-foreground space-y-1">
        <p>{date}</p>
        <p>{time}</p>
      </div>
    </div>
  );
};

export default CalendarPage;
