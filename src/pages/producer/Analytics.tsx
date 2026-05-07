import DashboardLayout from "@/components/DashboardLayout";
import { LayoutDashboard, PackagePlus, QrCode, BarChart3, BookOpen, TrendingUp, Store } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/producer", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Create Batch", path: "/producer/create-batch", icon: <PackagePlus className="h-4 w-4" /> },
  { label: "QR Codes", path: "/producer/qr-codes", icon: <QrCode className="h-4 w-4" /> },
  { label: "Analytics", path: "/producer/analytics", icon: <BarChart3 className="h-4 w-4" /> },
  { label: "Find Retailers", path: "/producer/find-retailers", icon: <Store className="h-4 w-4" /> },
  { label: "Glossary", path: "/producer/glossary", icon: <BookOpen className="h-4 w-4" /> },
  { label: "Market Trends", path: "/producer/market-trends", icon: <TrendingUp className="h-4 w-4" /> },
];

const monthlyData = [
  { month: "Oct", revenue: 82000, batches: 8 },
  { month: "Nov", revenue: 95000, batches: 10 },
  { month: "Dec", revenue: 78000, batches: 7 },
  { month: "Jan", revenue: 110000, batches: 12 },
  { month: "Feb", revenue: 98000, batches: 9 },
  { month: "Mar", revenue: 124500, batches: 14 },
];

const Analytics = () => {
  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));

  return (
    <DashboardLayout title="Producer" roleColor="bg-producer text-producer-foreground" navItems={navItems}>
      <h2 className="mb-6 text-xl sm:text-2xl font-bold text-foreground">Analytics & Insights</h2>

      {/* Simple bar chart */}
      <div className="mb-8 rounded-xl border border-border bg-card p-4 sm:p-6">
        <h3 className="mb-4 font-semibold text-foreground text-xs sm:text-sm">Monthly Revenue</h3>
        <div className="flex items-end gap-1.5 sm:gap-3" style={{ height: 150 }}>
          {monthlyData.map((d) => (
            <div key={d.month} className="flex flex-1 flex-col items-center gap-1">
              <span className="text-xs text-muted-foreground text-center">₹{(d.revenue / 1000).toFixed(0)}k</span>
              <div
                className="w-full rounded-t-lg bg-producer transition-all"
                style={{ height: `${(d.revenue / maxRevenue) * 120}px` }}
              />
              <span className="text-xs font-medium text-foreground">{d.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Ledger */}
      <div className="rounded-xl border border-border bg-card">
        <div className="border-b border-border px-4 sm:px-5 py-3 sm:py-4">
          <h3 className="font-semibold text-foreground text-xs sm:text-sm">Supply Chain Ledger</h3>
          <p className="text-xs text-muted-foreground">Immutable on-chain records</p>
        </div>
        <div className="divide-y divide-border">
          {[
            { event: "Batch B-1042 created", time: "Mar 28, 14:22", hash: "0x7a3f...c82e" },
            { event: "NFT minted on Polygon", time: "Mar 28, 14:23", hash: "0x7a3f...c82e" },
            { event: "Picked up by Retailer R-204", time: "Mar 29, 09:10", hash: "0x8b4e...d93f" },
            { event: "Payment auto-released (₹22,500)", time: "Mar 30, 18:00", hash: "0x9c5f...e04a" },
          ].map((e, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-foreground truncate">{e.event}</p>
                <p className="text-xs text-muted-foreground">{e.time}</p>
              </div>
              <span className="font-mono text-xs text-blockchain text-right">{e.hash}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
