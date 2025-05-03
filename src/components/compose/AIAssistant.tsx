
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';
import { Sparkles, MessageSquare, Wand2, Hash, ThumbsUp } from 'lucide-react';

interface AIAssistantProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ content, setContent }) => {
  const [tab, setTab] = useState("generate");
  const [generating, setGenerating] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [formattingText, setFormattingText] = useState(false);
  const [generationPrompt, setGenerationPrompt] = useState("");
  const [tone, setTone] = useState("professional");
  const [language, setLanguage] = useState("english");
  const [promptTopic, setPromptTopic] = useState('');
  const [promptKeywords, setPromptKeywords] = useState('');
  
  // Tone options for generation
  const tones = [
    { value: "professional", label: "Professional" },
    { value: "casual", label: "Casual" },
    { value: "friendly", label: "Friendly" },
    { value: "humorous", label: "Humorous" },
    { value: "formal", label: "Formal" },
    { value: "persuasive", label: "Persuasive" },
    { value: "informative", label: "Informative" }
  ];
  
  // Language options for generation
  const languages = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
    { value: "italian", label: "Italian" },
    { value: "portuguese", label: "Portuguese" },
    { value: "japanese", label: "Japanese" }
  ];

  // Content optimization options
  const optimizationTypes = [
    { value: "readability", label: "Improve Readability" },
    { value: "engagement", label: "Increase Engagement" },
    { value: "seo", label: "Optimize for SEO" },
    { value: "shorten", label: "Condense Content" },
    { value: "expand", label: "Expand Content" }
  ];

  // Formatting options
  const formattingTypes = [
    { value: "bullets", label: "Convert to Bullet Points" },
    { value: "paragraph", label: "Format as Paragraphs" },
    { value: "qaFormat", label: "Q&A Format" },
    { value: "callout", label: "Add Call to Action" }
  ];

  // Topic categories for hashtags
  const hashtagTopics = [
    { value: "marketing", label: "Marketing" },
    { value: "technology", label: "Technology" },
    { value: "business", label: "Business" },
    { value: "lifestyle", label: "Lifestyle" },
    { value: "health", label: "Health & Wellness" },
    { value: "travel", label: "Travel" },
    { value: "finance", label: "Finance" },
    { value: "creativity", label: "Creative Arts" },
    { value: "education", label: "Education" },
    { value: "general", label: "General" }
  ];

  // Generate content based on prompt
  const handleGenerate = () => {
    if (!generationPrompt.trim()) {
      toast.error("Please enter a prompt for content generation");
      return;
    }

    setGenerating(true);
    
    // This would be an actual AI generation call in a production app
    setTimeout(() => {
      const generatedContent = `Sample ${tone} content about ${generationPrompt} in ${language}. 
      
This is an example of AI-generated content that would typically be created based on the user's prompt, tone, and language selection. In a production environment, this would connect to an actual AI service.

This is just placeholder content to demonstrate the functionality.`;
      
      setContent(generatedContent);
      setGenerating(false);
      toast.success("Content generated successfully!");
    }, 1500);
  };

  // Optimize existing content
  const handleOptimize = (optimizationType: string) => {
    if (!content.trim()) {
      toast.error("Please add some content to optimize");
      return;
    }

    setOptimizing(true);
    
    // This would be an actual AI optimization call in a production app
    setTimeout(() => {
      let optimizedContent = content;
      
      switch (optimizationType) {
        case "readability":
          optimizedContent = `${content}\n\n[Readability Improved by AI]`;
          break;
        case "engagement":
          optimizedContent = `${content}\n\n[Engagement Enhanced by AI]`;
          break;
        case "seo":
          optimizedContent = `${content}\n\n[SEO Optimized by AI]`;
          break;
        case "shorten":
          optimizedContent = content.substring(0, Math.max(content.length * 0.7, 20)) + "\n\n[Condensed by AI]";
          break;
        case "expand":
          optimizedContent = `${content}\n\nAdditionally, this expanded content provides more context and details about the subject. [Expanded by AI]`;
          break;
        default:
          optimizedContent = content;
      }
      
      setContent(optimizedContent);
      setOptimizing(false);
      toast.success(`Content ${optimizationType} complete!`);
    }, 1500);
  };

  // Format content
  const handleFormat = (formatType: string) => {
    if (!content.trim()) {
      toast.error("Please add some content to format");
      return;
    }

    setFormattingText(true);
    
    // This would be an actual formatting call in a production app
    setTimeout(() => {
      let formattedContent = content;
      
      switch (formatType) {
        case "bullets":
          formattedContent = content.split(".").filter(s => s.trim()).map(s => `• ${s.trim()}`).join("\n");
          break;
        case "paragraph":
          formattedContent = content.split("\n").filter(s => s.trim()).map(s => `${s.trim()}\n`).join("\n");
          break;
        case "qaFormat":
          formattedContent = `Q: What's the main point?\nA: ${content.trim().split(".")[0]}.\n\nQ: Can you elaborate?\nA: ${content.trim().substring(content.indexOf(".")+1)}`;
          break;
        case "callout":
          formattedContent = `${content.trim()}\n\n👉 Learn more! Click the link in our bio for details.`;
          break;
        default:
          formattedContent = content;
      }
      
      setContent(formattedContent);
      setFormattingText(false);
      toast.success(`Content formatted as ${formatType}!`);
    }, 1000);
  };

  // Handle adding trending hashtags
  const handleTrendingHashtags = (topic: string) => {
    if (!content.trim()) {
      toast.error("Please add some content first");
      return;
    }
    
    const hashtags = getHashtagsForTopic(topic);
    
    if (hashtags && hashtags.length > 0) {
      let updatedContent = content;
      const existingHashtags = content.match(/#[a-zA-Z0-9]+/g) || [];
      
      // Fixed: Explicitly define hashtags type as string[] and properly type the filter function
      const newHashtags = hashtags.filter((tag: string) => !existingHashtags.includes(tag));
      
      if (newHashtags.length > 0) {
        // If content already ends with hashtags, add more, otherwise add a line break first
        if (content.trim().match(/#[a-zA-Z0-9]+$/)) {
          updatedContent = `${updatedContent} ${newHashtags.join(' ')}`;
        } else {
          updatedContent = `${updatedContent}\n\n${newHashtags.join(' ')}`;
        }
        
        setContent(updatedContent);
        toast.success(`Added trending hashtags for ${topic}!`);
      } else {
        toast.info("All relevant hashtags are already in your content!");
      }
    }
  };
  
  // Generate prompt based on topic and keywords
  const handleGenerateFromPrompt = () => {
    if (!promptTopic.trim()) {
      toast.error("Please enter a topic");
      return;
    }
    
    setGenerating(true);
    
    // This would connect to an AI service in a production app
    setTimeout(() => {
      let keywords = promptKeywords.trim() ? ` including keywords: ${promptKeywords}` : '';
      
      const generatedContent = `Here's a ${tone} post about ${promptTopic}${keywords}.
      
This is an example of content that would be generated based on the provided topic and keywords using AI. In an actual implementation, this would be created dynamically by a language model.

#${promptTopic.replace(/\s+/g, '')} ${promptKeywords.split(',').filter(k => k.trim()).map(k => `#${k.trim().replace(/\s+/g, '')}`).join(' ')}`;
      
      setContent(generatedContent);
      setGenerating(false);
      toast.success("Content generated from topic!");
    }, 1500);
  };
  
  // Get hashtags for a given topic
  const getHashtagsForTopic = (topic: string): string[] => {
    const hashtagsByTopic: Record<string, string[]> = {
      'marketing': ['#MarketingTips', '#DigitalMarketing', '#ContentStrategy', '#BrandAwareness', '#MarketingROI'],
      'technology': ['#TechTrends', '#Innovation', '#DigitalTransformation', '#AI', '#MachineLearning'],
      'business': ['#BusinessGrowth', '#Entrepreneurship', '#Leadership', '#StartupLife', '#BusinessStrategy'],
      'lifestyle': ['#LifestyleTips', '#SelfCare', '#WorkLifeBalance', '#LifeHacks', '#Mindfulness'],
      'health': ['#Wellness', '#HealthyLiving', '#MentalHealth', '#Fitness', '#Nutrition'],
      'travel': ['#TravelTips', '#Wanderlust', '#TravelPhotography', '#Vacation', '#Adventure'],
      'finance': ['#PersonalFinance', '#Investing', '#FinancialFreedom', '#MoneyManagement', '#WealthBuilding'],
      'creativity': ['#CreativeMindset', '#Design', '#ArtistOnSocial', '#CreativeProcess', '#Inspiration'],
      'education': ['#Learning', '#EducationMatters', '#Students', '#Teaching', '#SkillDevelopment'],
      'general': ['#TrendingNow', '#MustSee', '#2023Trends', '#IndustryLeaders', '#BestPractices']
    };
    
    return (hashtagsByTopic[topic] || hashtagsByTopic.general).sort(() => 0.5 - Math.random()).slice(0, 3);
  };

  return (
    <Card className="border-dashed border-primary/20 bg-background/50">
      <CardContent className="pt-4">
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-2">
            <TabsTrigger value="generate" className="text-xs">
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              Generate
            </TabsTrigger>
            <TabsTrigger value="optimize" className="text-xs">
              <Wand2 className="h-3.5 w-3.5 mr-1" />
              Optimize
            </TabsTrigger>
            <TabsTrigger value="format" className="text-xs">
              <MessageSquare className="h-3.5 w-3.5 mr-1" />
              Format
            </TabsTrigger>
            <TabsTrigger value="hashtags" className="text-xs">
              <Hash className="h-3.5 w-3.5 mr-1" />
              Hashtags
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="generate" className="space-y-3 mt-2">
            <div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="space-y-1">
                  <label htmlFor="tone" className="text-xs font-medium">Tone:</label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      {tones.map(t => (
                        <SelectItem key={t.value} value={t.value} className="text-xs">{t.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="language" className="text-xs font-medium">Language:</label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map(l => (
                        <SelectItem key={l.value} value={l.value} className="text-xs">{l.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-1 mb-2">
                <label htmlFor="prompt" className="text-xs font-medium">Generate from topic:</label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <Input
                      id="topic"
                      placeholder="Enter topic"
                      value={promptTopic}
                      onChange={(e) => setPromptTopic(e.target.value)}
                      className="h-8 text-xs"
                    />
                  </div>
                  <Button
                    size="sm"
                    className="h-8 text-xs"
                    onClick={handleGenerateFromPrompt}
                    disabled={generating || !promptTopic.trim()}
                  >
                    Generate
                  </Button>
                </div>
              </div>
              
              <div className="space-y-1">
                <label htmlFor="keywords" className="text-xs font-medium">Keywords (optional):</label>
                <Input
                  id="keywords"
                  placeholder="Enter keywords, separated by commas"
                  value={promptKeywords}
                  onChange={(e) => setPromptKeywords(e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label htmlFor="customPrompt" className="text-xs font-medium">Custom generation prompt:</label>
              <Textarea 
                id="customPrompt"
                placeholder="Tell the AI what content you want to create..."
                value={generationPrompt}
                onChange={(e) => setGenerationPrompt(e.target.value)}
                className="h-16 text-xs resize-none"
              />
            </div>
            
            <Button 
              onClick={handleGenerate}
              className="w-full text-xs h-8"
              disabled={generating || !generationPrompt.trim()}
            >
              {generating ? "Generating..." : "Generate Content"}
            </Button>
          </TabsContent>
          
          <TabsContent value="optimize" className="mt-2">
            <p className="text-xs text-muted-foreground mb-2">Select an optimization to apply to your content:</p>
            <div className="space-y-2">
              {optimizationTypes.map((type) => (
                <Button
                  key={type.value}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-xs h-8"
                  disabled={optimizing}
                  onClick={() => handleOptimize(type.value)}
                >
                  <ThumbsUp className="h-3.5 w-3.5 mr-2" />
                  {type.label}
                </Button>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="format" className="mt-2">
            <p className="text-xs text-muted-foreground mb-2">Select a formatting option:</p>
            <div className="grid grid-cols-2 gap-2">
              {formattingTypes.map((format) => (
                <Button
                  key={format.value}
                  variant="outline"
                  size="sm"
                  className="justify-start text-xs h-8"
                  disabled={formattingText}
                  onClick={() => handleFormat(format.value)}
                >
                  {format.label}
                </Button>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="hashtags" className="mt-2">
            <p className="text-xs text-muted-foreground mb-2">Add trending hashtags by category:</p>
            <div className="grid grid-cols-2 gap-2">
              {hashtagTopics.map((topic) => (
                <Button
                  key={topic.value}
                  variant="outline"
                  size="sm"
                  className="justify-start text-xs h-8"
                  onClick={() => handleTrendingHashtags(topic.value)}
                >
                  <Hash className="h-3.5 w-3.5 mr-1" />
                  {topic.label}
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AIAssistant;
