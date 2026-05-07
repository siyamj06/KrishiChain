import DashboardLayout from "@/components/DashboardLayout";
import { LayoutDashboard, PackagePlus, QrCode, BarChart3, Wallet, Shield, IndianRupee, ToggleLeft, ToggleRight, BookOpen, TrendingUp, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
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


const ProducerDashboard = () => {
  const navigate = useNavigate();
  const { batches, togglePaymentOptIn } = useBatches();
  const [showPayments, setShowPayments] = useState(false);

  const totalPayments = batches.reduce((sum, b) => sum + b.paymentReceived, 0);
  const optedInCount = batches.filter((b) => b.paymentOptIn).length;

  const stats = [
    { label: "Active Batches", value: String(batches.length), change: `${batches.filter(b => b.status === "In Transit").length} in transit` },
    { label: "NFTs Minted", value: String(batches.length), change: "on Polygon chain" },
    { label: "Payments Received", value: `₹${totalPayments.toLocaleString("en-IN")}`, change: `${optedInCount} opted in` },
    { label: "Avg. Rating", value: "4.6★", change: "from 142 reviews" },
  ];

  return (
    <DashboardLayout title="Producer" roleColor="bg-producer text-producer-foreground" navItems={navItems}>
      {/* Identity badge */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 rounded-xl border border-border bg-card p-3 sm:p-4">
        <Shield className="h-4 sm:h-5 w-4 sm:w-5 text-producer" />
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-semibold text-foreground">Verified via Aadhaar / DigiLocker</p>
          <p className="text-xs text-muted-foreground">Identity verified on Mar 1, 2026</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4 sm:p-5">
            <p className="text-xs sm:text-sm text-muted-foreground">{s.label}</p>
            <p className="mt-1 text-xl sm:text-2xl font-bold text-foreground">{s.value}</p>
            <p className="mt-1 text-xs text-producer">{s.change}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mb-8 grid gap-3 sm:grid-cols-2">
        <button onClick={() => navigate("/producer/create-batch")} className="flex items-center justify-center gap-2 rounded-xl bg-producer px-5 py-3 text-sm sm:text-base font-medium text-producer-foreground transition-opacity hover:opacity-90 w-full">
          <PackagePlus className="h-4 w-4" /> Create New Batch
        </button>
        <button
          onClick={() => setShowPayments(!showPayments)}
          className={`flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm sm:text-base font-medium transition-colors w-full ${showPayments ? "border-producer bg-producer/10 text-producer" : "border-border bg-card text-foreground hover:bg-muted"}`}
        >
          <Wallet className="h-4 w-4" /> {showPayments ? "Hide Payments" : "View Payments"}
        </button>
      </div>

      {/* Payments panel */}
      {showPayments && (
        <div className="mb-8 rounded-xl border border-border bg-card">
          <div className="border-b border-border px-4 sm:px-5 py-3 sm:py-4">
            <h2 className="flex items-center gap-2 text-sm sm:text-base font-semibold text-foreground">
              <IndianRupee className="h-4 w-4 text-producer" /> Payment Opt-In per Batch
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">Toggle to opt in for direct blockchain payments on each batch</p>
          </div>
          <div className="divide-y divide-border">
            {batches.map((b) => (
              <div key={b.id} className="flex flex-col gap-3 px-4 sm:px-5 py-3 sm:py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-foreground truncate">{b.crop} <span className="font-mono text-xs text-muted-foreground">({b.id})</span></p>
                  <p className="text-xs text-muted-foreground">{b.quantity} kg · ₹{b.price}/kg · {b.status}</p>
                  {b.paymentReceived > 0 && (
                    <p className="mt-0.5 text-xs text-producer">₹{b.paymentReceived.toLocaleString("en-IN")} received</p>
                  )}
                </div>
                <button
                  onClick={() => togglePaymentOptIn(b.id)}
                  className="flex items-center gap-1.5 text-sm flex-shrink-0"
                  title={b.paymentOptIn ? "Opted in — click to opt out" : "Click to opt in for payments"}
                >
                  {b.paymentOptIn ? (
                    <ToggleRight className="h-6 sm:h-7 w-6 sm:w-7 text-producer" />
                  ) : (
                    <ToggleLeft className="h-6 sm:h-7 w-6 sm:w-7 text-muted-foreground" />
                  )}
                  <span className={`text-xs font-medium ${b.paymentOptIn ? "text-producer" : "text-muted-foreground"}`}>
                    {b.paymentOptIn ? "Opted In" : "Opt In"}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent batches — card list on mobile, table on desktop */}
      <div className="rounded-xl border border-border bg-card">
        <div className="border-b border-border px-4 sm:px-5 py-3 sm:py-4">
          <h2 className="text-sm sm:text-base font-semibold text-foreground">Recent Batches</h2>
        </div>
        {/* Mobile card view */}
        <div className="divide-y divide-border sm:hidden">
          {batches.map((b) => (
            <div key={b.id} className="px-4 py-4 space-y-2">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-foreground truncate">{b.crop}</p>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    b.status === "Delivered" ? "bg-producer/10 text-producer" :
                    b.status === "In Transit" ? "bg-retailer/10 text-retailer" :
                    "bg-consumer/10 text-consumer"
                  }`}>{b.status}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{b.id} · {b.quantity} kg · {b.minted}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Desktop table view */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="px-5 py-3 font-medium">Batch ID</th>
                <th className="px-5 py-3 font-medium">Crop</th>
                <th className="px-5 py-3 font-medium">Quantity</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((b) => (
                <tr key={b.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-3 font-mono text-foreground">{b.id}</td>
                  <td className="px-5 py-3 text-foreground">{b.crop}</td>
                  <td className="px-5 py-3 text-muted-foreground">{b.quantity} kg</td>
                  <td className="px-5 py-3 text-muted-foreground">{b.minted}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      b.status === "Delivered" ? "bg-producer/10 text-producer" :
                      b.status === "In Transit" ? "bg-retailer/10 text-retailer" :
                      "bg-consumer/10 text-consumer"
                    }`}>{b.status}</span>
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

export default ProducerDashboard;
