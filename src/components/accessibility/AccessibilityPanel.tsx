
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye } from "lucide-react";

const AccessibilityPanel = () => {
  const {
    highContrast,
    toggleHighContrast,
    largeText,
    toggleLargeText,
    reduceMotion,
    toggleReduceMotion,
    currentLanguage,
    setLanguage,
    availableLanguages
  } = useAccessibility();

  const languageNames: Record<string, string> = {
    'en': 'English',
    'es': 'Español',
    'fr': 'Français',
    'de': 'Deutsch',
    'zh': '中文'
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Accessibility Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="high-contrast" className="text-base font-medium">High Contrast</Label>
              <p className="text-sm text-muted-foreground">Increase contrast for better readability</p>
            </div>
            <Switch
              id="high-contrast"
              checked={highContrast}
              onCheckedChange={toggleHighContrast}
              aria-label="Toggle high contrast mode"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="large-text" className="text-base font-medium">Large Text</Label>
              <p className="text-sm text-muted-foreground">Increase text size throughout the app</p>
            </div>
            <Switch
              id="large-text"
              checked={largeText}
              onCheckedChange={toggleLargeText}
              aria-label="Toggle large text mode"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="reduce-motion" className="text-base font-medium">Reduce Motion</Label>
              <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
            </div>
            <Switch
              id="reduce-motion"
              checked={reduceMotion}
              onCheckedChange={toggleReduceMotion}
              aria-label="Toggle reduce motion"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="language-select" className="text-base font-medium">Language</Label>
          <Select value={currentLanguage} onValueChange={setLanguage}>
            <SelectTrigger id="language-select" aria-label="Select language">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {availableLanguages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {languageNames[lang] || lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button variant="outline" className="w-full" onClick={() => {
          // Reset to system preferences
          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          toggleHighContrast();
          toggleLargeText();
          if (reduceMotion !== prefersReducedMotion) toggleReduceMotion();
          setLanguage(navigator.language.split('-')[0]);
        }}>
          Reset to System Defaults
        </Button>
      </CardContent>
    </Card>
  );
};

export default AccessibilityPanel;
