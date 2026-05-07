import DashboardLayout from "@/components/DashboardLayout";
import { Home, ScanLine, Eye, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/consumer", icon: <Home className="h-4 w-4" /> },
  { label: "Scan QR", path: "/consumer/scan", icon: <ScanLine className="h-4 w-4" /> },
  { label: "Produce Profile", path: "/consumer/profile", icon: <Eye className="h-4 w-4" /> },
  { label: "Rate Quality", path: "/consumer/rate", icon: <Star className="h-4 w-4" /> },
];

// Each entry includes the batchId so ProduceProfile can load the correct data
const recentScans = [
  { batchId: "B-1042", crop: "Organic Tomatoes", farmer: "Rajesh Kumar", rating: 4.7, location: "Nashik, Maharashtra" },
  { batchId: "B-1041", crop: "Basmati Rice",     farmer: "Priya Sharma",  rating: 4.5, location: "Karnal, Haryana" },
  { batchId: "B-1040", crop: "Green Chillies",   farmer: "Vikram Singh",  rating: 4.9, location: "Guntur, Andhra Pradesh" },
];

const ConsumerHome = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout title="Consumer" roleColor="bg-consumer text-consumer-foreground" navItems={navItems}>
      {/* Hero */}
      <div className="mb-8 rounded-2xl bg-consumer/10 p-4 sm:p-8 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">Know Your Food</h2>
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground">Scan any product QR code to trace its journey from farm to your table</p>
        <button onClick={() => navigate("/consumer/scan")} className="mt-4 sm:mt-5 rounded-xl bg-consumer px-4 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-consumer-foreground hover:opacity-90 w-full sm:w-auto">
          <span className="flex items-center justify-center gap-2"><ScanLine className="h-4 w-4" /> Scan Product</span>
        </button>
      </div>

      {/* Recent scans */}
      <h3 className="mb-4 font-semibold text-foreground text-sm sm:text-base">Recent Scans</h3>
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
        {recentScans.map((item) => (
          <button
            key={item.batchId}
            onClick={() => navigate("/consumer/profile", { state: { batchId: item.batchId } })}
            className="flex items-start sm:items-center gap-3 rounded-xl border border-border bg-card p-3 sm:p-5 text-left transition-all hover:shadow-md"
          >
            <div className="flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-xl bg-producer/10 flex-shrink-0">
              <Eye className="h-5 sm:h-6 w-5 sm:w-6 text-producer" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-foreground text-xs sm:text-sm truncate">{item.crop}</p>
              <p className="text-xs text-muted-foreground truncate">{item.farmer} · {item.location}</p>
              <p className="text-xs text-retailer">{item.rating}★</p>
            </div>
          </button>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default ConsumerHome;
