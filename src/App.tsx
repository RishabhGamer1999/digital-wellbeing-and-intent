import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import SessionDetail from "./pages/SessionDetail";
import AIReflection from "./pages/AIReflection";
import HabitSettings from "./pages/HabitSettings";
import OverlayDemo from "./pages/OverlayDemo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/session/:sessionId" element={<SessionDetail />} />
            <Route path="/ai-reflection" element={<AIReflection />} />
            <Route path="/settings/habits" element={<HabitSettings />} />
            <Route path="/overlay/demo" element={<OverlayDemo />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
