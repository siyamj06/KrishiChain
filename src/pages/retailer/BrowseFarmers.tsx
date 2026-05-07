import DashboardLayout from "@/components/DashboardLayout";
import { LayoutDashboard, QrCode, IndianRupeeIcon, LineChart, Users, Star, Badge, Leaf } from "lucide-react";
import { useBatches } from "@/context/BatchContext";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", path: "/retailer", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Scan QR", path: "/retailer/scan", icon: <QrCode className="h-4 w-4" /> },
  { label: "Log Costs", path: "/retailer/costs", icon: <IndianRupeeIcon className="h-4 w-4" /> },
  { label: "Insights", path: "/retailer/insights", icon: <LineChart className="h-4 w-4" /> },
  { label: "Browse Farmers", path: "/retailer/farmers", icon: <Users className="h-4 w-4" /> },
];

const BrowseFarmers = () => {
  const { farmers } = useBatches();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCrop, setFilterCrop] = useState<string | null>(null);
  const [filterOrganic, setFilterOrganic] = useState<boolean | null>(null);

  const allCrops = Array.from(new Set(farmers.flatMap(f => f.mainCrops)));

  const filteredFarmers = farmers.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCrop = !filterCrop || f.mainCrops.includes(filterCrop);
    const matchesOrganic = filterOrganic === null || f.isOrganic === filterOrganic;
    return matchesSearch && matchesCrop && matchesOrganic;
  });

  const organicCount = farmers.filter(f => f.isOrganic).length;

  return (
    <DashboardLayout title="Retailer" roleColor="bg-retailer text-retailer-foreground" navItems={navItems}>
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-foreground">Browse Farmers & Producers</h2>
        <p className="text-muted-foreground">Discover farmers and their main crops to establish direct supply relationships</p>
      </div>

      {/* Overview */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-retailer/10">
              <Users className="h-5 w-5 text-retailer" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Farmers</p>
              <p className="text-xl font-bold text-foreground">{farmers.length}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
              <Leaf className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Organic Certified</p>
              <p className="text-xl font-bold text-foreground">{organicCount}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/10">
              <Badge className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Avg Rating</p>
              <p className="text-xl font-bold text-foreground">{(farmers.reduce((sum, f) => sum + f.rating, 0) / farmers.length).toFixed(1)}★</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and filters */}
      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Search by farmer name or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-retailer"
        />

        <div>
          <p className="text-sm font-medium text-foreground mb-3">Filter by Crop</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterCrop(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filterCrop === null
                  ? "bg-retailer text-retailer-foreground"
                  : "bg-muted text-foreground hover:bg-border"
                }`}
            >
              All Crops
            </button>
            {allCrops.map(crop => (
              <button
                key={crop}
                onClick={() => setFilterCrop(crop)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filterCrop === crop
                    ? "bg-retailer text-retailer-foreground"
                    : "bg-muted text-foreground hover:bg-border"
                  }`}
              >
                {crop}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setFilterOrganic(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterOrganic === null
                ? "bg-retailer text-retailer-foreground"
                : "bg-muted text-foreground hover:bg-border"
              }`}
          >
            All Farmers
          </button>
          <button
            onClick={() => setFilterOrganic(true)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${filterOrganic === true
                ? "bg-green-500/20 text-green-600"
                : "bg-muted text-foreground hover:bg-border"
              }`}
          >
            <Leaf className="h-4 w-4" /> Organic Only
          </button>
        </div>
      </div>

      {/* Farmers grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredFarmers.map((farmer) => (
          <div key={farmer.id} className="rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow">
            {/* Header */}
            <div className="bg-gradient-to-r from-retailer/10 to-retailer/5 px-6 py-4 border-b border-border">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-lg">{farmer.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">📍 {farmer.location}</p>
                </div>
                {farmer.isOrganic && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
                    <Leaf className="h-4 w-4 text-green-600" />
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-4 space-y-4">
              {/* Description */}
              <p className="text-sm text-muted-foreground">{farmer.description}</p>

              {/* Experience */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Experience</span>
                <span className="text-sm font-medium text-foreground">{farmer.experience} years</span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(farmer.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground">{farmer.rating}</span>
                <span className="text-xs text-muted-foreground">({farmer.reviews})</span>
              </div>

              {/* Main Crops */}
              <div>
                <p className="text-xs text-muted-foreground mb-2">Main Crops</p>
                <div className="space-y-2">
                  {farmer.mainCrops.map((crop) => (
                    <div key={crop} className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                      <span className="text-sm font-medium text-foreground">{crop}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action button */}
            <div className="px-6 py-4 border-t border-border">
              <button className="w-full py-2 rounded-lg bg-retailer text-retailer-foreground font-medium hover:opacity-90 transition-opacity">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredFarmers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No farmers found matching your criteria</p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default BrowseFarmers;
