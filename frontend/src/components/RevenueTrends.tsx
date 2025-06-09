import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function RevenueTrends() {
  const trendData = [
    { month: 'Jan', streaming: 8500, direct: 2100, social: 890, merch: 3200 },
    { month: 'Feb', streaming: 9200, direct: 2800, social: 1200, merch: 3800 },
    { month: 'Mar', streaming: 10800, direct: 3100, social: 1450, merch: 4200 },
    { month: 'Apr', streaming: 11200, direct: 2900, social: 1680, merch: 4800 },
    { month: 'May', streaming: 12100, direct: 3400, social: 1820, merch: 5200 },
    { month: 'Jun', streaming: 12847, direct: 3421, social: 1892, merch: 5673 },
  ];

  const totalRevenue = trendData[trendData.length - 1];
  const previousTotal = trendData[trendData.length - 2];
  const growth = ((Object.values(totalRevenue).slice(1).reduce((a, b) => a + b, 0) - 
                   Object.values(previousTotal).slice(1).reduce((a, b) => a + b, 0)) / 
                   Object.values(previousTotal).slice(1).reduce((a, b) => a + b, 0)) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="glass-effect border-border/50 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Revenue Trends
            </div>
            <div className="flex items-center gap-1 text-sm">
              {growth > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className={growth > 0 ? 'text-green-500' : 'text-red-500'}>
                {growth > 0 ? '+' : ''}{growth.toFixed(1)}%
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Revenue bars */}
            <div className="space-y-3">
              {trendData.slice(-3).map((data, index) => (
                <motion.div
                  key={data.month}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{data.month}</span>
                    <span className="text-muted-foreground">
                      ${(data.streaming + data.direct + data.social + data.merch).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="bg-green-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${(data.streaming / 15000) * 100}%` }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                    />
                    <motion.div
                      className="bg-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${(data.direct / 15000) * 100}%` }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                    />
                    <motion.div
                      className="bg-pink-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${(data.social / 15000) * 100}%` }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                    />
                    <motion.div
                      className="bg-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${(data.merch / 15000) * 100}%` }}
                      transition={{ delay: 0.9 + index * 0.1, duration: 0.8 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 pt-4 border-t">
              {[
                { label: 'Streaming', color: 'bg-green-500', value: totalRevenue.streaming },
                { label: 'Direct Sales', color: 'bg-blue-500', value: totalRevenue.direct },
                { label: 'Social Media', color: 'bg-pink-500', value: totalRevenue.social },
                { label: 'Merchandise', color: 'bg-purple-500', value: totalRevenue.merch },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="flex items-center gap-2 text-xs"
                >
                  <div className={`h-2 w-2 rounded-full ${item.color}`} />
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium ml-auto">${item.value.toLocaleString()}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}