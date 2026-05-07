import DashboardLayout from "@/components/DashboardLayout";
import { LayoutDashboard, ScanLine, IndianRupeeIcon, LineChart, CheckCircle, Users } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", path: "/retailer", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Scan QR", path: "/retailer/scan", icon: <ScanLine className="h-4 w-4" /> },
  { label: "Log Costs", path: "/retailer/costs", icon: <IndianRupeeIcon className="h-4 w-4" /> },
  { label: "Insights", path: "/retailer/insights", icon: <LineChart className="h-4 w-4" /> },
  { label: "Browse Farmers", path: "/retailer/farmers", icon: <Users className="h-4 w-4" /> },
];

const LogCosts = () => {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <DashboardLayout title="Retailer" roleColor="bg-retailer text-retailer-foreground" navItems={navItems}>
        <div className="flex flex-col items-center py-20">
          <CheckCircle className="mb-4 h-12 w-12 text-producer" />
          <h2 className="text-xl font-bold text-foreground">Cost Logged to Blockchain</h2>
          <p className="mt-2 text-muted-foreground">Immutable record written on-chain</p>
          <button onClick={() => setSubmitted(false)} className="mt-6 rounded-xl bg-retailer px-6 py-2 text-sm font-medium text-retailer-foreground hover:opacity-90">
            Log Another
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Retailer" roleColor="bg-retailer text-retailer-foreground" navItems={navItems}>
      <h2 className="mb-6 text-2xl font-bold text-foreground">Log Stage Costs</h2>
      <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="max-w-lg space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Batch ID</label>
          <select className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
            <option>B-1042 — Organic Tomatoes</option>
            <option>B-1038 — Alphonso Mangoes</option>
            <option>B-1035 — Jasmine Rice</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Cost Type</label>
          <select className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
            <option>Storage</option>
            <option>Transport</option>
            <option>Packaging</option>
            <option>Handling</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Amount (₹)</label>
          <input required type="number" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="5000" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Notes</label>
          <textarea className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Optional details..." rows={3} />
        </div>
        <button type="submit" className="w-full rounded-xl bg-retailer py-3 font-semibold text-retailer-foreground hover:opacity-90">
          Add the record
        </button>
      </form>
    </DashboardLayout>
  );
};

export default LogCosts;
