
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle2, Clock, AlertCircle, MessageSquare, ThumbsUp, ChevronDown, ChevronUp, History } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample content items for approval
const initialContentItems = [
  {
    id: 1,
    title: "Product Launch Campaign",
    platform: "Multiple",
    author: { name: "Jane Cooper", avatar: "" },
    status: "pending",
    createDate: "2024-05-03T08:30:00",
    content: "Get ready for our exciting new product launch! #innovation #newproduct",
    comments: [
      { id: 1, author: "Wade Warren", text: "Please add more specific product features", date: "2024-05-03T09:15:00" }
    ],
    revisions: [
      { id: 1, date: "2024-05-03T08:30:00", description: "Initial draft" }
    ]
  },
  {
    id: 2,
    title: "Weekly Industry Insights",
    platform: "LinkedIn",
    author: { name: "Cameron Williamson", avatar: "" },
    status: "approved",
    createDate: "2024-05-02T14:20:00",
    content: "Our analysis of this week's industry trends shows a 15% increase in remote collaboration tools adoption. Read our full report here: [link]",
    comments: [],
    revisions: [
      { id: 1, date: "2024-05-02T14:20:00", description: "Initial draft" },
      { id: 2, date: "2024-05-02T16:45:00", description: "Added statistics" },
      { id: 3, date: "2024-05-02T18:10:00", description: "Final approved version" }
    ]
  },
  {
    id: 3,
    title: "Customer Testimonial Series",
    platform: "Instagram",
    author: { name: "Esther Howard", avatar: "" },
    status: "rejected",
    createDate: "2024-05-01T11:05:00",
    content: "\"This product changed our workflow completely!\" - John from Company X #testimonial #customersfirst",
    comments: [
      { id: 1, author: "Jane Cooper", text: "We need explicit permission before posting this customer quote", date: "2024-05-01T11:45:00" }
    ],
    revisions: [
      { id: 1, date: "2024-05-01T11:05:00", description: "Initial draft" }
    ]
  },
  {
    id: 4,
    title: "Holiday Special Promotion",
    platform: "Twitter",
    author: { name: "Wade Warren", avatar: "" },
    status: "in_review",
    createDate: "2024-04-30T16:15:00",
    content: "Holiday special! Get 25% off all premium plans this weekend only. Use code: HOLIDAY25 #specialoffer",
    comments: [],
    revisions: [
      { id: 1, date: "2024-04-30T16:15:00", description: "Initial draft" },
      { id: 2, date: "2024-05-01T09:30:00", description: "Updated discount code" }
    ]
  }
];

const ContentApprovalWorkflow: React.FC = () => {
  const [contentItems, setContentItems] = useState(initialContentItems);
  const [comment, setComment] = useState('');
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const toggleExpand = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setContentItems(items => 
      items.map(item => 
        item.id === id ? { 
          ...item, 
          status: newStatus,
          revisions: [...item.revisions, { 
            id: item.revisions.length + 1, 
            date: new Date().toISOString(), 
            description: `Status changed to ${newStatus}` 
          }]
        } : item
      )
    );
    
    const statusMessages = {
      approved: "Content approved successfully!",
      rejected: "Content rejected. Author has been notified.",
      in_review: "Content marked for review.",
      pending: "Content returned to pending status."
    };
    
    toast.success(statusMessages[newStatus as keyof typeof statusMessages] || "Status updated");
  };

  const handleAddComment = (id: number) => {
    if (!comment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    
    setContentItems(items => 
      items.map(item => 
        item.id === id ? { 
          ...item, 
          comments: [...item.comments, { 
            id: item.comments.length + 1, 
            author: "You", 
            text: comment, 
            date: new Date().toISOString() 
          }]
        } : item
      )
    );
    
    setComment('');
    toast.success("Comment added successfully");
  };

  // Filter content items based on active filter
  const filteredItems = 
    activeFilter === 'all' ? contentItems : 
    contentItems.filter(item => item.status === activeFilter);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><CheckCircle2 className="h-3 w-3 mr-1" /> Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200"><AlertCircle className="h-3 w-3 mr-1" /> Rejected</Badge>;
      case 'in_review':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200"><Clock className="h-3 w-3 mr-1" /> In Review</Badge>;
      default:
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Content Approval Workflow</h3>
          <p className="text-sm text-muted-foreground">
            Review and approve content before publishing
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className={activeFilter === 'all' ? 'bg-muted' : ''} onClick={() => setActiveFilter('all')}>All</Button>
          <Button variant="outline" size="sm" className={activeFilter === 'pending' ? 'bg-muted' : ''} onClick={() => setActiveFilter('pending')}>Pending</Button>
          <Button variant="outline" size="sm" className={activeFilter === 'in_review' ? 'bg-muted' : ''} onClick={() => setActiveFilter('in_review')}>In Review</Button>
          <Button variant="outline" size="sm" className={activeFilter === 'approved' ? 'bg-muted' : ''} onClick={() => setActiveFilter('approved')}>Approved</Button>
          <Button variant="outline" size="sm" className={activeFilter === 'rejected' ? 'bg-muted' : ''} onClick={() => setActiveFilter('rejected')}>Rejected</Button>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-4 cursor-pointer" onClick={() => toggleExpand(item.id)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.title}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="text-xs">{item.platform}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(item.createDate).toLocaleDateString()}
                          </span>
                          <div className="flex items-center">
                            <Avatar className="h-4 w-4 mr-1">
                              <AvatarFallback className="text-[8px]">
                                {item.author.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs">{item.author.name}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(item.status)}
                      {expandedItems.includes(item.id) ? 
                        <ChevronUp className="h-4 w-4 text-muted-foreground" /> : 
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                    </div>
                  </div>
                </div>

                {expandedItems.includes(item.id) && (
                  <div className="px-4 pb-4">
                    <Separator className="mb-4" />
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-sm mb-2">Content</h5>
                        <div className="border rounded-md p-3 bg-muted/30">
                          <p className="text-sm whitespace-pre-line">{item.content}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-sm mb-2 flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" /> Comments ({item.comments.length})
                          </h5>
                          <div className="border rounded-md p-3 bg-muted/30 space-y-3 max-h-40 overflow-y-auto">
                            {item.comments.length > 0 ? item.comments.map(comment => (
                              <div key={comment.id} className="text-sm border-l-2 border-primary/20 pl-2">
                                <p className="font-medium">{comment.author}</p>
                                <p className="text-muted-foreground">{comment.text}</p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(comment.date).toLocaleString()}
                                </p>
                              </div>
                            )) : (
                              <p className="text-sm text-muted-foreground">No comments yet</p>
                            )}
                          </div>
                          <div className="mt-2 flex gap-2">
                            <Textarea 
                              placeholder="Add a comment..." 
                              className="text-sm min-h-[60px] resize-none" 
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            />
                            <Button size="sm" onClick={() => handleAddComment(item.id)} className="self-end">
                              Send
                            </Button>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-sm mb-2 flex items-center">
                            <History className="h-4 w-4 mr-1" /> Revision History ({item.revisions.length})
                          </h5>
                          <div className="border rounded-md p-3 bg-muted/30 max-h-40 overflow-y-auto">
                            <div className="space-y-2">
                              {item.revisions.map((revision, index) => (
                                <div key={revision.id} className="flex items-center text-sm">
                                  <div className="w-4 h-4 rounded-full bg-primary/20 mr-2 flex-shrink-0"></div>
                                  <div>
                                    <p className="font-medium">{revision.description}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {new Date(revision.date).toLocaleString()}
                                      {index === 0 && " (Created)"}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="mt-2 w-full">
                                View Full History
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Revision History</DialogTitle>
                                <DialogDescription>
                                  Complete history of changes for "{item.title}"
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 max-h-[400px] overflow-y-auto py-4">
                                {item.revisions.map((revision) => (
                                  <div key={revision.id} className="flex items-start">
                                    <div className="w-4 h-4 rounded-full bg-primary/20 mt-1.5 mr-2"></div>
                                    <div className="flex-1">
                                      <p className="font-medium">{revision.description}</p>
                                      <p className="text-sm text-muted-foreground">
                                        {new Date(revision.date).toLocaleString()}
                                      </p>
                                      <Separator className="my-2" />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2 pt-2">
                        {item.status !== 'rejected' && (
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleStatusChange(item.id, 'rejected')}
                          >
                            Reject
                          </Button>
                        )}
                        {item.status !== 'in_review' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleStatusChange(item.id, 'in_review')}
                          >
                            Mark for Review
                          </Button>
                        )}
                        {item.status !== 'approved' && (
                          <Button 
                            variant="default" 
                            size="sm"
                            onClick={() => handleStatusChange(item.id, 'approved')}
                          >
                            Approve
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No content items match the selected filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentApprovalWorkflow;
