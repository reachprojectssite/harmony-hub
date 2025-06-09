import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import RevenueCard from '@/components/RevenueCard';
import RevenueTrends from '@/components/RevenueTrends';
import PlatformDistribution from '@/components/PlatformDistribution';
import AddReleaseDialog from '@/components/AddReleaseDialog';
import ExportAnalyticsDialog from '@/components/ExportAnalyticsDialog';
import { GradientText } from '@/components/ui/gradient-text';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Download, Play, Activity, Users, TrendingUp, ChevronRight, Zap, Target, BarChart3, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Index() {
  const { toast } = useToast();

  const revenueData = [
    {
      title: "Streaming Revenue",
      amount: "$12,847",
      change: 12.5,
      platform: "Spotify",
      platformColor: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    },
    {
      title: "Direct Sales",
      amount: "$3,421",
      change: -2.1,
      platform: "Bandcamp",
      platformColor: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
    },
    {
      title: "Social Media",
      amount: "$1,892",
      change: 34.2,
      platform: "TikTok",
      platformColor: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400"
    },
    {
      title: "Merchandise",
      amount: "$5,673",
      change: 8.7,
      platform: "Shopify",
      platformColor: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
    }
  ];

  const quickStats = [
    { label: "Total Artists", value: "24", icon: Users, color: "text-blue-500" },
    { label: "Active Releases", value: "12", icon: Play, color: "text-green-500" },
    { label: "Monthly Growth", value: "+18%", icon: TrendingUp, color: "text-purple-500" },
  ];

  const features = [
    {
      icon: Zap,
      title: "Real-time Tracking",
      description: "Monitor revenue across all platforms instantly"
    },
    {
      icon: Target,
      title: "Smart Recoupment",
      description: "Automated cost recovery and profit distribution"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Deep insights into performance and earnings"
    }
  ];

  const handleActivityClick = (activity: any) => {
    toast({
      title: `${activity.action}`,
      description: `Viewing details for ${activity.platform} activity from ${activity.time}.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="w-full min-h-full m-0 p-0">
        {/* Enhanced Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-3 sm:p-4 md:p-6 lg:p-8 border-b border-border/50"
        >
          {/* Subtle Background Pattern - Behind content */}
          <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(45deg,transparent_25%,rgba(120,119,198,0.1)_50%,transparent_75%)]" />
          
          <div className="max-w-screen-xl mx-auto w-full relative z-10">
            {/* Main Hero Content */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8 sm:mb-10 lg:mb-16 relative z-20"
            >
              {/* Welcome Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6 backdrop-blur-sm"
              >
                <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
                Welcome back, John
                <ChevronRight className="h-3 w-3" />
              </motion.div>

              {/* Main Title */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-4 sm:mb-6 relative z-30 px-2"
              >
                Your Music Revenue,{" "}
                <span className="block sm:inline">
                  <GradientText>
                    Simplified & Automated
                  </GradientText>
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8 relative z-30 px-4"
              >
                Track, manage, and distribute music royalties across all platforms with intelligent recoupment and transparent splits.
              </motion.p>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 relative z-30 px-4"
              >
                <AddReleaseDialog>
                  <Button size="lg" className="harmony-gradient text-white shadow-lg hover:shadow-xl transition-all px-6 sm:px-8 py-2.5 sm:py-3 w-full sm:w-auto">
                    <Plus className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                    Add New Release
                  </Button>
                </AddReleaseDialog>
                
                <ExportAnalyticsDialog>
                  <Button variant="outline" size="lg" className="shadow-sm hover:shadow-md transition-shadow px-6 sm:px-8 py-2.5 sm:py-3 backdrop-blur-sm w-full sm:w-auto">
                    <Download className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                    Export Analytics
                  </Button>
                </ExportAnalyticsDialog>
              </motion.div>
            </motion.div>

            {/* Feature Cards */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 relative z-20"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="glass-effect rounded-xl p-4 sm:p-6 text-center group cursor-pointer backdrop-blur-sm"
                >
                  <div className="harmony-gradient rounded-lg w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 relative z-20"
            >
              {quickStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="glass-effect rounded-xl p-4 sm:p-6 flex items-center gap-3 sm:gap-4 group cursor-pointer backdrop-blur-sm"
                >
                  <div className={`p-2 sm:p-3 rounded-lg bg-background/50 ${stat.color} group-hover:scale-110 transition-transform`}>
                    <stat.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold truncate">{stat.value}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Main Content */}
        <div className="p-3 sm:p-4 md:p-6 lg:p-8 space-y-6 lg:space-y-8 max-w-screen-xl mx-auto w-full">
          {/* Revenue Cards */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">Revenue Overview</h2>
              <Badge variant="secondary" className="animate-float self-start sm:self-auto">
                <Activity className="h-3 w-3 mr-1" />
                Live Data
              </Badge>
            </div>
            
            <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
              {revenueData.map((data, index) => (
                <RevenueCard key={data.title} {...data} index={index} />
              ))}
            </div>
          </motion.section>

          {/* Analytics Section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-2"
          >
            <RevenueTrends />
            <PlatformDistribution />
          </motion.section>

          {/* Recent Activity - Full Width */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="glass-effect border-border/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Activity className="h-4 sm:h-5 w-4 sm:w-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                  {[
                    { action: "New payout received", platform: "Spotify", amount: "$847.32", time: "2 hours ago", type: "success" },
                    { action: "Recoupment milestone reached", platform: "Universal", amount: "$15,000", time: "1 day ago", type: "milestone" },
                    { action: "New streaming data", platform: "Apple Music", amount: "$234.56", time: "3 days ago", type: "data" },
                    { action: "Contract renewal due", platform: "Distribution", amount: "Action Required", time: "1 week ago", type: "warning" },
                  ].map((activity, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      onClick={() => handleActivityClick(activity)}
                      className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-gradient-to-r from-card/50 to-muted/20 border border-border/50 hover:border-primary/20 transition-all duration-300 cursor-pointer group text-left w-full"
                    >
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                        <div className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full flex-shrink-0 ${
                          activity.type === 'success' ? 'bg-green-500' : 
                          activity.type === 'milestone' ? 'bg-purple-500' : 
                          activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                        } animate-pulse`} />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium group-hover:text-primary transition-colors text-xs sm:text-sm truncate">{activity.action}</p>
                          <p className="text-xs text-muted-foreground truncate">{activity.platform} • {activity.time}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 flex items-center gap-2">
                        <div>
                          <p className={`font-semibold text-xs sm:text-sm ${activity.type === 'warning' ? 'text-yellow-500' : ''}`}>
                            {activity.amount}
                          </p>
                        </div>
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.section>
        </div>
      </div>
    </DashboardLayout>
  );
}