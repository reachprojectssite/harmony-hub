import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RevenueCardProps {
  title: string;
  amount: string;
  change: number;
  platform: string;
  platformColor: string;
  index: number;
}

export default function RevenueCard({ 
  title, 
  amount, 
  change, 
  platform, 
  platformColor,
  index 
}: RevenueCardProps) {
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        scale: 1.02,
        y: -5,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      className="group w-full"
    >
      <Card className="revenue-card relative overflow-hidden h-full">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
          <CardTitle className="text-sm font-medium text-muted-foreground truncate pr-2">{title}</CardTitle>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge 
              className={`platform-badge ${platformColor} shadow-sm text-xs`}
              variant="secondary"
            >
              {platform}
            </Badge>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="relative z-10">
          <motion.div 
            className="text-2xl sm:text-3xl font-bold mb-2 truncate"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            {amount}
          </motion.div>
          
          <motion.div 
            className="flex items-center text-sm"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <motion.div
              animate={{ 
                rotate: isPositive ? [0, 5, 0] : [0, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: index * 0.2
              }}
              className="flex-shrink-0"
            >
              {isPositive ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-2" />
              )}
            </motion.div>
            
            <div className="min-w-0 flex-1">
              <span className={`font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {isPositive ? '+' : ''}{change}%
              </span>
              <span className="ml-2 text-muted-foreground text-xs sm:text-sm">vs last month</span>
            </div>
          </motion.div>
          
          {/* Progress bar */}
          <motion.div 
            className="mt-4 h-1 bg-muted rounded-full overflow-hidden"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: index * 0.1 + 0.4, duration: 0.8 }}
          >
            <motion.div 
              className={`h-full ${isPositive ? 'bg-green-500' : 'bg-red-500'} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(Math.abs(change) * 2, 100)}%` }}
              transition={{ delay: index * 0.1 + 0.6, duration: 1 }}
            />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}