export interface UserProfile {
  name?: string;
  age?: number;
  city?: string;
  occupation?: string;
  engineeringBranch?: string;
  budget?: number;
  primaryUseCase?: string;
  interests?: string[];
  gamingGenres?: string[];
  creativeWork?: string[];
  aiMlInterest?: boolean;
  electricityStability?: string;
  internetSpeed?: string;
  currentDevice?: string;
  startupGoals?: string;
}

export interface PCComponent {
  name: string;
  model: string;
  price: number;
  brand: string;
  specs: string;
  whyChosen: string;
  futureProof: number;
  amazonLink?: string;
  flipkartLink?: string;
}

export interface PCBuild {
  title: string;
  tagline: string;
  totalCost: number;
  cpu: PCComponent;
  gpu?: PCComponent;
  ram: PCComponent;
  storage: PCComponent;
  motherboard: PCComponent;
  psu: PCComponent;
  cooling: PCComponent;
  cabinet: PCComponent;
  monitor?: PCComponent;
  ups?: PCComponent;
  peripherals?: PCComponent[];
  futureProofScore: number;
  valueScore: number;
  performanceScore: number;
  thermalScore: number;
  estimatedLifespan: number;
  upgradeTimeline: string;
  bottlenecks: string[];
  strengths: string[];
  aiInsight: string;
  gamingFps?: Record<string, number>;
  powerConsumption: number;
  monthlyElectricityCost: number;
}

export interface LaptopRecommendation {
  title: string;
  brand: string;
  model: string;
  price: number;
  specs: {
    cpu: string;
    gpu?: string;
    ram: string;
    storage: string;
    display: string;
    battery: string;
    weight: string;
  };
  whyPerfect: string;
  futureProofScore: number;
  valueScore: number;
  bestFor: string[];
  limitations: string[];
  aiInsight: string;
}

// Component Database with Indian Market Pricing (approx. 2024-2025)
const cpuDatabase: PCComponent[] = [
  { name: "CPU", model: "Intel Core i3-12100F", price: 8500, brand: "Intel", specs: "4C/8T, 3.3-4.3GHz, 58W TDP", whyChosen: "The king of ultra-budget gaming in India. Best 1080p value.", futureProof: 60 },
  { name: "CPU", model: "AMD Ryzen 5 5600", price: 12500, brand: "AMD", specs: "6C/12T, 3.5-4.4GHz, 65W TDP", whyChosen: "Unmatched performance per rupee for mid-range Indian builds.", futureProof: 72 },
  { name: "CPU", model: "Intel Core i5-13400F", price: 18500, brand: "Intel", specs: "10C/16T, 2.5-4.6GHz, DDR5 ready", whyChosen: "Excellent balance for multitasking and gaming at a great price.", futureProof: 80 },
  { name: "CPU", model: "AMD Ryzen 5 7600X", price: 21500, brand: "AMD", specs: "6C/12T, 4.7-5.3GHz, AM5 platform", whyChosen: "Future-proof AM5 platform ensures an easy upgrade path until 2026+.", futureProof: 85 },
  { name: "CPU", model: "AMD Ryzen 7 7700X", price: 31000, brand: "AMD", specs: "8C/16T, 4.5-5.4GHz, AM5 socket", whyChosen: "Ideal for engineers and heavy multitasking — handles stress with ease.", futureProof: 88 },
  { name: "CPU", model: "Intel Core i7-14700K", price: 41000, brand: "Intel", specs: "20C/28T, up to 5.6GHz", whyChosen: "A beast for content creation and local AI model training.", futureProof: 90 },
  { name: "CPU", model: "Intel Core i9-13900K", price: 54000, brand: "Intel", specs: "24C/32T, up to 5.8GHz", whyChosen: "India's top consumer CPU for AI/ML and 3D rendering workflows.", futureProof: 93 },
  { name: "CPU", model: "AMD Ryzen 9 7950X", price: 62000, brand: "AMD", specs: "16C/32T, 4.5-5.7GHz, AM5", whyChosen: "The ultimate productivity monster for compilation and rendering.", futureProof: 95 },
];

const gpuDatabase: PCComponent[] = [
  { name: "GPU", model: "NVIDIA GTX 1650", price: 13000, brand: "NVIDIA", specs: "4GB GDDR5, Entry Level", whyChosen: "The bare minimum for a display and light 1080p esports.", futureProof: 40 },
  { name: "GPU", model: "AMD RX 6600 8GB", price: 19500, brand: "AMD", specs: "8GB GDDR6, 1080p beast", whyChosen: "Best value GPU in India right now. Beats everything under 20k.", futureProof: 65 },
  { name: "GPU", model: "NVIDIA RTX 3060 12GB", price: 27500, brand: "NVIDIA", specs: "12GB GDDR6, DLSS support", whyChosen: "12GB VRAM is crucial for AI/ML and texture-heavy Indian servers.", futureProof: 75 },
  { name: "GPU", model: "NVIDIA RTX 4060 8GB", price: 32000, brand: "NVIDIA", specs: "8GB GDDR6, DLSS 3.0", whyChosen: "DLSS 3 Frame Gen makes this highly future-proof for new AAA titles.", futureProof: 82 },
  { name: "GPU", model: "NVIDIA RTX 4060 Ti 16GB", price: 44000, brand: "NVIDIA", specs: "16GB GDDR6, High VRAM", whyChosen: "The entry point for serious local LLM and Stable Diffusion work.", futureProof: 85 },
  { name: "GPU", model: "NVIDIA RTX 4070 12GB", price: 54000, brand: "NVIDIA", specs: "12GB GDDR6X, 1440p King", whyChosen: "Professional grade value for 1440p gaming and AI workloads.", futureProof: 88 },
  { name: "GPU", model: "NVIDIA RTX 4070 Ti Super", price: 78000, brand: "NVIDIA", specs: "16GB GDDR6X, 256-bit", whyChosen: "Exceptional for 4K and heavy AI training at a semi-pro budget.", futureProof: 90 },
  { name: "GPU", model: "NVIDIA RTX 4080 Super", price: 98000, brand: "NVIDIA", specs: "16GB GDDR6X, Ultimate Power", whyChosen: "Best high-end GPU for professional VFX and deep learning in India.", futureProof: 94 },
  { name: "GPU", model: "NVIDIA RTX 4090 24GB", price: 195000, brand: "NVIDIA", specs: "24GB GDDR6X, The Titan", whyChosen: "No compromises. The ultimate tool for India's next AI unicorn.", futureProof: 98 },
];

const ramDatabase: PCComponent[] = [
  { name: "RAM", model: "Crucial 8GB DDR4", price: 2000, brand: "Crucial", specs: "DDR4-3200MHz", whyChosen: "Budget essential for general office and study work.", futureProof: 40 },
  { name: "RAM", model: "Corsair Vengeance 16GB (8x2)", price: 4200, brand: "Corsair", specs: "DDR4-3200, Dual Channel", whyChosen: "The sweet spot for Indian gaming and student builds.", futureProof: 65 },
  { name: "RAM", model: "G.Skill Ripjaws 32GB (16x2) DDR4", price: 8500, brand: "G.Skill", specs: "DDR4-3600, High Speed", whyChosen: "Required for heavy video editing and local development.", futureProof: 75 },
  { name: "RAM", model: "Kingston Fury 16GB DDR5", price: 5800, brand: "Kingston", specs: "DDR5-5200MHz", whyChosen: "Entry point for the new AM5/LGA1700 DDR5 platforms.", futureProof: 85 },
  { name: "RAM", model: "G.Skill Trident Z5 32GB DDR5", price: 11000, brand: "G.Skill", specs: "DDR5-6000, CL30", whyChosen: "Ultra-fast RAM for competitive gaming and AI inference.", futureProof: 90 },
  { name: "RAM", model: "Corsair Vengeance 64GB (32x2) DDR5", price: 21000, brand: "Corsair", specs: "DDR5-5600, Massive Capacity", whyChosen: "Essential for training large models and professional virtualization.", futureProof: 95 },
];

const storageDatabase: PCComponent[] = [
  { name: "Storage", model: "Crucial P3 500GB NVMe", price: 3200, brand: "Crucial", specs: "PCIe 3.0, 3500MB/s", whyChosen: "Blazing fast OS drive for an entry-level budget.", futureProof: 60 },
  { name: "Storage", model: "Samsung 980 1TB NVMe", price: 6800, brand: "Samsung", specs: "PCIe 3.0, High Reliability", whyChosen: "Reliable Indian market favorite for daily drivers.", futureProof: 75 },
  { name: "Storage", model: "WD Black SN850X 1TB", price: 9500, brand: "WD", specs: "PCIe 4.0, 7300MB/s", whyChosen: "One of the fastest drives for competitive load times.", futureProof: 88 },
  { name: "Storage", model: "Samsung 990 Pro 2TB", price: 18500, brand: "Samsung", specs: "PCIe 4.0, The Best", whyChosen: "Professional grade storage for huge datasets and 4K video.", futureProof: 95 },
];

const mbDatabase: PCComponent[] = [
  { name: "Motherboard", model: "MSI H610M-E", price: 6500, brand: "MSI", specs: "LGA1700, Budget", whyChosen: "Solid foundation for budget Intel builds.", futureProof: 50 },
  { name: "Motherboard", model: "MSI B550M Pro-VDH WiFi", price: 9500, brand: "MSI", specs: "AM4, WiFi Built-in", whyChosen: "Best value motherboard in India with WiFi and Bluetooth.", futureProof: 65 },
  { name: "Motherboard", model: "ASUS Prime B650M-A WiFi", price: 14500, brand: "ASUS", specs: "AM5, DDR5, WiFi 6", whyChosen: "Future-proof AM5 board for high-speed components.", futureProof: 85 },
  { name: "Motherboard", model: "MSI MAG Z790 Tomahawk WiFi", price: 28000, brand: "MSI", specs: "LGA1700, High End", whyChosen: "Built for overclocking and extreme connectivity.", futureProof: 92 },
];

const psuDatabase: PCComponent[] = [
  { name: "PSU", model: "Ant Esports VS500L", price: 2200, brand: "Ant Esports", specs: "500W, Basic", whyChosen: "Ultra-budget choice for general work.", futureProof: 40 },
  { name: "PSU", model: "DeepCool PK550D", price: 3600, brand: "DeepCool", specs: "550W, 80+ Bronze", whyChosen: "Reliable power for entry-level gaming builds.", futureProof: 60 },
  { name: "PSU", model: "Corsair RM750e", price: 9500, brand: "Corsair", specs: "750W, 80+ Gold, Modular", whyChosen: "Gold efficiency saves on high Indian electricity bills.", futureProof: 88 },
  { name: "PSU", model: "Corsair RM1000x", price: 16500, brand: "Corsair", specs: "1000W, 80+ Gold", whyChosen: "Maximum headroom for high-end GPUs.", futureProof: 95 },
];

const coolingDatabase: PCComponent[] = [
  { name: "Cooling", model: "Stock Cooler", price: 0, brand: "Generic", specs: "Included with CPU", whyChosen: "Zero cost, good for budget builds.", futureProof: 30 },
  { name: "Cooling", model: "DeepCool AG400", price: 1800, brand: "DeepCool", specs: "Air Cooler, Single Tower", whyChosen: "Handles Indian summers much better than stock coolers.", futureProof: 70 },
  { name: "Cooling", model: "DeepCool AK620", price: 5800, brand: "DeepCool", specs: "Dual Tower, 260W TDP", whyChosen: "Keeps high-end CPUs cool during heavy rendering.", futureProof: 85 },
  { name: "Cooling", model: "Cooler Master MasterLiquid 360L", price: 9500, brand: "Cooler Master", specs: "360mm AIO Liquid", whyChosen: "Ultimate cooling for overclocked premium setups.", futureProof: 92 },
];

const cabinetDatabase: PCComponent[] = [
  { name: "Cabinet", model: "Ant Esports ICE-120", price: 2500, brand: "Ant Esports", specs: "Mid Tower, RGB", whyChosen: "Popular budget pick with decent airflow.", futureProof: 50 },
  { name: "Cabinet", model: "MSI Mag Forge 112R", price: 4800, brand: "MSI", specs: "4 Fans included, Mesh", whyChosen: "Excellent airflow essential for tropical climates.", futureProof: 75 },
  { name: "Cabinet", model: "Lian Li Lancool 216", price: 8200, brand: "Lian Li", specs: "High Airflow, Pro", whyChosen: "The gold standard for airflow and cable management.", futureProof: 90 },
];

function findBestComponent(database: PCComponent[], targetPrice: number): PCComponent {
  // Sort by price descending
  const sorted = [...database].sort((a, b) => b.price - a.price);

  // Find the first one that is <= targetPrice
  let best = sorted.find(c => c.price <= targetPrice);

  // If nothing found, take the cheapest one
  if (!best) {
    best = sorted[sorted.length - 1];
  }

  return best;
}

function getBudgetRange(budget: number): "entry" | "mid" | "high" | "premium" {
  if (budget < 45000) return "entry";
  if (budget < 85000) return "mid";
  if (budget < 160000) return "high";
  return "premium";
}

function getUseCaseCategory(profile: UserProfile): string {
  const useCase = profile.primaryUseCase?.toLowerCase() || "";
  const interests = profile.interests || [];

  if (useCase.includes("gaming") || interests.includes("gaming")) return "gaming";
  if (useCase.includes("ai") || useCase.includes("ml") || profile.aiMlInterest) return "aiml";
  if (useCase.includes("creat") || useCase.includes("edit") || interests.includes("video editing")) return "creator";
  if (useCase.includes("startup") || useCase.includes("business")) return "startup";
  if (useCase.includes("engineer") || profile.engineeringBranch) return "engineering";
  if (useCase.includes("stream")) return "streaming";
  return "general";
}

export function generatePCBuild(profile: UserProfile): PCBuild {
  const budget = profile.budget || 60000;
  const category = getUseCaseCategory(profile);
  const budgetRange = getBudgetRange(budget);

  // Intelligent component allocation based on use case
  const allocations = {
    gaming: { cpu: 0.20, gpu: 0.38, ram: 0.08, storage: 0.08, mb: 0.12, psu: 0.06, cooling: 0.04, cabinet: 0.04 },
    aiml: { cpu: 0.22, gpu: 0.42, ram: 0.12, storage: 0.08, mb: 0.08, psu: 0.04, cooling: 0.02, cabinet: 0.02 },
    creator: { cpu: 0.30, gpu: 0.25, ram: 0.15, storage: 0.12, mb: 0.08, psu: 0.05, cooling: 0.03, cabinet: 0.02 },
    startup: { cpu: 0.35, gpu: 0.10, ram: 0.20, storage: 0.15, mb: 0.10, psu: 0.05, cooling: 0.03, cabinet: 0.02 },
    engineering: { cpu: 0.32, gpu: 0.18, ram: 0.18, storage: 0.12, mb: 0.10, psu: 0.05, cooling: 0.03, cabinet: 0.02 },
    streaming: { cpu: 0.28, gpu: 0.30, ram: 0.12, storage: 0.10, mb: 0.08, psu: 0.06, cooling: 0.04, cabinet: 0.02 },
    general: { cpu: 0.30, gpu: 0.15, ram: 0.15, storage: 0.15, mb: 0.12, psu: 0.07, cooling: 0.03, cabinet: 0.03 },
  };

  const alloc = allocations[category as keyof typeof allocations] || allocations.general;

  // Select components dynamically
  const cpu = findBestComponent(cpuDatabase, budget * alloc.cpu);
  const gpu = category !== "startup" ? findBestComponent(gpuDatabase, budget * alloc.gpu) : undefined;
  const ram = findBestComponent(ramDatabase, budget * alloc.ram);
  const storage = findBestComponent(storageDatabase, budget * alloc.storage);
  const motherboard = findBestComponent(mbDatabase, budget * alloc.mb);
  const psu = findBestComponent(psuDatabase, budget * alloc.psu);
  const cooling = findBestComponent(coolingDatabase, budget * alloc.cooling);
  const cabinet = findBestComponent(cabinetDatabase, budget * alloc.cabinet);

  const totalCost = cpu.price + (gpu?.price || 0) + ram.price + storage.price + motherboard.price + psu.price + cooling.price + cabinet.price;

  // City-specific advice for usefulness
  const cityAdvice: Record<string, string> = {
    "Bangalore": "Pro-tip: Visit SP Road for the best offline deals. Stores like Ankit Infotech or Super Computers are highly rated.",
    "Mumbai": "Check Lamington Road for competitive pricing. PrimeABGB is the gold standard for high-end components there.",
    "Delhi": "Nehru Place is your destination. Cost-to-Cost is famous, but compare with SMC International for premium parts.",
    "Chennai": "Ritchie Street is where you'll find the best hardware deals. Oasis IT is a reliable choice.",
    "Hyderabad": "Chenoy Trade Center (CTC) in Secunderabad is the tech hub for your build.",
    "Kolkata": "Chandni Chowk area is the best place to source components offline at great prices.",
    "Pune": "Tilak Road and nearby areas have several reliable vendors like DataCare Corporation.",
  };

  const environmentAdvice = profile.electricityStability === "unstable"
    ? "⚠️ Due to unstable power in your area, an Online UPS (1KVA+) is MANDATORY to protect your components."
    : profile.electricityStability === "moderate"
      ? "💡 Periodic power cuts detected: A basic 600VA-1100VA UPS is highly recommended for data safety."
      : "✅ Your power is stable, but a basic surge protector is still a smart ₹500 investment.";

  // Gaming FPS estimates
  const gamingFps: Record<string, number> = {};
  if (gpu) {
    const gpuPower = gpu.price / 1000;
    gamingFps["Valorant (1080p)"] = Math.round(150 + gpuPower * 10);
    gamingFps["CS2 (1080p)"] = Math.round(120 + gpuPower * 8);
    gamingFps["GTA V (1080p)"] = Math.round(60 + gpuPower * 4);
    gamingFps["Cyberpunk 2077"] = Math.round(30 + gpuPower * 1.5);
  }

  const powerConsumption = Math.round((cpu.price / 400) + (gpu?.price / 250 || 0) + 120);
  const monthlyElectricityCost = Math.round((powerConsumption * 6 * 30 * 7.5) / 1000); // 6 hrs/day, 7.5 per unit avg

  const titles = {
    gaming: "🎮 The Indian Gaming Beast",
    aiml: "🧠 The AI/ML Powerhouse",
    creator: "🎬 The Creator's Workstation",
    startup: "🚀 The Startup Command Center",
    engineering: "⚙️ The Engineer's Workstation",
    streaming: "📡 The Streaming Studio",
    general: "💻 The All-Rounder",
  };

  const taglines = {
    gaming: "Dominate every Indian server. Low latency, high performance.",
    aiml: "Train models. Run inference. The future of Bharat AI is here.",
    creator: "Edit 4K, export faster. Built for India's creator economy.",
    startup: "Scalable hardware for a scalable vision. Build your unicorn.",
    engineering: "Simulate and design without bottlenecks. Engineer's pride.",
    streaming: "Broadcast to millions. Flawless multitasking for streamers.",
    general: "Reliability meets performance. The perfect Indian daily driver.",
  };

  const futureProofScore = Math.round((cpu.futureProof + (gpu?.futureProof || 70) + ram.futureProof + storage.futureProof) / 4);
  const valueScore = Math.round(100 - (Math.abs(totalCost - budget) / budget) * 40);

  const strengths = [
    `Optimized for ${profile.city || "your city"}'s market availability`,
    `${futureProofScore}% future-proof rating — solid investment for 4+ years`,
    psu.model.includes("Gold") ? "Gold-rated PSU reduces monthly power bills significantly" : "Reliable power delivery for Indian voltage fluctuations",
  ];

  if (cityAdvice[profile.city as string]) {
    strengths.push(cityAdvice[profile.city as string]);
  }

  const aiInsight = `Namaste ${profile.name || "friend"}! 🙏 For your budget of ₹${budget.toLocaleString('en-IN')}, I've designed a system that maximizes every rupee. ${gpu ? `The ${gpu.model} is a strategic choice for ${category}, offering high CUDA performance for AI or frame rates for gaming.` : `I've prioritized CPU and RAM for your ${category} needs.`} ${environmentAdvice} This build will serve you excellently for ${Math.round(futureProofScore / 15)} years.`;

  const upgradeTimelines = {
    entry: "Year 2: Add 8GB RAM | Year 3: Entry-level GPU upgrade",
    mid: "Year 2: Add 1TB SSD | Year 4: Mid-range GPU refresh",
    high: "Year 3: GPU upgrade | Year 5: Full platform refresh",
    premium: "You are future-proof until 2028-29. Minor storage additions only.",
  };

  return {
    title: titles[category as keyof typeof titles] || titles.general,
    tagline: taglines[category as keyof typeof taglines] || taglines.general,
    totalCost,
    cpu,
    gpu,
    ram,
    storage,
    motherboard,
    psu,
    cooling,
    cabinet,
    futureProofScore,
    valueScore: Math.min(98, valueScore),
    performanceScore: Math.min(99, Math.round(futureProofScore * 1.02)),
    thermalScore: cooling.model === "Stock Cooler" ? 65 : 85,
    estimatedLifespan: Math.round(futureProofScore / 15),
    upgradeTimeline: upgradeTimelines[budgetRange],
    bottlenecks: totalCost < budget * 0.8 ? ["Budget left on table — consider a better GPU", "RAM could be higher for heavy multitasking"] : [],
    strengths,
    aiInsight,
    gamingFps,
    powerConsumption,
    monthlyElectricityCost,
  };
}

export function generateLaptopRecommendations(profile: UserProfile): LaptopRecommendation[] {
  const budget = profile.budget || 60000;
  const category = getUseCaseCategory(profile);

  const allLaptops: LaptopRecommendation[] = [
    { title: "Budget Student Pick", brand: "Lenovo", model: "IdeaPad Slim 3", price: 34500, specs: { cpu: "Ryzen 3 7320U", ram: "8GB", storage: "512GB SSD", display: "15.6\" FHD", battery: "42Wh", weight: "1.6kg" }, whyPerfect: "Affordable and reliable for college work.", futureProofScore: 55, valueScore: 90, bestFor: ["Students", "Office"], limitations: ["Basic performance"], aiInsight: "Great for entry-level coding and study." },
    { title: "Value King", brand: "Acer", model: "Swift Go 14", price: 58000, specs: { cpu: "Core i5-13500H", ram: "16GB", storage: "512GB SSD", display: "14\" OLED 90Hz", battery: "65Wh", weight: "1.25kg" }, whyPerfect: "Best OLED display at this price point.", futureProofScore: 78, valueScore: 95, bestFor: ["Creators", "Students"], limitations: ["Average speakers"], aiInsight: "OLED screen is a game changer for creators." },
    { title: "Gaming Starter", brand: "HP", model: "Victus 15", price: 62000, specs: { cpu: "Ryzen 5 5600H", gpu: "RTX 3050 4GB", ram: "16GB", storage: "512GB SSD", display: "15.6\" 144Hz", battery: "70Wh", weight: "2.3kg" }, whyPerfect: "Best entry-level gaming laptop with HP service support.", futureProofScore: 70, valueScore: 88, bestFor: ["Gaming", "Engineers"], limitations: ["Bulkier build"], aiInsight: "Ideal for first-year engineering students." },
    { title: "Performance Pro", brand: "ASUS", model: "ROG Zephyrus G14", price: 89000, specs: { cpu: "Ryzen 7 7735HS", gpu: "RTX 4050 6GB", ram: "16GB", storage: "512GB SSD", display: "14\" QHD 165Hz", battery: "76Wh", weight: "1.65kg" }, whyPerfect: "Incredible power-to-weight ratio.", futureProofScore: 85, valueScore: 85, bestFor: ["AI/ML", "Gaming"], limitations: ["Gets hot"], aiInsight: "Best portable powerhouse for ML students." },
    { title: "The Workstation", brand: "Apple", model: "MacBook Air M3", price: 114000, specs: { cpu: "Apple M3 Chip", ram: "16GB Unified", storage: "512GB SSD", display: "13.6\" Liquid Retina", battery: "18 hrs", weight: "1.24kg" }, whyPerfect: "Unbeatable battery life and efficiency.", futureProofScore: 92, valueScore: 82, bestFor: ["Development", "Startup Founders"], limitations: ["Expensive upgrades"], aiInsight: "The standard for modern software development." },
    { title: "Ultimate Beast", brand: "ASUS", model: "ROG Strix SCAR 16", price: 235000, specs: { cpu: "i9-14900HX", gpu: "RTX 4080 12GB", ram: "32GB", storage: "1TB SSD", display: "16\" QHD Mini-LED", battery: "90Wh", weight: "2.6kg" }, whyPerfect: "Desktop-grade performance in a laptop.", futureProofScore: 96, valueScore: 75, bestFor: ["VFX", "Top-tier Gaming"], limitations: ["Very heavy", "Expensive"], aiInsight: "Eliminates hardware as a bottleneck for any task." },
  ];

  // Filter and sort by closeness to budget (within +15k range, but prioritize lower or equal)
  const filtered = allLaptops
    .filter(l => l.price <= budget * 1.15) // Allow slightly over budget for better value
    .sort((a, b) => Math.abs(a.price - budget) - Math.abs(b.price - budget));

  return filtered.slice(0, 3);
}

export function getVoiceGreeting(profile: UserProfile): string {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const name = profile.name ? `, ${profile.name}` : "";

  const greetings = [
    `${greeting}${name}! Namaste! I'm ARIA — your AI technology companion. I'm here to guide you toward the perfect technology setup that matches your dreams, budget, and future goals. Let's build something incredible together!`,
    `Namaste${name}! I'm ARIA, your personal AI engineer and technology mentor. Whether you're a student, gamer, creator, or startup founder, I'll help you make the smartest technology investment of your life. Where shall we begin?`,
    `${greeting}${name}! Welcome to BharatTech AI — India's most intelligent technology ecosystem. I'm ARIA, and I'm about to change the way you think about technology. Tell me your dreams, and I'll design your future.`,
  ];

  return greetings[Math.floor(Math.random() * greetings.length)];
}

export function getContextualAdvice(profile: UserProfile, context: string): string {
  const budget = profile.budget || 60000;
  const category = getUseCaseCategory(profile);

  const adviceMap: Record<string, string[]> = {
    budget: [
      `For ₹${(budget / 1000).toFixed(0)}K, the Indian market offers exceptional value right now. AMD processors give 30% more performance per rupee than Intel at your budget point.`,
      `Smart move keeping your budget at ₹${(budget / 1000).toFixed(0)}K! Prices in India dropped 15-20% in the last 6 months — perfect time to build.`,
      `Your ₹${(budget / 1000).toFixed(0)}K budget is very strategic. I recommend spending 35% on GPU if you're gaming, or 25% on CPU if you're into AI/ML workloads.`,
    ],
    gaming: [
      "Indian gaming is exploding! BGMI, Valorant, and CS2 are the most played games. An RTX 4060 handles all of them at ultra settings with DLSS enabled.",
      "For competitive gaming in India, focus on high refresh rate (144Hz+) over resolution. 1080p at 144Hz beats 4K at 60Hz for competitive titles.",
      "Invest in a good monitor — Indian gamers often overspend on GPU and use a 60Hz display. That's a bottleneck that kills competitive performance.",
    ],
    aiml: [
      "For AI/ML in India, VRAM is your most important resource. An RTX 3060 with 12GB VRAM is better than a 4060 with 8GB for training larger models.",
      "Indian AI students: use Google Colab Pro for training + local GPU for inference. This hybrid approach saves money while maximizing productivity.",
      "The future belongs to AI engineers. Invest in a system with at least 32GB RAM and an RTX 4060 Ti 16GB+ for running local LLMs and ML pipelines.",
    ],
    engineering: [
      "For engineering students: MATLAB, AutoCAD, SolidWorks, and ANSYS all run best with a dedicated GPU and 16GB+ RAM. Don't compromise here.",
      "Civil and mechanical engineers: prioritize CPU cores for FEA simulations. AMD Ryzen 7 gives you 8 cores that significantly speed up Ansys Mechanical.",
      "CSE students: a powerful laptop with Linux dual-boot is your best investment. Development, compilation, and ML workflows are all faster on Linux.",
    ],
    startup: [
      "Startup founders: build a reliable workstation, not a gaming beast. 32GB RAM enables multiple development environments simultaneously.",
      "For Indian startups, reliability > performance. ASUS and Dell have the best B2B service networks across India — crucial when deadlines are near.",
      "Cloud-first development means your local machine is your coding terminal + meeting station. Prioritize display quality, RAM, and fast SSD.",
    ],
  };

  const relevantAdvice = adviceMap[category] || adviceMap.gaming;
  return relevantAdvice[Math.floor(Math.random() * relevantAdvice.length)];
}

