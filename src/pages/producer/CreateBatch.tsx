import DashboardLayout from "@/components/DashboardLayout";
import { LayoutDashboard, PackagePlus, QrCode, BarChart3, BookOpen, TrendingUp, Store } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBatches } from "@/context/BatchContext";

const navItems = [
  { label: "Dashboard", path: "/producer", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Create Batch", path: "/producer/create-batch", icon: <PackagePlus className="h-4 w-4" /> },
  { label: "QR Codes", path: "/producer/qr-codes", icon: <QrCode className="h-4 w-4" /> },
  { label: "Analytics", path: "/producer/analytics", icon: <BarChart3 className="h-4 w-4" /> },
  { label: "Find Retailers", path: "/producer/find-retailers", icon: <Store className="h-4 w-4" /> },
  { label: "Glossary", path: "/producer/glossary", icon: <BookOpen className="h-4 w-4" /> },
  { label: "Market Trends", path: "/producer/market-trends", icon: <TrendingUp className="h-4 w-4" /> },
];

const CreateBatch = () => {
  const navigate = useNavigate();
  const { addBatch } = useBatches();
  const [submitted, setSubmitted] = useState(false);
  const [crop, setCrop] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBatch({ crop, quantity, price, harvestDate, location });
    setSubmitted(true);
    setTimeout(() => navigate("/producer/qr-codes"), 2000);
  };

  if (submitted) {
    return (
      <DashboardLayout title="Producer" roleColor="bg-producer text-producer-foreground" navItems={navItems}>
        <div className="flex flex-col items-center justify-center py-12 sm:py-20">
          <div className="mb-4 flex h-14 sm:h-16 w-14 sm:w-16 items-center justify-center rounded-full bg-producer/10">
            <QrCode className="h-7 sm:h-8 w-7 sm:w-8 text-producer" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-foreground">NFT Passport Minted!</h2>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground">QR code generated on Polygon chain. Redirecting...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Producer" roleColor="bg-producer text-producer-foreground" navItems={navItems}>
      <h2 className="mb-6 text-xl sm:text-2xl font-bold text-foreground">Create New Batch</h2>
      <form onSubmit={handleSubmit} className="max-w-lg space-y-4 sm:space-y-5">
        <div>
          <label className="mb-1.5 block text-xs sm:text-sm font-medium text-foreground">Crop Name</label>
          <input required value={crop} onChange={(e) => setCrop(e.target.value)} className="w-full rounded-xl border border-input bg-background px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. Organic Tomatoes" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="mb-1.5 block text-xs sm:text-sm font-medium text-foreground">Quantity (kg)</label>
            <input required type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full rounded-xl border border-input bg-background px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="500" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs sm:text-sm font-medium text-foreground">Price (₹/kg)</label>
            <input required type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full rounded-xl border border-input bg-background px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="45" />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-xs sm:text-sm font-medium text-foreground">Harvest Date</label>
          <input required type="date" value={harvestDate} onChange={(e) => setHarvestDate(e.target.value)} className="w-full rounded-xl border border-input bg-background px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs sm:text-sm font-medium text-foreground">Farm Location</label>
          <input required value={location} onChange={(e) => setLocation(e.target.value)} className="w-full rounded-xl border border-input bg-background px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Village, District, State" />
        </div>
        <button type="submit" className="w-full rounded-xl bg-producer py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-producer-foreground transition-opacity hover:opacity-90">
          Mint NFT Passport & Generate QR
        </button>
      </form>
    </DashboardLayout>
  );
};

export default CreateBatch;
