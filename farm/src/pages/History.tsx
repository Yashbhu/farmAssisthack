import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Download, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { farmingApi } from '@/services/api';
import { useNavigate } from 'react-router-dom';

export function History() {
  const navigate = useNavigate();
  const { data: history, isLoading } = useQuery({
    queryKey: ['history'],
    queryFn: farmingApi.getHistoricalData,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Historical Data</h1>
              <p className="text-muted-foreground">View your past recommendations and savings</p>
            </div>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>

        <div className="space-y-4">
          {history?.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <CardTitle className="text-lg">{item.date}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {item.recommendations} recommendations generated
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary">{item.cropType}</Badge>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-green-600">
                          <TrendingUp className="h-4 w-4" />
                          <span className="font-semibold">₹{item.savings}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Total savings</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Water Saved:</span>
                      <span className="ml-2 font-medium">{Math.floor(item.savings * 0.6)}L</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Fertilizer Saved:</span>
                      <span className="ml-2 font-medium">{Math.floor(item.savings * 0.3)}kg</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Labor Saved:</span>
                      <span className="ml-2 font-medium">{Math.floor(item.savings * 0.1)}hrs</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}