
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';
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
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  // Load events from local storage on initial render
  useEffect(() => {
    const savedEvents = getFromLocalStorage<Event[]>(STORAGE_KEYS.EVENTS, []);
    setEvents(savedEvents);
    filterEventsByDate(savedEvents, date);
  }, []);

  // Save events to local storage when they change
  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.EVENTS, events);
  }, [events]);

  // Filter events when date changes
  useEffect(() => {
    filterEventsByDate(events, date);
  }, [date, events]);

  const filterEventsByDate = (allEvents: Event[], selectedDate?: Date) => {
    if (!selectedDate) {
      setFilteredEvents(allEvents);
      return;
    }

    const dateStr = selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const filtered = allEvents.filter(event => event.date === dateStr);
    setFilteredEvents(filtered);
  };

  const handleAddEvent = () => {
    setIsAddModalOpen(true);
  };

  const handleEventAdded = (newEvent: Event) => {
    setEvents([newEvent, ...events]);
    toast({
      title: "Event Added",
      description: `${newEvent.title} added to your calendar`,
    });
  };

  const handleDeleteEvent = (id: number) => {
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
    toast({
      title: "Event Deleted",
      description: "Event has been removed from your calendar",
    });
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
                <h3 className="text-lg font-medium">
                  {date ? date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "Upcoming Events"}
                </h3>
                <Button variant="outline" size="sm" onClick={handleAddEvent}>
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Add Event
                </Button>
              </div>
              <div className="space-y-4">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <EventItem
                      key={event.id}
                      id={event.id}
                      title={event.title}
                      date={event.date}
                      time={event.time}
                      onDelete={handleDeleteEvent}
                    />
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    No events scheduled for {date?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
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
  id: number;
  title: string;
  date: string;
  time: string;
  onDelete: (id: number) => void;
}

const EventItem: React.FC<EventItemProps> = ({ id, title, date, time, onDelete }) => {
  return (
    <div className="border-l-2 border-primary pl-4 py-2 hover:bg-muted/50 rounded-r group">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{title}</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>{date}</p>
            <p>{time}</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onDelete(id)} 
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    </div>
  );
};

export default CalendarPage;
