import DashboardLayout from "@/components/DashboardLayout";
import { LayoutDashboard, ScanLine, IndianRupeeIcon, LineChart, Bell, Users } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/retailer", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Scan QR", path: "/retailer/scan", icon: <ScanLine className="h-4 w-4" /> },
  { label: "Log Costs", path: "/retailer/costs", icon: <IndianRupeeIcon className="h-4 w-4" /> },
  { label: "Insights", path: "/retailer/insights", icon: <LineChart className="h-4 w-4" /> },
  { label: "Browse Farmers", path: "/retailer/farmers", icon: <Users className="h-4 w-4" /> },
];

const Insights = () => (
  <DashboardLayout title="Retailer" roleColor="bg-retailer text-retailer-foreground" navItems={navItems}>
    <h2 className="mb-6 text-2xl font-bold text-foreground">Subscribe to Insights</h2>

    <div className="mb-8 grid gap-4 sm:grid-cols-2">
      {[
        { title: "Price Trends", desc: "Get notified when market prices shift for your tracked crops" },
        { title: "Supply Alerts", desc: "Know when new batches from top-rated producers become available" },
        { title: "Cost Analytics", desc: "Weekly breakdown of your storage and transport costs" },
        { title: "Quality Reports", desc: "Consumer ratings aggregated for batches you handled" },
      ].map((item) => (
        <div key={item.title} className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-retailer/10">
            <Bell className="h-5 w-5 text-retailer" />
          </div>
          <div>
            <p className="font-semibold text-foreground">{item.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
            <button className="mt-3 text-xs font-medium text-retailer hover:underline">Subscribe</button>
          </div>
        </div>
      ))}
    </div>
  </DashboardLayout>
);

export default Insights;
