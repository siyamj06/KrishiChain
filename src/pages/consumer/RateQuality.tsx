import DashboardLayout from "@/components/DashboardLayout";
import { Home, ScanLine, Eye, Star, CheckCircle } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Home", path: "/consumer", icon: <Home className="h-4 w-4" /> },
  { label: "Scan QR", path: "/consumer/scan", icon: <ScanLine className="h-4 w-4" /> },
  { label: "Produce Profile", path: "/consumer/profile", icon: <Eye className="h-4 w-4" /> },
  { label: "Rate Quality", path: "/consumer/rate", icon: <Star className="h-4 w-4" /> },
];

const RateQuality = () => {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <DashboardLayout title="Consumer" roleColor="bg-consumer text-consumer-foreground" navItems={navItems}>
        <div className="flex flex-col items-center py-12 sm:py-20">
          <CheckCircle className="mb-4 h-10 sm:h-12 w-10 sm:w-12 text-producer" />
          <h2 className="text-lg sm:text-xl font-bold text-foreground">Rating Submitted On-Chain!</h2>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground">Your feedback updates the farmer's reputation score</p>
          <p className="mt-1 text-xs text-blockchain font-mono break-all">Tx: 0xab12...ef89</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Consumer" roleColor="bg-consumer text-consumer-foreground" navItems={navItems}>
      <h2 className="mb-6 text-xl sm:text-2xl font-bold text-foreground">Rate Product Quality</h2>

      <div className="max-w-md space-y-4 sm:space-y-6">
        <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
          <p className="font-semibold text-foreground text-xs sm:text-sm">Organic Tomatoes — B-1042</p>
          <p className="text-xs sm:text-sm text-muted-foreground">From Ravi Kumar, Karnataka</p>
        </div>

        {/* Star rating */}
        <div>
          <label className="mb-2 block text-xs sm:text-sm font-medium text-foreground">Your Rating</label>
          <div className="flex gap-1 sm:gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} onClick={() => setRating(n)} className="transition-transform hover:scale-110">
                <Star className={`h-8 sm:h-10 w-8 sm:w-10 ${n <= rating ? "fill-retailer text-retailer" : "text-border"}`} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs sm:text-sm font-medium text-foreground">Comments (optional)</label>
          <textarea className="w-full rounded-xl border border-input bg-background px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Fresh, great taste, well-packaged..." rows={3} />
        </div>

        <button
          onClick={() => rating > 0 && setSubmitted(true)}
          disabled={rating === 0}
          className="w-full rounded-xl bg-consumer py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-consumer-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          Submit Rating On-Chain
        </button>
      </div>
    </DashboardLayout>
  );
};

export default RateQuality;
