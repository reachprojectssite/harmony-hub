import DashboardLayout from '@/components/DashboardLayout';

export default function BankingIntegrations() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2">Banking & Integrations</h1>
        <p className="text-muted-foreground mb-8">Connect platforms (Spotify, TikTok, Shopify) and payment systems (Plaid, Stripe)</p>
        <div className="rounded-xl border border-muted/20 bg-muted/10 p-8 text-center text-lg text-muted-foreground">Coming soon: Connect your music and payment platforms.</div>
      </div>
    </DashboardLayout>
  );
} 