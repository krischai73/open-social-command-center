
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calendar as CalendarIcon, 
  Instagram, 
  Twitter, 
  Facebook, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Users,
  LayoutGrid,
  List,
  LayoutList,
  Calendar as CalendarLucide,
  Clock,
  Tag,
  Eye,
  Pencil,
  MoveHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format, addMonths, subMonths, isSameDay, isBefore, isAfter } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface CalendarEvent {
  id: string;
  day: number;
  month: number;
  year: number;
  platform: 'twitter' | 'instagram' | 'facebook' | 'all';
  time: string;
  title: string;
  description?: string;
  assignee?: string;
  campaign?: string;
  contentType?: 'image' | 'video' | 'article' | 'poll' | 'story';
  aiRecommended?: boolean;
  engagementPrediction?: 'high' | 'medium' | 'low';
  previewImage?: string;
}

interface ScheduleType {
  [key: number]: CalendarEvent[];
}

interface Campaign {
  id: string;
  name: string;
  color: string;
}

interface ContentType {
  id: string;
  name: string;
  color: string;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showEventDialog, setShowEventDialog] = useState<boolean>(false);
  const [draggedEvent, setDraggedEvent] = useState<CalendarEvent | null>(null);
  const [view, setView] = useState<'month' | 'week' | 'day' | 'list' | 'kanban'>('month');
  const [eventDetails, setEventDetails] = useState<Partial<CalendarEvent>>({
    platform: 'twitter',
    title: '',
    time: '',
    description: '',
    contentType: 'image',
    engagementPrediction: 'medium',
  });
  
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { id: '1', name: 'Summer Campaign', color: '#8B5CF6' },
    { id: '2', name: 'Product Launch', color: '#F97316' },
    { id: '3', name: 'Holiday Special', color: '#0EA5E9' },
  ]);
  
  const [contentTypes, setContentTypes] = useState<ContentType[]>([
    { id: '1', name: 'Image', color: '#D946EF' },
    { id: '2', name: 'Video', color: '#F97316' },
    { id: '3', name: 'Article', color: '#0EA5E9' },
    { id: '4', name: 'Poll', color: '#8B5CF6' },
    { id: '5', name: 'Story', color: '#10B981' },
  ]);
  
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  const monthName = format(currentDate, 'MMMM');
  const year = currentDate.getFullYear();
  
  // Generate a unique ID
  const generateId = () => Math.random().toString(36).substring(2, 9);
  
  // Initial schedule data with enhanced properties
  const [schedule, setSchedule] = useState<ScheduleType>({
    3: [
      { 
        id: generateId(), 
        day: 3, 
        month: new Date().getMonth(), 
        year: new Date().getFullYear(), 
        platform: 'twitter', 
        time: '09:30 AM', 
        title: 'Product Update',
        campaign: '2', // Product Launch
        contentType: 'image',
        engagementPrediction: 'medium'
      }
    ],
    8: [
      { 
        id: generateId(), 
        day: 8, 
        month: new Date().getMonth(), 
        year: new Date().getFullYear(), 
        platform: 'instagram', 
        time: '11:00 AM', 
        title: 'Team Highlight',
        campaign: '1', // Summer Campaign
        contentType: 'image',
        engagementPrediction: 'high'
      }
    ],
    12: [
      { 
        id: generateId(), 
        day: 12, 
        month: new Date().getMonth(), 
        year: new Date().getFullYear(), 
        platform: 'facebook', 
        time: '10:00 AM', 
        title: 'Customer Story', 
        assignee: 'Sarah Johnson',
        campaign: '1',
        contentType: 'article',
        engagementPrediction: 'high'
      },
      { 
        id: generateId(), 
        day: 12, 
        month: new Date().getMonth(), 
        year: new Date().getFullYear(), 
        platform: 'twitter', 
        time: '02:30 PM', 
        title: 'Industry News',
        campaign: '3',
        contentType: 'article',
        engagementPrediction: 'medium'
      }
    ],
    15: [
      { 
        id: generateId(), 
        day: 15, 
        month: new Date().getMonth(), 
        year: new Date().getFullYear(), 
        platform: 'instagram', 
        time: '03:15 PM', 
        title: 'Product Showcase', 
        description: 'New feature launch with product demo',
        campaign: '2',
        contentType: 'video',
        engagementPrediction: 'high',
        aiRecommended: true
      }
    ],
    21: [
      { 
        id: generateId(), 
        day: 21, 
        month: new Date().getMonth(), 
        year: new Date().getFullYear(), 
        platform: 'facebook', 
        time: '11:45 AM', 
        title: 'Community Update', 
        assignee: 'Mike Chen',
        campaign: '3',
        contentType: 'poll',
        engagementPrediction: 'medium'
      }
    ],
  });
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => 
      direction === 'next' ? addMonths(prev, 1) : subMonths(prev, 1)
    );
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (view === 'day' && date) {
      setCurrentDate(date);
    }
  };

  const getDayEvents = (day: number): CalendarEvent[] => {
    return schedule[day] || [];
  };

  const getSelectedDayEvents = (): CalendarEvent[] => {
    if (!selectedDate) return [];
    const day = selectedDate.getDate();
    return getDayEvents(day);
  };
  
  const getCampaignById = (id?: string) => {
    if (!id) return null;
    return campaigns.find(campaign => campaign.id === id);
  };
  
  const getContentTypeById = (id?: string) => {
    if (!id) return null;
    return contentTypes.find(type => type.id === id);
  };
  
  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'twitter': return 'text-blue-500';
      case 'instagram': return 'text-pink-500';
      case 'facebook': return 'text-blue-700';
      default: return '';
    }
  };
  
  const getEngagementBadgeColor = (prediction?: string) => {
    switch (prediction) {
      case 'high': return 'bg-green-100 text-green-800 border-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const addEvent = () => {
    if (!selectedDate || !eventDetails.title || !eventDetails.time) {
      toast.error("Please fill in all required fields");
      return;
    }

    const day = selectedDate.getDate();
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();
    
    const newEvent: CalendarEvent = {
      id: generateId(),
      day,
      month,
      year,
      platform: eventDetails.platform as 'twitter' | 'instagram' | 'facebook' | 'all',
      time: eventDetails.time,
      title: eventDetails.title,
      description: eventDetails.description,
      assignee: eventDetails.assignee,
      campaign: eventDetails.campaign,
      contentType: eventDetails.contentType as CalendarEvent['contentType'],
      engagementPrediction: eventDetails.engagementPrediction as 'high' | 'medium' | 'low',
      aiRecommended: false
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
      contentType: 'image',
      engagementPrediction: 'medium',
    });
    setShowEventDialog(false);
    toast.success("Event added successfully");
  };
  
  const handleDragStart = (event: React.DragEvent, calendarEvent: CalendarEvent) => {
    setDraggedEvent(calendarEvent);
    event.dataTransfer.setData('text/plain', calendarEvent.id);
    // Make drag image transparent (improves visual feedback)
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    event.dataTransfer.setDragImage(img, 0, 0);
  };
  
  const handleDragOver = (event: React.DragEvent, date: Date) => {
    event.preventDefault();
    event.currentTarget.classList.add('bg-accent/50');
  };
  
  const handleDragLeave = (event: React.DragEvent) => {
    event.currentTarget.classList.remove('bg-accent/50');
  };
  
  const handleDrop = (event: React.DragEvent, date: Date) => {
    event.preventDefault();
    event.currentTarget.classList.remove('bg-accent/50');
    
    if (draggedEvent) {
      const eventId = event.dataTransfer.getData('text/plain');
      const oldDay = draggedEvent.day;
      
      // Remove from old position
      setSchedule(prev => {
        const updatedEvents = {...prev};
        if (updatedEvents[oldDay]) {
          updatedEvents[oldDay] = updatedEvents[oldDay].filter(e => e.id !== eventId);
          if (updatedEvents[oldDay].length === 0) {
            delete updatedEvents[oldDay];
          }
        }
        return updatedEvents;
      });
      
      // Add to new position
      const newDay = date.getDate();
      const newMonth = date.getMonth();
      const newYear = date.getFullYear();
      
      const updatedEvent = {
        ...draggedEvent,
        day: newDay,
        month: newMonth,
        year: newYear
      };
      
      setSchedule(prev => {
        const updatedEvents = {...prev};
        if (updatedEvents[newDay]) {
          updatedEvents[newDay] = [...updatedEvents[newDay], updatedEvent];
        } else {
          updatedEvents[newDay] = [updatedEvent];
        }
        return updatedEvents;
      });
      
      setDraggedEvent(null);
      toast.success(`Moved "${draggedEvent.title}" to ${format(date, 'MMMM d, yyyy')}`);
    }
  };
  
  const handleEventSelection = (eventId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedItems(prev => [...prev, eventId]);
    } else {
      setSelectedItems(prev => prev.filter(id => id !== eventId));
    }
  };
  
  const bulkDelete = () => {
    if (selectedItems.length === 0) return;
    
    setSchedule(prev => {
      const updatedEvents = {...prev};
      
      // Iterate through each day's events
      Object.keys(updatedEvents).forEach(day => {
        const dayNum = parseInt(day);
        updatedEvents[dayNum] = updatedEvents[dayNum].filter(
          event => !selectedItems.includes(event.id)
        );
        
        // Remove the day if it no longer has events
        if (updatedEvents[dayNum].length === 0) {
          delete updatedEvents[dayNum];
        }
      });
      
      return updatedEvents;
    });
    
    toast.success(`Deleted ${selectedItems.length} items`);
    setSelectedItems([]);
  };
  
  const renderPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return <Twitter className={`h-4 w-4 ${getPlatformColor(platform)}`} aria-hidden="true" />;
      case 'instagram':
        return <Instagram className={`h-4 w-4 ${getPlatformColor(platform)}`} aria-hidden="true" />;
      case 'facebook':
        return <Facebook className={`h-4 w-4 ${getPlatformColor(platform)}`} aria-hidden="true" />;
      case 'all':
        return (
          <div className="flex -space-x-1">
            <Twitter className="h-4 w-4 text-blue-500" aria-hidden="true" />
            <Instagram className="h-4 w-4 text-pink-500" aria-hidden="true" />
            <Facebook className="h-4 w-4 text-blue-700" aria-hidden="true" />
          </div>
        );
      default:
        return null;
    }
  };

  // Custom day rendering for the Calendar component
  const renderDay = (day: Date) => {
    const isToday = isSameDay(day, new Date());
    const dayEvents = schedule[day.getDate()] || [];
    const hasEvents = dayEvents.length > 0;
    const hasAiRecommendation = dayEvents.some(event => event.aiRecommended);
    
    return (
      <div 
        className={cn(
          "relative h-10 w-10 p-0 font-normal aria-selected:opacity-100",
          isToday && "bg-accent text-accent-foreground font-semibold",
          hasEvents && "after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-1 after:rounded-full after:bg-primary"
        )}
        onDragOver={(e) => handleDragOver(e, day)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, day)}
      >
        {day.getDate()}
        {hasAiRecommendation && (
          <div className="absolute top-0 right-0 h-2 w-2 bg-green-500 rounded-full" title="AI recommended time slot" />
        )}
      </div>
    );
  };
  
  // Week view renderer
  const renderWeekView = () => {
    // Get start of week (Sunday)
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const days = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return day;
    });
    
    return (
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
          const dayEvents = schedule[day.getDate()] || [];
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
          
          return (
            <div 
              key={day.toString()} 
              className={cn(
                "border rounded-md min-h-[150px] p-2", 
                isCurrentMonth ? "bg-background" : "bg-muted/20",
                isSameDay(day, selectedDate as Date) && "ring-2 ring-primary",
              )}
              onClick={() => setSelectedDate(day)}
              onDragOver={(e) => handleDragOver(e, day)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, day)}
            >
              <div className={cn(
                "text-sm font-medium mb-1",
                isSameDay(day, new Date()) && "text-primary"
              )}>
                {format(day, 'EEE d')}
              </div>
              
              <ScrollArea className="h-[120px]">
                <div className="space-y-1">
                  {dayEvents.map((event) => (
                    <div 
                      key={event.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, event)}
                      className={cn(
                        "text-xs p-1 rounded truncate cursor-move",
                        getCampaignById(event.campaign)?.color ? 
                          `border-l-4 border-l-[${getCampaignById(event.campaign)?.color}]` : 
                          "border-l-4 border-l-gray-300"
                      )}
                    >
                      <div className="flex items-center gap-1">
                        {renderPlatformIcon(event.platform)}
                        <span>{event.title}</span>
                      </div>
                      <div className="text-muted-foreground">{event.time}</div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          );
        })}
      </div>
    );
  };
  
  // Day view renderer
  const renderDayView = () => {
    if (!selectedDate) return null;
    
    const dayEvents = getSelectedDayEvents();
    const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM
    
    return (
      <div className="border rounded-md">
        <div className="p-2 border-b bg-muted/20">
          <h3 className="font-medium">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</h3>
        </div>
        
        <div className="divide-y">
          {hours.map(hour => {
            const hourEvents = dayEvents.filter(event => {
              const eventHour = parseInt(event.time.split(':')[0]);
              const isPM = event.time.includes('PM');
              const normalizedHour = isPM && eventHour !== 12 ? eventHour + 12 : eventHour;
              return normalizedHour === hour;
            });
            
            return (
              <div key={hour} className="flex p-2 min-h-[60px]">
                <div className="w-16 flex-shrink-0 text-sm text-muted-foreground">
                  {hour > 12 ? `${hour-12} PM` : `${hour} AM`}
                </div>
                <div className="flex-1 pl-2">
                  {hourEvents.map(event => (
                    <div 
                      key={event.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, event)}
                      className={cn(
                        "text-sm p-2 mb-1 rounded cursor-move",
                        getCampaignById(event.campaign)?.color ? 
                          `border-l-4 border-l-[${getCampaignById(event.campaign)?.color}]` : 
                          "border-l-4 border-l-gray-300"
                      )}
                    >
                      <div className="flex items-center gap-1">
                        {renderPlatformIcon(event.platform)}
                        <span>{event.title}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{event.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  // List view renderer
  const renderListView = () => {
    // Organize all events by date
    const allEvents: {date: Date; events: CalendarEvent[]}[] = [];
    
    Object.entries(schedule).forEach(([day, events]) => {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), parseInt(day));
      allEvents.push({
        date,
        events
      });
    });
    
    // Sort by date
    allEvents.sort((a, b) => a.date.getTime() - b.date.getTime());
    
    return (
      <div className="space-y-4">
        {allEvents.map(({date, events}) => (
          <Card key={date.toString()}>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">
                {format(date, 'EEEE, MMMM d, yyyy')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {events.map(event => (
                  <div 
                    key={event.id} 
                    className={cn(
                      "flex items-center justify-between p-2 rounded-md border",
                      selectedItems.includes(event.id) && "ring-2 ring-primary"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox"
                        checked={selectedItems.includes(event.id)}
                        onChange={(e) => handleEventSelection(event.id, e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          {renderPlatformIcon(event.platform)}
                          <span className="font-medium">{event.title}</span>
                          {event.aiRecommended && (
                            <Badge variant="outline" className="bg-green-100 border-green-200">AI Optimized</Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">{event.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {event.campaign && (
                        <Badge style={{backgroundColor: getCampaignById(event.campaign)?.color}}>
                          {getCampaignById(event.campaign)?.name}
                        </Badge>
                      )}
                      <Badge className={getEngagementBadgeColor(event.engagementPrediction)}>
                        {event.engagementPrediction} engagement
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };
  
  // Kanban view renderer
  const renderKanbanView = () => {
    // Group by platform
    const platforms = ['twitter', 'instagram', 'facebook'];
    
    // Get all events for the current month
    const allEvents: CalendarEvent[] = [];
    Object.values(schedule).forEach(events => {
      allEvents.push(...events);
    });
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {platforms.map(platform => {
          const platformEvents = allEvents.filter(event => event.platform === platform);
          
          return (
            <div key={platform} className="border rounded-md">
              <div className="p-3 border-b bg-muted/20 flex items-center gap-2">
                {renderPlatformIcon(platform)}
                <h3 className="font-medium capitalize">{platform}</h3>
                <span className="text-xs text-muted-foreground">({platformEvents.length})</span>
              </div>
              
              <ScrollArea className="h-[500px] p-2">
                <div className="space-y-2">
                  {platformEvents.map(event => (
                    <div 
                      key={event.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, event)}
                      className={cn(
                        "p-3 rounded-md border bg-card shadow-sm cursor-move",
                        selectedItems.includes(event.id) && "ring-2 ring-primary"
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1">
                          <input 
                            type="checkbox"
                            checked={selectedItems.includes(event.id)}
                            onChange={(e) => handleEventSelection(event.id, e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <span className="font-medium">{event.title}</span>
                        </div>
                        <Badge variant="outline">{format(new Date(event.year, event.month, event.day), 'MMM d')}</Badge>
                      </div>
                      
                      <div className="text-sm text-muted-foreground mb-2">
                        {event.time} {event.description && `· ${event.description}`}
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {event.campaign && (
                          <Badge style={{backgroundColor: getCampaignById(event.campaign)?.color}} className="text-white">
                            {getCampaignById(event.campaign)?.name}
                          </Badge>
                        )}
                        {event.contentType && (
                          <Badge variant="outline">
                            {event.contentType}
                          </Badge>
                        )}
                        {event.engagementPrediction && (
                          <Badge className={getEngagementBadgeColor(event.engagementPrediction)}>
                            {event.engagementPrediction}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          );
        })}
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
                  <Label htmlFor="campaign" className="text-left">Campaign</Label>
                  <Select 
                    onValueChange={(value) => setEventDetails({...eventDetails, campaign: value})}
                    defaultValue={eventDetails.campaign}
                  >
                    <SelectTrigger id="campaign">
                      <SelectValue placeholder="Select campaign" />
                    </SelectTrigger>
                    <SelectContent>
                      {campaigns.map(campaign => (
                        <SelectItem key={campaign.id} value={campaign.id}>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{backgroundColor: campaign.color}}></div>
                            <span>{campaign.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="contentType" className="text-left">Content Type</Label>
                    <Select 
                      onValueChange={(value) => setEventDetails({...eventDetails, contentType: value as any})}
                      defaultValue={eventDetails.contentType}
                    >
                      <SelectTrigger id="contentType">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="article">Article</SelectItem>
                        <SelectItem value="poll">Poll</SelectItem>
                        <SelectItem value="story">Story</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="engagement" className="text-left">Expected Engagement</Label>
                    <Select 
                      onValueChange={(value) => setEventDetails({...eventDetails, engagementPrediction: value as any})}
                      defaultValue={eventDetails.engagementPrediction}
                    >
                      <SelectTrigger id="engagement">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
            <div className="flex items-center gap-3">
              {/* View selector */}
              <div className="hidden sm:flex border rounded-md p-0.5">
                <Button 
                  size="sm" 
                  variant={view === 'month' ? 'default' : 'ghost'} 
                  className="h-8"
                  onClick={() => setView('month')}
                >
                  <CalendarLucide className="h-4 w-4 mr-1" />
                  <span className="sr-only sm:not-sr-only sm:inline-block">Month</span>
                </Button>
                <Button 
                  size="sm" 
                  variant={view === 'week' ? 'default' : 'ghost'} 
                  className="h-8"
                  onClick={() => setView('week')}
                >
                  <LayoutList className="h-4 w-4 mr-1" />
                  <span className="sr-only sm:not-sr-only sm:inline-block">Week</span>
                </Button>
                <Button 
                  size="sm" 
                  variant={view === 'day' ? 'default' : 'ghost'} 
                  className="h-8"
                  onClick={() => setView('day')}
                >
                  <List className="h-4 w-4 mr-1" />
                  <span className="sr-only sm:not-sr-only sm:inline-block">Day</span>
                </Button>
                <Button 
                  size="sm" 
                  variant={view === 'list' ? 'default' : 'ghost'} 
                  className="h-8"
                  onClick={() => setView('list')}
                >
                  <LayoutList className="h-4 w-4 mr-1" />
                  <span className="sr-only sm:not-sr-only sm:inline-block">List</span>
                </Button>
                <Button 
                  size="sm" 
                  variant={view === 'kanban' ? 'default' : 'ghost'} 
                  className="h-8"
                  onClick={() => setView('kanban')}
                >
                  <LayoutGrid className="h-4 w-4 mr-1" />
                  <span className="sr-only sm:not-sr-only sm:inline-block">Kanban</span>
                </Button>
              </div>
              
              {/* Mobile view selector */}
              <div className="sm:hidden">
                <Select onValueChange={(val) => setView(val as any)} defaultValue={view}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">Month</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="day">Day</SelectItem>
                    <SelectItem value="list">List</SelectItem>
                    <SelectItem value="kanban">Kanban</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Month navigation */}
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
          </div>
          
          {/* Bulk actions - Only show when items are selected */}
          {selectedItems.length > 0 && (
            <div className="flex items-center justify-between mt-4 p-2 bg-muted rounded-md">
              <span className="text-sm">{selectedItems.length} items selected</span>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost">
                  <Tag className="h-4 w-4 mr-1" />
                  Add Tag
                </Button>
                <Button size="sm" variant="ghost">
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={bulkDelete}>
                  Delete
                </Button>
              </div>
            </div>
          )}
          
          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-4">
            <div className="flex items-center gap-1">
              <Twitter className="h-3 w-3 text-blue-500" />
              <span className="text-xs">Twitter</span>
            </div>
            <div className="flex items-center gap-1">
              <Instagram className="h-3 w-3 text-pink-500" />
              <span className="text-xs">Instagram</span>
            </div>
            <div className="flex items-center gap-1">
              <Facebook className="h-3 w-3 text-blue-700" />
              <span className="text-xs">Facebook</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-xs">AI recommendation</span>
            </div>
            
            {/* Campaign legend */}
            <div className="border-l pl-2 ml-2">
              {campaigns.map(campaign => (
                <div key={campaign.id} className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full" style={{backgroundColor: campaign.color}}></div>
                  <span className="text-xs">{campaign.name}</span>
                </div>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4">
            {view === 'month' && (
              <div>
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
              </div>
            )}
            
            {view === 'week' && renderWeekView()}
            {view === 'day' && renderDayView()}
            {view === 'list' && renderListView()}
            {view === 'kanban' && renderKanbanView()}
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
                <div 
                  key={idx} 
                  className="p-4 rounded-lg border transition-all hover:shadow-md"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      {renderPlatformIcon(event.platform)}
                      <span className="font-medium">{event.title}</span>
                      
                      {event.aiRecommended && (
                        <Badge variant="outline" className="bg-green-100 border-green-200">
                          AI Optimized
                        </Badge>
                      )}
                    </div>
                    <Badge variant="outline">{event.time}</Badge>
                  </div>
                  {event.description && (
                    <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {event.campaign && (
                      <Badge style={{backgroundColor: getCampaignById(event.campaign)?.color}} className="text-white">
                        {getCampaignById(event.campaign)?.name}
                      </Badge>
                    )}
                    {event.contentType && (
                      <Badge variant="outline">
                        {event.contentType}
                      </Badge>
                    )}
                    {event.engagementPrediction && (
                      <Badge className={getEngagementBadgeColor(event.engagementPrediction)}>
                        {event.engagementPrediction} engagement
                      </Badge>
                    )}
                  </div>
                  
                  {event.assignee && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-3 pt-3 border-t">
                      <Users className="h-3 w-3" />
                      <span>Assigned to {event.assignee}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-end gap-2 mt-3 pt-3 border-t">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Preview</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Preview content</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button size="sm" variant="ghost">
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit content</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button size="sm" variant="ghost">
                            <MoveHorizontal className="h-4 w-4" />
                            <span className="sr-only">Move</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Move to another date</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
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
