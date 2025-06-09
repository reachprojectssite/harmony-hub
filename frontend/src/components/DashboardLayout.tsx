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
  Bell,
  Search
} from 'lucide-react';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Dashboard",
      href: "/",
      icon: <LayoutDashboard className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Revenue Streams",
      href: "/revenue",
      icon: <DollarSign className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Analytics",
      href: "/analytics",
      icon: <BarChart3 className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Releases",
      href: "/releases",
      icon: <Music className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Contracts",
      href: "/contracts",
      icon: <FileText className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Stakeholders",
      href: "/stakeholders",
      icon: <Users className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5 flex-shrink-0" />,
    },
  ];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden m-0 p-0">
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
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="border-b border-border/50 bg-card/30 backdrop-blur-sm p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search releases, contracts..." 
                className="pl-10 bg-background/50 border-border/50"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full animate-pulse" />
            </Button>
            <div className="h-8 w-8 rounded-full harmony-gradient flex items-center justify-center">
              <span className="text-white text-sm font-medium">JD</span>
            </div>
          </div>
        </motion.header>

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
        className="h-8 w-8 harmony-gradient rounded-xl flex-shrink-0 flex items-center justify-center shadow-lg"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Music className="h-5 w-5 text-white" />
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold text-foreground whitespace-pre text-xl gradient-text"
      >
        Harmony Hub
      </motion.span>
    </motion.a>
  );
};