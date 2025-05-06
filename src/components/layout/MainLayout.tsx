
import React from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { OfflineBanner } from '@/components/ui/offline-banner';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <TopBar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} />
        <main id="main-content" tabIndex={-1} className={`flex-1 overflow-auto p-4 transition-all duration-200 ${sidebarOpen ? 'md:ml-64' : 'md:ml-16'}`}>
          {children}
        </main>
      </div>
      <OfflineBanner />
    </div>
  );
};
