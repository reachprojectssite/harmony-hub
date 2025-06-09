import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Upload, Music, Calendar, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddReleaseDialogProps {
  children: React.ReactNode;
}

export default function AddReleaseDialog({ children }: AddReleaseDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    genre: '',
    releaseDate: '',
    description: '',
    productionCost: '',
    marketingBudget: '',
    expectedRevenue: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Release Added Successfully!",
        description: `"${formData.title}" by ${formData.artist} has been added to your catalog.`,
      });
      setOpen(false);
      setFormData({
        title: '',
        artist: '',
        genre: '',
        releaseDate: '',
        description: '',
        productionCost: '',
        marketingBudget: '',
        expectedRevenue: ''
      });
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Music className="h-5 w-5 text-primary" />
            Add New Release
          </DialogTitle>
        </DialogHeader>
        
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Track Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter track title"
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
                placeholder="Describe your release..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {/* Financial Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Financial Planning
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="productionCost">Production Cost</Label>
                <Input
                  id="productionCost"
                  type="number"
                  placeholder="0.00"
                  value={formData.productionCost}
                  onChange={(e) => handleInputChange('productionCost', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="marketingBudget">Marketing Budget</Label>
                <Input
                  id="marketingBudget"
                  type="number"
                  placeholder="0.00"
                  value={formData.marketingBudget}
                  onChange={(e) => handleInputChange('marketingBudget', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expectedRevenue">Expected Revenue</Label>
                <Input
                  id="expectedRevenue"
                  type="number"
                  placeholder="0.00"
                  value={formData.expectedRevenue}
                  onChange={(e) => handleInputChange('expectedRevenue', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Files
            </h3>
            
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag and drop your audio files here, or click to browse
              </p>
              <Button variant="outline" type="button">
                Choose Files
              </Button>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
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
              className="flex-1 harmony-gradient text-white"
              disabled={!formData.title || !formData.artist}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Release
            </Button>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
}