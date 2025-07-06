import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ImageUpload } from '@/components/ui/image-upload';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useLocation } from 'wouter';
import { Loader2, Plus, Edit, Trash2, LogOut, Home, MessageSquare, Mail, Reply, Calendar, User, Phone, AlertCircle, Eye, EyeOff, CheckCircle, Clock, Send, Box } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { format } from 'date-fns';
import type { Product, Category, Subcategory, InsertProduct, SupportRequest } from '@shared/schema';

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { user, logoutMutation, isLoading } = useAdminAuth();
  const { toast } = useToast();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [replyingTo, setReplyingTo] = useState<SupportRequest | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  // Queries
  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['/api/admin/products'],
    enabled: !!user,
  });

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['/api/categories'],
    enabled: !!user,
  });

  const { data: subcategories = [], isLoading: subcategoriesLoading } = useQuery({
    queryKey: ['/api/subcategories'],
    enabled: !!user,
  });

  const { data: supportRequests = [], isLoading: supportRequestsLoading } = useQuery({
    queryKey: ['/api/admin/support-requests'],
    enabled: !!user,
  });

  // Mutations
  const createProductMutation = useMutation({
    mutationFn: async (data: InsertProduct) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === 'keyFeatures' && Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value.toString());
          }
        }
      });
      return apiRequest('/api/admin/products', { method: 'POST', body: formData });
    },
    onSuccess: () => {
      toast({ title: "Product created successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/products'] });
    },
    onError: () => {
      toast({ title: "Failed to create product", variant: "destructive" });
    }
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertProduct> }) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === 'keyFeatures' && Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value.toString());
          }
        }
      });
      return apiRequest(`/api/admin/products/${id}`, { method: 'PUT', body: formData });
    },
    onSuccess: () => {
      toast({ title: "Product updated successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/products'] });
      setEditingProduct(null);
    },
    onError: () => {
      toast({ title: "Failed to update product", variant: "destructive" });
    }
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest(`/api/admin/products/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      toast({ title: "Product deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/products'] });
    },
    onError: () => {
      toast({ title: "Failed to delete product", variant: "destructive" });
    }
  });

  // Mark as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/admin/support-read/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) {
        throw new Error('Failed to mark as read');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/support-requests'] });
      toast({ title: "Marked as read successfully" });
    },
    onError: () => {
      toast({ title: "Failed to mark as read", variant: "destructive" });
    }
  });

  // Reply mutation
  const replyMutation = useMutation({
    mutationFn: async ({ id, message }: { id: number; message: string }) => {
      return apiRequest('/api/admin/support-reply', {
        method: 'POST',
        body: { id, message }
      });
    },
    onSuccess: () => {
      toast({ title: "Reply sent successfully" });
      setReplyingTo(null);
      setReplyMessage('');
      queryClient.invalidateQueries({ queryKey: ['/api/admin/support-requests'] });
    },
    onError: () => {
      toast({ title: "Failed to send reply", variant: "destructive" });
    }
  });

  // Helper functions
  const getSupportTypeColor = (type: string) => {
    switch (type) {
      case 'technical': return 'bg-[#0A2342]';
      case 'installation': return 'bg-[#333333]';
      case 'product-info': return 'bg-[#0A2342]';
      case 'warranty': return 'bg-[#FFC300]';
      case 'billing': return 'bg-[#FF6F00]';
      case 'general': return 'bg-[#333333]';
      case 'emergency': return 'bg-[#FF6F00]';
      default: return 'bg-[#333333]';
    }
  };

  const getSupportTypeLabel = (type: string) => {
    switch (type) {
      case 'technical': return 'Technical';
      case 'installation': return 'Installation';
      case 'product-info': return 'Product Info';
      case 'warranty': return 'Warranty';
      case 'billing': return 'Billing';
      case 'general': return 'General';
      case 'emergency': return 'Emergency';
      default: return 'General';
    }
  };

  const getUnreadCount = () => {
    return supportRequests.filter(req => !req.isRead).length;
  };

  const getPendingRepliesCount = () => {
    return supportRequests.filter(req => !req.hasReplied).length;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You need to be logged in as an admin to access this page.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF6EC]">
      {/* Header */}
      <div className="bg-[#0A2342] shadow-sm border-b border-[#FFC300]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocation('/')}
                className="text-[#FFC300] hover:text-white hover:bg-[#0A2342]/80"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Website
              </Button>
              <h1 className="text-xl font-semibold text-white">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-[#FDF6EC]">Welcome, {user.username}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
                className="border-[#FFC300] text-[#FFC300] hover:bg-[#FFC300] hover:text-[#0A2342]"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="products" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 bg-white border border-[#0A2342]">
            <TabsTrigger value="products" className="flex items-center gap-2 data-[state=active]:bg-[#0A2342] data-[state=active]:text-white text-[#0A2342]">
              <Box className="w-4 h-4" />
              Products
              <Badge variant="secondary" className="ml-2 bg-[#FFC300] text-[#0A2342]">
                {products.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-2 data-[state=active]:bg-[#0A2342] data-[state=active]:text-white text-[#0A2342]">
              <MessageSquare className="w-4 h-4" />
              Support Requests
              <Badge variant="secondary" className="ml-2 bg-[#FFC300] text-[#0A2342]">
                {supportRequests.length}
              </Badge>
              {getUnreadCount() > 0 && (
                <Badge variant="destructive" className="ml-1">
                  {getUnreadCount()} unread
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Product Management</CardTitle>
                    <CardDescription>Manage your product catalog</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-[#FFC300] hover:bg-[#FF6F00] text-[#0A2342] border-none">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Product
                      </Button>
                    </DialogTrigger>
                    <ProductDialog
                      categories={categories}
                      subcategories={subcategories}
                      onSubmit={createProductMutation.mutate}
                      isLoading={createProductMutation.isPending}
                    />
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {productsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin" />
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Subcategory</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => {
                        const category = categories.find(c => c.id === product.categoryId);
                        const subcategory = subcategories.find(s => s.id === product.subcategoryId);
                        return (
                          <TableRow key={product.id}>
                            <TableCell>
                              <img
                                src={product.image || '/placeholder.svg'}
                                alt={product.name}
                                className="w-10 h-10 object-cover rounded"
                              />
                            </TableCell>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{category?.name || 'None'}</TableCell>
                            <TableCell>{subcategory?.name || 'None'}</TableCell>
                            <TableCell>R{product.price}</TableCell>
                            <TableCell>
                              <Badge variant={product.featured ? "default" : "secondary"} className={product.featured ? "bg-[#FFC300] text-[#0A2342] hover:bg-[#FF6F00]" : "bg-[#333333] text-white"}>
                                {product.featured ? "Featured" : "Regular"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={product.inStock ? "default" : "destructive"} className={product.inStock ? "bg-[#333333] text-white" : "bg-[#FF6F00] text-white"}>
                                {product.inStock ? "In Stock" : "Out of Stock"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => setEditingProduct(product)}
                                      className="border-[#0A2342] text-[#0A2342] hover:bg-[#0A2342] hover:text-white"
                                    >
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <ProductDialog
                                    categories={categories}
                                    subcategories={subcategories}
                                    product={editingProduct}
                                    onSubmit={(data: InsertProduct) => updateProductMutation.mutate({ id: product.id, data })}
                                    isLoading={updateProductMutation.isPending}
                                  />
                                </Dialog>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    if (confirm('Are you sure you want to delete this product?')) {
                                      deleteProductMutation.mutate(product.id);
                                    }
                                  }}
                                  disabled={deleteProductMutation.isPending}
                                  className="border-[#FF6F00] text-[#FF6F00] hover:bg-[#FF6F00] hover:text-white"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Requests Tab */}
          <TabsContent value="support" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Support Requests</CardTitle>
                    <CardDescription>Manage customer support requests and send replies</CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <EyeOff className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-600">{getUnreadCount()} unread</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span className="text-sm text-gray-600">{getPendingRepliesCount()} pending replies</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {supportRequestsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin" />
                  </div>
                ) : supportRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No Support Requests</h3>
                    <p className="text-gray-500">All support requests will appear here when customers submit them.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {supportRequests.map((request) => (
                      <Card key={request.id} className={`transition-all hover:shadow-md ${
                        request.supportType === 'emergency' ? 'border-l-4 border-l-[#FF6F00] bg-[#FDF6EC]' : 
                        !request.isRead ? 'border-l-4 border-l-[#0A2342] bg-[#FDF6EC]' : 
                        'border-l-4 border-l-[#333333] bg-white'
                      }`}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <div className="flex items-center gap-2">
                                  <Badge className={`${getSupportTypeColor(request.supportType)} text-white text-xs`}>
                                    {getSupportTypeLabel(request.supportType)}
                                  </Badge>
                                  {request.supportType === 'emergency' && (
                                    <AlertCircle className="w-4 h-4 text-red-500 animate-pulse" />
                                  )}
                                </div>
                                
                                <div className="flex items-center gap-4 ml-auto">
                                  {/* Read/Unread Status */}
                                  <div className="flex items-center gap-1">
                                    {request.isRead ? (
                                      <Eye className="w-4 h-4 text-[#333333]" />
                                    ) : (
                                      <EyeOff className="w-4 h-4 text-[#0A2342]" />
                                    )}
                                    <span className="text-xs text-[#333333]">
                                      {request.isRead ? 'Read' : 'Unread'}
                                    </span>
                                  </div>
                                  
                                  {/* Reply Status */}
                                  <div className="flex items-center gap-1">
                                    {request.hasReplied ? (
                                      <CheckCircle className="w-4 h-4 text-[#333333]" />
                                    ) : (
                                      <Clock className="w-4 h-4 text-[#FF6F00]" />
                                    )}
                                    <span className="text-xs text-[#333333]">
                                      {request.hasReplied ? 'Replied' : 'Pending'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4 mb-3">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 text-sm">
                                    <User className="w-4 h-4 text-gray-500" />
                                    <span className="font-medium text-gray-800">{request.name}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <Mail className="w-4 h-4 text-gray-500" />
                                    <span className="text-gray-600">{request.email}</span>
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  {request.phone && (
                                    <div className="flex items-center gap-2 text-sm">
                                      <Phone className="w-4 h-4 text-gray-500" />
                                      <span className="text-gray-600">{request.phone}</span>
                                    </div>
                                  )}
                                  <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="w-4 h-4 text-gray-500" />
                                    <span className="text-gray-600">{request.createdAt ? format(new Date(request.createdAt), 'PPp') : 'No date'}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="bg-white rounded-lg p-3 border border-gray-200 mb-3">
                                <p className="text-sm text-gray-700 whitespace-pre-wrap">{request.description}</p>
                              </div>
                            </div>
                            
                            <div className="ml-4 flex flex-col gap-2">
                              {/* Mark as Read/Unread Button */}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  if (!request.isRead) {
                                    markAsReadMutation.mutate(request.id);
                                  }
                                }}
                                disabled={request.isRead || markAsReadMutation.isPending}
                                className={`${request.isRead ? 'opacity-50' : ''} border-[#0A2342] text-[#0A2342] hover:bg-[#0A2342] hover:text-white`}
                              >
                                {request.isRead ? (
                                  <>
                                    <Eye className="w-4 h-4 mr-2" />
                                    Read
                                  </>
                                ) : (
                                  <>
                                    <EyeOff className="w-4 h-4 mr-2" />
                                    Mark Read
                                  </>
                                )}
                              </Button>
                              
                              {/* Reply Button */}
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant={request.hasReplied ? "outline" : "default"}
                                    size="sm"
                                    onClick={() => setReplyingTo(request)}
                                    className={request.hasReplied ? 'text-[#333333] border-[#333333]' : 'bg-[#FFC300] hover:bg-[#FF6F00] text-[#0A2342]'}
                                  >
                                    {request.hasReplied ? (
                                      <>
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Replied
                                      </>
                                    ) : (
                                      <>
                                        <Reply className="w-4 h-4 mr-2" />
                                        Reply
                                      </>
                                    )}
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Reply to Support Request</DialogTitle>
                                  </DialogHeader>
                                  
                                  {replyingTo && (
                                    <div className="space-y-4">
                                      <div className="bg-gray-50 rounded-lg p-4">
                                        <h4 className="font-semibold mb-2">Original Request:</h4>
                                        <p className="text-sm text-gray-600 mb-2">
                                          <Badge className={`${getSupportTypeColor(replyingTo.supportType)} text-white mr-2`}>
                                            {getSupportTypeLabel(replyingTo.supportType)}
                                          </Badge>
                                          {replyingTo.createdAt ? format(new Date(replyingTo.createdAt), 'PPp') : 'No date'}
                                        </p>
                                        <p className="text-gray-700 whitespace-pre-wrap">{replyingTo.description}</p>
                                      </div>
                                      
                                      <div className="space-y-2">
                                        <Label htmlFor="reply-message">Your Reply:</Label>
                                        <Textarea
                                          id="reply-message"
                                          value={replyMessage}
                                          onChange={(e) => setReplyMessage(e.target.value)}
                                          placeholder="Type your reply to the customer..."
                                          rows={6}
                                        />
                                      </div>
                                      
                                      <div className="flex justify-end gap-2">
                                        <Button
                                          variant="outline"
                                          onClick={() => {
                                            setReplyingTo(null);
                                            setReplyMessage('');
                                          }}
                                          className="border-[#333333] text-[#333333] hover:bg-[#333333] hover:text-white"
                                        >
                                          Cancel
                                        </Button>
                                        <Button
                                          onClick={() => {
                                            if (replyingTo && replyMessage.trim()) {
                                              replyMutation.mutate({
                                                id: replyingTo.id,
                                                message: replyMessage
                                              });
                                            }
                                          }}
                                          disabled={!replyMessage.trim() || replyMutation.isPending}
                                          className="bg-[#FFC300] hover:bg-[#FF6F00] text-[#0A2342] border-none"
                                        >
                                          <Send className="w-4 h-4 mr-2" />
                                          Send Reply
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Product Dialog Component
function ProductDialog({
  categories,
  subcategories,
  product,
  onSubmit,
  isLoading
}: {
  categories: Category[];
  subcategories: Subcategory[];
  product?: Product | null;
  onSubmit: (data: InsertProduct) => void;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState<InsertProduct>({
    name: product?.name || '',
    price: product?.price || 0,
    description: product?.description || '',
    image: product?.image || '',
    categoryId: product?.categoryId || 0,
    subcategoryId: product?.subcategoryId || 0,
    featured: product?.featured || false,
    inStock: product?.inStock || true,
    rating: product?.rating || 0,
    keyFeatures: product?.keyFeatures || [],
  });

  const [keyFeatures, setKeyFeatures] = useState<string[]>(product?.keyFeatures || []);
  const [newFeature, setNewFeature] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, keyFeatures });
  };

  const addFeature = () => {
    if (newFeature.trim() && !keyFeatures.includes(newFeature.trim())) {
      setKeyFeatures([...keyFeatures, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setKeyFeatures(keyFeatures.filter((_, i) => i !== index));
  };

  const filteredSubcategories = subcategories.filter(
    sub => sub.categoryId === formData.categoryId
  );

  return (
    <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-white">
      <DialogHeader className="border-b border-[#333333]/20 pb-4 mb-6">
        <DialogTitle className="text-2xl font-bold text-[#0A2342]">
          {product ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <p className="text-sm text-[#333333]/70 mt-1">
          Fill in the details below to {product ? 'update' : 'create'} your product
        </p>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Section */}
        <div className="bg-[#FDF6EC] p-6 rounded-lg border border-[#333333]/20">
          <h3 className="text-lg font-semibold text-[#0A2342] mb-4">Basic Information</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name" className="text-[#333333] font-medium">Product Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="mt-2 h-12 text-base border-[#333333]/20 focus:border-[#FFC300] focus:ring-[#FFC300]"
                placeholder="Enter product name"
              />
            </div>
            <div>
              <Label htmlFor="price" className="text-[#333333] font-medium">Price (R)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                required
                className="mt-2 h-12 text-base border-[#333333]/20 focus:border-[#FFC300] focus:ring-[#FFC300]"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-white p-6 rounded-lg border border-[#333333]/20">
          <h3 className="text-lg font-semibold text-[#0A2342] mb-4">Product Description</h3>
          <div>
            <Label htmlFor="description" className="text-[#333333] font-medium">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
              className="mt-2 text-base border-[#333333]/20 focus:border-[#FFC300] focus:ring-[#FFC300]"
              placeholder="Enter detailed product description..."
            />
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="bg-white p-6 rounded-lg border border-[#333333]/20">
          <h3 className="text-lg font-semibold text-[#0A2342] mb-4">Product Image</h3>
          <div>
            <Label htmlFor="image" className="text-[#333333] font-medium">Product Image</Label>
            <div className="mt-2">
              <ImageUpload
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
              />
            </div>
          </div>
        </div>

        {/* Category & Classification Section */}
        <div className="bg-[#FDF6EC] p-6 rounded-lg border border-[#333333]/20">
          <h3 className="text-lg font-semibold text-[#0A2342] mb-4">Category & Classification</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="category" className="text-[#333333] font-medium">Category</Label>
              <Select
                value={formData.categoryId.toString()}
                onValueChange={(value) => setFormData({ 
                  ...formData, 
                  categoryId: Number(value),
                  subcategoryId: 0 
                })}
              >
                <SelectTrigger className="mt-2 h-12 text-base border-[#333333]/20 focus:border-[#FFC300] focus:ring-[#FFC300]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="subcategory" className="text-[#333333] font-medium">Subcategory</Label>
              <Select
                value={formData.subcategoryId.toString()}
                onValueChange={(value) => setFormData({ ...formData, subcategoryId: Number(value) })}
              >
                <SelectTrigger className="mt-2 h-12 text-base border-[#333333]/20 focus:border-[#FFC300] focus:ring-[#FFC300]">
                  <SelectValue placeholder="Select subcategory" />
                </SelectTrigger>
                <SelectContent>
                  {filteredSubcategories.map((subcategory) => (
                    <SelectItem key={subcategory.id} value={subcategory.id.toString()}>
                      {subcategory.name}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
            </div>
          </div>
        </div>

        {/* Product Status & Options Section */}
        <div className="bg-white p-6 rounded-lg border border-[#333333]/20">
          <h3 className="text-lg font-semibold text-[#0A2342] mb-4">Product Status & Options</h3>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <Label htmlFor="rating" className="text-[#333333] font-medium">Rating (0-5)</Label>
              <Input
                id="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                className="mt-2 h-12 text-base border-[#333333]/20 focus:border-[#FFC300] focus:ring-[#FFC300]"
                placeholder="4.5"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center space-x-3 p-3 bg-[#FDF6EC] rounded-lg border border-[#FFC300]/30">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 text-[#FFC300] border-[#333333]/20 rounded focus:ring-[#FFC300]"
                />
                <Label htmlFor="featured" className="text-[#333333] font-medium">Featured Product</Label>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center space-x-3 p-3 bg-[#FDF6EC] rounded-lg border border-[#FFC300]/30">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  className="w-5 h-5 text-[#FFC300] border-[#333333]/20 rounded focus:ring-[#FFC300]"
                />
                <Label htmlFor="inStock" className="text-[#333333] font-medium">In Stock</Label>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features Section */}
        <div className="bg-white p-6 rounded-lg border border-[#333333]/20">
          <h3 className="text-lg font-semibold text-[#0A2342] mb-4">Key Features</h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add a key feature..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addFeature();
                  }
                }}
                className="flex-1 h-12 text-base border-[#333333]/20 focus:border-[#FFC300] focus:ring-[#FFC300]"
              />
              <Button 
                type="button" 
                onClick={addFeature}
                className="h-12 px-6 bg-[#FFC300] hover:bg-[#FF6F00] text-[#0A2342] border-none"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {keyFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-[#FDF6EC] rounded-lg border border-[#FFC300]/30">
                  <span className="flex-1 text-[#333333]">{feature}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFeature(index)}
                    className="h-8 w-8 p-0 text-[#FF6F00] hover:bg-[#FF6F00] hover:text-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {keyFeatures.length === 0 && (
                <p className="text-[#333333]/60 text-center py-4 italic">No key features added yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-[#333333]/20">
          <Button 
            type="submit" 
            disabled={isLoading}
            className="h-12 px-8 bg-[#FFC300] hover:bg-[#FF6F00] text-[#0A2342] border-none font-semibold text-base"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <Box className="w-5 h-5 mr-2" />
            )}
            {product ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}