
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityContextType {
  highContrast: boolean;
  toggleHighContrast: () => void;
  largeText: boolean;
  toggleLargeText: () => void;
  reduceMotion: boolean;
  toggleReduceMotion: () => void;
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  availableLanguages: string[];
}

const defaultContext: AccessibilityContextType = {
  highContrast: false,
  toggleHighContrast: () => {},
  largeText: false,
  toggleLargeText: () => {},
  reduceMotion: false,
  toggleReduceMotion: () => {},
  currentLanguage: 'en',
  setLanguage: () => {},
  availableLanguages: ['en', 'es', 'fr', 'de', 'zh']
};

const AccessibilityContext = createContext<AccessibilityContextType>(defaultContext);

export const useAccessibility = () => useContext(AccessibilityContext);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved preferences from localStorage
  const [highContrast, setHighContrast] = useState(() => {
    const saved = localStorage.getItem('accessibility-high-contrast');
    return saved === 'true' ? true : false;
  });
  
  const [largeText, setLargeText] = useState(() => {
    const saved = localStorage.getItem('accessibility-large-text');
    return saved === 'true' ? true : false;
  });
  
  const [reduceMotion, setReduceMotion] = useState(() => {
    const saved = localStorage.getItem('accessibility-reduce-motion');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return saved === 'true' || prefersReducedMotion ? true : false;
  });
  
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const saved = localStorage.getItem('accessibility-language');
    return saved || 'en';
  });
  
  const availableLanguages = ['en', 'es', 'fr', 'de', 'zh'];
  
  // Toggle functions
  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
  };
  
  const toggleLargeText = () => {
    setLargeText(prev => !prev);
  };
  
  const toggleReduceMotion = () => {
    setReduceMotion(prev => !prev);
  };
  
  const setLanguage = (lang: string) => {
    if (availableLanguages.includes(lang)) {
      setCurrentLanguage(lang);
    }
  };
  
  // Save to localStorage when preferences change
  useEffect(() => {
    localStorage.setItem('accessibility-high-contrast', highContrast.toString());
    localStorage.setItem('accessibility-large-text', largeText.toString());
    localStorage.setItem('accessibility-reduce-motion', reduceMotion.toString());
    localStorage.setItem('accessibility-language', currentLanguage);
    
    // Apply preferences to document
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    if (largeText) {
      document.documentElement.classList.add('large-text');
    } else {
      document.documentElement.classList.remove('large-text');
    }
    
    if (reduceMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
    
    // Set document language
    document.documentElement.lang = currentLanguage;
    
  }, [highContrast, largeText, reduceMotion, currentLanguage]);
  
  const value = {
    highContrast,
    toggleHighContrast,
    largeText,
    toggleLargeText,
    reduceMotion,
    toggleReduceMotion,
    currentLanguage,
    setLanguage,
    availableLanguages
  };
  
  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};
