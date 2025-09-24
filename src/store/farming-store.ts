import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FarmInputs {
  cropType: string;
  region: string;
  soilType: string;
  farmSize: number;
  previousYield?: number;
}

export interface ScenarioInputs {
  rainfallChange: number;
  soilNutrientLevel: number;
  temperatureChange: number;
}

interface FarmingStore {
  inputs: FarmInputs;
  scenario: ScenarioInputs;
  setInputs: (inputs: Partial<FarmInputs>) => void;
  setScenario: (scenario: Partial<ScenarioInputs>) => void;
  resetInputs: () => void;
}

const defaultInputs: FarmInputs = {
  cropType: '',
  region: '',
  soilType: '',
  farmSize: 0,
};

const defaultScenario: ScenarioInputs = {
  rainfallChange: 0,
  soilNutrientLevel: 50,
  temperatureChange: 0,
};

export const useFarmingStore = create<FarmingStore>()(
  persist(
    (set) => ({
      inputs: defaultInputs,
      scenario: defaultScenario,
      setInputs: (newInputs) =>
        set((state) => ({
          inputs: { ...state.inputs, ...newInputs },
        })),
      setScenario: (newScenario) =>
        set((state) => ({
          scenario: { ...state.scenario, ...newScenario },
        })),
      resetInputs: () =>
        set({
          inputs: defaultInputs,
          scenario: defaultScenario,
        }),
    }),
    {
      name: 'farming-assistant-store',
    }
  )
);