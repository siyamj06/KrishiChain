import DashboardLayout from "@/components/DashboardLayout";
import { LayoutDashboard, PackagePlus, QrCode, BarChart3, BookOpen, TrendingUp, Store, Download } from "lucide-react";
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

// Batch IDs that have a real QR image in /public
const QR_IMAGE_IDS = new Set(["B-1040", "B-1041", "B-1042"]);

const QRCodes = () => {
  const { batches } = useBatches();

  const handleDownload = (batchId: string, crop: string) => {
    const link = document.createElement("a");
    link.href = `/${batchId}.jpeg`;
    link.download = `${crop.replace(/\s+/g, "_")}_${batchId}.jpeg`;
    link.click();
  };


  return (
    <DashboardLayout title="Producer" roleColor="bg-producer text-producer-foreground" navItems={navItems}>
      <h2 className="mb-2 text-xl sm:text-2xl font-bold text-foreground">QR Codes & NFT Passports</h2>
      <p className="mb-6 text-xs sm:text-sm text-muted-foreground">
        Each batch has a unique QR code linked to its NFT on the Polygon blockchain. Consumers can scan these to verify origin and journey.
      </p>

      {batches.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <QrCode className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground">No batches created yet. Create a batch to generate QR codes.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {batches.map((b) => {
            const hasImage = QR_IMAGE_IDS.has(b.id);
            return (
              <div key={b.id} className="flex flex-col items-center rounded-xl border border-border bg-card p-4 sm:p-6 hover:shadow-lg transition-shadow">
                {/* QR Image or Fallback */}
                <div className="mb-4 flex items-center justify-center rounded-xl overflow-hidden bg-white border border-border shadow-sm"
                  style={{ width: 140, height: 140 }}>
                  {hasImage ? (
                    <img
                      src={`/${b.id}.jpeg`}
                      alt={`QR code for ${b.crop} (${b.id})`}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <QrCode className="h-16 w-16 text-muted-foreground" />
                  )}
                </div>

                {/* Batch Info */}
                <p className="font-semibold text-foreground text-sm sm:text-base text-center">{b.crop}</p>
                <p className="text-xs sm:text-sm text-muted-foreground text-center mt-0.5">{b.id} · {b.quantity} kg</p>

                {/* NFT Badge */}
                <div className="mt-3 flex items-center gap-1.5 rounded-full bg-producer/10 px-3 py-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-producer animate-pulse" />
                  <p className="font-mono text-xs text-producer">{b.nft}</p>
                </div>

                <p className="mt-1.5 text-xs text-muted-foreground">Minted {b.minted}</p>

                {/* Status badge */}
                <span className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  b.status === "Delivered" ? "bg-producer/10 text-producer" :
                  b.status === "In Transit" ? "bg-retailer/10 text-retailer" :
                  "bg-consumer/10 text-consumer"
                }`}>{b.status}</span>

                {/* Download button */}
                <button
                  onClick={() => hasImage && handleDownload(b.id, b.crop)}
                  disabled={!hasImage}
                  className={`mt-4 w-full flex items-center justify-center gap-2 rounded-lg py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-colors ${
                    hasImage
                      ? "bg-producer text-producer-foreground hover:opacity-90"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  <Download className="h-3.5 w-3.5" />
                  {hasImage ? "Download QR" : "No image yet"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
};

export default QRCodes;
