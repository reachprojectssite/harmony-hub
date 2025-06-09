import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "@/pages/NotFound";
import Dashboard from "./pages/Dashboard";
import TrackNewRelease from "./pages/TrackNewRelease";
import DistributeMusic from "./pages/DistributeMusic";
import Releases from "./pages/Releases";
import RevenueStreams from "./pages/RevenueStreams";
import Recoupables from "./pages/Recoupables";
import Payouts from "./pages/Payouts";
import Contracts from "./pages/Contracts";
import Stakeholders from "./pages/Stakeholders";
import Analytics from "./pages/Analytics";
import SplitTemplates from "./pages/SplitTemplates";
import DisputeCenter from "./pages/DisputeCenter";
import BankingIntegrations from "./pages/BankingIntegrations";
import TeamManagement from "./pages/TeamManagement";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <div className="m-0 p-0 min-h-screen w-full bg-background overflow-x-hidden">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/track-release" element={<TrackNewRelease />} />
            <Route path="/distribute" element={<DistributeMusic />} />
            <Route path="/releases" element={<Releases />} />
            <Route path="/revenue" element={<RevenueStreams />} />
            <Route path="/recoupables" element={<Recoupables />} />
            <Route path="/payouts" element={<Payouts />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/stakeholders" element={<Stakeholders />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/split-templates" element={<SplitTemplates />} />
            <Route path="/disputes" element={<DisputeCenter />} />
            <Route path="/integrations" element={<BankingIntegrations />} />
            <Route path="/team" element={<TeamManagement />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </div>
);

export default App;