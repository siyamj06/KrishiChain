import { createContext, useContext, useState, ReactNode } from "react";

export interface Batch {
  id: string;
  crop: string;
  quantity: string;
  price: string;
  harvestDate: string;
  location: string;
  nft: string;
  minted: string;
  status: "In Transit" | "At Retailer" | "Delivered";
  paymentOptIn: boolean;
  paymentReceived: number;
  pesticideReport: string;
  freshnessScore: number;
}

export interface Retailer {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  specialties: string[];
  connected: boolean;
  storeName: string;
  description: string;
}

export interface Farmer {
  id: string;
  name: string;
  location: string;
  mainCrops: string[];
  experience: number;
  rating: number;
  reviews: number;
  description: string;
  isOrganic: boolean;
}

interface BatchContextType {
  batches: Batch[];
  retailers: Retailer[];
  farmers: Farmer[];
  addBatch: (batch: Omit<Batch, "id" | "nft" | "minted" | "status" | "paymentOptIn" | "paymentReceived" | "pesticideReport" | "freshnessScore">) => void;
  togglePaymentOptIn: (id: string) => void;
  toggleRetailerConnection: (retailerId: string) => void;
}

const defaultBatches: Batch[] = [
  { id: "B-1042", crop: "Organic Tomatoes", quantity: "500", price: "45", harvestDate: "2026-03-28", location: "Nashik, Maharashtra", nft: "0x7a3f...c82e", minted: "Mar 28, 2026", status: "In Transit", paymentOptIn: false, paymentReceived: 22500, pesticideReport: "100% Pesticide-Free - Certified Organic", freshnessScore: 92 },
  { id: "B-1041", crop: "Basmati Rice", quantity: "2000", price: "60", harvestDate: "2026-03-25", location: "Karnal, Haryana", nft: "0x4b1d...a91f", minted: "Mar 25, 2026", status: "Delivered", paymentOptIn: true, paymentReceived: 120000, pesticideReport: "Natural pesticides only - Zero synthetic residue", freshnessScore: 88 },
  { id: "B-1040", crop: "Green Chillies", quantity: "300", price: "35", harvestDate: "2026-03-22", location: "Guntur, Andhra Pradesh", nft: "0x9e2c...d47b", minted: "Mar 22, 2026", status: "At Retailer", paymentOptIn: false, paymentReceived: 0, pesticideReport: "Minimal pesticide use with 2-week safe interval", freshnessScore: 85 },
];

const defaultRetailers: Retailer[] = [
  { id: "R-101", name: "Fresh Markets India", location: "Mumbai, Maharashtra", rating: 4.8, reviews: 342, specialties: ["Organic Produce", "Bulk Orders"], connected: false, storeName: "Fresh Markets Maharashtra", description: "Premium organic produce retailer with 5+ years experience" },
  { id: "R-102", name: "Green Harvest Distributors", location: "Bangalore, Karnataka", rating: 4.5, reviews: 218, specialties: ["Vegetable Distribution", "Restaurant Supply"], connected: false, storeName: "Green Harvest BNG", description: "Wholesale distributor serving restaurants and markets" },
  { id: "R-103", name: "Organic Valley Traders", location: "Delhi, NCR", rating: 4.9, reviews: 567, specialties: ["Certified Organic", "Direct Farm"], connected: false, storeName: "Organic Valley Delhi", description: "Leading organic product distributor in North India" },
  { id: "R-104", name: "Harvest Connect", location: "Pune, Maharashtra", rating: 4.6, reviews: 291, specialties: ["Farm to Table", "Quality Certified"], connected: false, storeName: "Harvest Connect Pune", description: "Direct connection between farmers and retailers" },
  { id: "R-105", name: "Metro Produce Supply", location: "Hyderabad, Telangana", rating: 4.4, reviews: 189, specialties: ["Fast Delivery", "Bulk Orders"], connected: false, storeName: "Metro Supply Hyd", description: "Quick turnaround logistics for perishable goods" },
  { id: "R-106", name: "Premium Foods Ltd", location: "Kolkata, West Bengal", rating: 4.7, reviews: 421, specialties: ["Premium Quality", "Specialty Items"], connected: false, storeName: "Premium Foods Kolkata", description: "High-end retailer serving premium market segments" },
];

const defaultFarmers: Farmer[] = [
  { id: "F-201", name: "Rajesh Kumar", location: "Nashik, Maharashtra", mainCrops: ["Organic Tomatoes", "Onions", "Potatoes"], experience: 15, rating: 4.7, reviews: 156, description: "Experienced organic farmer with sustainable practices", isOrganic: true },
  { id: "F-202", name: "Priya Sharma", location: "Karnal, Haryana", mainCrops: ["Basmati Rice", "Wheat", "Mustard"], experience: 12, rating: 4.5, reviews: 89, description: "Basmati rice specialist with export quality produce", isOrganic: false },
  { id: "F-203", name: "Vikram Singh", location: "Guntur, Andhra Pradesh", mainCrops: ["Green Chillies", "Red Chillies", "Turmeric"], experience: 20, rating: 4.9, reviews: 312, description: "Premium chilli producer with award-winning quality", isOrganic: true },
  { id: "F-204", name: "Anjali Patel", location: "Indore, Madhya Pradesh", mainCrops: ["Soybean", "Cotton", "Chickpea"], experience: 8, rating: 4.3, reviews: 67, description: "Emerging farmer with modern farming techniques", isOrganic: false },
  { id: "F-205", name: "Harjit Kaur", location: "Ludhiana, Punjab", mainCrops: ["Wheat", "Rice", "Sugarcane"], experience: 25, rating: 4.8, reviews: 234, description: "Large-scale farmer with mechanized operations", isOrganic: false },
  { id: "F-206", name: "Suresh Reddy", location: "Warangal, Telangana", mainCrops: ["Cotton", "Corn", "Groundnut"], experience: 18, rating: 4.6, reviews: 178, description: "Sustainable farming advocate with organic certification", isOrganic: true },
];

const BatchContext = createContext<BatchContextType | undefined>(undefined);

export const useBatches = () => {
  const ctx = useContext(BatchContext);
  if (!ctx) throw new Error("useBatches must be used within BatchProvider");
  return ctx;
};

const generateNft = () => {
  const hex = () => Math.random().toString(16).slice(2, 6);
  return `0x${hex()}...${hex()}`;
};

const generateId = (batches: Batch[]) => {
  const max = batches.reduce((m, b) => {
    const num = parseInt(b.id.replace("B-", ""));
    return num > m ? num : m;
  }, 1000);
  return `B-${max + 1}`;
};

export const BatchProvider = ({ children }: { children: ReactNode }) => {
  const [batches, setBatches] = useState<Batch[]>(defaultBatches);
  const [retailers, setRetailers] = useState<Retailer[]>(defaultRetailers);
  const [farmers] = useState<Farmer[]>(defaultFarmers);

  const addBatch = (data: Omit<Batch, "id" | "nft" | "minted" | "status" | "paymentOptIn" | "paymentReceived" | "pesticideReport" | "freshnessScore">) => {
    const now = new Date();
    const minted = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const newBatch: Batch = {
      ...data,
      id: generateId(batches),
      nft: generateNft(),
      minted,
      status: "In Transit",
      paymentOptIn: false,
      paymentReceived: 0,
      pesticideReport: "Certified pesticide-free farming practices",
      freshnessScore: 90,
    };
    setBatches((prev) => [newBatch, ...prev]);
  };

  const togglePaymentOptIn = (id: string) => {
    setBatches((prev) =>
      prev.map((b) => (b.id === id ? { ...b, paymentOptIn: !b.paymentOptIn } : b))
    );
  };

  const toggleRetailerConnection = (retailerId: string) => {
    setRetailers((prev) =>
      prev.map((r) => (r.id === retailerId ? { ...r, connected: !r.connected } : r))
    );
  };

  return (
    <BatchContext.Provider value={{ batches, retailers, farmers, addBatch, togglePaymentOptIn, toggleRetailerConnection }}>
      {children}
    </BatchContext.Provider>
  );
};
