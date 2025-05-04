
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Grid2X2, List, Image, FileText, FileImage, FileVideo, Download, Share2, Trash2, Upload, Search, Plus, Tag } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';

// Sample assets
const initialAssets = [
  {
    id: 1,
    name: "Product Hero Image",
    type: "image",
    url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7",
    tags: ["product", "hero", "featured"],
    uploadedBy: "Jane Cooper",
    uploadedAt: "2024-04-25T14:30:00",
    size: "2.4 MB",
    dimensions: "1920x1080"
  },
  {
    id: 2,
    name: "Brand Guidelines",
    type: "document",
    url: "#",
    tags: ["brand", "guidelines", "official"],
    uploadedBy: "Wade Warren",
    uploadedAt: "2024-04-20T09:15:00",
    size: "1.8 MB",
    dimensions: ""
  },
  {
    id: 3,
    name: "Product Demo Video",
    type: "video",
    url: "#",
    tags: ["demo", "product", "tutorial"],
    uploadedBy: "Cameron Williamson",
    uploadedAt: "2024-04-18T16:45:00",
    size: "18.6 MB",
    dimensions: "1920x1080"
  },
  {
    id: 4,
    name: "Team Photo",
    type: "image",
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
    tags: ["team", "people", "office"],
    uploadedBy: "Esther Howard",
    uploadedAt: "2024-04-15T11:20:00",
    size: "3.2 MB",
    dimensions: "2400x1600"
  },
  {
    id: 5,
    name: "Q1 Results Infographic",
    type: "image",
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    tags: ["results", "data", "infographic"],
    uploadedBy: "Jane Cooper",
    uploadedAt: "2024-04-10T10:30:00",
    size: "1.5 MB",
    dimensions: "1200x1800"
  },
  {
    id: 6,
    name: "Customer Testimonial Video",
    type: "video",
    url: "#",
    tags: ["testimonial", "customer", "interview"],
    uploadedBy: "Wade Warren",
    uploadedAt: "2024-04-05T15:20:00",
    size: "24.2 MB",
    dimensions: "1920x1080"
  }
];

const AssetLibrary: React.FC = () => {
  const [assets, setAssets] = useState(initialAssets);
  const [searchQuery, setSearchQuery] = useState('');
  const [assetType, setAssetType] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedAssets, setSelectedAssets] = useState<number[]>([]);
  const [newAsset, setNewAsset] = useState({
    name: '',
    type: 'image',
    url: '',
    tags: ''
  });
  
  // Handle asset upload
  const handleUploadAsset = () => {
    if (!newAsset.name || !newAsset.url) {
      toast.error("Please fill in all required fields");
      return;
    }

    const asset = {
      id: assets.length + 1,
      name: newAsset.name,
      type: newAsset.type,
      url: newAsset.url,
      tags: newAsset.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      uploadedBy: "You",
      uploadedAt: new Date().toISOString(),
      size: "1.0 MB", // Placeholder
      dimensions: newAsset.type === 'document' ? "" : "1200x800" // Placeholder
    };

    setAssets([asset, ...assets]);
    setNewAsset({
      name: '',
      type: 'image',
      url: '',
      tags: ''
    });
    toast.success("Asset uploaded successfully!");
  };

  // Handle asset selection
  const toggleAssetSelection = (id: number) => {
    setSelectedAssets(prev => 
      prev.includes(id) ? prev.filter(assetId => assetId !== id) : [...prev, id]
    );
  };

  // Handle asset deletion
  const handleDeleteAssets = () => {
    if (selectedAssets.length === 0) {
      toast.error("Please select assets to delete");
      return;
    }
    
    setAssets(assets.filter(asset => !selectedAssets.includes(asset.id)));
    setSelectedAssets([]);
    toast.success(`${selectedAssets.length} asset(s) deleted`);
  };

  // Filter assets
  const filteredAssets = assets.filter(asset => {
    const matchesSearch = searchQuery 
      ? asset.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        asset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;
      
    const matchesType = assetType 
      ? asset.type === assetType
      : true;
      
    return matchesSearch && matchesType;
  });

  // Asset type icon mapping
  const getAssetTypeIcon = (type: string) => {
    switch(type) {
      case 'image':
        return <FileImage className="h-4 w-4 text-blue-500" />;
      case 'video':
        return <FileVideo className="h-4 w-4 text-red-500" />;
      case 'document':
        return <FileText className="h-4 w-4 text-amber-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Asset Library</h3>
          <p className="text-sm text-muted-foreground">
            Organize and manage all your media assets
          </p>
        </div>
        <div className="flex gap-2">
          {selectedAssets.length > 0 && (
            <Button 
              variant="destructive" 
              size="sm" 
              className="gap-1"
              onClick={handleDeleteAssets}
            >
              <Trash2 className="h-4 w-4" /> Delete {selectedAssets.length}
            </Button>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1">
                <Upload className="h-4 w-4" /> Upload Asset
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload New Asset</DialogTitle>
                <DialogDescription>
                  Add a new asset to your library
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="asset-name">Asset Name</Label>
                  <Input 
                    id="asset-name" 
                    placeholder="Enter asset name"
                    value={newAsset.name}
                    onChange={(e) => setNewAsset({...newAsset, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="asset-type">Asset Type</Label>
                  <Select 
                    value={newAsset.type} 
                    onValueChange={(value) => setNewAsset({...newAsset, type: value})}
                  >
                    <SelectTrigger id="asset-type">
                      <SelectValue placeholder="Select asset type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="document">Document</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="asset-url">Asset URL</Label>
                  <Input 
                    id="asset-url" 
                    placeholder="Enter asset URL"
                    value={newAsset.url}
                    onChange={(e) => setNewAsset({...newAsset, url: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground">Enter URL or integration path</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="asset-tags">Tags</Label>
                  <Input 
                    id="asset-tags" 
                    placeholder="Enter tags separated by commas"
                    value={newAsset.tags}
                    onChange={(e) => setNewAsset({...newAsset, tags: e.target.value})}
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button onClick={handleUploadAsset}>Upload</Button>
                  </DialogClose>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Separator />
      
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search assets..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Select value={assetType} onValueChange={setAssetType}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Asset Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Asset Types</SelectItem>
              <SelectItem value="image">Images</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
              <SelectItem value="document">Documents</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-1 bg-muted rounded-md">
            <Button 
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'} 
              size="sm" 
              className="h-9 px-3"
              onClick={() => setViewMode('grid')}
            >
              <Grid2X2 className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
              size="sm" 
              className="h-9 px-3"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredAssets.length > 0 ? (
            filteredAssets.map(asset => (
              <Card key={asset.id} className={`overflow-hidden ${selectedAssets.includes(asset.id) ? 'ring-2 ring-primary' : ''}`}>
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="absolute top-2 left-2 z-10">
                      <Checkbox 
                        checked={selectedAssets.includes(asset.id)}
                        onCheckedChange={() => toggleAssetSelection(asset.id)}
                        className="bg-white/80 border-white/80"
                      />
                    </div>
                    <div 
                      className="h-32 bg-muted flex items-center justify-center cursor-pointer"
                      onClick={() => toggleAssetSelection(asset.id)}
                    >
                      {asset.type === 'image' ? (
                        <img 
                          src={asset.url} 
                          alt={asset.name} 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          {getAssetTypeIcon(asset.type)}
                          <span className="mt-1 text-sm">{asset.type.charAt(0).toUpperCase() + asset.type.slice(1)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm truncate" title={asset.name}>{asset.name}</h4>
                      {getAssetTypeIcon(asset.type)}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {asset.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {asset.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{asset.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-muted-foreground">
                        {asset.size}
                      </span>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <Download className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <Share2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <Image className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">No assets found with the current filters</p>
            </div>
          )}
        </div>
      ) : (
        <div className="border rounded-md divide-y">
          <div className="grid grid-cols-12 gap-4 p-3 bg-muted/50 text-sm font-medium">
            <div className="col-span-1"></div>
            <div className="col-span-5">Name</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2">Size</div>
            <div className="col-span-2">Actions</div>
          </div>
          {filteredAssets.length > 0 ? (
            filteredAssets.map(asset => (
              <div 
                key={asset.id} 
                className={`grid grid-cols-12 gap-4 p-3 items-center ${selectedAssets.includes(asset.id) ? 'bg-muted/30' : ''}`}
              >
                <div className="col-span-1">
                  <Checkbox 
                    checked={selectedAssets.includes(asset.id)}
                    onCheckedChange={() => toggleAssetSelection(asset.id)}
                  />
                </div>
                <div className="col-span-5 flex items-center gap-2">
                  <div className="w-8 h-8 bg-muted rounded flex items-center justify-center flex-shrink-0">
                    {getAssetTypeIcon(asset.type)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{asset.name}</p>
                    <div className="flex gap-1 mt-0.5">
                      {asset.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs py-0 px-1">
                          {tag}
                        </Badge>
                      ))}
                      {asset.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs py-0 px-1">
                          +{asset.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-span-2 text-sm">
                  {asset.type.charAt(0).toUpperCase() + asset.type.slice(1)}
                </div>
                <div className="col-span-2 text-sm text-muted-foreground">
                  {asset.size}
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No assets found with the current filters</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AssetLibrary;
