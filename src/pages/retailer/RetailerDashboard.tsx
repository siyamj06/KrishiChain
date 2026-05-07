import DashboardLayout from "@/components/DashboardLayout";
import { LayoutDashboard, ScanLine, IndianRupeeIcon, ArrowRightLeft, LineChart, CheckCircle, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", path: "/retailer", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Scan QR", path: "/retailer/scan", icon: <ScanLine className="h-4 w-4" /> },
  { label: "Log Costs", path: "/retailer/costs", icon: <IndianRupeeIcon className="h-4 w-4" /> },
  { label: "Insights", path: "/retailer/insights", icon: <LineChart className="h-4 w-4" /> },
  { label: "Browse Farmers", path: "/retailer/farmers", icon: <Users className="h-4 w-4" /> },
];

const inventory = [
  { id: "B-1042", crop: "Organic Tomatoes", origin: "Karnataka", stage: "Storage", qty: "500 kg" },
  { id: "B-1038", crop: "Alphonso Mangoes", origin: "Maharashtra", stage: "In Transit", qty: "800 kg" },
  { id: "B-1035", crop: "Jasmine Rice", origin: "Tamil Nadu", stage: "Ready to Sell", qty: "1,500 kg" },
];

const RetailerDashboard = () => {
  const navigate = useNavigate();
  const [costSubmitted, setCostSubmitted] = useState(false);

  return (
    <DashboardLayout title="Retailer" roleColor="bg-retailer text-retailer-foreground" navItems={navItems}>
      {/* Verification badge */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 rounded-xl border border-border bg-card p-3 sm:p-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-retailer/10 flex-shrink-0">
          <ScanLine className="h-4 w-4 text-retailer" />
        </div>
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-semibold text-foreground">Business Verified — GSTIN / Trade License</p>
          <p className="text-xs text-muted-foreground">Retailer ID: R-204</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {[
          { label: "Batches Handled", value: "34" },
          { label: "Total Costs Logged", value: "₹2,18,000" },
          { label: "Active Shipments", value: "5" },
          { label: "Batches Passed On", value: "29" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4 sm:p-5">
            <p className="text-xs sm:text-sm text-muted-foreground">{s.label}</p>
            <p className="mt-1 text-xl sm:text-2xl font-bold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mb-8 grid gap-3 sm:grid-cols-2">
        <button onClick={() => navigate("/retailer/scan")} className="flex items-center justify-center gap-2 rounded-xl bg-retailer px-5 py-3 text-sm sm:text-base font-medium text-retailer-foreground hover:opacity-90 w-full">
          <ScanLine className="h-4 w-4" /> Scan Batch QR
        </button>
        <button onClick={() => navigate("/retailer/costs")} className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm sm:text-base font-medium text-foreground hover:bg-muted w-full">
          <IndianRupeeIcon className="h-4 w-4" /> Log Costs
        </button>
      </div>

      {/* Inventory */}
      <div className="mb-8 rounded-xl border border-border bg-card">
        <div className="border-b border-border px-4 sm:px-5 py-3 sm:py-4">
          <h2 className="text-sm sm:text-base font-semibold text-foreground">Current Inventory</h2>
        </div>
        {/* Mobile card view */}
        <div className="divide-y divide-border sm:hidden">
          {inventory.map((item) => (
            <div key={item.id} className="px-4 py-4 space-y-2">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-foreground truncate">{item.crop}</p>
                  <span className="rounded-full bg-retailer/10 px-2 py-0.5 text-xs font-medium text-retailer">{item.stage}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{item.id} · {item.origin} · {item.qty}</p>
                <button className="inline-flex items-center gap-1 text-xs font-medium text-retailer hover:underline">
                  <ArrowRightLeft className="h-3 w-3" /> Pass On
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Desktop table view */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="px-5 py-3 font-medium">Batch</th>
                <th className="px-5 py-3 font-medium">Crop</th>
                <th className="px-5 py-3 font-medium">Origin</th>
                <th className="px-5 py-3 font-medium">Stage</th>
                <th className="px-5 py-3 font-medium">Qty</th>
                <th className="px-5 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-3 font-mono text-foreground">{item.id}</td>
                  <td className="px-5 py-3 text-foreground">{item.crop}</td>
                  <td className="px-5 py-3 text-muted-foreground">{item.origin}</td>
                  <td className="px-5 py-3">
                    <span className="inline-block rounded-full bg-retailer/10 px-3 py-1 text-xs font-medium text-retailer">{item.stage}</span>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{item.qty}</td>
                  <td className="px-5 py-3">
                    <button className="flex items-center gap-1 text-xs font-medium text-retailer hover:underline">
                      <ArrowRightLeft className="h-3 w-3" /> Pass On
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RetailerDashboard;
