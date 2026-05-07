import DashboardLayout from "@/components/DashboardLayout";
import { LayoutDashboard, ScanLine, IndianRupeeIcon, LineChart, Camera, CheckCircle, Users } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", path: "/retailer", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Scan QR", path: "/retailer/scan", icon: <ScanLine className="h-4 w-4" /> },
  { label: "Log Costs", path: "/retailer/costs", icon: <IndianRupeeIcon className="h-4 w-4" /> },
  { label: "Insights", path: "/retailer/insights", icon: <LineChart className="h-4 w-4" /> },
  { label: "Browse Farmers", path: "/retailer/farmers", icon: <Users className="h-4 w-4" /> },
];

const ScanQR = () => {
  const [scanned, setScanned] = useState(false);

  return (
    <DashboardLayout title="Retailer" roleColor="bg-retailer text-retailer-foreground" navItems={navItems}>
      <h2 className="mb-6 text-xl sm:text-2xl font-bold text-foreground">Scan Batch QR Code</h2>

      {!scanned ? (
        <div className="flex flex-col items-center">
          <div className="mb-6 flex h-40 sm:h-52 w-40 sm:w-52 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-retailer/40 bg-retailer/5">
            <Camera className="mb-3 h-8 sm:h-12 w-8 sm:w-12 text-retailer/60" />
            <p className="text-xs sm:text-sm text-muted-foreground text-center px-2">Camera viewfinder</p>
          </div>
          <button onClick={() => setScanned(true)} className="rounded-xl bg-retailer px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-retailer-foreground hover:opacity-90 w-full sm:w-auto">
            Simulate Scan
          </button>
        </div>
      ) : (
        <div className="max-w-md rounded-xl border border-border bg-card p-4 sm:p-6">
          <div className="mb-4 flex items-center gap-2 text-producer">
            <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5" />
            <span className="font-semibold text-xs sm:text-sm">Batch Origin Verified</span>
          </div>
          <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Batch ID</span><span className="font-mono text-foreground">B-1042</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Crop</span><span className="text-foreground">Organic Tomatoes</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Producer</span><span className="text-foreground">Ravi Kumar, Karnataka</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Harvest Date</span><span className="text-foreground">Mar 26, 2026</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">NFT</span><span className="font-mono text-blockchain">0x7a3f...c82e</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Chain</span><span className="text-blockchain">Polygon</span></div>
          </div>
          <button onClick={() => setScanned(false)} className="mt-5 w-full rounded-lg bg-muted py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-foreground hover:bg-border">
            Scan Another
          </button>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ScanQR;
