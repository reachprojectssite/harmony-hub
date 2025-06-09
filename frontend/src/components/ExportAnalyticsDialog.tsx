import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, FileText, Calendar, BarChart3, DollarSign, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExportAnalyticsDialogProps {
  children: React.ReactNode;
}

export default function ExportAnalyticsDialog({ children }: ExportAnalyticsDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['revenue', 'streams']);
  const [dateRange, setDateRange] = useState('last-30-days');
  const [format, setFormat] = useState('pdf');
  const { toast } = useToast();

  const metrics = [
    { id: 'revenue', label: 'Revenue Data', icon: DollarSign, description: 'Total earnings across all platforms' },
    { id: 'streams', label: 'Streaming Stats', icon: BarChart3, description: 'Play counts and engagement metrics' },
    { id: 'demographics', label: 'Audience Demographics', icon: Users, description: 'Geographic and demographic data' },
    { id: 'platforms', label: 'Platform Performance', icon: FileText, description: 'Platform-specific breakdowns' },
  ];

  const handleMetricToggle = (metricId: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metricId) 
        ? prev.filter(id => id !== metricId)
        : [...prev, metricId]
    );
  };

  const handleExport = () => {
    // Simulate export process
    toast({
      title: "Export Started",
      description: `Generating ${format.toUpperCase()} report with ${selectedMetrics.length} metrics for ${dateRange.replace('-', ' ')}.`,
    });
    
    setTimeout(() => {
      toast({
        title: "Export Complete!",
        description: "Your analytics report has been downloaded.",
      });
      setOpen(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-muted/30 p-0">
        <div className="px-6 pt-6 pb-2 border-b border-muted/20 flex items-center justify-between rounded-t-2xl bg-white">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center rounded-full bg-primary/10 p-2">
              <Download className="h-5 w-5 text-primary" />
            </span>
            <div>
              <DialogTitle className="text-xl font-bold text-foreground">Export Analytics Report</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">Download your music data in one click</p>
            </div>
          </div>
          <DialogClose className="rounded-full p-2 hover:bg-muted/30 transition">
            <span className="sr-only">Close</span>
            <Download className="h-4 w-4 text-muted-foreground" />
          </DialogClose>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 px-6 py-6"
        >
          {/* Date Range Selection */}
          <div className="bg-muted/10 rounded-xl p-4 border border-muted/20">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="font-semibold text-base">Date Range</span>
            </div>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-full bg-white border-muted/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                <SelectItem value="last-year">Last Year</SelectItem>
                <SelectItem value="all-time">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Metrics Selection */}
          <div className="bg-muted/10 rounded-xl p-4 border border-muted/20">
            <div className="font-semibold text-base mb-2 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              Select Metrics
            </div>
            <div className="grid gap-4">
              {metrics.map((metric) => (
                <motion.div
                  key={metric.id}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-3 p-3 rounded-lg border border-muted/20 hover:border-primary/30 transition-colors bg-white"
                >
                  <Checkbox
                    id={metric.id}
                    checked={selectedMetrics.includes(metric.id)}
                    onCheckedChange={() => handleMetricToggle(metric.id)}
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <metric.icon className="h-4 w-4 text-primary" />
                    <div>
                      <label htmlFor={metric.id} className="font-medium cursor-pointer">
                        {metric.label}
                      </label>
                      <p className="text-xs text-muted-foreground">{metric.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Format Selection */}
          <div className="bg-muted/10 rounded-xl p-4 border border-muted/20">
            <div className="font-semibold text-base mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Export Format
            </div>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger className="w-full bg-white border-muted/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Report</SelectItem>
                <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                <SelectItem value="csv">CSV Data</SelectItem>
                <SelectItem value="json">JSON Data</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Export Summary */}
          <div className="flex items-center justify-between p-4 bg-muted/20 rounded-xl border border-muted/20">
            <div>
              <p className="font-medium">Export Summary</p>
              <p className="text-xs text-muted-foreground">
                {selectedMetrics.length} metrics • {dateRange.replace('-', ' ')} • {format.toUpperCase()}
              </p>
            </div>
            <Badge variant="secondary">
              {selectedMetrics.length} selected
            </Badge>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleExport} 
              className="flex-1 harmony-gradient text-white shadow-md"
              disabled={selectedMetrics.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}