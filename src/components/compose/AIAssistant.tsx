import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Copy, Check, Magic, Wand2, Sparkles, Hash } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AIAssistantProps {
  content: string;
  setContent: (content: string) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ content, setContent }) => {
  const [generating, setGenerating] = useState(false);
  const [tone, setTone] = useState<string>('');
  const [length, setLength] = useState<string>('');
  const [keywords, setKeywords] = useState<string>('');
  const [targetAudience, setTargetAudience] = useState<string>('');
  const [hashtags, setHashtags] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<string>('');

  const generateContent = useCallback(async () => {
    setGenerating(true);
    setGeneratedContent('');

    try {
      // Simulate an API call to an AI service
      await new Promise(resolve => setTimeout(resolve, 1500));

      let aiOutput = content;

      if (tone) {
        aiOutput = `[Tone: ${tone}] ${aiOutput}`;
      }
      if (length) {
        aiOutput = `[Length: ${length}] ${aiOutput}`;
      }
      if (keywords) {
        aiOutput = `[Keywords: ${keywords}] ${aiOutput}`;
      }
      if (targetAudience) {
        aiOutput = `[Target Audience: ${targetAudience}] ${aiOutput}`;
      }

      // Generate some hashtags
      const generatedHashtags = hashtags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag)
        .map(tag => `#${tag.replace(/\s+/g, '')}`)
        .join(' ');

      aiOutput = `${aiOutput} ${generatedHashtags}`;

      setGeneratedContent(aiOutput);
      toast.success("AI-generated content ready!");
    } catch (error) {
      console.error("AI Content Generation Error:", error);
      toast.error("Failed to generate content. Please try again.");
    } finally {
      setGenerating(false);
    }
  }, [content, tone, length, keywords, targetAudience, hashtags]);

  const improveWriting = useCallback(async () => {
    setGenerating(true);
    setGeneratedContent('');

    try {
      // Simulate an API call to an AI service for improving writing
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate improved writing by adding some filler text
      const improvedContent = `✨ Improved Writing: ${content} - Now with enhanced clarity and style! ✨`;

      setGeneratedContent(improvedContent);
      toast.success("Writing improved!");
    } catch (error) {
      console.error("AI Writing Improvement Error:", error);
      toast.error("Failed to improve writing. Please try again.");
    } finally {
      setGenerating(false);
    }
  }, [content]);

  const generateHashtags = useCallback(async () => {
    setGenerating(true);
    setGeneratedContent('');

    try {
      // Simulate an API call to an AI service for generating hashtags
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate hashtag generation
      const generated = content
        .split(' ')
        .filter(word => word.length > 3)
        .sort(() => Math.random() - 0.5)
        .slice(0, 5)
        .map(word => `#${word.replace(/\s+/g, '')}`)
        .join(' ');

      setGeneratedContent(generated);
      toast.success("Hashtags generated!");
    } catch (error) {
      console.error("AI Hashtag Generation Error:", error);
      toast.error("Failed to generate hashtags. Please try again.");
    } finally {
      setGenerating(false);
    }
  }, [content]);

  const copyToComposer = () => {
    setContent(prevContent => prevContent + ' ' + generatedContent);
    toast.success("Content copied to composer!");
  };

  const addTone = () => {
    setContent(prevContent => prevContent + ' [Tone: ' + tone + ']');
    toast.success("Tone added to composer!");
  };

  const addLength = () => {
    setContent(prevContent => prevContent + ' [Length: ' + length + ']');
    toast.success("Length added to composer!");
  };

  const addKeywords = () => {
    setContent(prevContent => prevContent + ' [Keywords: ' + keywords + ']');
    toast.success("Keywords added to composer!");
  };

  const addTargetAudience = () => {
    setContent(prevContent => prevContent + ' [Target Audience: ' + targetAudience + ']');
    toast.success("Target audience added to composer!");
  };

  const addHashtags = () => {
    setContent(prevContent => prevContent + ' ' + hashtags);
    toast.success("Hashtags added to composer!");
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tone">Tone</Label>
              <Input
                id="tone"
                placeholder="e.g., Formal, Casual, Humorous"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
              />
              <Button variant="outline" size="xs" className="mt-2" onClick={addTone}>
                Add Tone
              </Button>
            </div>
            <div>
              <Label htmlFor="length">Length</Label>
              <Input
                id="length"
                placeholder="e.g., Short, Medium, Long"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
              <Button variant="outline" size="xs" className="mt-2" onClick={addLength}>
                Add Length
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="keywords">Keywords</Label>
              <Input
                id="keywords"
                placeholder="e.g., Marketing, AI, Social Media"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
              <Button variant="outline" size="xs" className="mt-2" onClick={addKeywords}>
                Add Keywords
              </Button>
            </div>
            <div>
              <Label htmlFor="targetAudience">Target Audience</Label>
              <Input
                id="targetAudience"
                placeholder="e.g., Professionals, Students, Creatives"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
              />
              <Button variant="outline" size="xs" className="mt-2" onClick={addTargetAudience}>
                Add Target Audience
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="hashtags">Hashtags</Label>
            <Input
              id="hashtags"
              placeholder="e.g., trending, popular, viral"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
            />
            <Button variant="outline" size="xs" className="mt-2" onClick={addHashtags}>
              Add Hashtags
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant="secondary"
              className="w-1/2 gap-2"
              onClick={generateContent}
              disabled={generating}
            >
              {generating ? (
                <>
                  <Sparkles className="animate-spin h-4 w-4" />
                  Generating...
                </>
              ) : (
                <>
                  <Magic className="h-4 w-4" />
                  Generate Content
                </>
              )}
            </Button>
            <Button
              variant="secondary"
              className="w-1/2 gap-2"
              onClick={improveWriting}
              disabled={generating}
            >
              {generating ? (
                <>
                  <Sparkles className="animate-spin h-4 w-4" />
                  Improving...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" />
                  Improve Writing
                </>
              )}
            </Button>
            <Button
              variant="secondary"
              className="w-1/2 gap-2"
              onClick={generateHashtags}
              disabled={generating}
            >
              {generating ? (
                <>
                  <Sparkles className="animate-spin h-4 w-4" />
                  Generating...
                </>
              ) : (
                <>
                  <Hash className="h-4 w-4" />
                  Generate Hashtags
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {generatedContent && (
        <Card>
          <CardContent className="space-y-4">
            <Textarea
              className="min-h-[100px] resize-none"
              value={generatedContent}
              readOnly
            />
            <Button className="w-full gap-2" onClick={copyToComposer}>
              <Copy className="h-4 w-4" />
              Copy to Composer
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIAssistant;
