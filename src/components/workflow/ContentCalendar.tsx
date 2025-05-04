
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar as CalendarComponent,
  CalendarProps 
} from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format, isSameDay } from 'date-fns';
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  Calendar as CalendarIcon, 
  Clock, 
  Edit,
  Trash,
  User,
  Calendar,
  Plus,
  Check,
  X
} from 'lucide-react';

interface ContentEvent {
  id: string;
  date: Date;
  title: string;
  description: string;
  platform: 'twitter' | 'instagram' | 'facebook' | 'all';
  status: 'draft' | 'scheduled' | 'published';
  assignedTo?: string;
}

const ContentCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<ContentEvent[]>([
    {
      id: '1',
      date: new Date(),
      title: 'Product Launch Announcement',
      description: 'Announcing our newest product feature release with promotional graphics.',
      platform: 'all',
      status: 'scheduled',
      assignedTo: 'Sarah Johnson'
    },
    {
      id: '2',
      date: new Date(),
      title: 'Industry Insights Blog',
      description: 'Share latest blog post about industry trends.',
      platform: 'twitter',
      status: 'draft',
      assignedTo: 'Michael Chen'
    },
    {
      id: '3',
      date: new Date(Date.now() + 86400000), // Tomorrow
      title: 'Customer Spotlight',
      description: 'Feature customer testimonial with quote and product photos.',
      platform: 'instagram',
      status: 'scheduled',
      assignedTo: 'Jessica Williams'
    }
  ]);
  const [showAddEventDialog, setShowAddEventDialog] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<ContentEvent>>({
    date: new Date(),
    platform: 'twitter',
    status: 'draft'
  });

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const getEventsForSelectedDate = () => {
    if (!selectedDate) return [];
    return events.filter(event => isSameDay(event.date, selectedDate));
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.description || !newEvent.date) {
      return;
    }

    const event: ContentEvent = {
      id: Math.random().toString(36).substring(2, 9),
      date: newEvent.date || new Date(),
      title: newEvent.title || '',
      description: newEvent.description || '',
      platform: newEvent.platform as ContentEvent['platform'] || 'twitter',
      status: newEvent.status as ContentEvent['status'] || 'draft',
      assignedTo: newEvent.assignedTo
    };

    setEvents([...events, event]);
    setShowAddEventDialog(false);
    setNewEvent({
      date: selectedDate,
      platform: 'twitter',
      status: 'draft'
    });
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const renderPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return <Twitter className="h-4 w-4 text-blue-500" />;
      case 'instagram':
        return <Instagram className="h-4 w-4 text-pink-500" />;
      case 'facebook':
        return <Facebook className="h-4 w-4 text-blue-700" />;
      case 'all':
        return (
          <div className="flex -space-x-1">
            <Twitter className="h-4 w-4 text-blue-500" />
            <Instagram className="h-4 w-4 text-pink-500" />
            <Facebook className="h-4 w-4 text-blue-700" />
          </div>
        );
      default:
        return null;
    }
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      case 'scheduled':
        return <Badge variant="secondary">Scheduled</Badge>;
      case 'published':
        return <Badge variant="default">Published</Badge>;
      default:
        return null;
    }
  };

  // Custom day renderer for the calendar to show event indicators
  const renderCalendarDay = (day: Date, selectedDays: Date[], properties: any) => {
    const dayEvents = events.filter(event => isSameDay(event.date, day));
    const hasEvents = dayEvents.length > 0;
    
    return (
      <div
        {...properties}
        className={`relative ${properties.className}`}
      >
        {properties.children}
        {hasEvents && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
            {dayEvents.slice(0, 3).map((_, i) => (
              <div key={i} className="h-1 w-1 rounded-full bg-primary" />
            ))}
            {dayEvents.length > 3 && (
              <div className="h-1 w-1 rounded-full bg-primary opacity-50" />
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold">Content Calendar</h2>
        <Dialog open={showAddEventDialog} onOpenChange={setShowAddEventDialog}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              Add Content
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule New Content</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="event-title">Title</Label>
                <Input 
                  id="event-title" 
                  placeholder="Enter content title" 
                  value={newEvent.title || ''}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="event-desc">Description</Label>
                <Textarea 
                  id="event-desc" 
                  placeholder="Enter content description"
                  value={newEvent.description || ''}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Platform</Label>
                <div className="flex gap-2">
                  <Button 
                    type="button"
                    variant={newEvent.platform === 'twitter' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNewEvent({ ...newEvent, platform: 'twitter' })}
                  >
                    <Twitter className="h-4 w-4 mr-1" />
                    Twitter
                  </Button>
                  <Button 
                    type="button"
                    variant={newEvent.platform === 'instagram' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNewEvent({ ...newEvent, platform: 'instagram' })}
                  >
                    <Instagram className="h-4 w-4 mr-1" />
                    Instagram
                  </Button>
                  <Button 
                    type="button"
                    variant={newEvent.platform === 'facebook' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNewEvent({ ...newEvent, platform: 'facebook' })}
                  >
                    <Facebook className="h-4 w-4 mr-1" />
                    Facebook
                  </Button>
                  <Button 
                    type="button"
                    variant={newEvent.platform === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNewEvent({ ...newEvent, platform: 'all' })}
                  >
                    All
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Status</Label>
                <div className="flex gap-2">
                  <Button 
                    type="button"
                    variant={newEvent.status === 'draft' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNewEvent({ ...newEvent, status: 'draft' })}
                  >
                    Draft
                  </Button>
                  <Button 
                    type="button"
                    variant={newEvent.status === 'scheduled' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNewEvent({ ...newEvent, status: 'scheduled' })}
                  >
                    Scheduled
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="event-assigned">Assigned To</Label>
                <Input 
                  id="event-assigned" 
                  placeholder="Enter team member name"
                  value={newEvent.assignedTo || ''}
                  onChange={(e) => setNewEvent({ ...newEvent, assignedTo: e.target.value })}
                />
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setShowAddEventDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddEvent}>
                  Add Content
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        <Card className="md:col-span-3">
          <CardContent className="pt-6">
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-md border"
              components={{
                // Using the modified component structure
                Day: (props: any) => renderCalendarDay(props.date, props.selected, props)
              }}
            />
          </CardContent>
        </Card>
        
        <Card className="md:col-span-4">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
              </h3>
              {selectedDate && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setNewEvent({
                      ...newEvent,
                      date: selectedDate
                    });
                    setShowAddEventDialog(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              )}
            </div>
            
            <ScrollArea className="h-[400px] pr-4">
              {getEventsForSelectedDate().length > 0 ? (
                <div className="space-y-3">
                  {getEventsForSelectedDate().map((event) => (
                    <div key={event.id} className="border rounded-lg p-3 relative">
                      <div className="absolute right-2 top-2 flex gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 text-destructive"
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1">
                          {renderPlatformIcon(event.platform)}
                          <span className="font-medium">{event.title}</span>
                        </div>
                        {renderStatusBadge(event.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                      {event.assignedTo && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <User className="h-3 w-3" />
                          <span>{event.assignedTo}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                  <Calendar className="h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="font-medium">No Content Scheduled</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedDate ? 'No content planned for this day.' : 'Select a date to view or add content.'}
                  </p>
                  {selectedDate && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-4" 
                      onClick={() => {
                        setNewEvent({
                          ...newEvent,
                          date: selectedDate
                        });
                        setShowAddEventDialog(true);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Content
                    </Button>
                  )}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentCalendar;
