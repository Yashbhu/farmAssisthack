import { act, renderHook } from '@testing-library/react';
import { useFarmingStore } from '../store/farming-store';

describe('FarmingStore', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useFarmingStore());
    
    expect(result.current.inputs).toEqual({
      cropType: '',
      region: '',
      soilType: '',
      farmSize: 0,
    });
    
    expect(result.current.scenario).toEqual({
      rainfallChange: 0,
      soilNutrientLevel: 50,
      temperatureChange: 0,
    });
  });

  it('should update inputs correctly', () => {
    const { result } = renderHook(() => useFarmingStore());
    
    act(() => {
      result.current.setInputs({
        cropType: 'wheat',
        region: 'north-india',
        farmSize: 5,
      });
    });
    
    expect(result.current.inputs.cropType).toBe('wheat');
    expect(result.current.inputs.region).toBe('north-india');
    expect(result.current.inputs.farmSize).toBe(5);
  });

  it('should update scenario correctly', () => {
    const { result } = renderHook(() => useFarmingStore());
    
    act(() => {
      result.current.setScenario({
        rainfallChange: 20,
        soilNutrientLevel: 75,
      });
    });
    
    expect(result.current.scenario.rainfallChange).toBe(20);
    expect(result.current.scenario.soilNutrientLevel).toBe(75);
  });

  it('should reset inputs', () => {
    const { result } = renderHook(() => useFarmingStore());
    
    act(() => {
      result.current.setInputs({ cropType: 'wheat', farmSize: 5 });
      result.current.setScenario({ rainfallChange: 20 });
    });
    
    act(() => {
      result.current.resetInputs();
    });
    
    expect(result.current.inputs.cropType).toBe('');
    expect(result.current.inputs.farmSize).toBe(0);
    expect(result.current.scenario.rainfallChange).toBe(0);
  });
});