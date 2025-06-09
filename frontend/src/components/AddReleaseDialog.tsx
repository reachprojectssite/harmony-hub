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
  Headphones
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
}

interface Recoupable {
  id: string;
  type: string;
  amount: string;
  description: string;
  priority: number;
}

interface Contract {
  id: string;
  type: string;
  party: string;
  percentage: string;
  terms: string;
}

interface MerchItem {
  id: string;
  name: string;
  type: string;
  price: string;
  description: string;
}

export default function AddReleaseDialog({ children }: AddReleaseDialogProps) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  
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

  // Platform Links
  const [platformLinks, setPlatformLinks] = useState<PlatformLink[]>([
    { id: '1', platform: 'Spotify', url: '', isConnected: false },
    { id: '2', platform: 'Apple Music', url: '', isConnected: false },
    { id: '3', platform: 'YouTube Music', url: '', isConnected: false },
    { id: '4', platform: 'SoundCloud', url: '', isConnected: false },
    { id: '5', platform: 'Bandcamp', url: '', isConnected: false },
    { id: '6', platform: 'TikTok', url: '', isConnected: false },
    { id: '7', platform: 'Instagram', url: '', isConnected: false },
  ]);

  // Recoupables
  const [recoupables, setRecoupables] = useState<Recoupable[]>([
    { id: '1', type: 'Production Cost', amount: '', description: '', priority: 1 },
    { id: '2', type: 'Marketing Budget', amount: '', description: '', priority: 2 },
    { id: '3', type: 'Distribution Fee', amount: '', description: '', priority: 3 },
  ]);

  // Contracts & Revenue Splits
  const [contracts, setContracts] = useState<Contract[]>([
    { id: '1', type: 'Artist', party: '', percentage: '', terms: '' },
    { id: '2', type: 'Producer', party: '', percentage: '', terms: '' },
    { id: '3', type: 'Songwriter', party: '', percentage: '', terms: '' },
    { id: '4', type: 'Label', party: '', percentage: '', terms: '' },
  ]);

  // Merchandise
  const [merchItems, setMerchItems] = useState<MerchItem[]>([]);

  const { toast } = useToast();

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
    setActiveTab('basic');
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
      type: '',
      amount: '',
      description: '',
      priority: prev.length + 1
    }]);
  };

  const removeRecoupable = (id: string) => {
    setRecoupables(prev => prev.filter(item => item.id !== id));
  };

  const updateContract = (id: string, field: string, value: string) => {
    setContracts(prev => 
      prev.map(contract => 
        contract.id === id ? { ...contract, [field]: value } : contract
      )
    );
  };

  const addMerchItem = () => {
    const newId = (merchItems.length + 1).toString();
    setMerchItems(prev => [...prev, {
      id: newId,
      name: '',
      type: '',
      price: '',
      description: ''
    }]);
  };

  const updateMerchItem = (id: string, field: string, value: string) => {
    setMerchItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const removeMerchItem = (id: string) => {
    setMerchItems(prev => prev.filter(item => item.id !== id));
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'spotify': return <div className="h-4 w-4 bg-green-500 rounded-full" />;
      case 'youtube music': return <Youtube className="h-4 w-4 text-red-500" />;
      case 'instagram': return <Instagram className="h-4 w-4 text-pink-500" />;
      case 'tiktok': return <div className="h-4 w-4 bg-black rounded-full" />;
      default: return <Headphones className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[1200px] h-[95vh] max-h-[900px] p-0 gap-0 flex flex-col">
        <DialogHeader className="px-6 py-4 border-b border-border/50 flex-shrink-0">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Music className="h-6 w-6 text-primary" />
            Add New Release
          </DialogTitle>
        </DialogHeader>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 flex flex-col min-h-0"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
            <div className="px-6 py-3 border-b border-border/50 flex-shrink-0">
              <TabsList className="grid w-full grid-cols-5 h-10">
                <TabsTrigger value="basic" className="text-xs px-2">Basic Info</TabsTrigger>
                <TabsTrigger value="platforms" className="text-xs px-2">Platforms</TabsTrigger>
                <TabsTrigger value="financial" className="text-xs px-2">Financial</TabsTrigger>
                <TabsTrigger value="contracts" className="text-xs px-2">Contracts</TabsTrigger>
                <TabsTrigger value="merch" className="text-xs px-2">Merchandise</TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 min-h-0">
              <ScrollArea className="h-full">
                <div className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information Tab */}
                    <TabsContent value="basic" className="space-y-6 mt-0">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                      >
                        {/* Primary Details */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Release Details</CardTitle>
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

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

                              <div className="space-y-2">
                                <Label htmlFor="label">Record Label</Label>
                                <Input
                                  id="label"
                                  placeholder="Enter label name"
                                  value={formData.label}
                                  onChange={(e) => handleInputChange('label', e.target.value)}
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

                        {/* Technical Details */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Technical Information</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="isrc">ISRC Code</Label>
                                <Input
                                  id="isrc"
                                  placeholder="US-XXX-XX-XXXXX"
                                  value={formData.isrc}
                                  onChange={(e) => handleInputChange('isrc', e.target.value)}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="upc">UPC/EAN Code</Label>
                                <Input
                                  id="upc"
                                  placeholder="123456789012"
                                  value={formData.upc}
                                  onChange={(e) => handleInputChange('upc', e.target.value)}
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="copyright">Copyright Owner</Label>
                                <Input
                                  id="copyright"
                                  placeholder="© 2024 Artist Name"
                                  value={formData.copyright}
                                  onChange={(e) => handleInputChange('copyright', e.target.value)}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="publishingRights">Publishing Rights</Label>
                                <Input
                                  id="publishingRights"
                                  placeholder="Publishing company or self-published"
                                  value={formData.publishingRights}
                                  onChange={(e) => handleInputChange('publishingRights', e.target.value)}
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* File Upload */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Upload className="h-5 w-5" />
                              Upload Files
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                                <Music className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground mb-2">Audio File</p>
                                <Button variant="outline" type="button" size="sm">
                                  Choose Audio
                                </Button>
                              </div>
                              
                              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                                <div className="h-8 w-8 mx-auto mb-2 bg-muted rounded" />
                                <p className="text-sm text-muted-foreground mb-2">Artwork</p>
                                <Button variant="outline" type="button" size="sm">
                                  Choose Image
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </TabsContent>

                    {/* Platform Links Tab */}
                    <TabsContent value="platforms" className="space-y-6 mt-0">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                      >
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                              <LinkIcon className="h-5 w-5" />
                              Platform Integration
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                              Connect your artist accounts and add direct links to your release
                            </p>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {platformLinks.map((link) => (
                              <motion.div
                                key={link.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex flex-col lg:flex-row lg:items-center gap-4 p-4 border rounded-lg"
                              >
                                <div className="flex items-center gap-3 lg:flex-1 lg:min-w-0">
                                  {getPlatformIcon(link.platform)}
                                  <span className="font-medium">{link.platform}</span>
                                  <Badge variant={link.isConnected ? "default" : "secondary"}>
                                    {link.isConnected ? "Connected" : "Not Connected"}
                                  </Badge>
                                </div>
                                
                                <div className="flex items-center gap-2 lg:flex-1">
                                  <Input
                                    placeholder={`${link.platform} URL or Artist ID`}
                                    value={link.url}
                                    onChange={(e) => updatePlatformLink(link.id, 'url', e.target.value)}
                                    className="flex-1"
                                  />
                                  <Switch
                                    checked={link.isConnected}
                                    onCheckedChange={(checked) => updatePlatformLink(link.id, 'isConnected', checked)}
                                  />
                                </div>
                              </motion.div>
                            ))}
                          </CardContent>
                        </Card>
                      </motion.div>
                    </TabsContent>

                    {/* Financial Tab */}
                    <TabsContent value="financial" className="space-y-6 mt-0">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                      >
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                              <DollarSign className="h-5 w-5" />
                              Recoupable Costs
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                              Define costs that need to be recouped before profit sharing
                            </p>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {recoupables.map((item, index) => (
                              <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-lg"
                              >
                                <div className="space-y-2">
                                  <Label>Cost Type</Label>
                                  <Select 
                                    value={item.type} 
                                    onValueChange={(value) => updateRecoupable(item.id, 'type', value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Production Cost">Production Cost</SelectItem>
                                      <SelectItem value="Marketing Budget">Marketing Budget</SelectItem>
                                      <SelectItem value="Distribution Fee">Distribution Fee</SelectItem>
                                      <SelectItem value="Advance Payment">Advance Payment</SelectItem>
                                      <SelectItem value="Studio Rental">Studio Rental</SelectItem>
                                      <SelectItem value="Mixing & Mastering">Mixing & Mastering</SelectItem>
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
                                  <Label>Priority</Label>
                                  <Select 
                                    value={item.priority.toString()} 
                                    onValueChange={(value) => updateRecoupable(item.id, 'priority', parseInt(value))}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="1">1 (Highest)</SelectItem>
                                      <SelectItem value="2">2</SelectItem>
                                      <SelectItem value="3">3</SelectItem>
                                      <SelectItem value="4">4</SelectItem>
                                      <SelectItem value="5">5 (Lowest)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                
                                <div className="flex items-end">
                                  <Button
                                    type="button"
                                    variant="outline"
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
                              Add Recoupable Cost
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </TabsContent>

                    {/* Contracts Tab */}
                    <TabsContent value="contracts" className="space-y-6 mt-0">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                      >
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                              <FileText className="h-5 w-5" />
                              Revenue Splits & Contracts
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                              Define how revenue will be split among stakeholders after recoupment
                            </p>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {contracts.map((contract, index) => (
                              <motion.div
                                key={contract.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-lg"
                              >
                                <div className="space-y-2">
                                  <Label>Role</Label>
                                  <Select 
                                    value={contract.type} 
                                    onValueChange={(value) => updateContract(contract.id, 'type', value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Artist">Artist</SelectItem>
                                      <SelectItem value="Producer">Producer</SelectItem>
                                      <SelectItem value="Songwriter">Songwriter</SelectItem>
                                      <SelectItem value="Label">Label</SelectItem>
                                      <SelectItem value="Manager">Manager</SelectItem>
                                      <SelectItem value="Publisher">Publisher</SelectItem>
                                      <SelectItem value="Investor">Investor</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                
                                <div className="space-y-2">
                                  <Label>Party Name</Label>
                                  <Input
                                    placeholder="Enter name"
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
                                  <Label>Terms</Label>
                                  <Input
                                    placeholder="Contract terms"
                                    value={contract.terms}
                                    onChange={(e) => updateContract(contract.id, 'terms', e.target.value)}
                                  />
                                </div>
                              </motion.div>
                            ))}
                            
                            <div className="p-4 bg-muted/50 rounded-lg">
                              <p className="text-sm text-muted-foreground">
                                Total Percentage: {contracts.reduce((sum, contract) => sum + (parseFloat(contract.percentage) || 0), 0)}%
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </TabsContent>

                    {/* Merchandise Tab */}
                    <TabsContent value="merch" className="space-y-6 mt-0">
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
                                      onValueChange={(value) => updateMerchItem(item.id, 'type', value)}
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
                                    <Label>Description</Label>
                                    <Input
                                      placeholder="Item description"
                                      value={item.description}
                                      onChange={(e) => updateMerchItem(item.id, 'description', e.target.value)}
                                    />
                                  </div>
                                  
                                  <div className="flex items-end">
                                    <Button
                                      type="button"
                                      variant="outline"
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
                    </TabsContent>
                  </form>
                </div>
              </ScrollArea>
            </div>

            {/* Submit Buttons - Fixed at bottom */}
            <div className="px-6 py-4 border-t border-border/50 flex-shrink-0">
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  className="flex-1 harmony-gradient text-white"
                  disabled={!formData.title || !formData.artist}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Release
                </Button>
              </div>
            </div>
          </Tabs>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}