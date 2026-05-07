import DashboardLayout from "@/components/DashboardLayout";
import { LayoutDashboard, PackagePlus, QrCode, BarChart3, BookOpen, TrendingUp, Store, Star, CheckCircle, Circle } from "lucide-react";
import { useBatches } from "@/context/BatchContext";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", path: "/producer", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Create Batch", path: "/producer/create-batch", icon: <PackagePlus className="h-4 w-4" /> },
  { label: "QR Codes", path: "/producer/qr-codes", icon: <QrCode className="h-4 w-4" /> },
  { label: "Analytics", path: "/producer/analytics", icon: <BarChart3 className="h-4 w-4" /> },
  { label: "Find Retailers", path: "/producer/find-retailers", icon: <Store className="h-4 w-4" /> },
  { label: "Glossary", path: "/producer/glossary", icon: <BookOpen className="h-4 w-4" /> },
  { label: "Market Trends", path: "/producer/market-trends", icon: <TrendingUp className="h-4 w-4" /> },
];

const FindRetailers = () => {
  const { retailers, toggleRetailerConnection } = useBatches();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState<string | null>(null);

  const allSpecialties = Array.from(new Set(retailers.flatMap(r => r.specialties)));

  const filteredRetailers = retailers.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.storeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = !filterSpecialty || r.specialties.includes(filterSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  const connectedCount = retailers.filter(r => r.connected).length;

  return (
    <DashboardLayout title="Producer" roleColor="bg-producer text-producer-foreground" navItems={navItems}>
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-foreground">Find & Connect with Retailers</h2>
        <p className="text-muted-foreground">Browse retailers and establish direct connections to sell your produce</p>
      </div>

      {/* Connection status */}
      <div className="mb-6 rounded-xl border border-border bg-card p-4 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-producer/10">
          <Store className="h-6 w-6 text-producer" />
        </div>
        <div>
          <p className="font-semibold text-foreground">Connected Retailers: {connectedCount}/{retailers.length}</p>
          <p className="text-sm text-muted-foreground">Expand your market reach by connecting with multiple retailers</p>
        </div>
      </div>

      {/* Search and filters */}
      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Search by retailer name, location, or store name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-producer"
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterSpecialty(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filterSpecialty === null
                ? "bg-producer text-producer-foreground"
                : "bg-muted text-foreground hover:bg-border"
              }`}
          >
            All Specialties
          </button>
          {allSpecialties.map(specialty => (
            <button
              key={specialty}
              onClick={() => setFilterSpecialty(specialty)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filterSpecialty === specialty
                  ? "bg-producer text-producer-foreground"
                  : "bg-muted text-foreground hover:bg-border"
                }`}
            >
              {specialty}
            </button>
          ))}
        </div>
      </div>

      {/* Retailers grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRetailers.map((retailer) => (
          <div key={retailer.id} className="rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow">
            {/* Header with connection status */}
            <div className="bg-gradient-to-r from-producer/10 to-producer/5 px-6 py-4 border-b border-border flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-lg">{retailer.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{retailer.storeName}</p>
              </div>
              {retailer.connected ? (
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              )}
            </div>

            {/* Content */}
            <div className="px-6 py-4 space-y-4">
              {/* Location */}
              <div>
                <p className="text-xs text-muted-foreground mb-1">📍 Location</p>
                <p className="text-sm font-medium text-foreground">{retailer.location}</p>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground">{retailer.description}</p>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(retailer.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground">{retailer.rating}</span>
                <span className="text-xs text-muted-foreground">({retailer.reviews} reviews)</span>
              </div>

              {/* Specialties */}
              <div>
                <p className="text-xs text-muted-foreground mb-2">Specialties</p>
                <div className="flex flex-wrap gap-2">
                  {retailer.specialties.map((specialty) => (
                    <span key={specialty} className="px-2 py-1 bg-producer/10 text-producer text-xs rounded-full font-medium">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action button */}
            <div className="px-6 py-4 border-t border-border">
              <button
                onClick={() => toggleRetailerConnection(retailer.id)}
                className={`w-full py-2 rounded-lg font-medium transition-colors ${retailer.connected
                    ? "bg-muted text-foreground hover:bg-border"
                    : "bg-producer text-producer-foreground hover:opacity-90"
                  }`}
              >
                {retailer.connected ? "✓ Connected" : "Connect"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredRetailers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No retailers found matching your criteria</p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default FindRetailers;
