
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import Compose from "./pages/Compose";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import PlatformsPage from "./pages/Platforms";
import MessagesPage from "./pages/Messages";
import Analytics from "./pages/Analytics"; // New analytics page

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/calendar" element={<MainLayout><Calendar /></MainLayout>} />
          <Route path="/compose" element={<MainLayout><Compose /></MainLayout>} />
          <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
          <Route path="/platforms" element={<MainLayout><PlatformsPage /></MainLayout>} />
          <Route path="/messages" element={<MainLayout><MessagesPage /></MainLayout>} />
          <Route path="/analytics" element={<MainLayout><Analytics /></MainLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
