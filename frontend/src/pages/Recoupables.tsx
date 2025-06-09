import DashboardLayout from '@/components/DashboardLayout';

export default function Recoupables() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2">Recoupables</h1>
        <p className="text-muted-foreground mb-8">Log and monitor expenses tied to each release (studio, marketing, merch, etc.)</p>
        <div className="rounded-xl border border-muted/20 bg-muted/10 p-8 text-center text-lg text-muted-foreground">Coming soon: Track your music business expenses.</div>
      </div>
    </DashboardLayout>
  );
} 