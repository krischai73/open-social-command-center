
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookmarkPlus, LightbulbIcon, Star, Tag, ThumbsUp, MessageSquare, Calendar, Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/components/ui/sonner';

// Sample content ideas
const initialIdeas = [
  {
    id: 1,
    title: "Industry trends report for Q2",
    description: "A comprehensive analysis of industry trends based on market research and our product positioning.",
    category: "Thought Leadership",
    tags: ["trends", "analysis", "industry"],
    author: "Jane Cooper",
    votes: 5,
    comments: 2,
    createdAt: "2024-05-01T14:30:00"
  },
  {
    id: 2,
    title: "Customer success story: Company X implementation",
    description: "Highlight how Company X implemented our solution and achieved 45% increase in productivity.",
    category: "Case Study",
    tags: ["success", "implementation", "results"],
    author: "Wade Warren",
    votes: 8,
    comments: 4,
    createdAt: "2024-04-29T09:15:00"
  },
  {
    id: 3,
    title: "10 tips for improving workplace collaboration",
    description: "Practical advice for teams looking to enhance their collaboration processes and tools.",
    category: "How-To Guide",
    tags: ["collaboration", "tips", "workplace"],
    author: "Cameron Williamson",
    votes: 12,
    comments: 7,
    createdAt: "2024-04-28T16:45:00"
  },
  {
    id: 4,
    title: "Product update: New features for Q2",
    description: "Announcing our latest product updates including the most requested features from our community.",
    category: "Product Update",
    tags: ["features", "update", "product"],
    author: "Esther Howard",
    votes: 4,
    comments: 1,
    createdAt: "2024-05-02T11:20:00"
  }
];

const categories = [
  "Thought Leadership",
  "Case Study",
  "How-To Guide",
  "Product Update",
  "Industry News",
  "Interview",
  "Tutorial",
  "Comparison",
  "Review"
];

const ContentIdeas: React.FC = () => {
  const [ideas, setIdeas] = useState(initialIdeas);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState('newest');
  const [newIdea, setNewIdea] = useState({
    title: '',
    description: '',
    category: '',
    tags: ''
  });

  // Handle idea creation
  const handleCreateIdea = () => {
    if (!newIdea.title || !newIdea.description || !newIdea.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    const idea = {
      id: ideas.length + 1,
      title: newIdea.title,
      description: newIdea.description,
      category: newIdea.category,
      tags: newIdea.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      author: "You",
      votes: 0,
      comments: 0,
      createdAt: new Date().toISOString()
    };

    setIdeas([idea, ...ideas]);
    setNewIdea({
      title: '',
      description: '',
      category: '',
      tags: ''
    });
    toast.success("New content idea created!");
  };

  // Handle voting
  const handleVote = (id: number) => {
    setIdeas(ideas.map(idea => 
      idea.id === id ? { ...idea, votes: idea.votes + 1 } : idea
    ));
    toast.success("Vote added!");
  };

  // Filter and sort ideas
  const filteredAndSortedIdeas = ideas
    .filter(idea => {
      const matchesSearch = searchQuery 
        ? idea.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          idea.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          idea.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        : true;
        
      const matchesCategory = selectedCategory 
        ? idea.category === selectedCategory
        : true;
        
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortBy === 'most_voted') {
        return b.votes - a.votes;
      } else {
        return b.comments - a.comments;
      }
    });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Content Ideas Repository</h3>
          <p className="text-sm text-muted-foreground">
            Collect, organize, and collaborate on content ideas
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <Plus className="h-4 w-4" /> New Idea
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Content Idea</DialogTitle>
              <DialogDescription>
                Share your content idea with the team for collaboration
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  placeholder="Enter a title for your content idea"
                  value={newIdea.title}
                  onChange={(e) => setNewIdea({...newIdea, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe your content idea in detail"
                  className="min-h-[100px]"
                  value={newIdea.description}
                  onChange={(e) => setNewIdea({...newIdea, description: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={newIdea.category} 
                  onValueChange={(value) => setNewIdea({...newIdea, category: value})}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input 
                  id="tags" 
                  placeholder="Enter tags separated by commas"
                  value={newIdea.tags}
                  onChange={(e) => setNewIdea({...newIdea, tags: e.target.value})}
                />
                <p className="text-xs text-muted-foreground">Example: blog, social, video</p>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={handleCreateIdea}>Create Idea</Button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <Separator />
      
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="w-full sm:max-w-sm">
          <Input 
            placeholder="Search ideas..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="most_voted">Most Voted</SelectItem>
              <SelectItem value="most_discussed">Most Discussed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {filteredAndSortedIdeas.length > 0 ? (
          filteredAndSortedIdeas.map(idea => (
            <Card key={idea.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {idea.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(idea.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className="font-medium text-lg">{idea.title}</h4>
                    <p className="text-muted-foreground mt-1">{idea.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mt-3">
                      {idea.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />{tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center mt-4 gap-4">
                      <div className="flex items-center">
                        <Avatar className="h-5 w-5 mr-1">
                          <AvatarFallback className="text-[8px]">
                            {idea.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs">{idea.author}</span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground gap-3">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 text-xs gap-1"
                          onClick={() => handleVote(idea.id)}
                        >
                          <ThumbsUp className="h-3 w-3" /> {idea.votes}
                        </Button>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" /> {idea.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:flex flex-col items-end gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Calendar className="h-3 w-3" /> Schedule
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <BookmarkPlus className="h-3 w-3" /> Save
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <LightbulbIcon className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No content ideas found. Create a new one!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentIdeas;
