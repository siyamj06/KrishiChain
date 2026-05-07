import DashboardLayout from "@/components/DashboardLayout";
import { Home, ScanLine, Eye, Star, MapPin, Calendar, Truck, User, Leaf, Zap } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBatches } from "@/context/BatchContext";
import type { Batch } from "@/context/BatchContext";

const navItems = [
  { label: "Home", path: "/consumer", icon: <Home className="h-4 w-4" /> },
  { label: "Scan QR", path: "/consumer/scan", icon: <ScanLine className="h-4 w-4" /> },
  { label: "Produce Profile", path: "/consumer/profile", icon: <Eye className="h-4 w-4" /> },
  { label: "Rate Quality", path: "/consumer/rate", icon: <Star className="h-4 w-4" /> },
];

// ── Per-batch static enrichment data ──────────────────────────────────────────
type FarmerInfo = { name: string; farm: string; location: string; bio: string; rating: number; reviews: number; totalBatches: number };
type JourneyStep = { stage: string; location: string; date: string; icon: React.ElementType };
type CertInfo = { label: string; valid: string };

const farmerData: Record<string, FarmerInfo> = {
  "B-1042": {
    name: "Rajesh Kumar",
    farm: "Green Valley Farm",
    location: "Nashik, Maharashtra",
    bio: "Third-generation organic farmer specialising in heirloom tomato varieties. Practices natural pest management and rainwater harvesting. Certified organic since 2019.",
    rating: 4.7, reviews: 142, totalBatches: 47,
  },
  "B-1041": {
    name: "Priya Sharma",
    farm: "Karnal Agro Farms",
    location: "Karnal, Haryana",
    bio: "Basmati rice specialist with export-grade quality produce. Uses precision irrigation and minimal chemical inputs. Supplies to premium markets across India.",
    rating: 4.5, reviews: 89, totalBatches: 32,
  },
  "B-1040": {
    name: "Vikram Singh",
    farm: "Andhra Spice Farm",
    location: "Guntur, Andhra Pradesh",
    bio: "Premium chilli producer with award-winning quality. 20 years of experience growing GI-tagged Guntur chillies using traditional natural farming techniques.",
    rating: 4.9, reviews: 312, totalBatches: 78,
  },
};

const journeyData: Record<string, JourneyStep[]> = {
  "B-1042": [
    { stage: "Harvested", location: "Green Valley Farm, Nashik", date: "Mar 28, 2026", icon: Calendar },
    { stage: "Cold Storage", location: "Nashik Cold Chain Hub", date: "Mar 29, 2026", icon: MapPin },
    { stage: "In Transit", location: "NH-50 → Mumbai", date: "Mar 30, 2026", icon: Truck },
    { stage: "At Retail", location: "Fresh Mart, Mumbai", date: "Mar 31, 2026", icon: MapPin },
  ],
  "B-1041": [
    { stage: "Harvested", location: "Karnal Agro Farms, Haryana", date: "Mar 25, 2026", icon: Calendar },
    { stage: "Milling", location: "Karnal Rice Mill", date: "Mar 26, 2026", icon: MapPin },
    { stage: "In Transit", location: "NH-44 → Delhi NCR", date: "Mar 27, 2026", icon: Truck },
    { stage: "Delivered", location: "Organic Bazaar, Delhi", date: "Mar 28, 2026", icon: MapPin },
  ],
  "B-1040": [
    { stage: "Harvested", location: "Andhra Spice Farm, Guntur", date: "Mar 22, 2026", icon: Calendar },
    { stage: "Drying & Processing", location: "Guntur Spice Hub", date: "Mar 23, 2026", icon: MapPin },
    { stage: "In Transit", location: "NH-65 → Hyderabad", date: "Mar 24, 2026", icon: Truck },
    { stage: "At Retailer", location: "Spice World, Hyderabad", date: "Mar 25, 2026", icon: MapPin },
  ],
};

const certData: Record<string, CertInfo> = {
  "B-1042": { label: "GreenCert Organic", valid: "Dec 31, 2026" },
  "B-1041": { label: "APEDA Certified", valid: "Mar 31, 2027" },
  "B-1040": { label: "FSSAI Approved", valid: "Jun 30, 2026" },
};

// ── Component ─────────────────────────────────────────────────────────────────
const ProduceProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { batches } = useBatches();

  // Read the batchId passed via navigation state; fall back to first batch
  const batchId = (location.state as { batchId?: string } | null)?.batchId;
  const batch: Batch | undefined = batches.find((b) => b.id === batchId) ?? batches[0];

  if (!batch) {
    return (
      <DashboardLayout title="Consumer" roleColor="bg-consumer text-consumer-foreground" navItems={navItems}>
        <div className="flex flex-col items-center py-16 text-center gap-4">
          <Eye className="h-12 w-12 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No produce data found. Please scan a QR code first.</p>
          <button onClick={() => navigate("/consumer/scan")} className="rounded-xl bg-consumer px-6 py-2.5 text-sm font-semibold text-consumer-foreground hover:opacity-90">
            Scan QR Code
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const farmer = farmerData[batch.id] ?? {
    name: "Unknown Farmer", farm: batch.location, location: batch.location,
    bio: "Farmer information not available for this batch.", rating: 4.5, reviews: 0, totalBatches: 0,
  };
  const journey = journeyData[batch.id] ?? [];
  const cert = certData[batch.id] ?? { label: "Certified", valid: "N/A" };
  const retailPrice = Math.round(Number(batch.price) * 1.15);

  return (
    <DashboardLayout title="Consumer" roleColor="bg-consumer text-consumer-foreground" navItems={navItems}>
      <h2 className="mb-6 text-xl sm:text-2xl font-bold text-foreground">Produce Profile</h2>

      <div className="mb-6 sm:mb-8 grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">

        {/* Product info */}
        <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
          <h3 className="mb-4 text-base sm:text-lg font-bold text-foreground">{batch.crop}</h3>
          <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Origin</span><span className="text-foreground">{batch.location}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Farm</span><span className="text-foreground">{farmer.farm}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Batch</span><span className="font-mono text-foreground">{batch.id}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Quantity</span><span className="text-foreground">{batch.quantity} kg</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Farm-gate Price</span><span className="text-foreground">₹{batch.price}/kg</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Retail Price</span><span className="text-foreground">₹{retailPrice}/kg</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">NFT</span><span className="font-mono text-blockchain truncate ml-4 text-right">{batch.nft}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Status</span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                batch.status === "Delivered" ? "bg-producer/10 text-producer" :
                batch.status === "In Transit" ? "bg-retailer/10 text-retailer" :
                "bg-consumer/10 text-consumer"
              }`}>{batch.status}</span>
            </div>
          </div>
        </div>

        {/* Farmer story */}
        <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-full bg-producer/10 flex-shrink-0">
              <User className="h-5 sm:h-6 w-5 sm:w-6 text-producer" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-foreground text-sm sm:text-base truncate">{farmer.name}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">{farmer.farm}, {farmer.location}</p>
            </div>
          </div>
          <p className="mb-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">{farmer.bio}</p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
            <span className="text-retailer font-semibold">{farmer.rating}★</span>
            <span className="text-muted-foreground">{farmer.reviews} ratings</span>
            <span className="text-muted-foreground">{farmer.totalBatches} batches</span>
          </div>
        </div>
      </div>

      {/* Freshness Score */}
      <div className="mb-6 sm:mb-8 rounded-xl border border-green-500/30 bg-green-500/5 p-4 sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <Zap className="h-4 sm:h-5 w-4 sm:w-5 text-green-600" />
          <span className="font-bold text-foreground text-base sm:text-lg">Freshness Score</span>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xl sm:text-2xl font-bold text-green-600">{batch.freshnessScore}/100</span>
            <span className="text-xs sm:text-sm text-green-600 font-semibold bg-green-500/20 px-2 sm:px-3 py-1 rounded-full">
              {batch.freshnessScore >= 90 ? "Excellent" : batch.freshnessScore >= 75 ? "Good" : "Fair"}
            </span>
          </div>
          <div className="h-2 sm:h-3 w-full rounded-full bg-green-200 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
              style={{ width: `${batch.freshnessScore}%` }}
            />
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">Peak freshness maintained with optimal cold chain management</p>
        </div>
      </div>

      {/* Pesticide & Safety Report */}
      <div className="mb-6 sm:mb-8 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <Leaf className="h-4 sm:h-5 w-4 sm:w-5 text-emerald-600" />
          <span className="font-bold text-foreground text-base sm:text-lg">Safety & Pesticide Report</span>
        </div>
        <div className="space-y-3 sm:space-y-4">
          <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-3 sm:p-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="h-5 sm:h-6 w-5 sm:w-6 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                <span className="text-emerald-600 font-bold text-xs sm:text-sm">✓</span>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-foreground text-xs sm:text-sm">{batch.pesticideReport}</p>
                <p className="text-xs text-muted-foreground mt-1">Third-party certified. All produce tested and verified to meet safety standards.</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div className="rounded-lg bg-card border border-emerald-500/20 p-2 sm:p-3">
              <p className="text-xs text-muted-foreground font-medium">Certification</p>
              <p className="text-xs sm:text-sm font-semibold text-foreground mt-1">{cert.label}</p>
            </div>
            <div className="rounded-lg bg-card border border-emerald-500/20 p-2 sm:p-3">
              <p className="text-xs text-muted-foreground font-medium">Valid Until</p>
              <p className="text-xs sm:text-sm font-semibold text-foreground mt-1">{cert.valid}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Supply Chain Journey */}
      {journey.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
          <h3 className="mb-6 text-base sm:text-lg font-bold text-foreground">Supply Chain Journey</h3>
          <div className="space-y-0">
            {journey.map((step, i) => (
              <div key={i} className="flex gap-2 sm:gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 sm:h-10 w-8 sm:w-10 items-center justify-center rounded-full bg-consumer/10 flex-shrink-0">
                    <step.icon className="h-4 sm:h-5 w-4 sm:w-5 text-consumer" />
                  </div>
                  {i < journey.length - 1 && <div className="w-0.5 flex-1 bg-border min-h-[20px]" />}
                </div>
                <div className="pb-4 sm:pb-6">
                  <p className="font-semibold text-foreground text-xs sm:text-sm">{step.stage}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{step.location}</p>
                  <p className="text-xs text-muted-foreground">{step.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ProduceProfile;
