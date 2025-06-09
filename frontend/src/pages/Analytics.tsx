import DashboardLayout from '@/components/DashboardLayout';

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground mb-8">Deep insights into streams, platform trends, geo data, and revenue performance</p>
        <div className="rounded-xl border border-muted/20 bg-muted/10 p-8 text-center text-lg text-muted-foreground">Coming soon: Visualize your music data.</div>
      </div>
    </DashboardLayout>
  );
} 