
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Store, Download, Star, Search, Filter, Plus, BookmarkPlus } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const templates = [
  {
    id: '1',
    title: 'Social Media Calendar',
    description: 'A complete workflow for planning your social media content',
    category: 'Workflow',
    rating: 4.8,
    downloads: 1254,
    author: 'Jane Cooper',
    authorAvatar: '',
    featured: true,
    free: true
  },
  {
    id: '2',
    title: 'Content Approval Pipeline',
    description: 'Streamlined approval process for team collaboration',
    category: 'Team',
    rating: 4.5,
    downloads: 872,
    author: 'Alex Johnson',
    authorAvatar: '',
    featured: false,
    free: false
  },
  {
    id: '3',
    title: 'Analytics Dashboard',
    description: 'Custom analytics dashboard for performance tracking',
    category: 'Analytics',
    rating: 4.9,
    downloads: 2145,
    author: 'Sarah Smith',
    authorAvatar: '',
    featured: true,
    free: false
  },
  {
    id: '4',
    title: 'Content Ideas Generator',
    description: 'AI-powered content idea generation template',
    category: 'Content',
    rating: 4.7,
    downloads: 1568,
    author: 'Mike Wilson',
    authorAvatar: '',
    featured: false,
    free: true
  }
];

const myTemplates = [
  {
    id: '101',
    title: 'Weekly Report Template',
    description: 'Template for creating consistent weekly reports',
    category: 'Analytics',
    published: true,
    downloads: 78,
    rating: 4.6,
    lastUpdated: '2025-05-01'
  }
];

export const TemplateMarketplace: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('discover');
  
  const handleDownload = (templateId: string, templateName: string) => {
    toast.success(`Template "${templateName}" downloaded successfully!`);
  };
  
  const handlePublishTemplate = () => {
    toast.success('Template submitted for review!');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Store className="h-5 w-5 text-brand-600" />
          Template Marketplace
        </CardTitle>
        <CardDescription>
          Discover and share workflow templates with the community
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="discover" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="myTemplates">My Templates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="discover" className="space-y-4 pt-4">
            <div className="flex gap-4 flex-col md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search templates..." 
                  className="pl-10" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map(template => (
                <Card key={template.id} className={`border overflow-hidden ${template.featured ? 'border-brand-200 bg-brand-50/30' : ''}`}>
                  {template.featured && (
                    <div className="bg-brand-600 text-white px-3 py-1 text-xs font-medium">
                      Featured Template
                    </div>
                  )}
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{template.title}</CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </div>
                      <Badge variant={template.free ? "outline" : "secondary"}>
                        {template.free ? 'Free' : 'Premium'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={template.authorAvatar} alt={template.author} />
                          <AvatarFallback className="text-xs">
                            {template.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{template.author}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                        <span>{template.rating}</span>
                        <span className="text-muted-foreground ml-1">({template.downloads})</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <Badge variant="outline" className="bg-muted">
                      {template.category}
                    </Badge>
                    <Button 
                      size="sm"
                      variant="default"
                      className="gap-2"
                      onClick={() => handleDownload(template.id, template.title)}
                    >
                      <Download className="h-4 w-4" />
                      {template.free ? 'Download' : 'Purchase'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="myTemplates" className="space-y-6 pt-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">My Published Templates</h3>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Create New Template
              </Button>
            </div>
            
            {myTemplates.length > 0 ? (
              <div className="space-y-4">
                {myTemplates.map(template => (
                  <Card key={template.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">{template.title}</CardTitle>
                        <Badge variant={template.published ? "outline" : "secondary"} className="bg-green-50 text-green-700 border-green-200">
                          Published
                        </Badge>
                      </div>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div>
                          <span className="font-medium">Downloads:</span> {template.downloads}
                        </div>
                        <div>
                          <span className="font-medium">Rating:</span> {template.rating}/5
                        </div>
                        <div>
                          <span className="font-medium">Last Updated:</span> {template.lastUpdated}
                        </div>
                        <div>
                          <Badge variant="outline" className="bg-muted">
                            {template.category}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end pt-0 gap-2">
                      <Button variant="outline" size="sm">
                        Edit Template
                      </Button>
                      <Button variant="outline" size="sm">
                        Analytics
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="border border-dashed rounded-lg p-8 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <BookmarkPlus className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-1">No templates yet</h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-4">
                  Share your workflows with the community by publishing templates
                </p>
                <Button onClick={handlePublishTemplate}>
                  Create Your First Template
                </Button>
              </div>
            )}
            
            <div className="bg-muted/50 rounded-md p-4 text-sm">
              <h4 className="font-medium mb-2">How to create a template</h4>
              <ol className="space-y-2 pl-5 list-decimal">
                <li>Create your workflow in SocialCommand</li>
                <li>Go to the workflow settings and click "Save as Template"</li>
                <li>Fill in the template details and submit for review</li>
                <li>Once approved, your template will be published to the marketplace</li>
              </ol>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
