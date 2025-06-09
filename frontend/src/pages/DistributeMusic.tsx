import DashboardLayout from '@/components/DashboardLayout';

export default function DistributeMusic() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2">Distribute Music</h1>
        <p className="text-muted-foreground mb-8">Upload and distribute a new release to Spotify, Apple Music, TikTok, etc.</p>
        <div className="rounded-xl border border-muted/20 bg-muted/10 p-8 text-center text-lg text-muted-foreground">Coming soon: Upload and distribute your next hit.</div>
      </div>
    </DashboardLayout>
  );
} 