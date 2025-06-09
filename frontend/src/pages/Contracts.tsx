import DashboardLayout from '@/components/DashboardLayout';

export default function Contracts() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2">Contracts</h1>
        <p className="text-muted-foreground mb-8">Upload/view label or artist agreements; auto-parse splits and recoup terms</p>
        <div className="rounded-xl border border-muted/20 bg-muted/10 p-8 text-center text-lg text-muted-foreground">Coming soon: Manage your music contracts and agreements.</div>
      </div>
    </DashboardLayout>
  );
} 