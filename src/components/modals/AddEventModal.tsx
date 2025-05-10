
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const eventSchema = z.object({
  title: z.string().min(1, "Event title is required"),
  date: z.date({
    required_error: "Event date is required",
  }),
  isAllDay: z.boolean().default(false),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
});

type EventFormValues = z.infer<typeof eventSchema>;

interface AddEventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEventAdded: (event: any) => void;
  selectedDate?: Date;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ 
  open, 
  onOpenChange, 
  onEventAdded,
  selectedDate 
}) => {
  const { toast } = useToast();
  
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      date: selectedDate || new Date(),
      isAllDay: false,
      startTime: "09:00",
      endTime: "10:00",
    },
  });

  const watchIsAllDay = form.watch("isAllDay");

  const onSubmit = (data: EventFormValues) => {
    const formattedDate = format(data.date, 'yyyy-MM-dd');
    let formattedTime = "All day";
    
    if (!data.isAllDay && data.startTime && data.endTime) {
      formattedTime = `${data.startTime} - ${data.endTime}`;
    }
    
    const newEvent = {
      id: Date.now(),
      title: data.title,
      date: formattedDate,
      displayDate: format(data.date, 'MMMM d, yyyy'),
      time: formattedTime
    };
    
    // Add to localStorage
    const events = getFromLocalStorage(STORAGE_KEYS.EVENTS, []);
    events.push(newEvent);
    saveToLocalStorage(STORAGE_KEYS.EVENTS, events);
    
    onEventAdded(newEvent);
    form.reset({
      title: "",
      date: selectedDate || new Date(),
      isAllDay: false,
      startTime: "09:00",
      endTime: "10:00",
    });
    onOpenChange(false);
    
    toast({
      title: "Event added",
      description: `${data.title} has been added to your calendar`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
          <DialogDescription>
            Create a new event for your calendar.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Client Meeting" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="isAllDay"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange} 
                    />
                  </FormControl>
                  <FormLabel>All Day Event</FormLabel>
                </FormItem>
              )}
            />
            
            {!watchIsAllDay && (
              <div className="flex space-x-4">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Event</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventModal;
