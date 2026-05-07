import DashboardLayout from "@/components/DashboardLayout";
import { LayoutDashboard, PackagePlus, QrCode, BarChart3, BookOpen, TrendingUp, TrendingDown, ArrowRight, Store } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/producer", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Create Batch", path: "/producer/create-batch", icon: <PackagePlus className="h-4 w-4" /> },
  { label: "QR Codes", path: "/producer/qr-codes", icon: <QrCode className="h-4 w-4" /> },
  { label: "Analytics", path: "/producer/analytics", icon: <BarChart3 className="h-4 w-4" /> },
  { label: "Find Retailers", path: "/producer/find-retailers", icon: <Store className="h-4 w-4" /> },
  { label: "Glossary", path: "/producer/glossary", icon: <BookOpen className="h-4 w-4" /> },
  { label: "Market Trends", path: "/producer/market-trends", icon: <TrendingUp className="h-4 w-4" /> },
];

const marketData = [
  {
    crop: "Organic Tomatoes",
    currentPrice: "₹52/kg",
    previousPrice: "₹48/kg",
    change: "+8.3%",
    trend: "up",
    forecastPrice: "₹58/kg",
    demand: "High",
    season: "Peak",
    marketInsight: "Strong demand due to fresh season harvest. Prices expected to remain stable through March-April. Premium organic varieties commanding 15-20% price premium.",
    recommendation: "Now is optimal time to harvest. Supply exceeding demand slightly, so quality focus can help fetch premium prices.",
  },
  {
    crop: "Basmati Rice",
    currentPrice: "₹60/kg",
    previousPrice: "₹62/kg",
    change: "-3.2%",
    trend: "down",
    forecastPrice: "₹58/kg",
    demand: "Moderate",
    season: "Low",
    marketInsight: "Post-harvest period with stable prices. Export demand from international markets remains consistent. Prices expected to dip before next planting season.",
    recommendation: "Good time to store quality stock for off-season sales. Expect prices to recover by June-July when new season approaches.",
  },
  {
    crop: "Green Chillies",
    currentPrice: "₹35/kg",
    previousPrice: "₹32/kg",
    change: "+9.4%",
    trend: "up",
    forecastPrice: "₹40/kg",
    demand: "Very High",
    season: "Peak",
    marketInsight: "Surging demand due to festival season and increased usage in food industry. Prices climbing steadily. Expect sustained high prices through April.",
    recommendation: "Increase production if possible. High-demand period allows for premium pricing. Focus on quality to capture best market rates.",
  },
];

const priceChart = [
  { week: "Week 1", price: 48 },
  { week: "Week 2", price: 50 },
  { week: "Week 3", price: 51 },
  { week: "Week 4", price: 52 },
  { week: "Forecast", price: 58 },
];

const MarketTrends = () => {
  return (
    <DashboardLayout title="Producer" roleColor="bg-producer text-producer-foreground" navItems={navItems}>
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-foreground">Market Trends & Pricing</h2>
        <p className="text-muted-foreground">Real-time market data and pricing trends for your crops</p>
      </div>

      {/* Market Cards */}
      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {marketData.map((item) => (
          <div key={item.crop} className="rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow">
            {/* Header */}
            <div className="bg-gradient-to-r from-producer/10 to-producer/5 px-6 py-4 border-b border-border">
              <h3 className="font-semibold text-foreground text-lg">{item.crop}</h3>
            </div>

            {/* Price section */}
            <div className="px-6 py-4 border-b border-border">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-foreground">{item.currentPrice}</span>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
                  item.trend === 'up' 
                    ? 'bg-green-500/20 text-green-600' 
                    : 'bg-red-500/20 text-red-600'
                }`}>
                  {item.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {item.change}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">vs Previous: {item.previousPrice}</p>
            </div>

            {/* Status */}
            <div className="px-6 py-4 border-b border-border space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Demand</span>
                <span className="font-medium text-foreground">{item.demand}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Season</span>
                <span className={`font-medium ${item.season === 'Peak' ? 'text-green-600' : 'text-orange-600'}`}>
                  {item.season}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Forecast</span>
                <span className="font-medium text-producer">{item.forecastPrice}</span>
              </div>
            </div>

            {/* Insight */}
            <div className="px-6 py-4 border-b border-border">
              <p className="text-xs text-muted-foreground leading-relaxed">{item.marketInsight}</p>
            </div>

            {/* Recommendation */}
            <div className="px-6 py-4 bg-producer/5">
              <p className="text-xs font-medium text-producer mb-1">💡 Recommendation</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.recommendation}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Price Chart - Example with Organic Tomatoes */}
      <div className="mb-8 rounded-xl border border-border bg-card p-6">
        <h3 className="mb-6 text-lg font-bold text-foreground">Organic Tomatoes - 4-Week Price Trend</h3>
        
        <div className="space-y-4">
          {priceChart.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground w-20">{item.week}</span>
              <div className="flex-1 h-8 bg-muted rounded-lg relative overflow-hidden">
                <div 
                  className={`h-full rounded-lg transition-all ${
                    item.week === 'Forecast' 
                      ? 'bg-gradient-to-r from-producer/60 to-producer/40' 
                      : 'bg-gradient-to-r from-producer to-producer/70'
                  }`}
                  style={{ width: `${(item.price / 60) * 100}%` }}
                ></div>
              </div>
              <span className="font-semibold text-foreground w-16">₹{item.price}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-producer/5 rounded-lg border border-producer/30">
          <p className="text-xs font-medium text-producer mb-2">📊 Trend Analysis</p>
          <p className="text-sm text-muted-foreground">
            Organic tomato prices show steady upward trend. Current momentum suggests prices could reach ₹58/kg by end of month. 
            Recommend harvesting peak quality produce now to maximize returns. Supply constraints in northern regions may further 
            support price appreciation.
          </p>
        </div>
      </div>

      {/* Market Tips */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-4 text-lg font-bold text-foreground flex items-center gap-2">
          <span>📌 Market Tips for Farmers</span>
        </h3>
        
        <div className="space-y-3">
          <div className="flex gap-4 p-4 bg-blue-500/5 rounded-lg border border-blue-500/30">
            <span className="text-lg flex-shrink-0">📈</span>
            <div>
              <p className="font-medium text-foreground text-sm">Time Your Harvest</p>
              <p className="text-xs text-muted-foreground mt-1">Monitor market trends 2-3 weeks before harvest. Peak demand periods offer 20-30% better returns.</p>
            </div>
          </div>

          <div className="flex gap-4 p-4 bg-green-500/5 rounded-lg border border-green-500/30">
            <span className="text-lg flex-shrink-0">🎯</span>
            <div>
              <p className="font-medium text-foreground text-sm">Quality Fetches Premium</p>
              <p className="text-xs text-muted-foreground mt-1">Organic certified produce commands 15-25% premium during peak seasons. Invest in certification.</p>
            </div>
          </div>

          <div className="flex gap-4 p-4 bg-orange-500/5 rounded-lg border border-orange-500/30">
            <span className="text-lg flex-shrink-0">💾</span>
            <div>
              <p className="font-medium text-foreground text-sm">Strategic Storage</p>
              <p className="text-xs text-muted-foreground mt-1">Hold quality stock during low prices for 1-2 months to sell during peak demand periods.</p>
            </div>
          </div>

          <div className="flex gap-4 p-4 bg-purple-500/5 rounded-lg border border-purple-500/30">
            <span className="text-lg flex-shrink-0">🔗</span>
            <div>
              <p className="font-medium text-foreground text-sm">Direct Market Access</p>
              <p className="text-xs text-muted-foreground mt-1">Use कृषिChain to connect directly with retailers and bypass middlemen for better margins.</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MarketTrends;
