
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, Instagram, Twitter, Facebook, Plus, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format, addMonths, subMonths, isSameDay } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

interface CalendarEvent {
  day: number;
  platform: 'twitter' | 'instagram' | 'facebook' | 'all';
  time: string;
  title: string;
  description?: string;
  assignee?: string;
}

interface ScheduleType {
  [key: number]: CalendarEvent[];
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showEventDialog, setShowEventDialog] = useState<boolean>(false);
  const [eventDetails, setEventDetails] = useState<Partial<CalendarEvent>>({
    platform: 'twitter',
    title: '',
    time: '',
    description: '',
  });
  
  const monthName = format(currentDate, 'MMMM');
  const year = currentDate.getFullYear();
  
  const [schedule, setSchedule] = useState<ScheduleType>({
    3: [{ day: 3, platform: 'twitter', time: '09:30 AM', title: 'Product Update' }],
    8: [{ day: 8, platform: 'instagram', time: '11:00 AM', title: 'Team Highlight' }],
    12: [
      { day: 12, platform: 'facebook', time: '10:00 AM', title: 'Customer Story', assignee: 'Sarah Johnson' },
      { day: 12, platform: 'twitter', time: '02:30 PM', title: 'Industry News' },
    ],
    15: [{ day: 15, platform: 'instagram', time: '03:15 PM', title: 'Product Showcase', description: 'New feature launch with product demo' }],
    21: [{ day: 21, platform: 'facebook', time: '11:45 AM', title: 'Community Update', assignee: 'Mike Chen' }],
  });
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => 
      direction === 'next' ? addMonths(prev, 1) : subMonths(prev, 1)
    );
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const getDayEvents = (day: number): CalendarEvent[] => {
    return schedule[day] || [];
  };

  const getSelectedDayEvents = (): CalendarEvent[] => {
    if (!selectedDate) return [];
    const day = selectedDate.getDate();
    return getDayEvents(day);
  };

  const addEvent = () => {
    if (!selectedDate || !eventDetails.title || !eventDetails.time) {
      toast.error("Please fill in all required fields");
      return;
    }

    const day = selectedDate.getDate();
    const newEvent: CalendarEvent = {
      day,
      platform: eventDetails.platform as 'twitter' | 'instagram' | 'facebook' | 'all',
      time: eventDetails.time,
      title: eventDetails.title,
      description: eventDetails.description,
      assignee: eventDetails.assignee
    };

    setSchedule(prev => {
      const updatedEvents = {...prev};
      if (updatedEvents[day]) {
        updatedEvents[day] = [...updatedEvents[day], newEvent];
      } else {
        updatedEvents[day] = [newEvent];
      }
      return updatedEvents;
    });

    setEventDetails({
      platform: 'twitter',
      title: '',
      time: '',
      description: '',
    });
    setShowEventDialog(false);
    toast.success("Event added successfully");
  };
  
  const renderPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return <Twitter className="h-3 w-3 text-blue-500" aria-hidden="true" />;
      case 'instagram':
        return <Instagram className="h-3 w-3 text-pink-500" aria-hidden="true" />;
      case 'facebook':
        return <Facebook className="h-3 w-3 text-blue-700" aria-hidden="true" />;
      case 'all':
        return (
          <div className="flex -space-x-1">
            <Twitter className="h-3 w-3 text-blue-500" aria-hidden="true" />
            <Instagram className="h-3 w-3 text-pink-500" aria-hidden="true" />
            <Facebook className="h-3 w-3 text-blue-700" aria-hidden="true" />
          </div>
        );
      default:
        return null;
    }
  };

  // Custom day rendering for the Calendar component
  const renderDay = (day: Date) => {
    const isToday = isSameDay(day, new Date());
    const dayEvents = getDayEvents(day.getDate());
    const hasEvents = dayEvents.length > 0;
    
    return (
      <div 
        className={cn(
          "relative h-10 w-10 p-0 font-normal aria-selected:opacity-100",
          isToday && "bg-accent text-accent-foreground font-semibold",
          hasEvents && "after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-1 after:rounded-full after:bg-primary"
        )}
      >
        {day.getDate()}
      </div>
    );
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Content Calendar</h1>
          <p className="text-muted-foreground mt-1">Schedule and manage your content across platforms</p>
        </div>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="hidden md:flex gap-2" onClick={() => setSelectedDate(new Date())}>
                  <CalendarIcon className="h-4 w-4" />
                  Today
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Jump to today
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
            <DialogTrigger asChild>
              <Button className="gap-2 transition-all hover:bg-primary/90">
                <Plus className="h-4 w-4" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Schedule New Content</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title" className="text-left">Title</Label>
                  <Input 
                    id="title" 
                    placeholder="Enter post title" 
                    value={eventDetails.title}
                    onChange={(e) => setEventDetails({...eventDetails, title: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="platform" className="text-left">Platform</Label>
                    <Select 
                      onValueChange={(value) => setEventDetails({...eventDetails, platform: value as any})}
                      defaultValue={eventDetails.platform}
                    >
                      <SelectTrigger id="platform">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="twitter">Twitter</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="all">All Platforms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="time" className="text-left">Time</Label>
                    <Input 
                      id="time" 
                      placeholder="e.g., 10:30 AM" 
                      value={eventDetails.time}
                      onChange={(e) => setEventDetails({...eventDetails, time: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description" className="text-left">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Enter post description" 
                    value={eventDetails.description || ''}
                    onChange={(e) => setEventDetails({...eventDetails, description: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="assignee" className="text-left">Assigned To</Label>
                  <Input 
                    id="assignee" 
                    placeholder="Team member name" 
                    value={eventDetails.assignee || ''}
                    onChange={(e) => setEventDetails({...eventDetails, assignee: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={addEvent}>Add Event</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{monthName} {year}</CardTitle>
              <CardDescription>Content schedule for this month</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => navigateMonth('prev')}>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous month</span>
              </Button>
              <Button size="sm" variant="outline" onClick={() => navigateMonth('next')}>
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next month</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-7 divide-x divide-y divide-border">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-medium py-2 text-sm">
                {day}
              </div>
            ))}
          </div>
          <div>
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              month={currentDate}
              className="border-0"
              components={{
                Day: ({ date }) => renderDay(date)
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
          </CardTitle>
          {getSelectedDayEvents().length > 0 && (
            <CardDescription>
              {getSelectedDayEvents().length} content items scheduled
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {getSelectedDayEvents().length > 0 ? (
            <div className="space-y-4">
              {getSelectedDayEvents().map((event, idx) => (
                <div key={idx} className="p-4 rounded-lg border transition-all hover:shadow-md">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      {renderPlatformIcon(event.platform)}
                      <span className="font-medium">{event.title}</span>
                    </div>
                    <Badge variant="outline">{event.time}</Badge>
                  </div>
                  {event.description && (
                    <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                  )}
                  {event.assignee && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-3">
                      <Users className="h-3 w-3" />
                      <span>Assigned to {event.assignee}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-3" />
              <h3 className="text-lg font-medium mb-1">No Content Scheduled</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {selectedDate ? 'No content planned for this day.' : 'Select a date to view scheduled content.'}
              </p>
              {selectedDate && (
                <Button 
                  onClick={() => setShowEventDialog(true)}
                  variant="outline"
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Schedule Content
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Calendar;
