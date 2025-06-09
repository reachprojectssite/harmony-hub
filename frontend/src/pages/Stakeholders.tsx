import DashboardLayout from '@/components/DashboardLayout';

export default function Stakeholders() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2">Stakeholders</h1>
        <p className="text-muted-foreground mb-8">List of all collaborators with roles, splits, payout info, and bank auth status</p>
        <div className="rounded-xl border border-muted/20 bg-muted/10 p-8 text-center text-lg text-muted-foreground">Coming soon: All your collaborators, all in one place.</div>
      </div>
    </DashboardLayout>
  );
} 