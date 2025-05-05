
import React, { useEffect, useState } from 'react';
import { AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export const OfflineBanner = () => {
  const { isOffline, setIsOffline } = useAppStore();
  const [showReconnected, setShowReconnected] = useState(false);
  
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setShowReconnected(true);
      setTimeout(() => setShowReconnected(false), 3000);
    };
    
    const handleOffline = () => {
      setIsOffline(true);
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Initial check
    setIsOffline(!navigator.onLine);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setIsOffline]);
  
  if (!isOffline && !showReconnected) return null;
  
  return (
    <div className={`fixed bottom-4 right-4 z-50 p-4 rounded-md shadow-lg transition-all duration-300 ${isOffline ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
      <div className="flex items-center gap-2">
        {isOffline ? (
          <>
            <WifiOff className="h-5 w-5 text-red-500" />
            <span className="text-red-700 font-medium">You're offline. Some features may be limited.</span>
          </>
        ) : (
          <>
            <Wifi className="h-5 w-5 text-green-500" />
            <span className="text-green-700 font-medium">You're back online!</span>
          </>
        )}
      </div>
    </div>
  );
};
