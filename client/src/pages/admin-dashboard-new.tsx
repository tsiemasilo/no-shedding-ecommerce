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
import { Loader2, Plus, Edit, Trash2, LogOut, Home, MessageSquare, Mail, Reply, Calendar, User, Phone, AlertCircle, Eye, EyeOff, CheckCircle, Clock, Send } from 'lucide-react';
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
      return apiRequest(`/api/admin/support-read/${id}`, { method: 'POST' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/support-requests'] });
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
      case 'technical': return 'bg-blue-600';
      case 'installation': return 'bg-green-600';
      case 'product-info': return 'bg-purple-600';
      case 'warranty': return 'bg-yellow-600';
      case 'billing': return 'bg-orange-600';
      case 'general': return 'bg-gray-600';
      case 'emergency': return 'bg-red-600';
      default: return 'bg-gray-600';
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocation('/')}
                className="text-gray-600 hover:text-gray-900"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Website
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.username}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Products
              <Badge variant="secondary" className="ml-2">
                {products.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Support Requests
              <Badge variant="secondary" className="ml-2">
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
                      <Button>
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
                              <Badge variant={product.featured ? "default" : "secondary"}>
                                {product.featured ? "Featured" : "Regular"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={product.inStock ? "default" : "destructive"}>
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
                        request.supportType === 'emergency' ? 'border-l-4 border-l-red-500 bg-red-50' : 
                        !request.isRead ? 'border-l-4 border-l-blue-500 bg-blue-50' : 
                        'border-l-4 border-l-gray-300 bg-white'
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
                                      <Eye className="w-4 h-4 text-gray-500" />
                                    ) : (
                                      <EyeOff className="w-4 h-4 text-blue-500" />
                                    )}
                                    <span className="text-xs text-gray-500">
                                      {request.isRead ? 'Read' : 'Unread'}
                                    </span>
                                  </div>
                                  
                                  {/* Reply Status */}
                                  <div className="flex items-center gap-1">
                                    {request.hasReplied ? (
                                      <CheckCircle className="w-4 h-4 text-green-500" />
                                    ) : (
                                      <Clock className="w-4 h-4 text-orange-500" />
                                    )}
                                    <span className="text-xs text-gray-500">
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
                                className={request.isRead ? 'opacity-50' : ''}
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
                                    className={request.hasReplied ? 'text-gray-600' : ''}
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
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="price">Price (R)</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="image">Product Image</Label>
          <ImageUpload
            value={formData.image}
            onChange={(url) => setFormData({ ...formData, image: url })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.categoryId.toString()}
              onValueChange={(value) => setFormData({ 
                ...formData, 
                categoryId: Number(value),
                subcategoryId: 0 
              })}
            >
              <SelectTrigger>
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
            <Label htmlFor="subcategory">Subcategory</Label>
            <Select
              value={formData.subcategoryId.toString()}
              onValueChange={(value) => setFormData({ ...formData, subcategoryId: Number(value) })}
            >
              <SelectTrigger>
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

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="rating">Rating</Label>
            <Input
              id="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            />
            <Label htmlFor="featured">Featured Product</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="inStock"
              checked={formData.inStock}
              onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
            />
            <Label htmlFor="inStock">In Stock</Label>
          </div>
        </div>

        <div>
          <Label>Key Features</Label>
          <div className="flex gap-2 mb-2">
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
            />
            <Button type="button" onClick={addFeature}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {keyFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                <span className="flex-1 text-sm">{feature}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFeature(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : null}
            {product ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}