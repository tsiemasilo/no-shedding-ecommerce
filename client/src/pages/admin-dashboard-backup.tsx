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
import { useLocation } from 'wouter';
import { Loader2, Plus, Edit, Trash2, LogOut, Home, MessageSquare, Mail, Reply, Calendar, User, Phone, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import type { Product, Category, Subcategory, InsertProduct, SupportRequest } from '@shared/schema';

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { user, logoutMutation, isLoading } = useAdminAuth();
  const { toast } = useToast();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [replyingTo, setReplyingTo] = useState<SupportRequest | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [activeTab, setActiveTab] = useState('products');

  // Use effect to handle redirect to avoid violating React rules
  useEffect(() => {
    if (!isLoading && !user) {
      console.log('Admin dashboard: No user found, redirecting to auth');
      setLocation('/auth');
    }
  }, [isLoading, user, setLocation]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-navy" />
      </div>
    );
  }

  // Show loading if user is not available (while redirecting)
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-navy" />
      </div>
    );
  }

  const { data: products = [], refetch: refetchProducts } = useQuery<Product[]>({
    queryKey: ['/api/admin/products'],
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const { data: subcategories = [] } = useQuery<Subcategory[]>({
    queryKey: ['/api/subcategories'],
  });

  const { data: supportRequests = [] } = useQuery<SupportRequest[]>({
    queryKey: ['/api/admin/support-requests'],
  });

  const createProductMutation = useMutation({
    mutationFn: async (productData: InsertProduct) => {
      const res = await apiRequest("POST", "/api/admin/products", productData);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/products'] });
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      queryClient.invalidateQueries({ queryKey: ['/api/products?featured=true'] });
      setIsCreateOpen(false);
      toast({ title: "Product created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create product", variant: "destructive" });
    }
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertProduct> }) => {
      const res = await apiRequest("PUT", `/api/admin/products/${id}`, data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/products'] });
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      queryClient.invalidateQueries({ queryKey: ['/api/products?featured=true'] });
      setEditingProduct(null);
      toast({ title: "Product updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update product", variant: "destructive" });
    }
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/products'] });
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      queryClient.invalidateQueries({ queryKey: ['/api/products?featured=true'] });
      toast({ title: "Product deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete product", variant: "destructive" });
    }
  });

  const replyToSupportMutation = useMutation({
    mutationFn: async (data: { supportRequestId: number; message: string }) => {
      const res = await apiRequest("POST", "/api/admin/support-reply", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/support-requests'] });
      setReplyingTo(null);
      setReplyMessage('');
      toast({ title: "Reply sent successfully" });
    },
    onError: () => {
      toast({ title: "Failed to send reply", variant: "destructive" });
    }
  });

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setLocation('/');
      }
    });
  };

  const handleReply = (supportRequest: SupportRequest) => {
    setReplyingTo(supportRequest);
    setReplyMessage('');
  };

  const submitReply = () => {
    if (!replyingTo || !replyMessage.trim()) return;
    replyToSupportMutation.mutate({
      supportRequestId: replyingTo.id,
      message: replyMessage.trim()
    });
  };

  const getSupportTypeColor = (type: string) => {
    switch (type) {
      case 'emergency': return 'bg-red-500';
      case 'technical': return 'bg-blue-500';
      case 'installation': return 'bg-green-500';
      case 'warranty': return 'bg-orange-500';
      case 'billing': return 'bg-purple-500';
      case 'product-info': return 'bg-cyan-500';
      default: return 'bg-gray-500';
    }
  };

  const getSupportTypeLabel = (type: string) => {
    switch (type) {
      case 'technical': return 'Technical Support';
      case 'installation': return 'Installation Help';
      case 'product-info': return 'Product Information';
      case 'warranty': return 'Warranty Claim';
      case 'billing': return 'Billing Question';
      case 'general': return 'General Inquiry';
      case 'emergency': return 'Emergency Support';
      default: return type;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-navy text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-electric">Welcome, {user.username}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setLocation('/')}
              className="group bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white hover:bg-white hover:text-navy font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Home className="w-5 h-5 mr-3 group-hover:animate-pulse" />
              <span className="text-lg">Back to Home</span>
            </Button>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-white hover:bg-navy/70"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Product Management
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Support Requests
              {supportRequests.length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {supportRequests.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Product Management</CardTitle>
                    <CardDescription>Add, edit, and remove products from your store</CardDescription>
                  </div>
                  <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-electric hover:bg-electric/90 text-navy">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Product
                      </Button>
                    </DialogTrigger>
                    <ProductDialog
                      categories={categories}
                      subcategories={subcategories}
                      onSubmit={(data) => createProductMutation.mutate(data)}
                      isLoading={createProductMutation.isPending}
                    />
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Subcategory</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>In Stock</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(() => {
                  // Group products by category
                  const productsByCategory = new Map<string, Product[]>();
                  products.forEach(product => {
                    const category = categories.find(c => c.id === product.categoryId);
                    const categoryName = category?.name || 'Unknown';
                    if (!productsByCategory.has(categoryName)) {
                      productsByCategory.set(categoryName, []);
                    }
                    productsByCategory.get(categoryName)!.push(product);
                  });

                  // Sort categories alphabetically
                  const sortedCategories = Array.from(productsByCategory.keys()).sort();

                  return sortedCategories.map(categoryName => {
                    const categoryProducts = productsByCategory.get(categoryName)!;
                    return (
                      <React.Fragment key={categoryName}>
                        {/* Category Header */}
                        <TableRow className="bg-sand/20 hover:bg-sand/30">
                          <TableCell colSpan={7} className="font-bold text-navy py-4 px-6">
                            {categoryName} ({categoryProducts.length} products)
                          </TableCell>
                        </TableRow>
                        {/* Products in this category */}
                        {categoryProducts.map((product) => {
                          const category = categories.find(c => c.id === product.categoryId);
                          const subcategory = subcategories.find(s => s.id === product.subcategoryId);
                          return (
                            <TableRow key={product.id} className="hover:bg-sand/10">
                              <TableCell className="font-medium pl-8">{product.name}</TableCell>
                              <TableCell>{category?.name || 'Unknown'}</TableCell>
                              <TableCell>{subcategory?.name || '-'}</TableCell>
                              <TableCell>R{product.price}</TableCell>
                              <TableCell>{product.featured ? 'Yes' : 'No'}</TableCell>
                              <TableCell>{product.inStock ? 'Yes' : 'No'}</TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Dialog open={editingProduct?.id === product.id} onOpenChange={(open) => !open && setEditingProduct(null)}>
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
                                      onSubmit={(data) => updateProductMutation.mutate({ id: product.id, data })}
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
                      </React.Fragment>
                    );
                  });
                })()}
              </TableBody>
            </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Support Requests</CardTitle>
                    <CardDescription>Manage customer support requests and send replies</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-sm">
                    {supportRequests.length} active request{supportRequests.length !== 1 ? 's' : ''}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {supportRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No Support Requests</h3>
                    <p className="text-gray-500">All support requests will appear here when customers submit them.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {supportRequests.map((request) => (
                      <Card key={request.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <Badge className={`${getSupportTypeColor(request.supportType)} text-white`}>
                                  {getSupportTypeLabel(request.supportType)}
                                </Badge>
                                {request.supportType === 'emergency' && (
                                  <AlertCircle className="w-5 h-5 text-red-500 animate-pulse" />
                                )}
                              </div>
                              
                              <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <User className="w-4 h-4" />
                                  <span className="font-medium">{request.name}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Mail className="w-4 h-4" />
                                  <span>{request.email}</span>
                                </div>
                                {request.phone && (
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Phone className="w-4 h-4" />
                                    <span>{request.phone}</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Calendar className="w-4 h-4" />
                                  <span>{format(new Date(request.createdAt), 'PPp')}</span>
                                </div>
                              </div>

                              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                <h4 className="font-medium text-gray-800 mb-2">Customer Message:</h4>
                                <p className="text-gray-700 whitespace-pre-wrap">{request.description}</p>
                              </div>
                            </div>
                            
                            <Button
                              onClick={() => handleReply(request)}
                              className="bg-electric hover:bg-electric/90 text-navy ml-4"
                            >
                              <Reply className="w-4 h-4 mr-2" />
                              Reply
                            </Button>
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

        {/* Reply Dialog */}
        <Dialog open={!!replyingTo} onOpenChange={() => setReplyingTo(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Reply to Support Request</DialogTitle>
              <DialogDescription>
                Send a direct email response to {replyingTo?.name} ({replyingTo?.email})
              </DialogDescription>
            </DialogHeader>
            
            {replyingTo && (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Original Request:</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    <Badge className={`${getSupportTypeColor(replyingTo.supportType)} text-white mr-2`}>
                      {getSupportTypeLabel(replyingTo.supportType)}
                    </Badge>
                    {format(new Date(replyingTo.createdAt), 'PPp')}
                  </p>
                  <p className="text-gray-700 whitespace-pre-wrap">{replyingTo.description}</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reply-message">Your Reply</Label>
                  <Textarea
                    id="reply-message"
                    placeholder="Type your response here..."
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setReplyingTo(null)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={submitReply}
                    disabled={!replyMessage.trim() || replyToSupportMutation.isPending}
                    className="bg-electric hover:bg-electric/90 text-navy"
                  >
                    {replyToSupportMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        Send Reply
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

interface ProductDialogProps {
  categories: Category[];
  subcategories: Subcategory[];
  product?: Product | null;
  onSubmit: (data: InsertProduct) => void;
  isLoading: boolean;
}

function ProductDialog({ categories, subcategories, product, onSubmit, isLoading }: ProductDialogProps) {
  const [formData, setFormData] = useState<InsertProduct>({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '0',
    image: product?.image || '',
    images: product?.images || [],
    categoryId: product?.categoryId || 1,
    subcategoryId: product?.subcategoryId || null,
    featured: product?.featured || false,
    rating: product?.rating || '0',
    inStock: product?.inStock || true,
    keyFeatures: product?.keyFeatures || [],
  });
  
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string>('none');

  // Update form data when product changes (for editing)
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        images: product.images || [],
        categoryId: product.categoryId,
        subcategoryId: product.subcategoryId || null,
        featured: product.featured,
        rating: product.rating,
        inStock: product.inStock,
        keyFeatures: product.keyFeatures || [],
      });
      setSelectedSubcategoryId(product.subcategoryId ? product.subcategoryId.toString() : 'none');
    } else {
      // Reset form for new product
      setFormData({
        name: '',
        description: '',
        price: '0',
        image: '',
        images: [],
        categoryId: 1,
        subcategoryId: null,
        featured: false,
        rating: '0',
        inStock: true,
        keyFeatures: [],
      });
      setSelectedSubcategoryId('none');
    }
  }, [product]);

  // Reset subcategory when category changes
  useEffect(() => {
    if (!product) {
      setSelectedSubcategoryId('none');
    }
  }, [formData.categoryId, product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      subcategoryId: selectedSubcategoryId && selectedSubcategoryId !== 'none' ? parseInt(selectedSubcategoryId) : null
    };
    onSubmit(submitData);
  };

  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        <DialogDescription>
          {product ? 'Update the product details below' : 'Fill in the details for the new product'}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="bg-white shadow-sm"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              className="bg-white shadow-sm"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="bg-white shadow-sm"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="keyFeatures">Key Features</Label>
          <div className="space-y-2">
            {(formData.keyFeatures || []).map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={feature}
                  onChange={(e) => {
                    const newFeatures = [...(formData.keyFeatures || [])];
                    newFeatures[index] = e.target.value;
                    setFormData(prev => ({ ...prev, keyFeatures: newFeatures }));
                  }}
                  placeholder="Enter a key feature"
                  className="bg-white shadow-sm"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newFeatures = (formData.keyFeatures || []).filter((_, i) => i !== index);
                    setFormData(prev => ({ ...prev, keyFeatures: newFeatures }));
                  }}
                  disabled={isLoading}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFormData(prev => ({ ...prev, keyFeatures: [...(prev.keyFeatures || []), ''] }));
              }}
              disabled={isLoading}
              className="w-full"
            >
              + Add Key Feature
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="image">Main Product Image</Label>
          <ImageUpload
            value={formData.image}
            onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="images">Additional Product Images</Label>
          <div className="space-y-4">
            {(formData.images || []).map((imageUrl, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="flex-1">
                  <ImageUpload
                    value={imageUrl}
                    onChange={(url) => {
                      const newImages = [...(formData.images || [])];
                      newImages[index] = url;
                      setFormData(prev => ({ ...prev, images: newImages }));
                    }}
                    disabled={isLoading}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newImages = (formData.images || []).filter((_, i) => i !== index);
                    setFormData(prev => ({ ...prev, images: newImages }));
                  }}
                  disabled={isLoading}
                  className="mt-2"
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFormData(prev => ({ ...prev, images: [...(prev.images || []), ''] }));
              }}
              disabled={isLoading}
              className="w-full"
            >
              + Add Another Image
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select 
              value={formData.categoryId.toString()} 
              onValueChange={(value) => {
                setFormData(prev => ({ ...prev, categoryId: parseInt(value) }));
                setSelectedSubcategoryId(''); // Reset subcategory when category changes
              }}
            >
              <SelectTrigger>
                <SelectValue />
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
          <div className="space-y-2">
            <Label htmlFor="subcategory">Subcategory (Optional)</Label>
            <Select 
              value={selectedSubcategoryId} 
              onValueChange={(value) => setSelectedSubcategoryId(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select subcategory..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No subcategory</SelectItem>
                {subcategories.filter(sub => sub.categoryId === formData.categoryId)
                  .map((subcategory) => (
                    <SelectItem key={subcategory.id} value={subcategory.id.toString()}>
                      {subcategory.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="rating">Rating</Label>
          <Input
            id="rating"
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={formData.rating}
            onChange={(e) => setFormData(prev => ({ ...prev, rating: e.target.value }))}
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
              className="w-4 h-4 text-navy border-gray-300 rounded focus:ring-navy"
            />
            <Label htmlFor="featured" className="text-sm font-medium">Featured Product</Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="stockStatus" className="text-sm font-medium">Stock Status</Label>
            <Select 
              value={formData.inStock ? "in-stock" : "out-of-stock"} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, inStock: value === "in-stock" }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in-stock">✅ In Stock</SelectItem>
                <SelectItem value="out-of-stock">❌ Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-navy hover:bg-navy/90 text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {product ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            product ? 'Update Product' : 'Create Product'
          )}
        </Button>
      </form>
    </DialogContent>
  );
}