
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from '@/components/ui/sonner';
import {
  Sparkles, Wand2, Languages, TrendingUp, MessageSquare, BrainCircuit
} from 'lucide-react';

interface AIAssistantProps {
  content: string;
  setContent: (content: string) => void;
}

type ToneType = 'professional' | 'casual' | 'friendly' | 'enthusiastic' | 'formal' | 'humorous';

const AIAssistant: React.FC<AIAssistantProps> = ({ content, setContent }) => {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [selectedTone, setSelectedTone] = useState<ToneType>('professional');

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'enthusiastic', label: 'Enthusiastic' },
    { value: 'formal', label: 'Formal' },
    { value: 'humorous', label: 'Humorous' }
  ];

  const handleGenerateContent = () => {
    setIsGenerating(true);
    // Simulating AI generation
    setTimeout(() => {
      const generatedContent = getAIGeneratedContent(selectedTone);
      setContent(generatedContent);
      setIsGenerating(false);
      toast.success('Content generated successfully!');
    }, 1500);
  };

  const getAIGeneratedContent = (tone: string) => {
    // This would be replaced with actual AI API call
    const content = {
      professional: "Introducing our latest feature set designed to optimize your workflow and increase productivity. #ProductivityBoost #Innovation",
      casual: "Hey everyone! Check out our cool new features - they're going to make your day so much easier! 😎 #GameChanger",
      friendly: "We're excited to share these new updates with you! Let us know what you think 💬 #FeedbackWelcome",
      enthusiastic: "WOW! Our AMAZING new features are HERE! You're going to LOVE how they transform your experience! 🚀 #MindBlown",
      formal: "We are pleased to announce the implementation of our newest functionality, designed to enhance user experience and efficiency.",
      humorous: "Our developers finally stopped playing ping pong long enough to create these awesome features. You're welcome! 🏓 #DevLife"
    };
    return content[tone as keyof typeof content] || content.professional;
  };

  const handleOptimizeContent = () => {
    toast.success('Content optimized for engagement!');
  };
  
  const handleTranslateContent = () => {
    toast.success('Content translated to selected languages!');
  };
  
  const handleTrendingHashtags = () => {
    toast.success('Trending hashtags added!');
  };

  return (
    <Card className="bg-slate-50 border border-blue-100 mb-4">
      <CardContent className="p-4">
        <h3 className="text-sm font-medium mb-3 flex items-center">
          <Sparkles className="h-4 w-4 text-blue-500 mr-2" />
          AI Content Assistant
        </h3>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Wand2 className="h-4 w-4" />
                  <span>{selectedTone}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" align="start" side="bottom">
                <Command>
                  <CommandList>
                    <CommandGroup heading="Select tone">
                      {tones.map((tone) => (
                        <CommandItem
                          key={tone.value}
                          onSelect={() => setSelectedTone(tone.value as ToneType)}
                          className="cursor-pointer"
                        >
                          {tone.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1"
              onClick={handleGenerateContent}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Generate</span>
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1"
              onClick={handleOptimizeContent}
            >
              <MessageSquare className="h-4 w-4" />
              <span>Optimize</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1"
              onClick={handleTranslateContent}
            >
              <Languages className="h-4 w-4" />
              <span>Translate</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1"
              onClick={handleTrendingHashtags}
            >
              <TrendingUp className="h-4 w-4" />
              <span>Trending Tags</span>
            </Button>
          </div>
          <div className="text-xs text-muted-foreground">
            AI can help generate engaging content, optimize for each platform, suggest trending hashtags, and more.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAssistant;
