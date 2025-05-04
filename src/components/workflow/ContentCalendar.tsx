
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { ChevronLeft, ChevronRight, Plus, Twitter, Instagram, Facebook, FileText, Clock, Calendar as CalendarIcon, User } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format, addDays, isSameDay, isAfter, parseISO, isToday, isSameMonth } from 'date-fns';
import { toast } from '@/components/ui/sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Sample content calendar data
const initialEvents = [
  {
    id: 1,
    title: "Product Launch Tweet",
    description: "Announcing the new feature release",
    platform: "twitter",
    date: "2024-05-05T09:30:00",
    status: "scheduled",
    author: "Jane Cooper"
  },
  {
    id: 2,
    title: "Company Culture Post",
    description: "Behind the scenes at our quarterly meeting",
    platform: "instagram",
    date: "2024-05-06T12:00:00",
    status: "draft",
    author: "Wade Warren"
  },
  {
    id: 3,
    title: "Industry Report",
    description: "Sharing our annual industry insights report",
    platform: "linkedin",
    date: "2024-05-08T14:45:00",
    status: "scheduled",
    author: "Cameron Williamson"
  },
  {
    id: 4,
    title: "Customer Spotlight",
    description: "Featuring our customer success story",
    platform: "facebook",
    date: "2024-05-10T10:15:00",
    status: "scheduled",
    author: "Esther Howard"
  },
  {
    id: 5,
    title: "Product Tips Thread",
    description: "5 tips to get the most out of our product",
    platform: "twitter",
    date: "2024-05-12T11:00:00",
    status: "draft",
    author: "Jane Cooper"
  },
  {
    id: 6,
    title: "Team Introduction",
    description: "Meet the engineering team behind our latest release",
    platform: "instagram",
    date: "2024-05-15T16:30:00",
    status: "scheduled",
    author: "Wade Warren"
  }
];

interface ContentEvent {
  id: number;
  title: string;
  description: string;
  platform: string;
  date: string;
  status: string;
  author: string;
}

const ContentCalendar: React.FC = () => {
  const [events, setEvents] = useState<ContentEvent[]>(initialEvents);
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<ContentEvent | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    platform: 'twitter',
    date: '',
    time: '',
    author: 'You'
  });
  
  // Handle event creation
  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) {
      toast.error("Please fill in all required fields");
      return;
    }

    const event = {
      id: events.length + 1,
      title: newEvent.title,
      description: newEvent.description,
      platform: newEvent.platform,
      date: `${newEvent.date}T${newEvent.time}:00`,
      status: "draft",
      author: newEvent.author
    };

    setEvents([...events, event]);
    setNewEvent({
      title: '',
      description: '',
      platform: 'twitter',
      date: '',
      time: '',
      author: 'You'
    });
    toast.success("Event created successfully!");
  };

  // Filter events for the selected date
  const eventsForSelectedDate = selectedDate 
    ? events.filter(event => isSameDay(parseISO(event.date), selectedDate))
    : [];

  // Handle date navigation
  const handlePreviousMonth = () => {
    const previousMonth = new Date(date);
    previousMonth.setMonth(date.getMonth() - 1);
    setDate(previousMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(date);
    nextMonth.setMonth(date.getMonth() + 1);
    setDate(nextMonth);
  };

  // Platform icon mapping
  const getPlatformIcon = (platform: string) => {
    switch(platform) {
      case 'twitter':
        return <Twitter className="h-4 w-4 text-blue-500" />;
      case 'instagram':
        return <Instagram className="h-4 w-4 text-pink-500" />;
      case 'facebook':
        return <Facebook className="h-4 w-4 text-indigo-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getPlatformClass = (platform: string) => {
    switch(platform) {
      case 'twitter':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'instagram':
        return 'bg-pink-50 text-pink-700 border-pink-200';
      case 'facebook':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  // Calculate event count for each day to show in the calendar
  const getDayEventCount = (day: Date) => {
    return events.filter(event => isSameDay(parseISO(event.date), day)).length;
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Content Calendar</h3>
          <p className="text-sm text-muted-foreground">
            Schedule and visualize your content posting plan
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <Plus className="h-4 w-4" /> Add Content
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule New Content</DialogTitle>
              <DialogDescription>
                Add new content to your publishing calendar
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="event-title">Title</Label>
                <Input 
                  id="event-title" 
                  placeholder="Enter content title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-description">Description</Label>
                <Textarea 
                  id="event-description" 
                  placeholder="Enter content description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-platform">Platform</Label>
                <Select 
                  value={newEvent.platform} 
                  onValueChange={(value) => setNewEvent({...newEvent, platform: value})}
                >
                  <SelectTrigger id="event-platform">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="event-date">Date</Label>
                  <Input 
                    id="event-date" 
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-time">Time</Label>
                  <Input 
                    id="event-time" 
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-assignee">Assign To</Label>
                <Select 
                  value={newEvent.author} 
                  onValueChange={(value) => setNewEvent({...newEvent, author: value})}
                >
                  <SelectTrigger id="event-assignee">
                    <SelectValue placeholder="Select team member" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="You">You</SelectItem>
                    <SelectItem value="Jane Cooper">Jane Cooper</SelectItem>
                    <SelectItem value="Wade Warren">Wade Warren</SelectItem>
                    <SelectItem value="Cameron Williamson">Cameron Williamson</SelectItem>
                    <SelectItem value="Esther Howard">Esther Howard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={handleCreateEvent}>Schedule Content</Button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">{format(date, 'MMMM yyyy')}</h3>
              <div className="flex gap-1">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={handlePreviousMonth}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={handleNextMonth}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={date}
              onMonthChange={setDate}
              className="rounded-md border"
              components={{
                Day: ({ day, ...props }) => {
                  const eventCount = getDayEventCount(day);
                  const hasEvents = eventCount > 0;
                  
                  // Today's date style
                  const isCurrentDay = isToday(day);
                  // Past dates style
                  const isPastDay = isAfter(new Date(), day) && !isToday(day);
                  // Date not in current month
                  const isOutsideMonth = !isSameMonth(day, date);
                  
                  return (
                    <div
                      {...props}
                      className={`relative h-9 w-9 p-0 font-normal aria-selected:opacity-100 ${
                        isPastDay ? 'text-muted-foreground' : ''
                      } ${isOutsideMonth ? 'text-muted-foreground/50' : ''}`}
                    >
                      <div className={`flex h-full w-full items-center justify-center rounded-full ${
                        isCurrentDay ? 'bg-primary text-primary-foreground' : ''
                      }`}>
                        {format(day, 'd')}
                      </div>
                      {hasEvents && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                          <div className="flex items-center gap-0.5">
                            {eventCount > 3 ? (
                              <Badge variant="secondary" className="h-1.5 px-1 py-0 text-[8px]">{eventCount}</Badge>
                            ) : (
                              Array.from({ length: eventCount }).map((_, i) => (
                                <div 
                                  key={i} 
                                  className="h-1 w-1 rounded-full bg-primary"
                                ></div>
                              ))
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                }
              }}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">
                {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
              </h3>
              {isToday(selectedDate!) && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Today
                </Badge>
              )}
            </div>
            
            {eventsForSelectedDate.length > 0 ? (
              <div className="space-y-3">
                {eventsForSelectedDate.map(event => (
                  <div 
                    key={event.id} 
                    className={`border rounded-lg p-3 cursor-pointer ${getPlatformClass(event.platform)}`}
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getPlatformIcon(event.platform)}
                        <Badge variant={event.status === 'scheduled' ? 'default' : 'outline'}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </Badge>
                      </div>
                      <span className="text-xs">
                        {format(parseISO(event.date), 'h:mm a')}
                      </span>
                    </div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm mt-1">{event.description}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs">
                      <User className="h-3 w-3" />
                      <span>{event.author}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CalendarIcon className="h-12 w-12 text-muted-foreground/30 mb-3" />
                {selectedDate ? (
                  <>
                    <p className="text-muted-foreground">No content scheduled for this date</p>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => {
                        const dialogTrigger = document.querySelector('[data-state="closed"]') as HTMLButtonElement;
                        if (dialogTrigger) dialogTrigger.click();
                      }}
                    >
                      + Add content
                    </Button>
                  </>
                ) : (
                  <p className="text-muted-foreground">Select a date to view scheduled content</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {selectedEvent && (
        <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedEvent.title}</DialogTitle>
              <DialogDescription>
                Scheduled for {format(parseISO(selectedEvent.date), 'MMMM d, yyyy h:mm a')}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className={getPlatformClass(selectedEvent.platform)}>
                  {getPlatformIcon(selectedEvent.platform)}
                  <span className="ml-1">{selectedEvent.platform.charAt(0).toUpperCase() + selectedEvent.platform.slice(1)}</span>
                </Badge>
                <Badge variant={selectedEvent.status === 'scheduled' ? 'default' : 'outline'}>
                  {selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <p className="font-medium text-sm">Description</p>
                <p className="text-muted-foreground text-sm">{selectedEvent.description}</p>
              </div>
              
              <div className="space-y-1">
                <p className="font-medium text-sm">Assigned To</p>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-[10px]">
                      {selectedEvent.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{selectedEvent.author}</span>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedEvent(null)}>Close</Button>
                <Button>Edit Content</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ContentCalendar;
