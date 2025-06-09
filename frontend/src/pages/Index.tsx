import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import RevenueCard from '@/components/RevenueCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Download } from 'lucide-react';

export default function Index() {
  const revenueData = [
    {
      title: "Streaming Revenue",
      amount: "$12,847",
      change: 12.5,
      platform: "Spotify",
      platformColor: "bg-green-100 text-green-800"
    },
    {
      title: "Direct Sales",
      amount: "$3,421",
      change: -2.1,
      platform: "Bandcamp",
      platformColor: "bg-blue-100 text-blue-800"
    },
    {
      title: "Social Media",
      amount: "$1,892",
      change: 34.2,
      platform: "TikTok",
      platformColor: "bg-pink-100 text-pink-800"
    },
    {
      title: "Merchandise",
      amount: "$5,673",
      change: 8.7,
      platform: "Shopify",
      platformColor: "bg-purple-100 text-purple-800"
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 max-w-screen-xl w-full">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Track your music revenue across all platforms
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Release
            </Button>
          </div>
        </motion.div>

        {/* Revenue Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {revenueData.map((data, index) => (
            <RevenueCard key={data.title} {...data} index={index} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Chart visualization coming soon
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Platform Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Platform breakdown chart coming soon
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "New payout received", platform: "Spotify", amount: "$847.32", time: "2 hours ago" },
                  { action: "Recoupment milestone reached", platform: "Universal", amount: "$15,000", time: "1 day ago" },
                  { action: "New streaming data", platform: "Apple Music", amount: "$234.56", time: "3 days ago" },
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.platform} • {activity.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{activity.amount}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}