import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Music, ShoppingBag, Video } from 'lucide-react';

export default function PlatformDistribution() {
  const platforms = [
    { name: 'Spotify', revenue: 12847, percentage: 52, color: 'bg-green-500', icon: Music },
    { name: 'Apple Music', revenue: 6420, percentage: 26, color: 'bg-gray-500', icon: Play },
    { name: 'YouTube', revenue: 3210, percentage: 13, color: 'bg-red-500', icon: Video },
    { name: 'Bandcamp', revenue: 1890, percentage: 8, color: 'bg-blue-500', icon: ShoppingBag },
    { name: 'Others', revenue: 633, percentage: 1, color: 'bg-muted', icon: Music },
  ];

  const total = platforms.reduce((sum, platform) => sum + platform.revenue, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="glass-effect border-border/50 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5 text-primary" />
            Platform Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Donut Chart Visualization */}
            <div className="relative mx-auto w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {platforms.map((platform, index) => {
                  const circumference = 2 * Math.PI * 35;
                  const offset = platforms.slice(0, index).reduce((sum, p) => sum + p.percentage, 0);
                  const strokeDasharray = `${(platform.percentage / 100) * circumference} ${circumference}`;
                  const strokeDashoffset = -((offset / 100) * circumference);

                  return (
                    <motion.circle
                      key={platform.name}
                      cx="50"
                      cy="50"
                      r="35"
                      fill="transparent"
                      stroke={platform.color.replace('bg-', '')}
                      strokeWidth="8"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      className={platform.color.replace('bg-', 'stroke-')}
                      initial={{ strokeDasharray: `0 ${circumference}` }}
                      animate={{ strokeDasharray }}
                      transition={{ delay: 0.5 + index * 0.2, duration: 1 }}
                    />
                  );
                })}
              </svg>
              
              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, type: "spring" }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold">${total.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Total Revenue</div>
                </motion.div>
              </div>
            </div>

            {/* Platform List */}
            <div className="space-y-3">
              {platforms.map((platform, index) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${platform.color} text-white`}>
                      <platform.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{platform.name}</div>
                      <div className="text-xs text-muted-foreground">{platform.percentage}% of total</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${platform.revenue.toLocaleString()}</div>
                    <motion.div
                      className={`h-1 rounded-full ${platform.color} mt-1`}
                      initial={{ width: 0 }}
                      animate={{ width: `${platform.percentage}%` }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}