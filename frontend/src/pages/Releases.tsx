import DashboardLayout from '@/components/DashboardLayout';

export default function Releases() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2">Releases</h1>
        <p className="text-muted-foreground mb-8">Manage all tracked or distributed releases in one place</p>
        <div className="rounded-xl border border-muted/20 bg-muted/10 p-8 text-center text-lg text-muted-foreground">Coming soon: All your releases, all in one place.</div>
      </div>
    </DashboardLayout>
  );
} 