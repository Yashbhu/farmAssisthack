import { motion } from 'framer-motion';
import { ArrowRight, Leaf, TrendingUp, Droplets, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';
import { useNavigate } from 'react-router-dom';

export function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      title: 'Smart Recommendations',
      description: 'AI-powered insights for optimal farming practices',
    },
    {
      icon: <Droplets className="h-8 w-8 text-blue-600" />,
      title: 'Water Conservation',
      description: 'Reduce water usage by up to 30% while maintaining yield',
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
      title: 'Yield Prediction',
      description: 'Accurate forecasting for better planning and profitability',
    },
    {
      icon: <Users className="h-8 w-8 text-orange-600" />,
      title: 'Expert Support',
      description: 'Access to agricultural experts and community knowledge',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-green-600" />
          <h1 className="text-2xl font-bold text-foreground">FarmAssist</h1>
        </div>
        <ThemeToggle />
      </header>

      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-foreground mb-6">
            Sustainable Farming
            <span className="text-green-600"> Assistant</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Optimize your farm's productivity while reducing environmental impact. 
            Get personalized recommendations, track resource usage, and increase yields sustainably.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-4"
            onClick={() => navigate('/onboarding')}
          >
            Open Dashboard <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-6 h-full text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Card className="p-8 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Farm?</h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of farmers who are already saving resources and increasing yields
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-600">30%</div>
                <div className="text-sm text-muted-foreground">Water Savings</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">25%</div>
                <div className="text-sm text-muted-foreground">Cost Reduction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">15%</div>
                <div className="text-sm text-muted-foreground">Yield Increase</div>
              </div>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}