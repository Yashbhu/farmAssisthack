import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFarmingStore } from '@/store/farming-store';

export function useUrlParams() {
  const [searchParams] = useSearchParams();
  const { setInputs, setScenario } = useFarmingStore();

  useEffect(() => {
    const crop = searchParams.get('crop');
    const region = searchParams.get('region');
    const soil = searchParams.get('soil');
    const size = searchParams.get('size');
    const rainfall = searchParams.get('rainfall');
    const nutrients = searchParams.get('nutrients');
    const temp = searchParams.get('temp');

    if (crop && region && soil && size) {
      setInputs({
        cropType: crop,
        region: region,
        soilType: soil,
        farmSize: parseFloat(size),
      });
    }

    if (rainfall || nutrients || temp) {
      setScenario({
        rainfallChange: rainfall ? parseFloat(rainfall) : 0,
        soilNutrientLevel: nutrients ? parseFloat(nutrients) : 50,
        temperatureChange: temp ? parseFloat(temp) : 0,
      });
    }
  }, [searchParams, setInputs, setScenario]);
}