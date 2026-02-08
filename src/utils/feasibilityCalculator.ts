import { WizardData } from "@/components/WizardSteps";

export interface FeasibilityResult {
  score: number;
  grade: string;
  factors: {
    rainfall: { score: number; status: string; description: string };
    roofArea: { score: number; status: string; description: string };
    soilConditions: { score: number; status: string; description: string };
    waterDemand: { score: number; status: string; description: string };
  };
  recommendations: {
    structureType: string;
    dimensions: {
      length: number;
      width: number;
      depth: number;
      volume: number;
    };
    estimatedCost: number;
    annualHarvest: number;
    paybackPeriod: number;
  };
  costBreakdown: {
    excavation: number;
    piping: number;
    filterUnit: number;
    labor: number;
  };
  projectedSavings: {
    year1: number;
    year5: number;
    year10: number;
  };
}

// Mock rainfall data for different states (mm/year)
const RAINFALL_DATA: Record<string, number> = {
  "tamil-nadu": 1200,
  "karnataka": 1150,
  "kerala": 2800,
  "andhra-pradesh": 940,
  "telangana": 890,
  "maharashtra": 1100,
  "gujarat": 850,
  "rajasthan": 650,
};

// Water rates by state (₹ per 1000L)
const WATER_RATES: Record<string, number> = {
  "tamil-nadu": 15,
  "karnataka": 18,
  "kerala": 12,
  "andhra-pradesh": 14,
  "telangana": 16,
  "maharashtra": 22,
  "gujarat": 20,
  "rajasthan": 25,
};

export const calculateFeasibility = (data: WizardData): FeasibilityResult => {
  const rainfall = RAINFALL_DATA[data.location.state] || 1000;
  const waterRate = WATER_RATES[data.location.state] || 18;
  
  // Calculate individual factor scores (0-100)
  const rainfallScore = Math.min(100, (rainfall / 1500) * 100);
  const roofAreaScore = Math.min(100, (data.property.roofArea / 200) * 100);
  
  // Soil conditions based on property type and location
  const soilScore = data.property.propertyType === 'residential' ? 75 : 
                   data.property.propertyType === 'commercial' ? 65 : 70;
  
  // Water demand feasibility (lower demand = higher score)
  const demandScore = Math.max(20, 100 - (data.requirements.waterDemand / 1000) * 10);
  
  // Overall feasibility score (weighted average)
  const overallScore = Math.round(
    (rainfallScore * 0.3) + 
    (roofAreaScore * 0.25) + 
    (soilScore * 0.25) + 
    (demandScore * 0.2)
  );
  
  // Determine grade
  const grade = overallScore >= 80 ? 'Excellent' :
                overallScore >= 65 ? 'Good' :
                overallScore >= 50 ? 'Fair' : 'Poor';
  
  // Calculate annual harvest potential (liters)
  const annualHarvest = Math.round(
    data.property.roofArea * rainfall * 0.85 * 0.9 // runoff coefficient * collection efficiency
  );
  
  // Determine optimal structure type and dimensions
  const structureType = data.property.openSpace > 20 ? 'Recharge Pit' : 
                       data.property.openSpace > 5 ? 'Recharge Trench' : 'Injection Well';
  
  const volume = Math.min(20, Math.max(5, data.property.openSpace * 0.4));
  const dimensions = {
    length: Math.round(Math.sqrt(volume) * 1.5),
    width: Math.round(Math.sqrt(volume) * 1.2),
    depth: Math.round(volume / (Math.sqrt(volume) * 1.8)),
    volume: Math.round(volume)
  };
  
  // Cost calculations
  const baseCost = volume * 2500; // ₹2500 per cubic meter
  const costBreakdown = {
    excavation: Math.round(baseCost * 0.35),
    piping: Math.round(baseCost * 0.20),
    filterUnit: Math.round(baseCost * 0.30),
    labor: Math.round(baseCost * 0.15)
  };
  
  const estimatedCost = Object.values(costBreakdown).reduce((sum, cost) => sum + cost, 0);
  
  // Savings calculations
  const annualWaterSavingsValue = Math.round((annualHarvest / 1000) * waterRate);
  const maintenanceCost = estimatedCost * 0.03; // 3% annual maintenance
  
  const projectedSavings = {
    year1: Math.round(annualWaterSavingsValue - maintenanceCost),
    year5: Math.round((annualWaterSavingsValue * 1.2) - maintenanceCost), // 20% increase in water rates
    year10: Math.round((annualWaterSavingsValue * 1.8) - maintenanceCost) // 80% increase over 10 years
  };
  
  const paybackPeriod = Number((estimatedCost / projectedSavings.year1).toFixed(1));
  
  return {
    score: overallScore,
    grade,
    factors: {
      rainfall: {
        score: Math.round(rainfallScore),
        status: rainfallScore >= 75 ? 'Excellent' : rainfallScore >= 50 ? 'Good' : 'Fair',
        description: `${rainfall}mm annual average`
      },
      roofArea: {
        score: Math.round(roofAreaScore),
        status: roofAreaScore >= 75 ? 'Excellent' : roofAreaScore >= 50 ? 'Good' : 'Fair',
        description: `${data.property.roofArea} sq.m catchment`
      },
      soilConditions: {
        score: soilScore,
        status: soilScore >= 75 ? 'Suitable' : 'Moderate',
        description: `${data.property.propertyType} property type`
      },
      waterDemand: {
        score: Math.round(demandScore),
        status: demandScore >= 75 ? 'Low' : demandScore >= 50 ? 'Moderate' : 'High',
        description: `${data.requirements.waterDemand}L daily requirement`
      }
    },
    recommendations: {
      structureType,
      dimensions,
      estimatedCost,
      annualHarvest,
      paybackPeriod
    },
    costBreakdown,
    projectedSavings
  };
};

export const generateDemoData = (): WizardData => ({
  location: {
    city: "Chennai",
    state: "tamil-nadu",
    pincode: "600001"
  },
  property: {
    roofArea: 180,
    propertyType: "residential",
    openSpace: 50,
    floors: 2
  },
  requirements: {
    waterDemand: 500,
    currentSource: "municipal",
    budget: 45000
  }
});

export const getDataSources = (state: string) => ({
  rainfall: {
    source: "IMD (Indian Meteorological Department)",
    lastUpdated: "2024-01-15",
    value: RAINFALL_DATA[state] || 1000
  },
  groundwater: {
    source: "CGWB (Central Ground Water Board)",
    lastUpdated: "2024-01-10",
    status: "Safe to moderate exploitation"
  },
  waterRates: {
    source: "Local Water Authority",
    lastUpdated: "2024-01-01",
    rate: WATER_RATES[state] || 18
  }
});