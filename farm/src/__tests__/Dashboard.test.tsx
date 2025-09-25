import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { useFarmingStore } from '../store/farming-store';

// Mock the store
jest.mock('../store/farming-store');

const mockUseFarmingStore = useFarmingStore as jest.MockedFunction<typeof useFarmingStore>;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('Dashboard', () => {
  beforeEach(() => {
    mockUseFarmingStore.mockReturnValue({
      inputs: {
        cropType: 'wheat',
        region: 'north-india',
        soilType: 'loamy',
        farmSize: 5,
      },
      scenario: {
        rainfallChange: 0,
        soilNutrientLevel: 50,
        temperatureChange: 0,
      },
      setInputs: jest.fn(),
      setScenario: jest.fn(),
      resetInputs: jest.fn(),
    });
  });

  it('renders dashboard with farm data', async () => {
    render(<Dashboard />, { wrapper: createWrapper() });
    
    await waitFor(() => {
      expect(screen.getByText('Farm Dashboard')).toBeInTheDocument();
      expect(screen.getByText(/wheat/i)).toBeInTheDocument();
      expect(screen.getByText(/5 acres/i)).toBeInTheDocument();
    });
  });

  it('displays quick stats cards', async () => {
    render(<Dashboard />, { wrapper: createWrapper() });
    
    await waitFor(() => {
      expect(screen.getByText('Expected Yield')).toBeInTheDocument();
      expect(screen.getByText('Daily Savings')).toBeInTheDocument();
      expect(screen.getByText('Active Alerts')).toBeInTheDocument();
    });
  });
});