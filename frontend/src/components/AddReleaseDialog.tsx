import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Plus, 
  Upload, 
  Music, 
  DollarSign, 
  Link as LinkIcon, 
  FileText, 
  Users, 
  ShoppingBag,
  Youtube,
  Instagram,
  X,
  Headphones,
  Globe,
  CreditCard,
  FileSignature,
  Store,
  Radio,
  Disc,
  Smartphone
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddReleaseDialogProps {
  children: React.ReactNode;
}

interface PlatformLink {
  id: string;
  platform: string;
  url: string;
  isConnected: boolean;
  category: 'streaming' | 'social' | 'commerce' | 'distribution' | 'legal' | 'radio' | 'merch' | 'crowdfunding' | 'sync' | 'ticketing' | 'banking';
  authType?: 'oauth' | 'api' | 'manual';
  authStatus?: 'pending' | 'connected' | 'failed';
  lastSync?: string;
}

interface Recoupable {
  id: string;
  category: 'Merch Production' | 'Marketing' | 'Advance' | 'Studio Time' | 'Video Shoot' | 'PR' | 'Travel' | 'Other';
  amount: string;
  whoPaid: 'Label' | 'Artist' | 'Manager' | '3rd Party';
  recoupFrom: 'Gross Revenue' | 'Net Revenue';
  priority: 'First' | 'After Label' | 'Post-Break-Even';
  receiptUrl?: string;
  notes?: string;
  date: string;
}

interface RevenueSplit {
  id: string;
  name: string;
  role: string;
  splitPercentage: string;
  platformScope: string[];
  bankAuth?: {
    provider: string;
    status: 'pending' | 'connected' | 'failed';
  };
  email?: string;
  recoupFirst: boolean;
  status: 'pending' | 'accepted' | 'rejected';
}

interface Contract {
  id: string;
  type: string;
  party: string;
  percentage: string;
  advance?: string;
  startDate: string;
  endDate: string;
  territory: string[];
  terms: string;
  parsedTerms?: {
    termLength: string;
    splitPercentage: string;
    advance: string;
    territory: string[];
  };
}

interface MerchItem {
  id: string;
  name: string;
  type: 'Apparel' | 'Vinyl' | 'CD' | 'Poster' | 'Accessory' | 'Digital';
  price: string;
  cogs: string;
  markup: string;
  description: string;
  sku: string;
  platform: 'Shopify' | 'Bandcamp' | 'WooCommerce' | 'Printful' | 'Printify' | 'TopDrawer' | 'Spring';
  contributesToRecoupment: boolean;
  recoupmentPool: 'General' | 'Isolated';
  images?: string[];
  imagesInput?: string;
}

// Add type for step IDs
type ReleaseStepId = 'basic' | 'platforms' | 'financial' | 'contracts' | 'merch' | 'review';

interface ReleaseStep {
  id: ReleaseStepId;
  title: string;
  description: string;
  isComplete: boolean;
  isRequired: boolean;
}

interface PlatformAuthState {
  platformId: string;
  status: 'idle' | 'authenticating' | 'success' | 'error';
  error?: string;
}

export default function AddReleaseDialog({ children }: AddReleaseDialogProps) {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<ReleaseStepId>('basic');
  const [authState, setAuthState] = useState<Record<string, PlatformAuthState>>({});
  
  // Basic Information
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    genre: '',
    releaseDate: '',
    description: '',
    isrc: '',
    upc: '',
    label: '',
    copyright: '',
    publishingRights: '',
  });

  // Enhanced Platform Links with categories
  const [platformLinks, setPlatformLinks] = useState<PlatformLink[]>([
    // Streaming & DSPs
    { id: '1', platform: 'Spotify for Artists', url: '', isConnected: false, category: 'streaming', authType: 'oauth' },
    { id: '2', platform: 'Apple Music for Artists', url: '', isConnected: false, category: 'streaming', authType: 'oauth' },
    { id: '3', platform: 'YouTube Music', url: '', isConnected: false, category: 'streaming', authType: 'oauth' },
    { id: '4', platform: 'Amazon Music for Artists', url: '', isConnected: false, category: 'streaming', authType: 'oauth' },
    { id: '5', platform: 'Deezer Backstage', url: '', isConnected: false, category: 'streaming', authType: 'oauth' },
    { id: '6', platform: 'Tidal Artist Dashboard', url: '', isConnected: false, category: 'streaming', authType: 'oauth' },
    { id: '7', platform: 'Pandora AMP', url: '', isConnected: false, category: 'streaming', authType: 'oauth' },
    { id: '8', platform: 'Audiomack Creators', url: '', isConnected: false, category: 'streaming', authType: 'oauth' },
    { id: '9', platform: 'Napster', url: '', isConnected: false, category: 'streaming', authType: 'api' },
    { id: '10', platform: 'iHeartRadio', url: '', isConnected: false, category: 'streaming', authType: 'api' },
    
    // Social Revenue
    { id: '11', platform: 'TikTok Creator Marketplace', url: '', isConnected: false, category: 'social', authType: 'oauth' },
    { id: '12', platform: 'Meta Business Manager', url: '', isConnected: false, category: 'social', authType: 'oauth' },
    { id: '13', platform: 'Snapchat Creator Portal', url: '', isConnected: false, category: 'social', authType: 'oauth' },
    { id: '14', platform: 'YouTube Shorts', url: '', isConnected: false, category: 'social', authType: 'oauth' },
    { id: '15', platform: 'Triller Creator Program', url: '', isConnected: false, category: 'social', authType: 'oauth' },
    { id: '16', platform: 'Twitch', url: '', isConnected: false, category: 'social', authType: 'oauth' },
    { id: '17', platform: 'X Creator Monetization', url: '', isConnected: false, category: 'social', authType: 'oauth' },
    
    // Merch Platforms
    { id: '18', platform: 'Shopify', url: '', isConnected: false, category: 'merch', authType: 'oauth' },
    { id: '19', platform: 'Bandcamp', url: '', isConnected: false, category: 'merch', authType: 'oauth' },
    { id: '20', platform: 'WooCommerce', url: '', isConnected: false, category: 'merch', authType: 'api' },
    { id: '21', platform: 'Printful', url: '', isConnected: false, category: 'merch', authType: 'oauth' },
    { id: '22', platform: 'Printify', url: '', isConnected: false, category: 'merch', authType: 'oauth' },
    { id: '23', platform: 'TopDrawer', url: '', isConnected: false, category: 'merch', authType: 'oauth' },
    { id: '24', platform: 'Spring', url: '', isConnected: false, category: 'merch', authType: 'oauth' },
    
    // Crowdfunding
    { id: '25', platform: 'Patreon', url: '', isConnected: false, category: 'crowdfunding', authType: 'oauth' },
    { id: '26', platform: 'Ko-fi', url: '', isConnected: false, category: 'crowdfunding', authType: 'oauth' },
    { id: '27', platform: 'Substack', url: '', isConnected: false, category: 'crowdfunding', authType: 'oauth' },
    { id: '28', platform: 'Buy Me A Coffee', url: '', isConnected: false, category: 'crowdfunding', authType: 'oauth' },
    
    // Live & Ticketing
    { id: '29', platform: 'Dice.fm', url: '', isConnected: false, category: 'ticketing', authType: 'oauth' },
    { id: '30', platform: 'Eventbrite', url: '', isConnected: false, category: 'ticketing', authType: 'oauth' },
    { id: '31', platform: 'Songkick', url: '', isConnected: false, category: 'ticketing', authType: 'oauth' },
    { id: '32', platform: 'Bandsintown', url: '', isConnected: false, category: 'ticketing', authType: 'oauth' },
    { id: '33', platform: 'Seated', url: '', isConnected: false, category: 'ticketing', authType: 'oauth' },
    { id: '34', platform: 'StageIt', url: '', isConnected: false, category: 'ticketing', authType: 'oauth' },
    
    // Sync & Publishing
    { id: '35', platform: 'Songtradr', url: '', isConnected: false, category: 'sync', authType: 'oauth' },
    { id: '36', platform: 'SyncFloor', url: '', isConnected: false, category: 'sync', authType: 'oauth' },
    { id: '37', platform: 'Soundmouse', url: '', isConnected: false, category: 'sync', authType: 'api' },
    { id: '38', platform: 'BMI', url: '', isConnected: false, category: 'sync', authType: 'api' },
    { id: '39', platform: 'ASCAP', url: '', isConnected: false, category: 'sync', authType: 'api' },
    { id: '40', platform: 'SESAC', url: '', isConnected: false, category: 'sync', authType: 'api' },
    { id: '41', platform: 'SOCAN', url: '', isConnected: false, category: 'sync', authType: 'api' },
    { id: '42', platform: 'PRS', url: '', isConnected: false, category: 'sync', authType: 'api' },
    { id: '43', platform: 'GEMA', url: '', isConnected: false, category: 'sync', authType: 'api' },
    { id: '44', platform: 'TuneRegistry', url: '', isConnected: false, category: 'sync', authType: 'api' },
    
    // Banking & Payments
    { id: '45', platform: 'Plaid', url: '', isConnected: false, category: 'banking', authType: 'oauth' },
    { id: '46', platform: 'Stripe Connect', url: '', isConnected: false, category: 'banking', authType: 'oauth' },
    { id: '47', platform: 'PayPal Business', url: '', isConnected: false, category: 'banking', authType: 'oauth' },
    { id: '48', platform: 'Wise', url: '', isConnected: false, category: 'banking', authType: 'oauth' },
    { id: '49', platform: 'Ramp', url: '', isConnected: false, category: 'banking', authType: 'oauth' },
    { id: '50', platform: 'Brex', url: '', isConnected: false, category: 'banking', authType: 'oauth' },
  ]);

  // Recoupables
  const [recoupables, setRecoupables] = useState<Recoupable[]>([
    { id: '1', category: 'Merch Production', amount: '', whoPaid: 'Label', recoupFrom: 'Gross Revenue', priority: 'First', date: '' },
    { id: '2', category: 'Marketing', amount: '', whoPaid: 'Label', recoupFrom: 'Net Revenue', priority: 'After Label', date: '' },
    { id: '3', category: 'Advance', amount: '', whoPaid: 'Label', recoupFrom: 'Net Revenue', priority: 'Post-Break-Even', date: '' },
    { id: '4', category: 'Studio Time', amount: '', whoPaid: 'Label', recoupFrom: 'Net Revenue', priority: 'Post-Break-Even', date: '' },
    { id: '5', category: 'Video Shoot', amount: '', whoPaid: 'Label', recoupFrom: 'Net Revenue', priority: 'Post-Break-Even', date: '' },
    { id: '6', category: 'PR', amount: '', whoPaid: 'Label', recoupFrom: 'Net Revenue', priority: 'Post-Break-Even', date: '' },
    { id: '7', category: 'Travel', amount: '', whoPaid: 'Label', recoupFrom: 'Net Revenue', priority: 'Post-Break-Even', date: '' },
    { id: '8', category: 'Other', amount: '', whoPaid: 'Label', recoupFrom: 'Net Revenue', priority: 'Post-Break-Even', date: '' },
  ]);

  // Contracts & Revenue Splits
  const [contracts, setContracts] = useState<Contract[]>([]);

  // Merchandise
  const [merchItems, setMerchItems] = useState<MerchItem[]>([]);

  // Add state for revenue splits
  const [revenueSplits, setRevenueSplits] = useState<RevenueSplit[]>([]);

  // Add state for contract file
  const [contractFile, setContractFile] = useState<File | null>(null);
  const [contractParsingStatus, setContractParsingStatus] = useState<'idle' | 'parsing' | 'success' | 'error'>('idle');

  const { toast } = useToast();

  // Define the release steps
  const releaseSteps: ReleaseStep[] = [
    {
      id: 'basic',
      title: 'Basic Info',
      description: 'Enter release details and upload files',
      isComplete: false,
      isRequired: true
    },
    {
      id: 'platforms',
      title: 'Platform Setup',
      description: 'Connect your streaming and social accounts',
      isComplete: false,
      isRequired: true
    },
    {
      id: 'financial',
      title: 'Financial Setup',
      description: 'Set up revenue splits and recoupables',
      isComplete: false,
      isRequired: false
    },
    {
      id: 'contracts',
      title: 'Contracts',
      description: 'Upload and manage contracts',
      isComplete: false,
      isRequired: false
    },
    {
      id: 'merch',
      title: 'Merchandise',
      description: 'Add merchandise items',
      isComplete: false,
      isRequired: false
    },
    {
      id: 'review',
      title: 'Review',
      description: 'Review and submit your release',
      isComplete: false,
      isRequired: true
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Release Added Successfully!",
        description: `"${formData.title}" by ${formData.artist} has been added to your catalog with all platform integrations.`,
      });
      setOpen(false);
      resetForm();
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      artist: '',
      genre: '',
      releaseDate: '',
      description: '',
      isrc: '',
      upc: '',
      label: '',
      copyright: '',
      publishingRights: '',
    });
    setCurrentStep('basic');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updatePlatformLink = (id: string, field: string, value: string | boolean) => {
    setPlatformLinks(prev => 
      prev.map(link => 
        link.id === id ? { ...link, [field]: value } : link
      )
    );
  };

  const updateRecoupable = (id: string, field: string, value: string | number) => {
    setRecoupables(prev => 
      prev.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const addRecoupable = () => {
    const newId = (recoupables.length + 1).toString();
    setRecoupables(prev => [...prev, {
      id: newId,
      category: 'Other',
      amount: '',
      whoPaid: 'Label',
      recoupFrom: 'Net Revenue',
      priority: 'Post-Break-Even',
      date: ''
    }]);
  };

  const removeRecoupable = (id: string) => {
    setRecoupables(prev => prev.filter(item => item.id !== id));
  };

  const updateContract = (id: string, field: keyof Contract, value: string | string[]) => {
    if (field === 'territory' && Array.isArray(value)) {
      setContracts(prev => 
        prev.map(contract => 
          contract.id === id ? { ...contract, territory: value } : contract
        )
      );
    } else if (typeof value === 'string') {
      setContracts(prev => 
        prev.map(contract => 
          contract.id === id ? { ...contract, [field]: value } : contract
        )
      );
    }
  };

  const addMerchItem = () => {
    const newId = (merchItems.length + 1).toString();
    setMerchItems(prev => [...prev, {
      id: newId,
      name: '',
      type: 'Apparel',
      price: '',
      cogs: '',
      markup: '',
      description: '',
      sku: '',
      platform: 'Shopify',
      contributesToRecoupment: true,
      recoupmentPool: 'General',
    }]);
  };

  const updateMerchItem = (id: string, field: string, value: string) => {
    setMerchItems(prev => prev.map(item => {
      if (item.id !== id) return item;
      if (field === 'contributesToRecoupment') {
        return { ...item, contributesToRecoupment: value === 'Yes' };
      }
      if (field === 'imagesInput') {
        return { ...item, imagesInput: value };
      }
      return { ...item, [field]: value };
    }));
  };

  const removeMerchItem = (id: string) => {
    setMerchItems(prev => prev.filter(item => item.id !== id));
  };

  const getPlatformIcon = (platform: string, category: string) => {
    switch (platform.toLowerCase()) {
      case 'spotify': return <div className="h-4 w-4 bg-green-500 rounded-full" />;
      case 'apple music': return <div className="h-4 w-4 bg-gray-800 rounded-sm" />;
      case 'youtube music':
      case 'youtube': return <Youtube className="h-4 w-4 text-red-500" />;
      case 'instagram': return <Instagram className="h-4 w-4 text-pink-500" />;
      case 'tiktok': return <Smartphone className="h-4 w-4 text-black" />;
      case 'shopify': return <Store className="h-4 w-4 text-green-600" />;
      case 'docusign': return <FileSignature className="h-4 w-4 text-blue-600" />;
      case 'stripe': return <CreditCard className="h-4 w-4 text-purple-600" />;
      case 'bandcamp': return <Disc className="h-4 w-4 text-blue-500" />;
      case 'sirius':
      case 'siriusxm': return <Radio className="h-4 w-4 text-blue-700" />;
      default: 
        switch (category) {
          case 'streaming': return <Headphones className="h-4 w-4 text-blue-500" />;
          case 'social': return <Instagram className="h-4 w-4 text-pink-500" />;
          case 'commerce': return <ShoppingBag className="h-4 w-4 text-green-500" />;
          case 'distribution': return <Globe className="h-4 w-4 text-purple-500" />;
          case 'legal': return <FileSignature className="h-4 w-4 text-blue-600" />;
          case 'radio': return <Radio className="h-4 w-4 text-orange-500" />;
          default: return <Headphones className="h-4 w-4 text-muted-foreground" />;
        }
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'streaming': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'social': return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400';
      case 'commerce': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'distribution': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'legal': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'radio': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const groupedPlatforms = platformLinks.reduce((acc, platform) => {
    if (!acc[platform.category]) {
      acc[platform.category] = [];
    }
    acc[platform.category].push(platform);
    return acc;
  }, {} as Record<string, PlatformLink[]>);

  const categoryLabels = {
    streaming: 'Streaming & DSPs',
    social: 'Social Revenue',
    merch: 'Merch Platforms',
    crowdfunding: 'Crowdfunding',
    ticketing: 'Live & Ticketing',
    sync: 'Sync & Publishing',
    banking: 'Banking & Payments',
    distribution: 'Distribution',
    legal: 'Legal & Contracts',
    radio: 'Radio & Broadcasting'
  };

  // Add handlers for revenue splits
  const addRevenueSplit = () => {
    const newId = (revenueSplits.length + 1).toString();
    setRevenueSplits(prev => [...prev, {
      id: newId,
      name: '',
      role: 'Primary Artist',
      splitPercentage: '',
      platformScope: ['All Revenue'],
      recoupFirst: false,
      status: 'pending'
    }]);
  };

  const updateRevenueSplit = (id: string, field: keyof RevenueSplit, value: string | boolean | string[] | { provider: string; status: 'pending' | 'connected' | 'failed' }) => {
    setRevenueSplits(prev => 
      prev.map(split => 
        split.id === id ? { ...split, [field]: value } : split
      )
    );
  };

  const removeRevenueSplit = (id: string) => {
    setRevenueSplits(prev => prev.filter(split => split.id !== id));
  };

  const handleContractUpload = async (file: File) => {
    setContractFile(file);
    setContractParsingStatus('parsing');
    
    // Simulate contract parsing
    setTimeout(() => {
      const mockParsedTerms = {
        termLength: '2 years',
        splitPercentage: '70/30',
        advance: '$10,000',
        territory: ['Worldwide']
      };
      
      setContracts(prev => prev.map(contract => ({
        ...contract,
        parsedTerms: mockParsedTerms
      })));
      
      setContractParsingStatus('success');
    }, 2000);
  };

  const addContract = () => {
    const newId = (contracts.length + 1).toString();
    const newContract: Contract = {
      id: newId,
      type: '',
      party: '',
      percentage: '',
      advance: '',
      startDate: '',
      endDate: '',
      territory: [],
      terms: ''
    };
    setContracts(prev => [...prev, newContract]);
  };

  // Add platform authentication handler
  const handlePlatformAuth = async (platformId: string) => {
    const platform = platformLinks.find(p => p.id === platformId);
    if (!platform) return;

    setAuthState(prev => ({
      ...prev,
      [platformId]: { platformId, status: 'authenticating' }
    }));

    try {
      // Simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update platform connection status
      setPlatformLinks(prev => 
        prev.map(p => 
          p.id === platformId 
            ? { ...p, isConnected: true, authStatus: 'connected', lastSync: new Date().toISOString() }
            : p
        )
      );

      setAuthState(prev => ({
        ...prev,
        [platformId]: { platformId, status: 'success' }
      }));

      toast({
        title: "Platform Connected",
        description: `Successfully connected to ${platform.platform}`,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        [platformId]: { 
          platformId, 
          status: 'error',
          error: 'Failed to connect. Please try again.'
        }
      }));

      toast({
        title: "Connection Failed",
        description: `Failed to connect to ${platform.platform}. Please try again.`,
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0 bg-background pb-2 border-b">
          <DialogTitle className="text-2xl">Add New Release</DialogTitle>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex-shrink-0 px-6 py-4 border-b bg-background z-10">
          <div className="overflow-x-auto w-full">
            <div className="flex items-center gap-x-8 min-w-fit justify-evenly w-full">
              {releaseSteps.map((step, index) => (
                <div key={step.id} className="flex items-center min-w-[200px] px-2">
                  <div 
                    className={`
                      flex items-center justify-center w-8 h-8 rounded-full
                      ${currentStep === step.id ? 'bg-primary text-primary-foreground' : 
                        step.isComplete ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}
                      ${step.isRequired ? 'ring-2 ring-primary/20' : ''}
                    `}
                    onClick={() => setCurrentStep(step.id)}
                  >
                    {step.isComplete ? '✓' : index + 1}
                  </div>
                  <div className="ml-3">
                    <p className="text-base font-semibold leading-tight">{step.title}</p>
                    <p className="text-xs text-muted-foreground leading-tight">{step.description}</p>
                  </div>
                  {index < releaseSteps.length - 1 && (
                    <div className="flex-1 h-px bg-border mx-4 min-w-[32px]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6 pt-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 'basic' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <Card className="mt-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Release Details</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Start by entering the basic information about your release
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Song Title *</Label>
                        <Input
                          id="title"
                          placeholder="Enter song title"
                          value={formData.title}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="artist">Artist Name *</Label>
                        <Input
                          id="artist"
                          placeholder="Enter artist name"
                          value={formData.artist}
                          onChange={(e) => handleInputChange('artist', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="genre">Genre</Label>
                        <Select onValueChange={(value) => handleInputChange('genre', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select genre" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pop">Pop</SelectItem>
                            <SelectItem value="rock">Rock</SelectItem>
                            <SelectItem value="hip-hop">Hip Hop</SelectItem>
                            <SelectItem value="electronic">Electronic</SelectItem>
                            <SelectItem value="jazz">Jazz</SelectItem>
                            <SelectItem value="classical">Classical</SelectItem>
                            <SelectItem value="country">Country</SelectItem>
                            <SelectItem value="r&b">R&B</SelectItem>
                            <SelectItem value="indie">Indie</SelectItem>
                            <SelectItem value="alternative">Alternative</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="releaseDate">Release Date</Label>
                        <Input
                          id="releaseDate"
                          type="date"
                          value={formData.releaseDate}
                          onChange={(e) => handleInputChange('releaseDate', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your release, inspiration, and story behind the song..."
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={4}
                        className="resize-none"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Upload className="h-5 w-5" />
                      Upload Files
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Upload your audio file and artwork
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                        <Music className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">Audio File (WAV, MP3)</p>
                        <p className="text-xs text-muted-foreground mb-4">High quality audio file for distribution</p>
                        <Button variant="outline" type="button" size="sm">
                          Choose Audio
                        </Button>
                      </div>
                      
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                        <div className="h-8 w-8 mx-auto mb-2 bg-muted rounded" />
                        <p className="text-sm text-muted-foreground mb-2">Artwork (JPG, PNG)</p>
                        <p className="text-xs text-muted-foreground mb-4">Square image, min. 3000x3000px</p>
                        <Button variant="outline" type="button" size="sm">
                          Choose Image
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 'platforms' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <LinkIcon className="h-5 w-5" />
                      Platform Connections
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Connect your accounts to distribute and monetize your release
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {Object.entries(groupedPlatforms).map(([category, platforms]) => (
                      <div key={category} className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-base">
                              {categoryLabels[category as keyof typeof categoryLabels]}
                            </h3>
                            <Badge variant="outline" className={getCategoryColor(category)}>
                              {platforms.filter(p => p.isConnected).length}/{platforms.length} connected
                            </Badge>
                          </div>
                          {category === 'streaming' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => platforms.forEach(p => !p.isConnected && handlePlatformAuth(p.id))}
                            >
                              Connect All
                            </Button>
                          )}
                        </div>
                        
                        <div className="grid gap-3">
                          {platforms.map((link) => {
                            const auth = authState[link.id];
                            return (
                              <motion.div
                                key={link.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`
                                  flex items-center justify-between p-4 rounded-lg border
                                  ${link.isConnected ? 'bg-primary/5 border-primary/20' : 'bg-card'}
                                `}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="p-2 rounded-lg bg-muted">
                                    {getPlatformIcon(link.platform, link.category)}
                                  </div>
                                  <div>
                                    <p className="font-medium">{link.platform}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {link.isConnected 
                                        ? `Last synced: ${new Date(link.lastSync || '').toLocaleDateString()}`
                                        : 'Not connected'}
                                    </p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  {link.isConnected ? (
                                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                                      Connected
                                    </Badge>
                                  ) : (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handlePlatformAuth(link.id)}
                                      disabled={auth?.status === 'authenticating'}
                                    >
                                      {auth?.status === 'authenticating' ? (
                                        <>
                                          <span className="animate-spin mr-2">⟳</span>
                                          Connecting...
                                        </>
                                      ) : (
                                        'Connect'
                                      )}
                                    </Button>
                                  )}
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 'financial' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Recoupables Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Recoupables
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Track expenses and recoupment terms
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recoupables.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-lg"
                      >
                        <div className="space-y-2">
                          <Label>Category</Label>
                          <Select 
                            value={item.category} 
                            onValueChange={(value) => updateRecoupable(item.id, 'category', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Merch Production">Merch Production</SelectItem>
                              <SelectItem value="Marketing">Marketing</SelectItem>
                              <SelectItem value="Advance">Advance</SelectItem>
                              <SelectItem value="Studio Time">Studio Time</SelectItem>
                              <SelectItem value="Video Shoot">Video Shoot</SelectItem>
                              <SelectItem value="PR">PR</SelectItem>
                              <SelectItem value="Travel">Travel</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Amount ($)</Label>
                          <Input
                            type="number"
                            placeholder="0.00"
                            value={item.amount}
                            onChange={(e) => updateRecoupable(item.id, 'amount', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Who Paid</Label>
                          <Select 
                            value={item.whoPaid} 
                            onValueChange={(value) => updateRecoupable(item.id, 'whoPaid', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Label">Label</SelectItem>
                              <SelectItem value="Artist">Artist</SelectItem>
                              <SelectItem value="Manager">Manager</SelectItem>
                              <SelectItem value="3rd Party">3rd Party</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Recoup From</Label>
                          <Select 
                            value={item.recoupFrom} 
                            onValueChange={(value) => updateRecoupable(item.id, 'recoupFrom', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Gross Revenue">Gross Revenue</SelectItem>
                              <SelectItem value="Net Revenue">Net Revenue</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Priority</Label>
                          <Select 
                            value={item.priority} 
                            onValueChange={(value) => updateRecoupable(item.id, 'priority', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="First">First</SelectItem>
                              <SelectItem value="After Label">After Label</SelectItem>
                              <SelectItem value="Post-Break-Even">Post-Break-Even</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Date</Label>
                          <Input
                            type="date"
                            value={item.date}
                            onChange={(e) => updateRecoupable(item.id, 'date', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Receipt</Label>
                          <Button variant="outline" type="button" size="sm" className="w-full">
                            Upload Receipt
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Label>Notes</Label>
                          <Textarea
                            placeholder="Add notes..."
                            value={item.notes || ''}
                            onChange={(e) => updateRecoupable(item.id, 'notes', e.target.value)}
                            rows={2}
                          />
                        </div>
                        <div className="flex items-end">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRecoupable(item.id)}
                            className="w-full"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addRecoupable}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Recoupable
                    </Button>
                  </CardContent>
                </Card>

                {/* Revenue Splits Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Revenue Splits
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Define revenue sharing and payout terms
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {revenueSplits.map((split) => (
                      <motion.div
                        key={split.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-lg"
                      >
                        <div className="space-y-2">
                          <Label>Name</Label>
                          <Input
                            placeholder="Enter name"
                            value={split.name}
                            onChange={(e) => updateRevenueSplit(split.id, 'name', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Role</Label>
                          <Select 
                            value={split.role} 
                            onValueChange={(value) => updateRevenueSplit(split.id, 'role', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Primary Artist">Primary Artist</SelectItem>
                              <SelectItem value="Featured Artist">Featured Artist</SelectItem>
                              <SelectItem value="Producer">Producer</SelectItem>
                              <SelectItem value="Mixer">Mixer</SelectItem>
                              <SelectItem value="Engineer">Engineer</SelectItem>
                              <SelectItem value="Label">Label</SelectItem>
                              <SelectItem value="Publisher">Publisher</SelectItem>
                              <SelectItem value="Manager">Manager</SelectItem>
                              <SelectItem value="Investor">Investor</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Split Percentage (%)</Label>
                          <Input
                            type="number"
                            placeholder="0"
                            min="0"
                            max="100"
                            value={split.splitPercentage}
                            onChange={(e) => updateRevenueSplit(split.id, 'splitPercentage', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Platform Scope</Label>
                          <Select 
                            value={split.platformScope[0]} 
                            onValueChange={(value) => updateRevenueSplit(split.id, 'platformScope', [value])}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="All Revenue">All Revenue</SelectItem>
                              <SelectItem value="Only Streams">Only Streams</SelectItem>
                              <SelectItem value="Only Merch">Only Merch</SelectItem>
                              <SelectItem value="Only Sync">Only Sync</SelectItem>
                              <SelectItem value="Only TikTok">Only TikTok</SelectItem>
                              <SelectItem value="Only Live">Only Live</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Bank Connection</Label>
                          <Select 
                            value={split.bankAuth?.provider || ''} 
                            onValueChange={(value) => updateRevenueSplit(split.id, 'bankAuth', { provider: value, status: 'pending' })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select provider" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Plaid">Plaid</SelectItem>
                              <SelectItem value="Stripe">Stripe</SelectItem>
                              <SelectItem value="PayPal">PayPal</SelectItem>
                              <SelectItem value="Wise">Wise</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input
                            type="email"
                            placeholder="Enter email for invite"
                            value={split.email || ''}
                            onChange={(e) => updateRevenueSplit(split.id, 'email', e.target.value)}
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={split.recoupFirst}
                            onCheckedChange={(checked) => updateRevenueSplit(split.id, 'recoupFirst', checked)}
                          />
                          <Label>Recoup First</Label>
                        </div>
                        <div className="flex items-center justify-end">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRevenueSplit(split.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addRevenueSplit}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Revenue Split
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 'contracts' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Contract Upload */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Contract Upload
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Upload and parse your contract for automatic terms extraction
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        {contractFile ? contractFile.name : 'Upload your contract (PDF, DOCX)'}
                      </p>
                      <input
                        type="file"
                        accept=".pdf,.docx"
                        onChange={(e) => e.target.files?.[0] && handleContractUpload(e.target.files[0])}
                        className="hidden"
                        id="contract-upload"
                      />
                      <Button
                        variant="outline"
                        type="button"
                        size="sm"
                        onClick={() => document.getElementById('contract-upload')?.click()}
                        disabled={contractParsingStatus === 'parsing'}
                      >
                        {contractParsingStatus === 'parsing' ? 'Parsing...' : 'Choose File'}
                      </Button>
                      {contractParsingStatus === 'success' && (
                        <p className="text-sm text-green-600 mt-2">Contract parsed successfully!</p>
                      )}
                      {contractParsingStatus === 'error' && (
                        <p className="text-sm text-red-600 mt-2">Failed to parse contract. Please try again.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Contract Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Contract Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {contracts.map((contract) => (
                      <motion.div
                        key={contract.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-lg"
                      >
                        <div className="space-y-2">
                          <Label>Type</Label>
                          <Select 
                            value={contract.type} 
                            onValueChange={(value) => updateContract(contract.id, 'type', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Distribution">Distribution</SelectItem>
                              <SelectItem value="Licensing">Licensing</SelectItem>
                              <SelectItem value="360">360</SelectItem>
                              <SelectItem value="Admin">Admin</SelectItem>
                              <SelectItem value="Joint Venture">Joint Venture</SelectItem>
                              <SelectItem value="Work For Hire">Work For Hire</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Party</Label>
                          <Input
                            placeholder="Enter party name"
                            value={contract.party}
                            onChange={(e) => updateContract(contract.id, 'party', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Percentage (%)</Label>
                          <Input
                            type="number"
                            placeholder="0"
                            min="0"
                            max="100"
                            value={contract.percentage}
                            onChange={(e) => updateContract(contract.id, 'percentage', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Advance ($)</Label>
                          <Input
                            type="number"
                            placeholder="0.00"
                            value={contract.advance || ''}
                            onChange={(e) => updateContract(contract.id, 'advance', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <Input
                            type="date"
                            value={contract.startDate}
                            onChange={(e) => updateContract(contract.id, 'startDate', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <Input
                            type="date"
                            value={contract.endDate}
                            onChange={(e) => updateContract(contract.id, 'endDate', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Territory</Label>
                          <Select 
                            value={contract.territory[0] || ''} 
                            onValueChange={(value) => updateContract(contract.id, 'territory', [value])}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select territory" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Worldwide">Worldwide</SelectItem>
                              <SelectItem value="North America">North America</SelectItem>
                              <SelectItem value="Europe">Europe</SelectItem>
                              <SelectItem value="Asia">Asia</SelectItem>
                              <SelectItem value="Australia">Australia</SelectItem>
                              <SelectItem value="South America">South America</SelectItem>
                              <SelectItem value="Africa">Africa</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Terms</Label>
                          <Textarea
                            placeholder="Additional terms..."
                            value={contract.terms}
                            onChange={(e) => updateContract(contract.id, 'terms', e.target.value)}
                            rows={2}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 'merch' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5" />
                      Related Merchandise
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Add merchandise items related to this release
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {merchItems.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No merchandise items added yet</p>
                      </div>
                    ) : (
                      merchItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4 border rounded-lg"
                        >
                          <div className="space-y-2">
                            <Label>Item Name</Label>
                            <Input
                              placeholder="T-Shirt, Vinyl, etc."
                              value={item.name}
                              onChange={(e) => updateMerchItem(item.id, 'name', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Type</Label>
                            <Select 
                              value={item.type} 
                              onValueChange={(value) => updateMerchItem(item.id, 'type', value as 'Apparel' | 'Vinyl' | 'CD' | 'Poster' | 'Accessory' | 'Digital')}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Apparel">Apparel</SelectItem>
                                <SelectItem value="Vinyl">Vinyl</SelectItem>
                                <SelectItem value="CD">CD</SelectItem>
                                <SelectItem value="Poster">Poster</SelectItem>
                                <SelectItem value="Accessory">Accessory</SelectItem>
                                <SelectItem value="Digital">Digital</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Price ($)</Label>
                            <Input
                              type="number"
                              placeholder="0.00"
                              value={item.price}
                              onChange={(e) => updateMerchItem(item.id, 'price', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>COGS</Label>
                            <Input
                              type="number"
                              placeholder="0.00"
                              value={item.cogs}
                              onChange={(e) => updateMerchItem(item.id, 'cogs', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Markup</Label>
                            <Input
                              type="number"
                              placeholder="0.00"
                              value={item.markup}
                              onChange={(e) => updateMerchItem(item.id, 'markup', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Description</Label>
                            <Input
                              placeholder="Item description"
                              value={item.description}
                              onChange={(e) => updateMerchItem(item.id, 'description', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>SKU</Label>
                            <Input
                              placeholder="Enter SKU"
                              value={item.sku}
                              onChange={(e) => updateMerchItem(item.id, 'sku', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Platform</Label>
                            <Select 
                              value={item.platform} 
                              onValueChange={(value) => updateMerchItem(item.id, 'platform', value as 'Shopify' | 'Bandcamp' | 'WooCommerce' | 'Printful' | 'Printify' | 'TopDrawer' | 'Spring')}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select platform" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Shopify">Shopify</SelectItem>
                                <SelectItem value="Bandcamp">Bandcamp</SelectItem>
                                <SelectItem value="WooCommerce">WooCommerce</SelectItem>
                                <SelectItem value="Printful">Printful</SelectItem>
                                <SelectItem value="Printify">Printify</SelectItem>
                                <SelectItem value="TopDrawer">TopDrawer</SelectItem>
                                <SelectItem value="Spring">Spring</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Contributes to Recoupment</Label>
                            <Select 
                              value={item.contributesToRecoupment ? "Yes" : "No"}
                              onValueChange={(value) => updateMerchItem(item.id, 'contributesToRecoupment', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select if it contributes to recoupment" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Yes">Yes</SelectItem>
                                <SelectItem value="No">No</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Recoupment Pool</Label>
                            <Select 
                              value={item.recoupmentPool} 
                              onValueChange={(value) => updateMerchItem(item.id, 'recoupmentPool', value as 'General' | 'Isolated')}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select recoupment pool" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="General">General</SelectItem>
                                <SelectItem value="Isolated">Isolated</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Images</Label>
                            <Input
                              placeholder="Enter image URLs separated by commas"
                              value={item.imagesInput || (item.images ? item.images.join(', ') : '')}
                              onChange={(e) => updateMerchItem(item.id, 'imagesInput', e.target.value)}
                            />
                          </div>
                          <div className="flex items-end">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeMerchItem(item.id)}
                              className="w-full"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addMerchItem}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Merchandise Item
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 'review' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Review Content */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Release Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold mb-2">Basic Info</h3>
                        <dl className="space-y-1 text-sm">
                          <dt className="text-muted-foreground">Title</dt>
                          <dd>{formData.title || 'Not set'}</dd>
                          <dt className="text-muted-foreground">Artist</dt>
                          <dd>{formData.artist || 'Not set'}</dd>
                          <dt className="text-muted-foreground">Genre</dt>
                          <dd>{formData.genre || 'Not set'}</dd>
                          <dt className="text-muted-foreground">Release Date</dt>
                          <dd>{formData.releaseDate || 'Not set'}</dd>
                        </dl>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold mb-2">Platforms</h3>
                        <dl className="space-y-1 text-sm">
                          <dt className="text-muted-foreground">Connected</dt>
                          <dd>{platformLinks.filter(p => p.isConnected).length} platforms</dd>
                          <dt className="text-muted-foreground">Pending</dt>
                          <dd>{platformLinks.filter(p => !p.isConnected).length} platforms</dd>
                        </dl>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold mb-2">Financial</h3>
                        <dl className="space-y-1 text-sm">
                          <dt className="text-muted-foreground">Recoupables</dt>
                          <dd>{recoupables.length} items</dd>
                          <dt className="text-muted-foreground">Revenue Splits</dt>
                          <dd>{revenueSplits.length} parties</dd>
                          <dt className="text-muted-foreground">Contracts</dt>
                          <dd>{contracts.length} agreements</dd>
                        </dl>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">Validation Status</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          {formData.title && formData.artist ? (
                            <span className="text-green-600">✓</span>
                          ) : (
                            <span className="text-red-600">✗</span>
                          )}
                          Basic information
                        </li>
                        <li className="flex items-center gap-2">
                          {platformLinks.some(p => p.isConnected) ? (
                            <span className="text-green-600">✓</span>
                          ) : (
                            <span className="text-yellow-600">!</span>
                          )}
                          Platform connections
                        </li>
                        <li className="flex items-center gap-2">
                          {revenueSplits.length > 0 ? (
                            <span className="text-green-600">✓</span>
                          ) : (
                            <span className="text-yellow-600">!</span>
                          )}
                          Revenue splits
                        </li>
                        <li className="flex items-center gap-2">
                          {contracts.some(c => c.parsedTerms) ? (
                            <span className="text-green-600">✓</span>
                          ) : (
                            <span className="text-yellow-600">!</span>
                          )}
                          Contract terms
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const currentIndex = releaseSteps.findIndex(s => s.id === currentStep);
                  if (currentIndex > 0) {
                    setCurrentStep(releaseSteps[currentIndex - 1].id);
                  }
                }}
                disabled={currentStep === 'basic'}
              >
                Previous
              </Button>
              
              <Button
                type="button"
                onClick={() => {
                  const currentIndex = releaseSteps.findIndex(s => s.id === currentStep);
                  if (currentIndex < releaseSteps.length - 1) {
                    setCurrentStep(releaseSteps[currentIndex + 1].id);
                  } else {
                    handleSubmit(new Event('submit') as any);
                  }
                }}
              >
                {currentStep === 'review' ? 'Submit Release' : 'Next'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}