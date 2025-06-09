import DashboardLayout from '@/components/DashboardLayout';

export default function DisputeCenter() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2">Dispute Center</h1>
        <p className="text-muted-foreground mb-8">Track and resolve any conflicts in revenue distribution or contract terms</p>
        <div className="rounded-xl border border-muted/20 bg-muted/10 p-8 text-center text-lg text-muted-foreground">Coming soon: Resolve revenue and contract disputes.</div>
      </div>
    </DashboardLayout>
  );
} 