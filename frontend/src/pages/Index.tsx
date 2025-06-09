import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import RevenueCard from '@/components/RevenueCard';
import { GradientText } from '@/components/ui/gradient-text';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Download, Play, Pause, Activity, Users, TrendingUp } from 'lucide-react';

export default function Index() {
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

  return (
    <DashboardLayout>
      <div className="p-0 m-0 w-full min-h-full">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-8 border-b border-border/50"
        >
          <div className="max-w-screen-xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between mb-8"
            >
              <div>
                <h1 className="text-4xl font-bold tracking-tight mb-2">
                  Welcome back, <GradientText>John</GradientText>
                </h1>
                <p className="text-muted-foreground text-lg">
                  Track your music revenue across all platforms in real-time
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" size="lg" className="shadow-sm hover:shadow-md transition-shadow">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Button size="lg" className="harmony-gradient text-white shadow-lg hover:shadow-xl transition-all animate-pulse-glow">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Release
                </Button>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            >
              {quickStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="glass-effect rounded-xl p-4 flex items-center gap-3"
                >
                  <div className={`p-2 rounded-lg bg-background/50 ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Main Content */}
        <div className="p-8 space-y-8 max-w-screen-xl mx-auto w-full">
          {/* Revenue Cards */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Revenue Overview</h2>
              <Badge variant="secondary" className="animate-float">
                <Activity className="h-3 w-3 mr-1" />
                Live Data
              </Badge>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {revenueData.map((data, index) => (
                <RevenueCard key={data.title} {...data} index={index} />
              ))}
            </div>
          </motion.section>

          {/* Charts Section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid gap-8 lg:grid-cols-2"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.01 }}
            >
              <Card className="glass-effect border-border/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Revenue Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-center"
                    >
                      <Activity className="h-12 w-12 mx-auto mb-4 text-primary" />
                      <p>Interactive chart visualization coming soon</p>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.01 }}
            >
              <Card className="glass-effect border-border/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5 text-primary" />
                    Platform Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground bg-gradient-to-br from-secondary/5 to-primary/5 rounded-lg">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="text-center"
                    >
                      <div className="h-12 w-12 mx-auto mb-4 rounded-full harmony-gradient flex items-center justify-center">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                      <p>Platform breakdown chart coming soon</p>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.section>

          {/* Recent Activity */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Card className="glass-effect border-border/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "New payout received", platform: "Spotify", amount: "$847.32", time: "2 hours ago", type: "success" },
                    { action: "Recoupment milestone reached", platform: "Universal", amount: "$15,000", time: "1 day ago", type: "milestone" },
                    { action: "New streaming data", platform: "Apple Music", amount: "$234.56", time: "3 days ago", type: "data" },
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-card/50 to-muted/20 border border-border/50 hover:border-primary/20 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`h-3 w-3 rounded-full ${
                          activity.type === 'success' ? 'bg-green-500' : 
                          activity.type === 'milestone' ? 'bg-purple-500' : 'bg-blue-500'
                        } animate-pulse`} />
                        <div>
                          <p className="font-medium group-hover:text-primary transition-colors">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.platform} • {activity.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">{activity.amount}</p>
                      </div>
                    </motion.div>
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