import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin, Leaf, Mountain, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useFarmingStore } from '@/store/farming-store';
import { toast } from 'sonner';
import { TrendingUp } from 'lucide-react';


export function Onboarding() {
  const navigate = useNavigate();
  const { setInputs } = useFarmingStore();
  const [formData, setFormData] = useState({
    cropType: '',
    region: '',
    soilType: '',
    farmSize: '',
    previousYield: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.cropType || !formData.region || !formData.soilType || !formData.farmSize) {
      toast.error('Please fill in all required fields');
      return;
    }

    setInputs({
      cropType: formData.cropType,
      region: formData.region,
      soilType: formData.soilType,
      farmSize: parseFloat(formData.farmSize),
      previousYield: formData.previousYield ? parseFloat(formData.previousYield) : undefined,
    });

    toast.success('Farm details saved successfully!');
    navigate('/dashboard');
  };

  const cropTypes = [
    { value: 'wheat', label: 'Wheat', icon: '🌾' },
    { value: 'rice', label: 'Rice', icon: '🌾' },
    { value: 'tomato', label: 'Tomato', icon: '🍅' },
  ];

  const regions = [
    { value: 'north-india', label: 'North India', icon: '🏔️' },
    { value: 'south-india', label: 'South India', icon: '🌴' },
    { value: 'west-india', label: 'West India', icon: '🏖️' },
    { value: 'east-india', label: 'East India', icon: '🌊' },
  ];

  const soilTypes = [
    { value: 'clay', label: 'Clay Soil', description: 'Heavy, nutrient-rich soil' },
    { value: 'sandy', label: 'Sandy Soil', description: 'Light, well-draining soil' },
    { value: 'loamy', label: 'Loamy Soil', description: 'Balanced, fertile soil' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-950 dark:via-blue-950 dark:to-purple-950">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-foreground mb-2">Setup Your Farm</h1>
            <p className="text-muted-foreground">
              Tell us about your farm to get personalized recommendations
            </p>
          </div>

          <Card className="p-6 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="cropType" className="flex items-center gap-2">
                  <Leaf className="h-4 w-4" />
                  Crop Type *
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <span className="text-muted-foreground hover:text-foreground cursor-help">ℹ️</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Select the primary crop you're growing this season</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Select value={formData.cropType} onValueChange={(value) => setFormData({ ...formData, cropType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {cropTypes.map((crop) => (
                      <SelectItem key={crop.value} value={crop.value}>
                        <span className="flex items-center gap-2">
                          <span>{crop.icon}</span>
                          {crop.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="region" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Region *
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <span className="text-muted-foreground hover:text-foreground cursor-help">ℹ️</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Your farm's geographical location affects weather patterns and growing conditions</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Select value={formData.region} onValueChange={(value) => setFormData({ ...formData, region: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region.value} value={region.value}>
                        <span className="flex items-center gap-2">
                          <span>{region.icon}</span>
                          {region.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="soilType" className="flex items-center gap-2">
                  <Mountain className="h-4 w-4" />
                  Soil Type *
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <span className="text-muted-foreground hover:text-foreground cursor-help">ℹ️</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Different soil types require different irrigation and fertilization strategies</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Select value={formData.soilType} onValueChange={(value) => setFormData({ ...formData, soilType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    {soilTypes.map((soil) => (
                      <SelectItem key={soil.value} value={soil.value}>
                        <div>
                          <div className="font-medium">{soil.label}</div>
                          <div className="text-sm text-muted-foreground">{soil.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="farmSize" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Farm Size (acres) *
                  </Label>
                  <Input
                    id="farmSize"
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="e.g., 5.5"
                    value={formData.farmSize}
                    onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="previousYield" className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Previous Yield (tons)
                    <span className="text-sm text-muted-foreground">(Optional)</span>
                  </Label>
                  <Input
                    id="previousYield"
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="e.g., 12.5"
                    value={formData.previousYield}
                    onChange={(e) => setFormData({ ...formData, previousYield: e.target.value })}
                  />
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button type="submit" className="w-full text-lg py-3">
                  Get Personalized Recommendations
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </form>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Your data is secure and will be used only to provide farming recommendations
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}