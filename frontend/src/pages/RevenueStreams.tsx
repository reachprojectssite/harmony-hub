import DashboardLayout from '@/components/DashboardLayout';

export default function RevenueStreams() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2">Revenue Streams</h1>
        <p className="text-muted-foreground mb-8">View earnings by platform: streaming, merch, social, sync, etc.</p>
        <div className="rounded-xl border border-muted/20 bg-muted/10 p-8 text-center text-lg text-muted-foreground">Coming soon: Platform-by-platform earnings breakdown.</div>
      </div>
    </DashboardLayout>
  );
} 