import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BatchProvider } from "@/context/BatchContext";
import Index from "./pages/Index";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import LanguageSelect from "./pages/LanguageSelect";
import RoleSelect from "./pages/RoleSelect";
import ProducerDashboard from "./pages/producer/ProducerDashboard";
import CreateBatch from "./pages/producer/CreateBatch";
import QRCodes from "./pages/producer/QRCodes";
import Analytics from "./pages/producer/Analytics";
import Glossary from "./pages/producer/Glossary";
import MarketTrends from "./pages/producer/MarketTrends";
import FindRetailers from "./pages/producer/FindRetailers";
import RetailerDashboard from "./pages/retailer/RetailerDashboard";
import ScanQR from "./pages/retailer/ScanQR";
import LogCosts from "./pages/retailer/LogCosts";
import Insights from "./pages/retailer/Insights";
import BrowseFarmers from "./pages/retailer/BrowseFarmers";
import ConsumerHome from "./pages/consumer/ConsumerHome";
import ScanProduct from "./pages/consumer/ScanProduct";
import ProduceProfile from "./pages/consumer/ProduceProfile";
import RateQuality from "./pages/consumer/RateQuality";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BatchProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LanguageSelect />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/language" element={<LanguageSelect />} />
            <Route path="/role-select" element={<RoleSelect />} />
            {/* Producer */}
            <Route path="/producer" element={<ProducerDashboard />} />
            <Route path="/producer/create-batch" element={<CreateBatch />} />
            <Route path="/producer/qr-codes" element={<QRCodes />} />
            <Route path="/producer/analytics" element={<Analytics />} />
            <Route path="/producer/glossary" element={<Glossary />} />
            <Route path="/producer/market-trends" element={<MarketTrends />} />
            <Route path="/producer/find-retailers" element={<FindRetailers />} />
            {/* Retailer */}
            <Route path="/retailer" element={<RetailerDashboard />} />
            <Route path="/retailer/scan" element={<ScanQR />} />
            <Route path="/retailer/costs" element={<LogCosts />} />
            <Route path="/retailer/insights" element={<Insights />} />
            <Route path="/retailer/farmers" element={<BrowseFarmers />} />
            <Route path="/retailer/costs" element={<LogCosts />} />
            <Route path="/retailer/insights" element={<Insights />} />
            {/* Consumer */}
            <Route path="/consumer" element={<ConsumerHome />} />
            <Route path="/consumer/scan" element={<ScanProduct />} />
            <Route path="/consumer/profile" element={<ProduceProfile />} />
            <Route path="/consumer/rate" element={<RateQuality />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </BatchProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
