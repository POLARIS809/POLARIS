// Polar Logistics & Asset Management Mock Data (MoES / NCPOR Specs)

export const initialExpeditions = [
  {
    id: "EXP-2027-01",
    name: "Antarctic Southern Ridge Geological Survey",
    code: "POLAR-EXP-2027-01",
    destination: "Antarctica (Bharathi Station)",
    baseCamp: "Bharathi Station (69°24'S 76°11'E)",
    startDate: "2027-01-15",
    endDate: "2027-03-01",
    durationDays: 45,
    scientistsCount: 38,
    crewCount: 22,
    totalPersonnel: 60,
    cargoWeightTons: 12.4,
    status: "Planned", // Planned, Active, Completed, Critical
    riskScore: 72,
    riskLevel: "HIGH",
    missionObjective: "Deep core ice drill sampling and geomagnetic survey across Queen Maud Land glacier routes.",
    route: "Route B (Glacier Rim Route)",
    assignedShip: "MV Polar Star (Icebreaker Class A1)",
    assignedVehicles: ["PistenBully 300 #01", "PistenBully 300 #02", "Snowmobile Alpha-1"],
    leader: "Dr. Rajesh Sharma (Lead Glaciologist)"
  },
  {
    id: "EXP-2026-04",
    name: "Maitri Atmospheric Ozone Study",
    code: "POLAR-EXP-2026-04",
    destination: "Antarctica (Maitri Station)",
    baseCamp: "Maitri Station (70°45'S 11°44'E)",
    startDate: "2026-11-01",
    endDate: "2027-01-10",
    durationDays: 70,
    scientistsCount: 25,
    crewCount: 15,
    totalPersonnel: 40,
    cargoWeightTons: 8.5,
    status: "Active",
    riskScore: 42,
    riskLevel: "MODERATE",
    missionObjective: "Upper atmosphere weather balloon releases and UV spectrometer data collection.",
    route: "Route A (Direct Schirmacher Oasis Path)",
    assignedShip: "SA Agulhas II",
    assignedVehicles: ["Snowmobile Bravo-2", "Arctic Truck 4x4"],
    leader: "Dr. Ananya Roy (Atmospheric Physicist)"
  },
  {
    id: "EXP-2026-03",
    name: "Svalbard Himadri Arctic Marine Ecology",
    code: "POLAR-EXP-2026-03",
    destination: "Arctic (Himadri Station)",
    baseCamp: "Himadri Station (78°55'N 11°56'E)",
    startDate: "2026-06-10",
    endDate: "2026-08-20",
    durationDays: 71,
    scientistsCount: 18,
    crewCount: 10,
    totalPersonnel: 28,
    cargoWeightTons: 5.2,
    status: "Completed",
    riskScore: 18,
    riskLevel: "LOW",
    missionObjective: "Fjord benthic fauna sampling and microplastic concentration mapping in Kongsfjorden.",
    route: "Coastal Marine Route",
    assignedShip: "RV Kronprins Haakon",
    assignedVehicles: ["Zodiac Inflatable Boat", "Argo ATV"],
    leader: "Dr. K. Senthil (Marine Biologist)"
  }
];

export const initialCargo = [
  {
    id: "CRG-10452",
    code: "CRG-10452",
    name: "Deep Core Cryo-Drill Rig & Diamond Bits",
    category: "Scientific Equipment",
    weightKg: 125,
    origin: "NCPOR HQ, Goa, India",
    destination: "Bharathi Station, Antarctica",
    assignedExpedition: "POLAR-EXP-2027-01",
    priority: "CRITICAL", // CRITICAL, HIGH, MEDIUM, LOW
    status: "In Transit", // Registered, Packed, Loaded, In Transit, Arrived, Delivered
    delayProbability: 84, // %
    delayRisk: "HIGH",
    estimatedDelivery: "2027-01-18",
    trackingId: "NCPOR-TRK-98421",
    qrCodeData: "POLARIS:CRG-10452|WEIGHT:125KG|ORIGIN:GOA|DEST:BHARATHI|PRIORITY:CRITICAL",
    notes: "Requires temperature-controlled container. High risk of vessel delay due to ice pack at 65°S.",
    recommendedAction: "Reroute cargo via Cape Town airfreight to Novolazarevskaya airstrip."
  },
  {
    id: "CRG-10453",
    code: "CRG-10453",
    name: "Emergency Polar Medical Supply Kit #4",
    category: "Medical",
    weightKg: 45,
    origin: "Base Depot, Cape Town",
    destination: "Bharathi Station",
    assignedExpedition: "POLAR-EXP-2027-01",
    priority: "CRITICAL",
    status: "Loaded",
    delayProbability: 15,
    delayRisk: "LOW",
    estimatedDelivery: "2027-01-14",
    trackingId: "NCPOR-TRK-98422",
    qrCodeData: "POLARIS:CRG-10453|WEIGHT:45KG|ORIGIN:CPT|DEST:BHARATHI|PRIORITY:CRITICAL",
    notes: "Includes blood plasma, trauma surgery kits, hyperbaric emergency meds.",
    recommendedAction: "Standard shipping schedule on schedule."
  },
  {
    id: "CRG-10454",
    code: "CRG-10454",
    name: "Arctic Grade Synthetic Fuel Containers (Diesel)",
    category: "Fuel",
    weightKg: 1500,
    origin: "Cape Town Port Hub",
    destination: "Bharathi Station Fuel Depot",
    assignedExpedition: "POLAR-EXP-2027-01",
    priority: "HIGH",
    status: "Packed",
    delayProbability: 45,
    delayRisk: "MEDIUM",
    estimatedDelivery: "2027-01-20",
    trackingId: "NCPOR-TRK-98423",
    qrCodeData: "POLARIS:CRG-10454|WEIGHT:1500KG|ORIGIN:CPT|DEST:BHARATHI|PRIORITY:HIGH",
    notes: "Shortage predicted by AI! Additional 1,350L required before mission departure.",
    recommendedAction: "Approve priority load onto Icebreaker MV Polar Star."
  },
  {
    id: "CRG-10455",
    code: "CRG-10455",
    name: "High-Altitude Satellite Comms Dish Unit",
    category: "Communication Equipment",
    weightKg: 85,
    origin: "NCPOR HQ, Goa, India",
    destination: "Maitri Station",
    assignedExpedition: "POLAR-EXP-2026-04",
    priority: "MEDIUM",
    status: "Delivered",
    delayProbability: 5,
    delayRisk: "LOW",
    estimatedDelivery: "2026-11-05",
    trackingId: "NCPOR-TRK-98410",
    qrCodeData: "POLARIS:CRG-10455|WEIGHT:85KG|ORIGIN:GOA|DEST:MAITRI|PRIORITY:MEDIUM",
    notes: "Operational at Maitri station.",
    recommendedAction: "None required."
  },
  {
    id: "CRG-10456",
    code: "CRG-10456",
    name: "Freeze-Dried Rations & Emergency Food Packs (60 Days)",
    category: "Food Rations",
    weightKg: 800,
    origin: "Goa Naval Dockyard",
    destination: "Bharathi Station",
    assignedExpedition: "POLAR-EXP-2027-01",
    priority: "HIGH",
    status: "In Transit",
    delayProbability: 28,
    delayRisk: "LOW",
    estimatedDelivery: "2027-01-16",
    trackingId: "NCPOR-TRK-98425",
    qrCodeData: "POLARIS:CRG-10456|WEIGHT:800KG|ORIGIN:GOA|DEST:BHARATHI|PRIORITY:HIGH",
    notes: "Packed in sealed moisture-proof insulated containers.",
    recommendedAction: "Normal processing."
  }
];

export const initialInventory = [
  {
    id: "INV-001",
    code: "INV-DIESEL-01",
    name: "Polar Grade Diesel Fuel",
    category: "Consumable - Fuel",
    currentStock: 1800, // Liters
    unit: "Liters",
    dailyConsumption: 95, // L/day
    remainingDays: 18.9,
    expeditionDaysNeeded: 27.0,
    reorderPoint: 2500,
    predictedRequirement: 3150,
    shortageRisk: "HIGH", // HIGH, MEDIUM, LOW
    shortageProbability: 78, // %
    recommendedReorderQty: 1350,
    statusAlert: "CRITICAL SHORTAGE PREDICTED",
    expiryDate: "N/A",
    location: "Bharathi Fuel Depot A"
  },
  {
    id: "INV-002",
    code: "INV-FOOD-02",
    name: "Polar Ration Pack (High Calorie)",
    category: "Consumable - Food",
    currentStock: 4500, // Meals
    unit: "Packs",
    dailyConsumption: 120,
    remainingDays: 37.5,
    expeditionDaysNeeded: 27.0,
    reorderPoint: 2000,
    predictedRequirement: 3240,
    shortageRisk: "LOW",
    shortageProbability: 12,
    recommendedReorderQty: 0,
    statusAlert: "STABLE",
    expiryDate: "2028-06-30",
    location: "Main Food Vault B"
  },
  {
    id: "INV-003",
    code: "INV-MED-03",
    name: "Emergency Frostbite & Trauma Supplies",
    category: "Consumable - Medicine",
    currentStock: 85, // Units
    unit: "Kits",
    dailyConsumption: 1.5,
    remainingDays: 56.6,
    expeditionDaysNeeded: 45.0,
    reorderPoint: 30,
    predictedRequirement: 68,
    shortageRisk: "LOW",
    shortageProbability: 8,
    recommendedReorderQty: 0,
    statusAlert: "STABLE",
    expiryDate: "2027-12-31",
    location: "Medical Bay - Bharathi"
  },
  {
    id: "INV-004",
    code: "INV-BATT-04",
    name: "Lithium-Iron Heavy Duty Batteries (-50°C Rated)",
    category: "Consumable - Energy",
    currentStock: 140, // Units
    unit: "Units",
    dailyConsumption: 4.2,
    remainingDays: 33.3,
    expeditionDaysNeeded: 45.0,
    reorderPoint: 100,
    predictedRequirement: 189,
    shortageRisk: "MEDIUM",
    shortageProbability: 58,
    recommendedReorderQty: 50,
    statusAlert: "REORDER RECOMMENDED",
    expiryDate: "2029-01-01",
    location: "Equipment Store C"
  },
  {
    id: "INV-005",
    code: "INV-OXY-05",
    name: "High Altitude Medical Oxygen Cylinders",
    category: "Consumable - Medical",
    currentStock: 24, // Tanks
    unit: "Cylinders",
    dailyConsumption: 0.8,
    remainingDays: 30.0,
    expeditionDaysNeeded: 45.0,
    reorderPoint: 20,
    predictedRequirement: 36,
    shortageRisk: "MEDIUM",
    shortageProbability: 64,
    recommendedReorderQty: 12,
    statusAlert: "MONITOR STOCK",
    expiryDate: "2030-05-15",
    location: "Emergency Bay"
  }
];

export const initialPersonnel = [
  {
    id: "EMP-101",
    employeeCode: "NCPOR-PER-101",
    name: "Dr. Rajesh Sharma",
    role: "Expedition Leader / Principal Glaciologist",
    department: "Earth Sciences",
    team: "Command Team Alpha",
    qualification: "Ph.D. Glaciology (IIT Roorkee), 14 Antarctic Seasons",
    contact: "+91-98765-43210 / Sat-Phone #8816-32",
    emergencyContact: "Sunita Sharma (Spouse) - +91-98765-11223",
    currentLocation: "Bharathi Station (Main Hub)",
    assignedMission: "POLAR-EXP-2027-01",
    status: "On Mission", // Available, Assigned, On Mission, On Leave, Emergency, Evacuated
    coordinates: { lat: -69.408, lng: 76.185 },
    teamLead: true
  },
  {
    id: "EMP-102",
    employeeCode: "NCPOR-PER-102",
    name: "Dr. Priya V. Nair",
    role: "Senior Medical Officer & Trauma Specialist",
    department: "Medical Corps",
    team: "Rescue & Medical Response Team B",
    qualification: "M.D. High Altitude Emergency Medicine",
    contact: "+91-98765-98765 / Sat-Phone #8816-33",
    emergencyContact: "Vijay Nair (Father) - +91-98440-55443",
    currentLocation: "Ridge Field Camp Beta (14 km from Bharathi)",
    assignedMission: "POLAR-EXP-2027-01",
    status: "Emergency",
    coordinates: { lat: -69.520, lng: 76.310 },
    teamLead: true
  },
  {
    id: "EMP-103",
    employeeCode: "NCPOR-PER-103",
    name: "Vikramjit Singh",
    role: "Lead Heavy Vehicle Mechanic & Engineer",
    department: "Logistics & Engineering",
    team: "Mechanized Support Team A",
    qualification: "B.Tech Mech, PistenBully Master Certified",
    contact: "+91-98111-22334 / Radio Ch-4",
    emergencyContact: "Gurpreet Kaur - +91-98111-99887",
    currentLocation: "Bharathi Station Garage",
    assignedMission: "POLAR-EXP-2027-01",
    status: "Available",
    coordinates: { lat: -69.409, lng: 76.187 },
    teamLead: false
  },
  {
    id: "EMP-104",
    employeeCode: "NCPOR-PER-104",
    name: "Arun Kumar",
    role: "Radio & Satellite Comms Specialist",
    department: "IT & Telecommunications",
    team: "Comms Relay Group",
    qualification: "M.Tech Electronics, ISRO Telecom Trained",
    contact: "Sat-Phone #8816-35",
    emergencyContact: "Ramesh Kumar - +91-97777-12345",
    currentLocation: "Bharathi Station Comms Tower",
    assignedMission: "POLAR-EXP-2027-01",
    status: "Assigned",
    coordinates: { lat: -69.407, lng: 76.183 },
    teamLead: false
  },
  {
    id: "EMP-105",
    employeeCode: "NCPOR-PER-105",
    name: "Dr. Suresh Chandran",
    role: "Meteorologist & Weather Forecasting Lead",
    department: "Atmospheric Science",
    team: "Weather Cell",
    qualification: "Ph.D Meteorology (IMD Fellow)",
    contact: "Sat-Phone #8816-36",
    emergencyContact: "Meena Chandran - +91-94444-67890",
    currentLocation: "Maitri Station Base",
    assignedMission: "POLAR-EXP-2026-04",
    status: "On Mission",
    coordinates: { lat: -70.766, lng: 11.733 },
    teamLead: false
  }
];

export const initialAssets = [
  {
    id: "AST-501",
    assetCode: "NCPOR-AST-PB01",
    name: "PistenBully 300 Polar Track Vehicle #01",
    category: "Heavy Tracked Vehicle",
    condition: "OPERATIONAL", // OPERATIONAL, NEEDS MAINTENANCE, CRITICAL, RETIRED
    location: "Bharathi Station Main Hangar",
    assignedTo: "Vikramjit Singh",
    maintenanceDate: "2026-12-15",
    nextMaintenanceDue: "2027-01-30",
    status: "Active Allocation",
    lifecycleStage: "Usage", // Procurement -> Allocation -> Usage -> Maintenance -> Retirement
    hoursOperated: 1420,
    fuelCapacityL: 450,
    specs: "Engine: Cummins 7.2L Turbo Diesel (-50°C cold-start kit)"
  },
  {
    id: "AST-502",
    assetCode: "NCPOR-AST-SN01",
    name: "Ski-Doo Expedition Snowmobile Alpha-1",
    category: "Light Snow Vehicle",
    condition: "OPERATIONAL",
    location: "Ridge Field Camp Beta",
    assignedTo: "Dr. Priya V. Nair",
    maintenanceDate: "2026-11-20",
    nextMaintenanceDue: "2027-02-10",
    status: "On Mission Field Deployment",
    lifecycleStage: "Usage",
    hoursOperated: 340,
    fuelCapacityL: 42,
    specs: "Rotax 900 ACE Engine, High Flotation 20-inch Track"
  },
  {
    id: "AST-503",
    assetCode: "NCPOR-AST-GEN02",
    name: "Caterpillar 150 kVA Polar Generator Unit #2",
    category: "Power Generator",
    condition: "NEEDS MAINTENANCE",
    location: "Bharathi Power Hub",
    assignedTo: "Engineering Support",
    maintenanceDate: "2026-10-01",
    nextMaintenanceDue: "2027-01-05 (OVERDUE)",
    status: "Standby Power",
    lifecycleStage: "Maintenance",
    hoursOperated: 4890,
    fuelCapacityL: 1200,
    specs: "Dual redundancy heavy oil generator with exhaust heat recovery"
  },
  {
    id: "AST-504",
    assetCode: "NCPOR-AST-DRL01",
    name: "Sub-Ice Cryo Drilling Rig (300m Depth Capability)",
    category: "Scientific Instrument",
    condition: "OPERATIONAL",
    location: "Cargo Depot Goa (In Transit)",
    assignedTo: "Dr. Rajesh Sharma",
    maintenanceDate: "2026-12-01",
    nextMaintenanceDue: "2027-03-15",
    status: "In Transit on MV Polar Star",
    lifecycleStage: "Allocation",
    hoursOperated: 180,
    fuelCapacityL: 0,
    specs: "Diamond tip rotary core drill with electro-thermal head"
  }
];

export const initialIncidents = [
  {
    id: "INC-2027-09",
    incidentCode: "INC-EMG-001",
    type: "Medical emergency",
    severity: "CRITICAL", // CRITICAL, HIGH, MEDIUM, LOW
    location: "Ridge Field Camp Beta (Lat -69.520, Lng 76.310 - 14 km SW of Bharathi Station)",
    reportedBy: "Dr. Priya V. Nair (Field Team B)",
    assignedTeam: "Unassigned (Auto-Assigning...)",
    status: "ACTIVE", // ACTIVE, ASSIGNED, IN PROGRESS, RESOLVED
    createdAt: "2027-01-12 14:22 UTC",
    resolvedAt: null,
    description: "Researcher experienced severe acute high-altitude pulmonary edema (HAPE) combined with localized frostbite grade 2 following sudden blizzard condition.",
    aiRecommendation: {
      nearestResponseTeam: "Mechanized Support Team A (PistenBully #01 - Distance 14 km)",
      nearestVehicle: "PistenBully 300 #01 (Operational, heated emergency cab)",
      availableMedicalSupplies: "Hyperbaric Chamber Kit #4 (Available at Bharathi Base)",
      estimatedETA: "38 Minutes",
      priorityRank: 1
    }
  },
  {
    id: "INC-2027-08",
    incidentCode: "INC-EMG-002",
    type: "Vehicle failure",
    severity: "MEDIUM",
    location: "Schirmacher Route Marker 12",
    reportedBy: "Team Leader Bravo",
    assignedTeam: "Mechanized Support Team A",
    status: "IN PROGRESS",
    createdAt: "2027-01-12 11:05 UTC",
    resolvedAt: null,
    description: "Snowmobile Bravo-2 hydraulic track tensioner failure due to frozen line fluid.",
    aiRecommendation: {
      nearestResponseTeam: "Mechanized Support Team A",
      nearestVehicle: "Arctic Truck 4x4",
      availableMedicalSupplies: "N/A",
      estimatedETA: "15 Minutes",
      priorityRank: 4
    }
  }
];

export const initialRoutes = [
  {
    id: "ROUTE-A",
    name: "Route A - Direct Ice Sheet Path",
    distanceKm: 120,
    riskScore: 78,
    riskLevel: "HIGH",
    terrainType: "Crevasse-prone glacier pass (-45°C wind chill)",
    fuelRequiredL: 520,
    estimatedTransitHours: 8.5,
    crevasseWarning: true,
    recommendation: "NOT RECOMMENDED - High operational risk due to hidden crevasses at KM 45."
  },
  {
    id: "ROUTE-B",
    name: "Route B - Glacier Rim Coastal Pass",
    distanceKm: 135,
    riskScore: 42,
    riskLevel: "MODERATE",
    terrainType: "Compacted snow ridge with ice shelf guidance radar",
    fuelRequiredL: 580,
    estimatedTransitHours: 9.8,
    crevasseWarning: false,
    recommendation: "RECOMMENDED BY AI - 15 km longer but 46% safer with stable ground surface."
  }
];

// SIH Presentation 12-Step Flow Guide
export const sihDemoSteps = [
  {
    step: 1,
    title: "Login as Expedition Manager",
    description: "Access POLARIS platform with Expedition Manager credentials. Observe operational role permissions.",
    targetModule: "dashboard",
    actionText: "Log in as Manager"
  },
  {
    step: 2,
    title: "Create Expedition",
    description: "Initialize POLAR-EXP-2027-01 to Antarctica (Bharathi Station) with 38 Scientists, 22 Crew, and 12.4T Cargo.",
    targetModule: "expedition",
    actionText: "Open Expedition Creator"
  },
  {
    step: 3,
    title: "Add Personnel & Assign Teams",
    description: "Register personnel (Glaciologists, Doctors, Heavy Mechanics) and assign to Command Team Alpha & Team B.",
    targetModule: "personnel",
    actionText: "View Personnel Roster"
  },
  {
    step: 4,
    title: "Add Cargo Item",
    description: "Register high-priority scientific equipment (Deep Core Cryo-Drill CRG-10452) originating from Goa NCPOR.",
    targetModule: "cargo",
    actionText: "View Cargo Register"
  },
  {
    step: 5,
    title: "Scan Cargo QR Code",
    description: "Simulate physical-to-digital physical QR scanning to pull instant cargo telemetry and origin-destination tracking.",
    targetModule: "cargo",
    actionText: "Open QR Scanner Simulation"
  },
  {
    step: 6,
    title: "Show Inventory Status",
    description: "Inspect consumable categories (Polar Diesel, Rations, Medicines, Lithium Batteries) at Bharathi Station.",
    targetModule: "inventory",
    actionText: "Inspect Inventory Hub"
  },
  {
    step: 7,
    title: "AI Predicts Fuel Shortage",
    description: "Run ML Inventory Prediction model: Current Stock 1,800L @ 95L/day usage = 18.9 days left vs 27 mission days. 78% Shortage Risk! Recommends +1,350L fuel.",
    targetModule: "inventory",
    actionText: "Run AI Shortage Prediction"
  },
  {
    step: 8,
    title: "Cargo AI Predicts Delay & Route",
    description: "Run Cargo ML Model: Deep Core Drill has 84% delay probability via Route A. AI recommends switching to Cape Town airfreight + Route B.",
    targetModule: "ai-analytics",
    actionText: "Run Cargo Delay ML"
  },
  {
    step: 9,
    title: "Dashboard Overall Risk Score",
    description: "Review Expedition Health Matrix on main dashboard. System aggregates Weather (85), Cargo (81), Inventory (78) into 72/100 HIGH Risk.",
    targetModule: "dashboard",
    actionText: "Inspect Unified Risk Score"
  },
  {
    step: 10,
    title: "Trigger Emergency Incident",
    description: "Simulate emergency: Dr. Priya V. Nair reports HAPE / Frostbite at Ridge Field Camp Beta.",
    targetModule: "emergency",
    actionText: "Trigger Medical Emergency"
  },
  {
    step: 11,
    title: "Auto-Assign Response Team",
    description: "AI Command Engine evaluates nearest PistenBully #01 (14 km away) & medical kits -> Auto-dispatches rescue team in 38 mins.",
    targetModule: "emergency",
    actionText: "Execute Rescue Dispatch"
  },
  {
    step: 12,
    title: "Show Analytics & Final Report",
    description: "Generate complete SIH presentation analytics report demonstrating end-to-end operational readiness and cost/risk savings.",
    targetModule: "ai-analytics",
    actionText: "View Expedition Report"
  }
];

export const aiTrainingDatasets = {
  inventoryDataset: [
    { date: "2026-11-01", item: "Polar Diesel", teamSize: 40, dailyUsage: 88, stock: 4500, weatherScore: 6.2, expeditionDays: 70, shortage: 0 },
    { date: "2026-12-01", item: "Polar Diesel", teamSize: 55, dailyUsage: 94, stock: 2400, weatherScore: 8.5, expeditionDays: 45, shortage: 1 },
    { date: "2027-01-01", item: "Polar Diesel", teamSize: 60, dailyUsage: 95, stock: 1800, weatherScore: 9.1, expeditionDays: 27, shortage: 1 }
  ],
  cargoDataset: [
    { distanceKm: 12000, weather: "Severe Storm", transport: "Ship (MV Polar Star)", priority: "CRITICAL", historicalDelayDays: 6, transitDays: 22, season: "Winter Pack", delayed: 1 },
    { distanceKm: 8500, weather: "Clear", transport: "Airfreight C-17", priority: "HIGH", historicalDelayDays: 0, transitDays: 4, season: "Summer Window", delayed: 0 }
  ]
};
