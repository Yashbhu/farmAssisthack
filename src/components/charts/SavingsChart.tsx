import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

interface SavingsChartProps {
  data: {
    water: { saved: number; cost: number };
    fertilizer: { saved: number; cost: number };
    labor: { saved: number; cost: number };
  };
}

const COLORS = {
  water: 'hsl(var(--chart-1))',
  fertilizer: 'hsl(var(--chart-2))',
  labor: 'hsl(var(--chart-3))',
};

export function SavingsChart({ data }: SavingsChartProps) {
  const chartData = [
    { name: 'Water', value: data.water.cost, color: COLORS.water },
    { name: 'Fertilizer', value: data.fertilizer.cost, color: COLORS.fertilizer },
    { name: 'Labor', value: data.labor.cost, color: COLORS.labor },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-48"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={70}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
            formatter={(value) => [`₹${value}`, 'Savings']}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
        {chartData.map((item, index) => (
          <div key={index} className="text-center">
            <div className="flex items-center justify-center gap-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="font-medium">₹{item.value}</span>
            </div>
            <div className="text-muted-foreground">{item.name}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}