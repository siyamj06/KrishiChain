import DashboardLayout from "@/components/DashboardLayout";
import { LayoutDashboard, PackagePlus, QrCode, BarChart3, BookOpen, TrendingUp, Store } from "lucide-react";
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

const glossaryData = [
  {
    category: "Crops",
    items: [
      {
        title: "Organic Tomatoes",
        description: "High-value heirloom varieties grown without synthetic pesticides. Require consistent watering and proper trellising. Harvest typically 60-85 days after planting. Best yield in loamy, well-draining soil with pH 6.0-6.8.",
        icon: "🍅",
      },
      {
        title: "Basmati Rice",
        description: "Premium long-grain rice variety with distinctive aroma. Requires 120-150 days growing season. Needs flooded fields and moderate temperature. Thrives in alluvial soils with good water retention. Typically harvested in November-December.",
        icon: "🌾",
      },
      {
        title: "Green Chillies",
        description: "Year-round cash crop with high market demand. Grows 45-150cm tall depending on variety. Requires well-drained soil and warm climate (20-30°C). First harvest at 60-90 days. Can produce for 2-3 years continuously.",
        icon: "🌶️",
      },
    ],
  },
  {
    category: "Fertilizers",
    items: [
      {
        title: "Organic Compost",
        description: "Nutrient-rich soil amendment made from decomposed organic matter. Improves soil structure and water retention. Apply 5-10 tons per hectare before planting. Enhances microbial activity and long-term soil health.",
        icon: "🌱",
      },
      {
        title: "Vermicompost",
        description: "Premium organic fertilizer produced by earthworm decomposition. High in plant-available nutrients and beneficial microorganisms. Apply 2-3 tons per hectare. Particularly effective for vegetables and cash crops. Cost-effective long-term solution.",
        icon: "♻️",
      },
      {
        title: "NPK Fertilizer",
        description: "Balanced mixture of Nitrogen, Phosphorus, and Potassium (typically 10:10:10 or 12:32:16). Nitrogen supports leaf growth, Phosphorus aids root development, Potassium improves disease resistance. Apply in split doses during growing season.",
        icon: "⚛️",
      },
    ],
  },
  {
    category: "Pesticides & Pest Management",
    items: [
      {
        title: "Integrated Pest Management (IPM)",
        description: "Sustainable approach combining biological, cultural, and chemical methods. Reduces pesticide use by 50-70%. Use pheromone traps for early pest detection. Introduce natural predators like ladybugs. Apply pesticides only when threshold levels are reached.",
        icon: "🦋",
      },
      {
        title: "Neem Oil",
        description: "Natural pesticide derived from neem tree seeds. Effective against aphids, mites, and chewing insects. Organic certified and safe for humans. Apply during early morning or evening. Reapply after rain. Typical concentration: 3-5% solution.",
        icon: "🌿",
      },
      {
        title: "Bacillus thuringiensis (Bt)",
        description: "Biological pesticide using naturally occurring bacteria. Highly effective against caterpillar pests (Lepidoptera). Safe for beneficial insects and humans. Used extensively in organic farming. Works best on young larvae. Apply in evening for best results.",
        icon: "🔬",
      },
    ],
  },
  {
    category: "Best Practices",
    items: [
      {
        title: "Crop Rotation",
        description: "Practice of growing different crops in sequence on same land. Breaks pest cycles and improves soil fertility. 3-year rotation cycle recommended. Alternate between legumes, cereals, and vegetables for optimal nitrogen cycling.",
        icon: "🔄",
      },
      {
        title: "Water Management",
        description: "Efficient irrigation scheduling based on crop needs and soil moisture. Drip irrigation saves 30-50% water compared to flood irrigation. Much water during early morning for reduced evaporation. Mulching retains soil moisture and reduces watering frequency.",
        icon: "💧",
      },
      {
        title: "Soil Testing",
        description: "Regular testing (once every 2-3 years) determines nutrient levels and pH. Guides fertilizer application for optimal yield. Check nitrogen, phosphorus, potassium, and micronutrients. Cost: ₹300-500 per sample. Improves ROI by 15-20%.",
        icon: "🧪",
      },
    ],
  },
];

const Glossary = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(glossaryData[0].category);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = glossaryData.map(cat => ({
    ...cat,
    items: cat.items.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  return (
    <DashboardLayout title="Producer" roleColor="bg-producer text-producer-foreground" navItems={navItems}>
      <div className="mb-6">
        <h2 className="mb-4 text-2xl font-bold text-foreground">Learning Glossary</h2>
        <p className="text-muted-foreground">Educational resources about crops, fertilizers, and sustainable farming practices</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search glossary..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-producer"
        />
      </div>

      {/* Glossary items */}
      <div className="space-y-4">
        {filteredData.map((category) => (
          <div key={category.category} className="rounded-xl border border-border bg-card overflow-hidden">
            <button
              onClick={() => setExpandedCategory(expandedCategory === category.category ? null : category.category)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted transition-colors"
            >
              <span className="font-semibold text-foreground text-lg">{category.category}</span>
              <span className={`text-muted-foreground transition-transform ${expandedCategory === category.category ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {expandedCategory === category.category && (
              <div className="border-t border-border divide-y divide-border">
                {category.items.map((item, idx) => (
                  <div key={idx} className="px-6 py-5 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl flex-shrink-0">{item.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {searchTerm && filteredData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No results found for "{searchTerm}"</p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Glossary;
