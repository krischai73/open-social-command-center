
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, Instagram, Twitter, Facebook, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Calendar: React.FC = () => {
  const currentDate = new Date();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  
  const schedule = {
    3: [{ platform: 'twitter', time: '09:30 AM', title: 'Product Update' }],
    8: [{ platform: 'instagram', time: '11:00 AM', title: 'Team Highlight' }],
    12: [
      { platform: 'facebook', time: '10:00 AM', title: 'Customer Story' },
      { platform: 'twitter', time: '02:30 PM', title: 'Industry News' },
    ],
    15: [{ platform: 'instagram', time: '03:15 PM', title: 'Product Showcase' }],
    21: [{ platform: 'facebook', time: '11:45 AM', title: 'Community Update' }],
  };
  
  const renderCalendarDays = () => {
    const days = [];
    const today = currentDate.getDate();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-muted bg-muted/20"></div>);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === today;
      const hasEvents = schedule[day as keyof typeof schedule];
      
      days.push(
        <div 
          key={day} 
          className={`h-24 border p-1 relative ${isToday ? 'bg-primary/5 border-primary/30' : ''}`}
        >
          <div className="flex justify-between items-start">
            <span className={`text-sm font-medium p-1 ${isToday ? 'bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center' : ''}`}>
              {day}
            </span>
            {hasEvents && (
              <Button size="icon" variant="ghost" className="w-6 h-6">
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {hasEvents && (
            <div className="mt-1 space-y-1">
              {hasEvents.map((event, idx) => (
                <div 
                  key={idx} 
                  className={`text-xs p-1 rounded truncate ${
                    event.platform === 'twitter' ? 'bg-blue-100 text-blue-700' :
                    event.platform === 'instagram' ? 'bg-pink-100 text-pink-700' :
                    'bg-indigo-100 text-indigo-700'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    {event.platform === 'twitter' && <Twitter className="h-3 w-3" />}
                    {event.platform === 'instagram' && <Instagram className="h-3 w-3" />}
                    {event.platform === 'facebook' && <Facebook className="h-3 w-3" />}
                    <span className="truncate">{event.title}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Content Calendar</h1>
          <p className="text-muted-foreground mt-1">Schedule and manage your content across platforms</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="hidden md:flex gap-2">
            <CalendarIcon className="h-4 w-4" />
            Today
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Post
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{monthName} {currentDate.getFullYear()}</CardTitle>
              <CardDescription>Content schedule for this month</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">Previous</Button>
              <Button size="sm" variant="outline">Next</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-medium py-2 text-sm">
                {day}
              </div>
            ))}
            {renderCalendarDays()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calendar;
