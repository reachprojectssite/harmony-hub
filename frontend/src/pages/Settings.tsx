import DashboardLayout from '@/components/DashboardLayout';

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground mb-8">Edit account preferences, notification settings, tax info, and platform defaults</p>
        <div className="rounded-xl border border-muted/20 bg-muted/10 p-8 text-center text-lg text-muted-foreground">Coming soon: Customize your account and preferences.</div>
      </div>
    </DashboardLayout>
  );
} 