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

function getBudgetRange(budget: number): "entry" | "mid" | "high" | "premium" {
  if (budget < 40000) return "entry";
  if (budget < 80000) return "mid";
  if (budget < 150000) return "high";
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
  const budgetRange = getBudgetRange(budget);
  const category = getUseCaseCategory(profile);

  // Intelligent component allocation based on use case
  const allocations = {
    gaming: { cpu: 0.22, gpu: 0.35, ram: 0.10, storage: 0.08, mb: 0.10, psu: 0.07, cooling: 0.04, cabinet: 0.04 },
    aiml: { cpu: 0.25, gpu: 0.38, ram: 0.15, storage: 0.10, mb: 0.05, psu: 0.04, cooling: 0.02, cabinet: 0.01 },
    creator: { cpu: 0.28, gpu: 0.30, ram: 0.15, storage: 0.12, mb: 0.07, psu: 0.04, cooling: 0.03, cabinet: 0.01 },
    startup: { cpu: 0.30, gpu: 0.10, ram: 0.20, storage: 0.15, mb: 0.12, psu: 0.06, cooling: 0.04, cabinet: 0.03 },
    engineering: { cpu: 0.28, gpu: 0.15, ram: 0.20, storage: 0.15, mb: 0.10, psu: 0.06, cooling: 0.04, cabinet: 0.02 },
    streaming: { cpu: 0.25, gpu: 0.30, ram: 0.12, storage: 0.12, mb: 0.09, psu: 0.06, cooling: 0.04, cabinet: 0.02 },
    general: { cpu: 0.25, gpu: 0.20, ram: 0.15, storage: 0.15, mb: 0.12, psu: 0.07, cooling: 0.04, cabinet: 0.02 },
  };

  const alloc = allocations[category as keyof typeof allocations] || allocations.general;

  // Component databases with Indian pricing
  const cpuOptions = {
    entry: { name: "CPU", model: "AMD Ryzen 5 5600", price: 13000, brand: "AMD", specs: "6C/12T, 3.5-4.4GHz, 65W TDP", whyChosen: "Best budget CPU for Indian users — unmatched performance per rupee", futureProof: 72 },
    mid: { name: "CPU", model: "AMD Ryzen 5 7600X", price: 22000, brand: "AMD", specs: "6C/12T, 4.7-5.3GHz, AM5 platform", whyChosen: "AM5 platform ensures upgrade path for years — future-proof investment", futureProof: 85 },
    high: { name: "CPU", model: "AMD Ryzen 7 7700X", price: 32000, brand: "AMD", specs: "8C/16T, 4.5-5.4GHz, AM5 socket", whyChosen: "Ideal for creators and engineers — handles multitasking with ease", futureProof: 88 },
    premium: { name: "CPU", model: "Intel Core i9-13900K", price: 55000, brand: "Intel", specs: "24C/32T, up to 5.8GHz, DDR5 ready", whyChosen: "India's most powerful consumer CPU for AI/ML and 3D rendering workflows", futureProof: 90 },
  };

  const gpuOptions = {
    entry: { name: "GPU", model: "NVIDIA RTX 3060 12GB", price: 28000, brand: "NVIDIA", specs: "12GB GDDR6, 3584 CUDA cores, 170W", whyChosen: "Best 1080p gaming GPU in India under ₹30K — DLSS 2.0 support", futureProof: 70 },
    mid: { name: "GPU", model: "NVIDIA RTX 4060 8GB", price: 35000, brand: "NVIDIA", specs: "8GB GDDR6, 3072 CUDA cores, 115W efficient", whyChosen: "DLSS 3 Frame Generation + Ada architecture — future AAA gaming ready", futureProof: 82 },
    high: { name: "GPU", model: "NVIDIA RTX 4070 12GB", price: 55000, brand: "NVIDIA", specs: "12GB GDDR6X, 5888 CUDA cores, 200W", whyChosen: "1440p/4K gaming + AI/ML CUDA workloads — professional grade value", futureProof: 88 },
    premium: { name: "GPU", model: "NVIDIA RTX 4080 SUPER 16GB", price: 95000, brand: "NVIDIA", specs: "16GB GDDR6X, 10240 CUDA cores, 320W", whyChosen: "India's best GPU for AI training, 4K gaming, and professional VFX", futureProof: 93 },
  };

  const ramOptions = {
    entry: { name: "RAM", model: "Corsair Vengeance DDR4 16GB (2x8)", price: 4500, brand: "Corsair", specs: "DDR4-3200, CL16, dual channel", whyChosen: "Dual channel setup maximizes CPU bandwidth for budget builds", futureProof: 65 },
    mid: { name: "RAM", model: "G.Skill Trident Z5 DDR5 32GB", price: 9500, brand: "G.Skill", specs: "DDR5-5600, CL36, low latency", whyChosen: "DDR5 future-proofs your system for next-gen software requirements", futureProof: 88 },
    high: { name: "RAM", model: "Kingston Fury Beast DDR5 32GB", price: 12000, brand: "Kingston", specs: "DDR5-5200, 32GB dual channel", whyChosen: "32GB DDR5 handles AI/ML datasets, video editing, and VMs simultaneously", futureProof: 90 },
    premium: { name: "RAM", model: "G.Skill Trident Z5 DDR5 64GB", price: 22000, brand: "G.Skill", specs: "DDR5-6000, 64GB, XMP 3.0", whyChosen: "64GB enables large AI model training and professional 3D rendering", futureProof: 95 },
  };

  const storageOptions = {
    entry: { name: "Storage", model: "Samsung 980 NVMe 500GB + Seagate 1TB HDD", price: 5000, brand: "Samsung", specs: "NVMe PCIe 3.0, 3500MB/s + 7200RPM HDD", whyChosen: "NVMe OS drive + HDD combo maximizes speed and storage value", futureProof: 68 },
    mid: { name: "Storage", model: "Samsung 980 Pro NVMe 1TB", price: 8000, brand: "Samsung", specs: "PCIe 4.0, 7000MB/s read, 5000MB/s write", whyChosen: "PCIe 4.0 NVMe dramatically improves game load times and file transfers", futureProof: 83 },
    high: { name: "Storage", model: "WD Black SN850X 1TB + Samsung 870 EVO 2TB", price: 14000, brand: "WD + Samsung", specs: "PCIe 4.0 NVMe + SATA SSD combo", whyChosen: "Primary NVMe for speed + SSD archive — no HDD noise or heat", futureProof: 87 },
    premium: { name: "Storage", model: "Samsung 990 Pro NVMe 2TB", price: 20000, brand: "Samsung", specs: "PCIe 4.0, 7450MB/s read, optimized thermal", whyChosen: "2TB high-speed NVMe for professional AI datasets and content creation", futureProof: 92 },
  };

  const mbOptions = {
    entry: { name: "Motherboard", model: "MSI B550M Pro-VDH WiFi", price: 8500, brand: "MSI", specs: "AM4, PCIe 4.0, M.2, WiFi 5, ATX", whyChosen: "Reliable Indian market bestseller — good VRM for stable overclocking", futureProof: 70 },
    mid: { name: "Motherboard", model: "ASUS ROG Strix B650-A Gaming WiFi", price: 18000, brand: "ASUS", specs: "AM5, DDR5, PCIe 5.0, WiFi 6E", whyChosen: "AM5 future platform + WiFi 6E ensures compatibility for years ahead", futureProof: 88 },
    high: { name: "Motherboard", model: "MSI MAG X670E Tomahawk WiFi", price: 25000, brand: "MSI", specs: "AM5, X670E chipset, PCIe 5.0, USB 3.2 Gen2", whyChosen: "X670E gives maximum connectivity — perfect for professional workstations", futureProof: 90 },
    premium: { name: "Motherboard", model: "ASUS ROG Maximus Z790 Hero", price: 45000, brand: "ASUS", specs: "LGA1700, DDR5, Thunderbolt 4, 20+1 power stages", whyChosen: "Extreme VRM for overclocking — built for India's demanding power users", futureProof: 92 },
  };

  const psuOptions = {
    entry: { name: "PSU", model: "Corsair CV550 80+ Bronze", price: 3500, brand: "Corsair", specs: "550W, 80+ Bronze, active PFC", whyChosen: "Reliable and efficient — handles budget builds with headroom for upgrades", futureProof: 72 },
    mid: { name: "PSU", model: "Cooler Master MWE Gold 650W", price: 5500, brand: "Cooler Master", specs: "650W, 80+ Gold, 5-year warranty", whyChosen: "80+ Gold efficiency saves ₹2000+ annually on Indian electricity bills", futureProof: 82 },
    high: { name: "PSU", model: "Seasonic Focus GX-750 ATX 3.0", price: 9000, brand: "Seasonic", specs: "750W, 80+ Gold, fully modular, PCIe 5.0", whyChosen: "Fully modular reduces cable clutter — perfect for clean workstation builds", futureProof: 88 },
    premium: { name: "PSU", model: "Corsair HX1000i 80+ Platinum", price: 16000, brand: "Corsair", specs: "1000W, 80+ Platinum, digital monitoring", whyChosen: "Platinum efficiency + digital monitoring — maximum savings on power bills", futureProof: 92 },
  };

  const coolingOptions = {
    entry: { name: "Cooling", model: "Cooler Master Hyper 212 Black", price: 2500, brand: "Cooler Master", specs: "Single tower, 120mm fan, 150W TDP support", whyChosen: "India's most trusted budget cooler — handles Indian summers efficiently", futureProof: 75 },
    mid: { name: "Cooling", model: "DeepCool AK400", price: 3500, brand: "DeepCool", specs: "Dual tower, 4 heatpipes, 240W TDP", whyChosen: "Superior thermal performance keeps Indian summer temperatures in check", futureProof: 82 },
    high: { name: "Cooling", model: "NZXT Kraken X63 AIO 280mm", price: 9000, brand: "NZXT", specs: "280mm AIO, dual 140mm fans, LCD display", whyChosen: "AIO liquid cooling — handles high TDP CPUs during extended workloads", futureProof: 86 },
    premium: { name: "Cooling", model: "Corsair iCUE H150i Elite LCD 360mm", price: 14000, brand: "Corsair", specs: "360mm AIO, 3x120mm fans, LCD pump head", whyChosen: "Maximum heat dissipation for overclocked systems in tropical Indian climate", futureProof: 90 },
  };

  const cabinetOptions = {
    entry: { name: "Cabinet", model: "Ant Esports ICE-511MT", price: 2800, brand: "Ant Esports", specs: "Mid-tower, mesh front, 4 ARGB fans included", whyChosen: "Best value Indian cabinet — includes 4 fans and excellent airflow design", futureProof: 72 },
    mid: { name: "Cabinet", model: "Lian Li LANCOOL 216 RGB", price: 6500, brand: "Lian Li", specs: "Mid-tower, dual 160mm fans, mesh design", whyChosen: "German engineering at Indian price — superior airflow reduces temperatures by 8°C", futureProof: 84 },
    high: { name: "Cabinet", model: "Fractal Design Meshify 2", price: 10000, brand: "Fractal Design", specs: "Mid-tower, 3x140mm fans, tempered glass", whyChosen: "Industrial-grade airflow design — professional workstation aesthetic", futureProof: 88 },
    premium: { name: "Cabinet", model: "Lian Li O11 Dynamic EVO", price: 14000, brand: "Lian Li", specs: "Mid-tower, dual chamber, multiple radiator slots", whyChosen: "Iconic design with ultimate cooling flexibility for premium Indian setups", futureProof: 92 },
  };

  const cpu = cpuOptions[budgetRange];
  const gpu = category !== "startup" && category !== "engineering" ? gpuOptions[budgetRange] : gpuOptions.entry;
  const ram = ramOptions[budgetRange];
  const storage = storageOptions[budgetRange];
  const mb = mbOptions[budgetRange];
  const psu = psuOptions[budgetRange];
  const cooling = coolingOptions[budgetRange];
  const cabinet = cabinetOptions[budgetRange];

  const totalCost = cpu.price + (gpu?.price || 0) + ram.price + storage.price + mb.price + psu.price + cooling.price + cabinet.price;

  // Gaming FPS estimates
  const gamingFps: Record<string, number> = {};
  if (category === "gaming" || profile.interests?.includes("gaming")) {
    const gpuTier = { entry: 1, mid: 2, high: 3, premium: 4 }[budgetRange] || 1;
    gamingFps["Valorant (1080p)"] = 120 + gpuTier * 80;
    gamingFps["CS2 (1080p)"] = 100 + gpuTier * 70;
    gamingFps["GTA V (1080p Ultra)"] = 60 + gpuTier * 30;
    gamingFps["Cyberpunk 2077 (1080p High)"] = 35 + gpuTier * 20;
    gamingFps["PUBG (1080p)"] = 80 + gpuTier * 50;
    gamingFps["FC 24 (1080p)"] = 90 + gpuTier * 60;
  }

  const powerConsumption = (cpu.price / 500) + (gpu?.price / 300 || 0) + 150;
  const monthlyElectricityCost = Math.round((powerConsumption * 8 * 30 * 6.5) / 1000);

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
    gaming: "Dominate every Indian server. Built for the future of gaming.",
    aiml: "Train models. Run inference. Shape the future of Indian AI.",
    creator: "4K edit. Export fast. Create without limits.",
    startup: "Your startup deserves hardware that matches your ambition.",
    engineering: "Simulate, compile, and innovate — at the speed of thought.",
    streaming: "Stream to India. Build your audience. Perform flawlessly.",
    general: "The perfect Indian all-rounder — value, power, and reliability.",
  };

  const futureProofScore = Math.round((cpu.futureProof + (gpu?.futureProof || 70) + ram.futureProof + storage.futureProof) / 4);
  const valueScore = Math.round(100 - (Math.abs(totalCost - budget) / budget) * 30);
  const performanceScore = Math.min(95, Math.round(futureProofScore * 1.05));
  const thermalScore = Math.round((cooling.futureProof + cabinet.futureProof) / 2);

  const bottlenecks: string[] = [];
  const strengths: string[] = [];

  if (category === "gaming" && budgetRange === "entry") {
    bottlenecks.push("GPU may struggle with 4K AAA titles post-2025");
    bottlenecks.push("16GB RAM limits multitasking during streaming");
  }
  if (category === "aiml" && budgetRange !== "premium") {
    bottlenecks.push("VRAM may limit training large language models locally");
    bottlenecks.push("Consider cloud GPU (Vast.AI/Lambda Labs) for large training runs");
  }

  strengths.push(`Outstanding ₹-to-performance ratio for Indian market`);
  strengths.push(`${futureProofScore}% future-proof rating — solid investment`);
  if (psu.model.includes("Gold") || psu.model.includes("Platinum")) {
    strengths.push(`80+ certified PSU saves ₹${Math.round(monthlyElectricityCost * 0.2 * 12)}/year on electricity`);
  }

  const aiInsights = {
    gaming: `Namaste! 🙏 Your gaming setup is intelligently calibrated for the Indian gaming ecosystem. This build will handle Valorant at ${gamingFps["Valorant (1080p)"]}+ FPS — enough to compete at a professional level. The ${gpu?.model} supports DLSS which gives you free performance gains in supported titles. Your upgrade path: add a second RAM stick in 2 years, then GPU upgrade in 3 years. Total investment protection: ~${futureProofScore}% relevance in 2027.`,
    aiml: `Your AI/ML journey starts here. This workstation is optimized for PyTorch, TensorFlow, and Jupyter workflows. The ${gpu?.model} with CUDA cores enables local inference and small model training. For large LLM training, pair this with cloud GPUs. The ${ram.model} ensures smooth multi-environment work. This build will serve IIT/NIT-level AI research for the next ${Math.round(futureProofScore / 15)} years.`,
    creator: `Built for India's growing creator economy. The ${cpu.model} excels at video export via hardware encoding. Your ${storage.model} ensures DaVinci Resolve and Premiere Pro open projects in seconds. This workstation handles 4K timeline editing without proxy files — a professional workflow at Indian budget pricing.`,
    general: `Designed specifically for the Indian market — this build maximizes every rupee. The component selection prioritizes longevity, repairability, and upgrade flexibility. All components are widely available at major Indian retailers including Amazon.in, Flipkart, and MD Computers.`,
  };

  const upgradeTimelines = {
    entry: "Year 2: Add 16GB RAM | Year 3: Upgrade GPU to RTX 4060 | Year 4: Consider CPU upgrade",
    mid: "Year 2: Add storage SSD | Year 3: GPU upgrade to RTX 5070 | Year 4: Full platform refresh",
    high: "Year 3: GPU upgrade | Year 4-5: Full system refresh with next-gen platform",
    premium: "Year 4-5: Full next-gen platform refresh — you're future-proof until 2029+",
  };

  return {
    title: titles[category as keyof typeof titles] || titles.general,
    tagline: taglines[category as keyof typeof taglines] || taglines.general,
    totalCost,
    cpu,
    gpu: category !== "startup" ? gpu : undefined,
    ram,
    storage,
    motherboard: mb,
    psu,
    cooling,
    cabinet,
    futureProofScore,
    valueScore: Math.min(98, valueScore),
    performanceScore,
    thermalScore,
    estimatedLifespan: Math.round(futureProofScore / 15),
    upgradeTimeline: upgradeTimelines[budgetRange],
    bottlenecks,
    strengths,
    aiInsight: aiInsights[category as keyof typeof aiInsights] || aiInsights.general,
    gamingFps,
    powerConsumption: Math.round(powerConsumption),
    monthlyElectricityCost,
  };
}

export function generateLaptopRecommendations(profile: UserProfile): LaptopRecommendation[] {
  const budget = profile.budget || 60000;
  const category = getUseCaseCategory(profile);

  const laptops: LaptopRecommendation[] = [];

  if (budget < 50000) {
    laptops.push({
      title: "Best Budget Pick for India",
      brand: "Lenovo",
      model: "IdeaPad Slim 3 (AMD Ryzen 5 7520U)",
      price: 38000,
      specs: { cpu: "AMD Ryzen 5 7520U", ram: "8GB DDR5 (upgradeable)", storage: "512GB NVMe SSD", display: "15.6\" FHD IPS, 60Hz", battery: "45Wh, up to 7hrs", weight: "1.62kg" },
      whyPerfect: "Excellent battery life for college use + upgradeable RAM slot",
      futureProofScore: 68,
      valueScore: 88,
      bestFor: ["Students", "Office work", "Light coding", "College assignments"],
      limitations: ["No dedicated GPU", "Limited gaming capability", "65Hz display"],
      aiInsight: "For engineering students in India, this laptop paired with cloud computing (AWS Free Tier) gives you a complete development environment at the lowest possible cost.",
    });

    laptops.push({
      title: "Value Champion",
      brand: "ASUS",
      model: "VivoBook 15 (Ryzen 5 5500U)",
      price: 42000,
      specs: { cpu: "AMD Ryzen 5 5500U", ram: "8GB DDR4 (expandable to 32GB)", storage: "512GB NVMe", display: "15.6\" FHD, 60Hz, anti-glare", battery: "50Wh", weight: "1.8kg" },
      whyPerfect: "ASUS service centers across India — reliable warranty support",
      futureProofScore: 65,
      valueScore: 85,
      bestFor: ["Students", "Programming", "Document work"],
      limitations: ["No GPU", "Average display"],
      aiInsight: "ASUS has one of the best service networks in India — crucial for college students who need quick repairs.",
    });
  } else if (budget < 80000) {
    laptops.push({
      title: "Best Mid-Range Indian Pick",
      brand: "ASUS",
      model: "ROG Zephyrus G14 (Ryzen 7 7745HX + RTX 4060)",
      price: 75000,
      specs: { cpu: "AMD Ryzen 7 7745HX", gpu: "NVIDIA RTX 4060 8GB", ram: "16GB DDR5", storage: "1TB NVMe PCIe 4.0", display: "14\" QHD 165Hz", battery: "73Wh, ~6hrs light use", weight: "1.65kg" },
      whyPerfect: "Best gaming + creator laptop under ₹80K — RTX 4060 handles everything",
      futureProofScore: 84,
      valueScore: 90,
      bestFor: ["Gaming", "Video editing", "3D modeling", "AI/ML students"],
      limitations: ["Shorter battery under gaming load", "Premium price"],
      aiInsight: "For Indian students doing AI/ML + gaming + content creation, this is the ultimate value proposition. The RTX 4060 supports CUDA for small-scale ML training.",
    });

    laptops.push({
      title: "Creator's Dream Under ₹70K",
      brand: "HP",
      model: "Victus 16 (i7-12700H + RTX 4060)",
      price: 68000,
      specs: { cpu: "Intel Core i7-12700H", gpu: "NVIDIA RTX 4060 8GB", ram: "16GB DDR5", storage: "512GB NVMe SSD", display: "16.1\" FHD 144Hz IPS", battery: "70Wh", weight: "2.3kg" },
      whyPerfect: "HP's excellent India service network + powerful specifications",
      futureProofScore: 80,
      valueScore: 87,
      bestFor: ["Gaming", "Content creation", "Engineering software"],
      limitations: ["Heavier build", "Single SSD slot"],
      aiInsight: "HP has 500+ service centers across India — ideal if you're in Tier 2/3 cities where warranty support matters most.",
    });
  } else if (budget < 130000) {
    laptops.push({
      title: "The Professional's Choice",
      brand: "ASUS",
      model: "ROG Zephyrus G15 (Ryzen 9 7945HX + RTX 4070)",
      price: 115000,
      specs: { cpu: "AMD Ryzen 9 7945HX", gpu: "NVIDIA RTX 4070 8GB", ram: "32GB DDR5", storage: "1TB NVMe PCIe 4.0", display: "15.6\" QHD 240Hz", battery: "90Wh", weight: "1.9kg" },
      whyPerfect: "Workstation-class performance in a portable form factor",
      futureProofScore: 89,
      valueScore: 88,
      bestFor: ["AI/ML research", "4K video editing", "Professional gaming", "Startup founders"],
      limitations: ["High price", "Gets hot under sustained load"],
      aiInsight: "For IIT/NIT students in AI/ML programs, this laptop replaces a desktop workstation. The RTX 4070 with 8GB VRAM handles model fine-tuning and inference efficiently.",
    });
  } else {
    laptops.push({
      title: "The Ultimate Indian Powerhouse",
      brand: "ASUS",
      model: "ROG Zephyrus Duo 16 (Ryzen 9 + RTX 4090)",
      price: 185000,
      specs: { cpu: "AMD Ryzen 9 7945HX", gpu: "NVIDIA RTX 4090 16GB", ram: "64GB DDR5", storage: "2TB NVMe PCIe 4.0", display: "16\" QHD 165Hz + secondary 4K display", battery: "90Wh", weight: "2.5kg" },
      whyPerfect: "Dual-screen productivity + RTX 4090 — no compromise, ever",
      futureProofScore: 95,
      valueScore: 85,
      bestFor: ["AI/ML researchers", "VFX artists", "Game developers", "Top-tier creators"],
      limitations: ["Very expensive", "Heavy", "Short battery life under load"],
      aiInsight: "If you're building India's next unicorn or working on cutting-edge AI research, this machine eliminates hardware as a bottleneck entirely.",
    });
  }

  return laptops;
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
      "Indian gaming is exploding! BGMI, Valorant, and FC24 are the most played games. An RTX 4060 handles all of them at ultra settings with DLSS enabled.",
      "For competitive gaming in India, focus on high refresh rate (144Hz+) over resolution. 1080p at 144Hz beats 4K at 60Hz for competitive titles.",
      "Invest in a good monitor — Indian gamers often overspend on GPU and use a 60Hz display. That's a bottleneck that kills competitive performance.",
    ],
    aiml: [
      "For AI/ML in India, VRAM is your most important resource. An RTX 4060 with 8GB VRAM can run LLaMA 2 7B locally — that's remarkable capability.",
      "Indian AI students: use Google Colab Pro for training + local GPU for inference. This hybrid approach saves money while maximizing productivity.",
      "The future belongs to AI engineers. Invest in a system with at least 32GB RAM and an RTX 4060+ for running local LLMs and ML pipelines.",
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
