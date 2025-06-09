import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, Calendar, DollarSign, Play, Users, Music } from 'lucide-react';

interface PlatformBreakdownDialogProps {
  children: React.ReactNode;
  platform: {
    name: string;
    revenue: number;
    percentage: number;
    color: string;
    icon: any;
  };
}

// Add mock top songs data
const mockTopSongs = {
  'Spotify': [
    { title: 'Midnight Dreams', artist: 'Luna Echo', streams: 45000, revenue: 1800 },
    { title: 'Electric Soul', artist: 'Neon Pulse', streams: 38000, revenue: 1520 },
    { title: 'Cosmic Waves', artist: 'Star Child', streams: 32000, revenue: 1280 },
  ],
  'Apple Music': [
    { title: 'Midnight Dreams', artist: 'Luna Echo', streams: 28000, revenue: 1400 },
    { title: 'Electric Soul', artist: 'Neon Pulse', streams: 24000, revenue: 1200 },
    { title: 'Cosmic Waves', artist: 'Star Child', streams: 20000, revenue: 1000 },
  ],
  'YouTube': [
    { title: 'Midnight Dreams', artist: 'Luna Echo', streams: 15000, revenue: 450 },
    { title: 'Electric Soul', artist: 'Neon Pulse', streams: 12000, revenue: 360 },
    { title: 'Cosmic Waves', artist: 'Star Child', streams: 10000, revenue: 300 },
  ],
  'Bandcamp': [
    { title: 'Midnight Dreams', artist: 'Luna Echo', streams: 5000, revenue: 750 },
    { title: 'Electric Soul', artist: 'Neon Pulse', streams: 4000, revenue: 600 },
    { title: 'Cosmic Waves', artist: 'Star Child', streams: 3000, revenue: 450 },
  ],
  'Others': [
    { title: 'Midnight Dreams', artist: 'Luna Echo', streams: 2000, revenue: 100 },
    { title: 'Electric Soul', artist: 'Neon Pulse', streams: 1500, revenue: 75 },
    { title: 'Cosmic Waves', artist: 'Star Child', streams: 1000, revenue: 50 },
  ],
};

export default function PlatformBreakdownDialog({ children, platform }: PlatformBreakdownDialogProps) {
  const [open, setOpen] = useState(false);

  // Mock monthly data for the platform
  const monthlyData = [
    { month: 'Jan 2024', revenue: 1200, streams: 45000, growth: 12.5 },
    { month: 'Feb 2024', revenue: 1350, streams: 52000, growth: 15.6 },
    { month: 'Mar 2024', revenue: 1180, streams: 48000, growth: -8.2 },
    { month: 'Apr 2024', revenue: 1420, streams: 58000, growth: 18.3 },
    { month: 'May 2024', revenue: 1680, streams: 67000, growth: 22.1 },
    { month: 'Jun 2024', revenue: platform.revenue, streams: 72000, growth: 8.7 },
  ];

  const totalRevenue = monthlyData.reduce((sum, month) => sum + month.revenue, 0);
  const totalStreams = monthlyData.reduce((sum, month) => sum + month.streams, 0);
  const avgGrowth = monthlyData.reduce((sum, month) => sum + month.growth, 0) / monthlyData.length;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader className="bg-background pb-2 border-b">
          <DialogTitle className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${platform.color} text-white`}>
              <platform.icon className="h-5 w-5" />
            </div>
            {platform.name} - Monthly Breakdown
          </DialogTitle>
        </DialogHeader>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 pt-4"
        >
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Total Revenue</span>
                </div>
                <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Last 6 months</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Play className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Total Streams</span>
                </div>
                <p className="text-2xl font-bold">{(totalStreams / 1000).toFixed(0)}K</p>
                <p className="text-xs text-muted-foreground">Last 6 months</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium">Avg Growth</span>
                </div>
                <p className="text-2xl font-bold">{avgGrowth.toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground">Monthly average</p>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Breakdown */}
          <Tabs defaultValue="revenue" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="revenue">Revenue Breakdown</TabsTrigger>
              <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
              <TabsTrigger value="songs">Top Songs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="revenue" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Monthly Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyData.map((month, index) => (
                      <motion.div
                        key={month.month}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-sm font-medium">{month.month}</div>
                          <Badge variant={month.growth > 0 ? "default" : "secondary"}>
                            {month.growth > 0 ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            )}
                            {month.growth > 0 ? '+' : ''}{month.growth}%
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">${month.revenue.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">
                            {month.streams.toLocaleString()} streams
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Performance Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                        <h4 className="font-medium text-green-800 dark:text-green-400 mb-2">Best Performing Month</h4>
                        <p className="text-2xl font-bold text-green-900 dark:text-green-300">May 2024</p>
                        <p className="text-sm text-green-700 dark:text-green-500">$1,680 revenue (+22.1% growth)</p>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                        <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-2">Peak Streams</h4>
                        <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">72K</p>
                        <p className="text-sm text-blue-700 dark:text-blue-500">June 2024</p>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg border">
                      <h4 className="font-medium mb-2">Revenue per Stream</h4>
                      <p className="text-lg font-semibold">${(totalRevenue / totalStreams * 1000).toFixed(4)}</p>
                      <p className="text-sm text-muted-foreground">Average across all months</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="songs" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Music className="h-4 w-4" />
                    Top Performing Songs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(mockTopSongs[platform.name as keyof typeof mockTopSongs] || []).map((song, index) => (
                      <motion.div
                        key={song.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium truncate">{song.title}</div>
                            <div className="text-xs text-muted-foreground truncate">{song.artist}</div>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                          <div className="font-semibold">${song.revenue.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">
                            {song.streams.toLocaleString()} streams
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}