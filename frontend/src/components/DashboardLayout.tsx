import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  DollarSign, 
  Music, 
  Users, 
  Settings,
  FileText,
  BarChart3,
  Search,
  Menu,
  Plus,
  Upload,
  FolderOpen,
  Banknote,
  FileSignature,
  UserCheck,
  PieChart,
  Layers,
  AlertTriangle,
  Link as LinkIcon,
  UserCog,
  Sliders,
} from 'lucide-react';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import NotificationDropdown from '@/components/NotificationDropdown';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    {
      label: "Dashboard",
      href: "/",
      icon: <LayoutDashboard className="h-5 w-5 flex-shrink-0" />,
      description: "Overview of revenue, payouts, and release activity",
    },
    {
      label: "Track New Release",
      href: "/track-release",
      icon: <FolderOpen className="h-5 w-5 flex-shrink-0" />,
      description: "Track royalties, splits, and recoupables for an existing song already distributed",
    },
    {
      label: "Distribute Music",
      href: "/distribute",
      icon: <Upload className="h-5 w-5 flex-shrink-0" />,
      description: "Upload and distribute a new release to Spotify, Apple Music, TikTok, etc.",
    },
    {
      label: "Releases",
      href: "/releases",
      icon: <Music className="h-5 w-5 flex-shrink-0" />,
      description: "Manage all tracked or distributed releases in one place",
    },
    {
      label: "Revenue Streams",
      href: "/revenue",
      icon: <DollarSign className="h-5 w-5 flex-shrink-0" />,
      description: "View earnings by platform: streaming, merch, social, sync, etc.",
    },
    {
      label: "Recoupables",
      href: "/recoupables",
      icon: <Banknote className="h-5 w-5 flex-shrink-0" />,
      description: "Log and monitor expenses tied to each release (studio, marketing, merch, etc.)",
    },
    {
      label: "Payouts",
      href: "/payouts",
      icon: <PieChart className="h-5 w-5 flex-shrink-0" />,
      description: "Automated and manual payment flows to collaborators and rights holders",
    },
    {
      label: "Contracts",
      href: "/contracts",
      icon: <FileSignature className="h-5 w-5 flex-shrink-0" />,
      description: "Upload/view label or artist agreements; auto-parse splits and recoup terms",
    },
    {
      label: "Stakeholders",
      href: "/stakeholders",
      icon: <UserCheck className="h-5 w-5 flex-shrink-0" />,
      description: "List of all collaborators with roles, splits, payout info, and bank auth status",
    },
    {
      label: "Analytics",
      href: "/analytics",
      icon: <BarChart3 className="h-5 w-5 flex-shrink-0" />,
      description: "Deep insights into streams, platform trends, geo data, and revenue performance",
    },
    {
      label: "Split Templates",
      href: "/split-templates",
      icon: <Layers className="h-5 w-5 flex-shrink-0" />,
      description: "Create reusable percentage split presets for fast release setup",
    },
    {
      label: "Dispute Center",
      href: "/disputes",
      icon: <AlertTriangle className="h-5 w-5 flex-shrink-0" />,
      description: "Track and resolve any conflicts in revenue distribution or contract terms",
    },
    {
      label: "Banking & Integrations",
      href: "/integrations",
      icon: <LinkIcon className="h-5 w-5 flex-shrink-0" />,
      description: "Connect platforms (Spotify, TikTok, Shopify) and payment systems (Plaid, Stripe)",
    },
    {
      label: "Team Management",
      href: "/team",
      icon: <UserCog className="h-5 w-5 flex-shrink-0" />,
      description: "Invite teammates, assign permissions, audit user access history",
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <Sliders className="h-5 w-5 flex-shrink-0" />,
      description: "Edit account preferences, notification settings, tax info, and platform defaults",
    },
  ];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden m-0 p-0">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-shrink-0">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <Logo />
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
          </SidebarBody>
        </Sidebar>
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top Navigation Bar */}
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="border-b border-border/50 bg-card/30 backdrop-blur-sm p-3 sm:p-4 flex items-center justify-between flex-shrink-0"
        >
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b">
                    <Logo />
                  </div>
                  <div className="flex-1 overflow-y-auto p-4">
                    <div className="flex flex-col gap-2">
                      {links.map((link, idx) => (
                        <motion.a
                          key={idx}
                          href={link.href}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {link.icon}
                          <span className="font-medium">{link.label}</span>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <div className="lg:hidden">
              <Logo />
            </div>
          </div>

          {/* Enhanced Search Bar */}
          <div className="flex items-center gap-2 sm:gap-4 flex-1 max-w-3xl mx-2 sm:mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search releases, contracts, artists, revenue data..." 
                className="pl-10 bg-background/50 border-border/50 w-full h-9 sm:h-10 text-sm"
              />
            </div>
          </div>
          
          {/* User Actions with Notifications */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <NotificationDropdown />
            <motion.div 
              className="h-8 w-8 rounded-full harmony-gradient flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-white text-sm font-medium">JD</span>
            </motion.div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gradient-to-br from-background via-background to-muted/20">
          {children}
        </main>
      </div>
    </div>
  );
}

const Logo = () => {
  return (
    <motion.a
      href="/"
      className="font-normal flex space-x-2 items-center text-sm py-1 relative z-20"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div 
        className="h-6 w-6 sm:h-8 sm:w-8 harmony-gradient rounded-xl flex-shrink-0 flex items-center justify-center shadow-lg"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Music className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold text-foreground whitespace-pre text-lg sm:text-xl gradient-text hidden sm:block"
      >
        SplitStream
      </motion.span>
    </motion.a>
  );
};