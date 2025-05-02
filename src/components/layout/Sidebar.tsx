
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, BarChart2, Settings, Target, MessageSquare, Globe, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
}

interface NavItemProps {
  icon: React.ElementType;
  title: string;
  to: string;
  isActive?: boolean;
  isCollapsed?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, title, to, isActive = false, isCollapsed = false }) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
        isActive 
          ? "bg-sidebar-accent text-sidebar-accent-foreground" 
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      {!isCollapsed && <span>{title}</span>}
    </Link>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  
  return (
    <aside 
      className={cn(
        "fixed left-0 top-16 bottom-0 z-20 w-64 bg-sidebar border-r border-sidebar-border transition-all duration-300 transform",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-16"
      )}
    >
      <div className="flex flex-col h-full py-4 px-2">
        <div className="mb-6 px-2">
          <Button 
            className="w-full bg-brand-600 hover:bg-brand-700 text-white gap-2 justify-start"
          >
            <Plus className="h-5 w-5" />
            {isOpen && <span>New Post</span>}
          </Button>
        </div>

        <nav className="space-y-1">
          <NavItem 
            to="/" 
            icon={Home} 
            title="Dashboard" 
            isActive={location.pathname === '/'} 
            isCollapsed={!isOpen} 
          />
          <NavItem 
            to="/calendar" 
            icon={Calendar} 
            title="Calendar" 
            isActive={location.pathname === '/calendar'} 
            isCollapsed={!isOpen} 
          />
          <NavItem 
            to="/compose" 
            icon={MessageSquare} 
            title="Compose" 
            isActive={location.pathname === '/compose'} 
            isCollapsed={!isOpen} 
          />
          <NavItem 
            to="/analytics" 
            icon={BarChart2} 
            title="Analytics" 
            isActive={location.pathname === '/analytics'} 
            isCollapsed={!isOpen} 
          />
          <NavItem 
            to="/campaigns" 
            icon={Target} 
            title="Campaigns" 
            isActive={location.pathname === '/campaigns'} 
            isCollapsed={!isOpen} 
          />
          <NavItem 
            to="/accounts" 
            icon={Globe} 
            title="Accounts" 
            isActive={location.pathname === '/accounts'} 
            isCollapsed={!isOpen} 
          />
        </nav>

        <div className="mt-auto space-y-1">
          <NavItem 
            to="/settings" 
            icon={Settings} 
            title="Settings" 
            isActive={location.pathname === '/settings'} 
            isCollapsed={!isOpen} 
          />
        </div>
      </div>
    </aside>
  );
};
