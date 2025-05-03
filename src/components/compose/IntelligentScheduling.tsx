
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  BrainCircuit, 
  Sparkles, 
  Globe, 
  CalendarClock 
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface IntelligentSchedulingProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  time: string;
  setTime: (time: string) => void;
}

const IntelligentScheduling: React.FC<IntelligentSchedulingProps> = ({ 
  date, 
  setDate,
  time,
  setTime
}) => {
  const [showOptimalTimes, setShowOptimalTimes] = useState(false);
  const [recyclingEnabled, setRecyclingEnabled] = useState(false);
  const [slowDripEnabled, setSlowDripEnabled] = useState(false);
  
  // Sample data for optimal posting times - in a real app, this would come from analytics
  const optimalTimes = [
    { time: '8:30 AM', engagement: 'High (24% above average)', category: 'Morning' },
    { time: '12:15 PM', engagement: 'Medium (15% above average)', category: 'Lunch' },
    { time: '5:45 PM', engagement: 'Very High (32% above average)', category: 'Evening' },
    { time: '9:00 PM', engagement: 'High (22% above average)', category: 'Night' },
  ];

  const handleTimeSelect = (selectedTime: string) => {
    setTime(selectedTime);
    setShowOptimalTimes(false);
    toast.success(`Scheduled for ${selectedTime}`);
  };

  const handleToggleRecycling = () => {
    setRecyclingEnabled(!recyclingEnabled);
    if (!recyclingEnabled) {
      toast.success("Content recycling enabled");
    } else {
      toast.info("Content recycling disabled");
    }
  };

  const handleToggleSlowDrip = () => {
    setSlowDripEnabled(!slowDripEnabled);
    if (!slowDripEnabled) {
      toast.success("Slow drip scheduling enabled");
    } else {
      toast.info("Slow drip scheduling disabled");
    }
  };

  return (
    <Card className="bg-slate-50 border border-blue-100 mb-4">
      <CardContent className="p-4">
        <h3 className="text-sm font-medium mb-3 flex items-center">
          <BrainCircuit className="h-4 w-4 text-blue-500 mr-2" />
          Intelligent Scheduling System
        </h3>
        
        <div className="space-y-3">
          {/* Optimal Posting Times */}
          <div className="flex flex-col">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1 justify-start mb-2"
              onClick={() => setShowOptimalTimes(!showOptimalTimes)}
            >
              <Sparkles className="h-4 w-4" />
              <span>Optimal Posting Times</span>
            </Button>
            
            {showOptimalTimes && (
              <div className="border rounded-md p-2 bg-white mb-2">
                <p className="text-xs text-muted-foreground mb-2">
                  Data-driven recommendations based on your audience activity:
                </p>
                <div className="space-y-1">
                  {optimalTimes.map((optimalTime, index) => (
                    <Button 
                      key={index} 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-between text-xs"
                      onClick={() => handleTimeSelect(optimalTime.time)}
                    >
                      <span>{optimalTime.time}</span>
                      <span className="text-muted-foreground">{optimalTime.engagement}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Advanced Scheduling Features */}
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className={`gap-1 ${recyclingEnabled ? 'bg-blue-50 border-blue-200 text-blue-600' : ''}`}
              onClick={handleToggleRecycling}
            >
              <CalendarClock className="h-4 w-4" />
              <span>Content Recycling</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className={`gap-1 ${slowDripEnabled ? 'bg-blue-50 border-blue-200 text-blue-600' : ''}`}
              onClick={handleToggleSlowDrip}
            >
              <Clock className="h-4 w-4" />
              <span>Slow Drip</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1"
              onClick={() => toast.info("Timezone optimization applied")}
            >
              <Globe className="h-4 w-4" />
              <span>Timezone Optimization</span>
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground">
            The AI scheduling system analyzes your audience data to recommend optimal posting times and intelligent content distribution strategies.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntelligentScheduling;
