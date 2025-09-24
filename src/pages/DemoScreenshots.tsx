import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function DemoScreenshots() {
  const navigate = useNavigate();

  const screenshots = [
    {
      title: 'Onboarding Form',
      description: 'User-friendly setup process with helpful tooltips',
      image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'Crop selection with visual icons',
        'Region mapping',
        'Soil type identification',
        'Farm size input with validation',
        'Contextual help tooltips'
      ]
    },
    {
      title: 'Dashboard with Recommendations',
      description: 'Comprehensive farming insights at a glance',
      image: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'Real-time yield predictions',
        'AI-powered recommendations',
        'Interactive scenario controls',
        'Water usage optimization',
        'Confidence scoring system'
      ]
    },
    {
      title: 'Export & Share Modal',
      description: 'Easy sharing and export capabilities',
      image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: [
        'PDF export functionality',
        'Shareable scenario links',
        'WhatsApp integration',
        'Email sharing options',
        'Historical data export'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Demo Screenshots</h1>
            <p className="text-muted-foreground">Key features of the Sustainable Farming Assistant</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {screenshots.map((screenshot, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 relative">
                  <img 
                    src={screenshot.image} 
                    alt={screenshot.title}
                    className="w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground mb-2">
                        {screenshot.title}
                      </div>
                      <div className="text-muted-foreground">
                        Feature Preview
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{screenshot.title}</h3>
                  <p className="text-muted-foreground mb-4">{screenshot.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Key Features:</h4>
                    <ul className="space-y-1">
                      {screenshot.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="p-8 bg-green-50 dark:bg-green-950">
            <h2 className="text-2xl font-bold mb-4">Ready to Experience the Full Application?</h2>
            <p className="text-muted-foreground mb-6">
              Try our complete farming assistant with real-time recommendations and insights
            </p>
            <Button size="lg" onClick={() => navigate('/onboarding')}>
              Get Started Now
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}