import axios from 'axios';
import { FarmInputs, ScenarioInputs } from '../store/farming-store';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
});

export interface PredictionData {
  date: string;
  yield: number;
  waterUsage: number;
  recommended: boolean;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  expectedSavings: {
    water: number;
    fertilizer: number;
    labor: number;
  };
  confidence: number;
  explanation: string;
}

export interface DashboardData {
  predictedYield: PredictionData[];
  recommendations: Recommendation[];
  savingsEstimate: {
    water: { saved: number; cost: number };
    fertilizer: { saved: number; cost: number };
    labor: { saved: number; cost: number };
  };
  quickStats: {
    expectedYield: number;
    dailySavings: number;
    alerts: number;
  };
}

// Mock data generator
const generateMockData = (inputs: FarmInputs, scenario: ScenarioInputs): DashboardData => {
  const cropMultiplier = {
    wheat: 1,
    rice: 1.2,
    tomato: 0.8,
  }[inputs.cropType] || 1;

  const soilMultiplier = {
    clay: 1.1,
    sandy: 0.9,
    loamy: 1.2,
  }[inputs.soilType] || 1;

  const baseYield = 100 * cropMultiplier * soilMultiplier;
  const scenarioEffect = 1 + (scenario.rainfallChange / 100) + (scenario.soilNutrientLevel - 50) / 100;

  const predictedYield: PredictionData[] = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    yield: Math.round(baseYield * scenarioEffect * (1 + Math.sin(i / 7) * 0.1)),
    waterUsage: Math.round(50 + Math.random() * 30),
    recommended: Math.random() > 0.3,
  }));

  const recommendations: Recommendation[] = [
    {
      id: '1',
      title: 'Reduce Water Usage',
      description: `Reduce irrigation by ${20 + scenario.rainfallChange}% today based on soil moisture levels`,
      severity: 'medium',
      expectedSavings: { water: 150, fertilizer: 0, labor: 0 },
      confidence: Math.round(85 + scenario.soilNutrientLevel / 10),
      explanation: 'Current soil moisture is optimal. Excess watering may lead to nutrient leaching.',
    },
    {
      id: '2',
      title: 'Fertilizer Application',
      description: 'Delay nitrogen fertilizer application by 2-3 days',
      severity: 'low',
      expectedSavings: { water: 0, fertilizer: 25, labor: 10 },
      confidence: Math.round(75 + scenario.soilNutrientLevel / 5),
      explanation: 'Weather forecast shows rain in 48 hours, which will enhance nutrient absorption.',
    },
    {
      id: '3',
      title: 'Pest Monitoring',
      description: 'Increase pest surveillance in the next 48 hours',
      severity: 'high',
      expectedSavings: { water: 0, fertilizer: 0, labor: -5 },
      confidence: 90,
      explanation: 'Weather conditions are favorable for pest activity. Early detection prevents major losses.',
    },
  ];

  return {
    predictedYield,
    recommendations,
    savingsEstimate: {
      water: { saved: 150 + scenario.rainfallChange * 2, cost: 750 },
      fertilizer: { saved: 25, cost: 500 },
      labor: { saved: 5, cost: 250 },
    },
    quickStats: {
      expectedYield: Math.round(baseYield * scenarioEffect),
      dailySavings: 150 + scenario.rainfallChange * 2,
      alerts: recommendations.filter(r => r.severity === 'high').length,
    },
  };
};

export const farmingApi = {
  getDashboardData: async (inputs: FarmInputs, scenario: ScenarioInputs): Promise<DashboardData> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return generateMockData(inputs, scenario);
  },

  getHistoricalData: async (): Promise<any[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      recommendations: Math.floor(Math.random() * 5) + 1,
      savings: Math.floor(Math.random() * 500) + 100,
      cropType: ['wheat', 'rice', 'tomato'][Math.floor(Math.random() * 3)],
    }));
  },
};