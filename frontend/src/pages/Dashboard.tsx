import DashboardLayout from '@/components/DashboardLayout';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground mb-8">Overview of revenue, payouts, and release activity</p>
        <div className="rounded-xl border border-muted/20 bg-muted/10 p-8 text-center text-lg text-muted-foreground">Coming soon: Your music business at a glance.</div>
      </div>
    </DashboardLayout>
  );
} 