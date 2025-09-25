import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { 
  TrendingUp, 
  Droplets, 
  DollarSign, 
  AlertCircle, 
  Settings, 
  Share2,
  FileText,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useFarmingStore } from '@/store/farming-store';
import { farmingApi, DashboardData } from '@/services/api';
import { YieldChart } from '@/components/charts/YieldChart';
import { WaterUsageChart } from '@/components/charts/WaterUsageChart';
import { SavingsChart } from '@/components/charts/SavingsChart';
import { ShareModal } from '@/components/ShareModal';
import { ThemeToggle } from '@/components/theme-toggle';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export function Dashboard() {
  const navigate = useNavigate();
  const { inputs, scenario, setScenario } = useFarmingStore();
  const [showShareModal, setShowShareModal] = useState(false);

  // Redirect to onboarding if no inputs
  useEffect(() => {
    if (!inputs.cropType) {
      navigate('/onboarding');
    }
  }, [inputs.cropType, navigate]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['dashboard', inputs, scenario],
    queryFn: () => farmingApi.getDashboardData(inputs, scenario),
    enabled: !!inputs.cropType,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <RefreshCw className="h-8 w-8 text-green-600" />
        </motion.div>
      </div>
    );
  }

  if (!data) return null;

  const handleScenarioChange = (key: keyof typeof scenario, value: number[]) => {
    setScenario({ [key]: value[0] });
  };

  const generateShareableUrl = () => {
    const params = new URLSearchParams({
      crop: inputs.cropType,
      region: inputs.region,
      soil: inputs.soilType,
      size: inputs.farmSize.toString(),
      rainfall: scenario.rainfallChange.toString(),
      nutrients: scenario.soilNutrientLevel.toString(),
      temp: scenario.temperatureChange.toString(),
    });
    return `${window.location.origin}/dashboard?${params.toString()}`;
  };

  const handleExportPDF = () => {
    toast.success('PDF export feature will be implemented');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Farm Dashboard</h1>
              <p className="text-muted-foreground">
                {inputs.cropType.charAt(0).toUpperCase() + inputs.cropType.slice(1)} • {inputs.region} • {inputs.farmSize} acres
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate('/history')}>
                <FileText className="h-4 w-4 mr-2" />
                History
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowShareModal(true)}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportPDF}>
                Export PDF
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Expected Yield</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.quickStats.expectedYield} tons</div>
                <p className="text-xs text-green-600">+12% from last season</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Daily Savings</CardTitle>
                <DollarSign className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{data.quickStats.dailySavings}</div>
                <p className="text-xs text-blue-600">Water + fertilizer savings</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                <AlertCircle className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.quickStats.alerts}</div>
                <p className="text-xs text-orange-600">Requires attention</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Controls & Inputs */}
          <div className="space-y-6">
            {/* Farm Inputs Summary */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Farm Setup
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Crop:</span>
                    <Badge variant="secondary">{inputs.cropType}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Region:</span>
                    <Badge variant="secondary">{inputs.region}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Soil:</span>
                    <Badge variant="secondary">{inputs.soilType}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Size:</span>
                    <span className="text-sm font-medium">{inputs.farmSize} acres</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Scenario Controls */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Scenario Simulation</CardTitle>
                  <CardDescription>
                    Adjust conditions to see how they affect recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Rainfall Change</Label>
                      <span className="text-sm text-muted-foreground">
                        {scenario.rainfallChange > 0 ? '+' : ''}{scenario.rainfallChange}%
                      </span>
                    </div>
                    <Slider
                      value={[scenario.rainfallChange]}
                      onValueChange={(value) => handleScenarioChange('rainfallChange', value)}
                      min={-50}
                      max={50}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Soil Nutrient Level</Label>
                      <span className="text-sm text-muted-foreground">{scenario.soilNutrientLevel}%</span>
                    </div>
                    <Slider
                      value={[scenario.soilNutrientLevel]}
                      onValueChange={(value) => handleScenarioChange('soilNutrientLevel', value)}
                      min={0}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Temperature Change</Label>
                      <span className="text-sm text-muted-foreground">
                        {scenario.temperatureChange > 0 ? '+' : ''}{scenario.temperatureChange}°C
                      </span>
                    </div>
                    <Slider
                      value={[scenario.temperatureChange]}
                      onValueChange={(value) => handleScenarioChange('temperatureChange', value)}
                      min={-5}
                      max={5}
                      step={0.5}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Savings Summary */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Savings</CardTitle>
                </CardHeader>
                <CardContent>
                  <SavingsChart data={data.savingsEstimate} />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Middle Column - Recommendations */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle>Today's Recommendations</CardTitle>
                  <CardDescription>
                    AI-powered suggestions based on current conditions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {data.recommendations.map((rec, index) => (
                    <motion.div
                      key={rec.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="border rounded-2xl p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-sm">{rec.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={rec.severity === 'high' ? 'destructive' : rec.severity === 'medium' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {rec.severity}
                          </Badge>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                                  {rec.confidence}%
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">{rec.explanation}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                      
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex gap-4">
                          {rec.expectedSavings.water > 0 && (
                            <span className="flex items-center gap-1 text-blue-600">
                              <Droplets className="h-3 w-3" />
                              ₹{rec.expectedSavings.water}
                            </span>
                          )}
                          {rec.expectedSavings.fertilizer > 0 && (
                            <span className="flex items-center gap-1 text-green-600">
                              🌱 ₹{rec.expectedSavings.fertilizer}
                            </span>
                          )}
                          {rec.expectedSavings.labor !== 0 && (
                            <span className="flex items-center gap-1 text-orange-600">
                              👨‍🌾 ₹{Math.abs(rec.expectedSavings.labor)}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Charts */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Yield Prediction</CardTitle>
                  <CardDescription>Next 30 days forecast</CardDescription>
                </CardHeader>
                <CardContent>
                  <YieldChart data={data.predictedYield} />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Water Usage</CardTitle>
                  <CardDescription>Weekly usage vs recommended</CardDescription>
                </CardHeader>
                <CardContent>
                  <WaterUsageChart data={data.predictedYield.slice(0, 7)} />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <ShareModal 
        isOpen={showShareModal} 
        onClose={() => setShowShareModal(false)}
        shareUrl={generateShareableUrl()}
      />
    </div>
  );
}