import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

interface WaterUsageChartProps {
  data: Array<{
    date: string;
    waterUsage: number;
    recommended: boolean;
  }>;
}

export function WaterUsageChart({ data }: WaterUsageChartProps) {
  const chartData = data.map((item, index) => ({
    day: `Day ${index + 1}`,
    actual: item.waterUsage,
    recommended: item.waterUsage * (item.recommended ? 0.8 : 1.2),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-64"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="day" 
            tick={{ fontSize: 12 }}
            axisLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
          <Bar 
            dataKey="actual" 
            fill="hsl(var(--primary))" 
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="recommended" 
            fill="hsl(var(--muted))" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}