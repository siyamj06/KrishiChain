import DashboardLayout from "@/components/DashboardLayout";
import QRScanner from "@/components/QRScanner";
import { Home, ScanLine, Eye, Star, CheckCircle, Leaf, Zap, XCircle, AlertCircle } from "lucide-react";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useBatches } from "@/context/BatchContext";
import type { Batch } from "@/context/BatchContext";

const navItems = [
  { label: "Home", path: "/consumer", icon: <Home className="h-4 w-4" /> },
  { label: "Scan QR", path: "/consumer/scan", icon: <ScanLine className="h-4 w-4" /> },
  { label: "Produce Profile", path: "/consumer/profile", icon: <Eye className="h-4 w-4" /> },
  { label: "Rate Quality", path: "/consumer/rate", icon: <Star className="h-4 w-4" /> },
];

// Farmer info keyed by batch id for demo
const batchFarmerMap: Record<string, { name: string; farm: string; location: string }> = {
  "B-1042": { name: "Rajesh Kumar", farm: "Green Valley Farm", location: "Nashik, Maharashtra" },
  "B-1041": { name: "Priya Sharma", farm: "Karnal Agro Farms", location: "Karnal, Haryana" },
  "B-1040": { name: "Vikram Singh", farm: "Andhra Spice Farm", location: "Guntur, Andhra Pradesh" },
};

type ScanState = "idle" | "scanning" | "found" | "notfound" | "error";

const ScanProduct = () => {
  const navigate = useNavigate();
  const { batches } = useBatches();
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [scannedBatch, setScannedBatch] = useState<Batch | null>(null);
  const [cameraError, setCameraError] = useState<string>("");

  const handleScanSuccess = useCallback(
    (decodedText: string) => {
      // Try to match the decoded text against any batch id
      const matched = batches.find(
        (b) => decodedText === b.id || decodedText.includes(b.id)
      );
      if (matched) {
        setScannedBatch(matched);
        setScanState("found");
      } else {
        setScanState("notfound");
      }
    },
    [batches]
  );

  const handleReset = () => {
    setScannedBatch(null);
    setScanState("idle");
    setCameraError("");
  };

  const handleStartScan = () => {
    setScanState("scanning");
    setCameraError("");
  };

  // ── idle ──────────────────────────────────────────────────────────────────
  if (scanState === "idle") {
    return (
      <DashboardLayout title="Consumer" roleColor="bg-consumer text-consumer-foreground" navItems={navItems}>
        <h2 className="mb-6 text-xl sm:text-2xl font-bold text-foreground">Scan Product QR</h2>
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-40 sm:h-52 w-40 sm:w-52 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-consumer/40 bg-consumer/5">
            <ScanLine className="mb-3 h-8 sm:h-12 w-8 sm:w-12 text-consumer/60" />
            <p className="text-xs sm:text-sm text-muted-foreground text-center px-4">
              Point camera at QR Code
            </p>
          </div>
          <button
            onClick={handleStartScan}
            className="w-full sm:w-auto rounded-xl bg-consumer px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-consumer-foreground hover:opacity-90"
          >
            Open Camera & Scan
          </button>
        </div>
      </DashboardLayout>
    );
  }

  // ── scanning ───────────────────────────────────────────────────────────────
  if (scanState === "scanning") {
    return (
      <DashboardLayout title="Consumer" roleColor="bg-consumer text-consumer-foreground" navItems={navItems}>
        <h2 className="mb-4 text-xl sm:text-2xl font-bold text-foreground">Scan Product QR</h2>
        <div className="flex flex-col items-center gap-4">
          <p className="text-xs sm:text-sm text-muted-foreground text-center mb-2">
            Hold the QR code steady in front of your camera
          </p>
          {cameraError ? (
            <div className="flex flex-col items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center max-w-sm">
              <AlertCircle className="h-8 w-8 text-destructive" />
              <p className="text-sm font-medium text-foreground">Camera access denied</p>
              <p className="text-xs text-muted-foreground">{cameraError}</p>
              <button onClick={handleReset} className="rounded-lg bg-muted px-4 py-2 text-sm font-medium text-foreground hover:bg-border">
                Go Back
              </button>
            </div>
          ) : (
            <>
              <QRScanner
                onScanSuccess={handleScanSuccess}
                onScanError={(err) => {
                  // Only surface real errors, not the normal "no QR found" messages
                  if (err.includes("permission") || err.includes("NotAllowed") || err.includes("Camera")) {
                    setCameraError(err);
                  }
                }}
              />
              <button onClick={handleReset} className="mt-2 rounded-xl border border-border bg-card px-6 py-2 text-sm font-medium text-foreground hover:bg-muted">
                Cancel
              </button>
            </>
          )}
        </div>
      </DashboardLayout>
    );
  }

  // ── not found ──────────────────────────────────────────────────────────────
  if (scanState === "notfound") {
    return (
      <DashboardLayout title="Consumer" roleColor="bg-consumer text-consumer-foreground" navItems={navItems}>
        <h2 className="mb-6 text-xl sm:text-2xl font-bold text-foreground">Scan Product QR</h2>
        <div className="flex flex-col items-center gap-4 py-8">
          <XCircle className="h-12 sm:h-14 w-12 sm:w-14 text-destructive" />
          <h3 className="text-base sm:text-lg font-bold text-foreground">Batch Not Found</h3>
          <p className="text-xs sm:text-sm text-muted-foreground text-center max-w-xs">
            This QR code does not match any registered Kisan Flow batch. Make sure you are scanning an official QR code.
          </p>
          <button onClick={handleReset} className="rounded-xl bg-consumer px-6 py-2.5 text-sm font-semibold text-consumer-foreground hover:opacity-90">
            Try Again
          </button>
        </div>
      </DashboardLayout>
    );
  }

  // ── found ─────────────────────────────────────────────────────────────────
  const batch = scannedBatch!;
  const farmer = batchFarmerMap[batch.id] ?? {
    name: "Unknown Farmer",
    farm: batch.location,
    location: batch.location,
  };

  return (
    <DashboardLayout title="Consumer" roleColor="bg-consumer text-consumer-foreground" navItems={navItems}>
      <h2 className="mb-6 text-xl sm:text-2xl font-bold text-foreground">Scan Product QR</h2>
      <div className="max-w-2xl">
        {/* Verified banner */}
        <div className="mb-4 flex items-center gap-2 text-producer">
          <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5" />
          <span className="font-semibold text-xs sm:text-sm">NFT Data Fetched from Polygon</span>
        </div>

        {/* Main product info */}
        <div className="mb-4 sm:mb-6 rounded-xl border border-border bg-card p-4 sm:p-6 space-y-3 sm:space-y-4">
          <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Product</span><span className="font-medium text-foreground">{batch.crop}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Batch ID</span><span className="font-mono text-foreground">{batch.id}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Farmer</span><span className="text-foreground">{farmer.name}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Farm</span><span className="text-foreground text-right ml-4">{farmer.farm}, {farmer.location}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Quantity</span><span className="text-foreground">{batch.quantity} kg</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Farm-gate Price</span><span className="text-foreground">₹{batch.price}/kg</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Minted</span><span className="text-foreground">{batch.minted}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">NFT</span><span className="font-mono text-blockchain">{batch.nft}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Status</span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                batch.status === "Delivered" ? "bg-producer/10 text-producer" :
                batch.status === "In Transit" ? "bg-retailer/10 text-retailer" :
                "bg-consumer/10 text-consumer"
              }`}>{batch.status}</span>
            </div>
          </div>
        </div>

        {/* Freshness Score */}
        <div className="mb-4 sm:mb-6 rounded-xl border border-green-500/30 bg-green-500/5 p-4 sm:p-5">
          <div className="mb-3 flex items-center gap-2">
            <Zap className="h-4 sm:h-5 w-4 sm:w-5 text-green-600" />
            <span className="font-semibold text-foreground text-xs sm:text-sm">Freshness Score</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-lg sm:text-xl font-bold text-green-600">{batch.freshnessScore}/100</span>
              <span className="text-xs text-green-600 font-medium">
                {batch.freshnessScore >= 90 ? "Excellent" : batch.freshnessScore >= 75 ? "Good" : "Fair"}
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-green-200 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all"
                style={{ width: `${batch.freshnessScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Pesticide Report */}
        <div className="mb-4 sm:mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 sm:p-5">
          <div className="mb-3 flex items-center gap-2">
            <Leaf className="h-4 sm:h-5 w-4 sm:w-5 text-emerald-600" />
            <span className="font-semibold text-foreground text-xs sm:text-sm">Safety & Pesticide Report</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0 mt-1" />
            <p className="text-xs sm:text-sm text-foreground">{batch.pesticideReport}</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button onClick={() => navigate("/consumer/profile", { state: { batchId: batch.id } })} className="flex-1 rounded-xl bg-consumer py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-consumer-foreground hover:opacity-90">
            View Full Profile
          </button>
          <button onClick={() => navigate("/consumer/rate", { state: { batchId: batch.id } })} className="flex-1 rounded-xl border border-border bg-card py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-foreground hover:bg-muted">
            Rate Quality
          </button>
          <button onClick={handleReset} className="rounded-xl border border-border bg-card px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-foreground hover:bg-muted">
            Scan Again
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ScanProduct;
