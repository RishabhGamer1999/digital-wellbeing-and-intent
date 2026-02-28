import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import SamsungHomeScreen from "./pages/SamsungHomeScreen";
import SamsungSettings from "./pages/SamsungSettings";
import DigitalWellbeingLanding from "./pages/DigitalWellbeingLanding";
import Dashboard from "./pages/Dashboard";
import SessionDetail from "./pages/SessionDetail";
import AIReflection from "./pages/AIReflection";
import HabitSettings from "./pages/HabitSettings";
import OverlayDemo from "./pages/OverlayDemo";
import WalkingMonitor from "./pages/WalkingMonitor";
import DrivingMonitor from "./pages/DrivingMonitor";
import VolumeMonitor from "./pages/VolumeMonitor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SamsungHomeScreen />} />
          <Route element={<AppLayout />}>
            <Route path="/settings" element={<SamsungSettings />} />
            <Route path="/digital-wellbeing" element={<DigitalWellbeingLanding />} />
            <Route path="/intent-spectrum" element={<Dashboard />} />
            <Route path="/session/:sessionId" element={<SessionDetail />} />
            <Route path="/ai-reflection" element={<AIReflection />} />
            <Route path="/settings/habits" element={<HabitSettings />} />
            <Route path="/overlay/demo" element={<OverlayDemo />} />
            <Route path="/digital-wellbeing/monitors/walking" element={<WalkingMonitor />} />
            <Route path="/digital-wellbeing/monitors/driving" element={<DrivingMonitor />} />
            <Route path="/digital-wellbeing/monitors/volume" element={<VolumeMonitor />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
