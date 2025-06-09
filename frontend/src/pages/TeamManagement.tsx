import DashboardLayout from '@/components/DashboardLayout';

export default function TeamManagement() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2">Team Management</h1>
        <p className="text-muted-foreground mb-8">Invite teammates, assign permissions, audit user access history</p>
        <div className="rounded-xl border border-muted/20 bg-muted/10 p-8 text-center text-lg text-muted-foreground">Coming soon: Manage your team and permissions.</div>
      </div>
    </DashboardLayout>
  );
} 