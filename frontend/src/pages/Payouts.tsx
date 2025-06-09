import DashboardLayout from '@/components/DashboardLayout';

export default function Payouts() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2">Payouts</h1>
        <p className="text-muted-foreground mb-8">Automated and manual payment flows to collaborators and rights holders</p>
        <div className="rounded-xl border border-muted/20 bg-muted/10 p-8 text-center text-lg text-muted-foreground">Coming soon: Manage and automate your payouts.</div>
      </div>
    </DashboardLayout>
  );
} 