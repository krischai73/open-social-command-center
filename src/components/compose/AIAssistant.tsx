
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from '@/components/ui/sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Sparkles, Wand2, Languages, TrendingUp, MessageSquare, BrainCircuit
} from 'lucide-react';

interface AIAssistantProps {
  content: string;
  setContent: (content: string) => void;
}

type ToneType = 'professional' | 'casual' | 'friendly' | 'enthusiastic' | 'formal' | 'humorous';

type LanguageType = 'english' | 'spanish' | 'french' | 'german' | 'italian' | 'portuguese' | 'japanese' | 'chinese';

const AIAssistant: React.FC<AIAssistantProps> = ({ content, setContent }) => {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [selectedTone, setSelectedTone] = useState<ToneType>('professional');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>('english');
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [isAddingTags, setIsAddingTags] = useState<boolean>(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState<boolean>(false);

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'enthusiastic', label: 'Enthusiastic' },
    { value: 'formal', label: 'Formal' },
    { value: 'humorous', label: 'Humorous' }
  ];

  const languages = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'italian', label: 'Italian' },
    { value: 'portuguese', label: 'Portuguese' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'chinese', label: 'Chinese' }
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
    if (!content.trim()) {
      toast.error('Please add some content first!');
      return;
    }
    
    setIsOptimizing(true);
    
    // Simulate optimization process
    setTimeout(() => {
      // Add emojis, improve sentence structure
      let optimized = content;
      
      // Add emojis if none exist
      if (!optimized.includes('🚀') && !optimized.includes('😊')) {
        optimized = optimized.replace(/feature/i, 'feature 🚀');
        optimized = optimized.replace(/excited|happy|glad/i, match => `${match} 😊`);
      }
      
      // Improve engagement with questions
      if (!optimized.includes('?')) {
        optimized += ' What do you think?';
      }
      
      setContent(optimized);
      setIsOptimizing(false);
      toast.success('Content optimized for engagement!');
    }, 1200);
  };
  
  const handleTranslateContent = () => {
    if (!content.trim()) {
      toast.error('Please add some content first!');
      return;
    }
    
    setIsTranslating(true);
    
    // Simulate translation process
    setTimeout(() => {
      const translatedContent = getTranslatedContent(content, selectedLanguage);
      setContent(translatedContent);
      setIsTranslating(false);
      toast.success(`Content translated to ${selectedLanguage}!`);
      setShowLanguageSelector(false);
    }, 1500);
  };
  
  const getTranslatedContent = (text: string, language: LanguageType) => {
    // This would be replaced with actual translation API
    const translations: Record<LanguageType, string> = {
      english: text, // Keep original if English
      spanish: text.length > 50 ? 
        "¡Presentamos nuestras últimas características diseñadas para optimizar su flujo de trabajo! #Innovación #Productividad" : 
        "¡Hola! Mira nuestras nuevas funciones. ¿Qué te parecen?",
      french: text.length > 50 ? 
        "Nous présentons nos dernières fonctionnalités conçues pour optimiser votre flux de travail! #Innovation #Productivité" : 
        "Bonjour! Découvrez nos nouvelles fonctionnalités. Qu'en pensez-vous?",
      german: text.length > 50 ? 
        "Wir stellen unsere neuesten Funktionen vor, die Ihren Arbeitsablauf optimieren! #Innovation #Produktivität" : 
        "Hallo! Sehen Sie sich unsere neuen Funktionen an. Was denken Sie?",
      italian: text.length > 50 ? 
        "Presentiamo le nostre ultime funzionalità progettate per ottimizzare il flusso di lavoro! #Innovazione #Produttività" : 
        "Ciao! Guarda le nostre nuove funzionalità. Cosa ne pensi?",
      portuguese: text.length > 50 ? 
        "Apresentamos nossos recursos mais recentes projetados para otimizar seu fluxo de trabalho! #Inovação #Produtividade" : 
        "Olá! Confira nossos novos recursos. O que você acha?",
      japanese: text.length > 50 ? 
        "ワークフローを最適化するための最新機能を紹介します！ #イノベーション #生産性" : 
        "こんにちは！新機能をご覧ください。どう思いますか？",
      chinese: text.length > 50 ? 
        "我们推出了旨在优化工作流程的最新功能！ #创新 #生产力" : 
        "你好！查看我们的新功能。你觉得怎么样？"
    };
    
    return translations[language] || text;
  };
  
  const handleTrendingHashtags = () => {
    if (!content.trim()) {
      toast.error('Please add some content first!');
      return;
    }
    
    setIsAddingTags(true);
    
    // Simulate hashtag research and addition
    setTimeout(() => {
      const contentTopic = detectContentTopic(content);
      const hashtags = getTrendingHashtagsByTopic(contentTopic);
      
      // Make sure we're not duplicating hashtags
      let updatedContent = content;
      const existingHashtags = content.match(/#[a-zA-Z0-9]+/g) || [];
      
      // Fix: Use explicit type for newHashtags to resolve the 'never' type issue
      const newHashtags: string[] = hashtags.filter((tag: string) => !existingHashtags.includes(tag));
      
      if (newHashtags.length > 0) {
        // If content already ends with hashtags, add more, otherwise add a line break first
        if (/[#][a-zA-Z0-9]+$/.test(content.trim())) {
          updatedContent = `${content.trim()} ${newHashtags.join(' ')}`;
        } else {
          updatedContent = `${content.trim()}\n\n${newHashtags.join(' ')}`;
        }
        
        setContent(updatedContent);
        toast.success('Trending hashtags added!');
      } else {
        toast.info('Content already has optimal hashtags!');
      }
      
      setIsAddingTags(false);
    }, 1200);
  };
  
  const detectContentTopic = (text: string): string => {
    // Very simple topic detection - in real app, this would use AI
    const textLower = text.toLowerCase();
    if (textLower.includes('feature') || textLower.includes('product') || textLower.includes('update')) {
      return 'product';
    } else if (textLower.includes('team') || textLower.includes('hiring') || textLower.includes('join')) {
      return 'team';
    } else if (textLower.includes('sale') || textLower.includes('discount') || textLower.includes('offer')) {
      return 'promotion';
    } else {
      return 'general';
    }
  };
  
  const getTrendingHashtagsByTopic = (topic: string): string[] => {
    // Fix: Explicitly define the type for hashtagsByTopic
    const hashtagsByTopic: Record<string, string[]> = {
      'product': ['#ProductUpdate', '#Innovation', '#NewFeatures', '#TechNews', '#ProductivityTips'],
      'team': ['#TeamCulture', '#HiringNow', '#CareerGrowth', '#CompanyCulture', '#WorkLife'],
      'promotion': ['#SpecialOffer', '#LimitedTime', '#DontMissOut', '#Deal', '#Savings'],
      'general': ['#TrendingNow', '#MustSee', '#2023Trends', '#IndustryLeaders', '#BestPractices']
    };
    
    // Fix: Ensure this returns a proper string array
    return (hashtagsByTopic[topic] || hashtagsByTopic.general).sort(() => 0.5 - Math.random()).slice(0, 3);
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
              disabled={isOptimizing}
            >
              {isOptimizing ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                  <span>Optimizing...</span>
                </>
              ) : (
                <>
                  <MessageSquare className="h-4 w-4" />
                  <span>Optimize</span>
                </>
              )}
            </Button>
            <Popover open={showLanguageSelector} onOpenChange={setShowLanguageSelector}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1"
                  onClick={() => setShowLanguageSelector(true)}
                >
                  <Languages className="h-4 w-4" />
                  <span>Translate</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-3" side="bottom">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Select language</h4>
                  <Select
                    value={selectedLanguage}
                    onValueChange={(value) => setSelectedLanguage(value as LanguageType)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((language) => (
                        <SelectItem key={language.value} value={language.value}>
                          {language.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    className="w-full"
                    onClick={handleTranslateContent}
                    disabled={isTranslating}
                  >
                    {isTranslating ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></div>
                        <span>Translating...</span>
                      </>
                    ) : (
                      <span>Translate</span>
                    )}
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1"
              onClick={handleTrendingHashtags}
              disabled={isAddingTags}
            >
              {isAddingTags ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <TrendingUp className="h-4 w-4" />
                  <span>Trending Tags</span>
                </>
              )}
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
