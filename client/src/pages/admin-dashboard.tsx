import { useState, useEffect } from 'react';
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
import { Loader2, Plus, Edit, Trash2, LogOut, Home } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import type { Product, Category, Subcategory, InsertProduct } from '@shared/schema';

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { user, logoutMutation } = useAdminAuth();
  const { toast } = useToast();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Redirect if not authenticated as admin
  if (!user) {
    setLocation('/auth');
    return null;
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

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setLocation('/');
      }
    });
  };

  return (
    <div className="min-h-screen bg-sand">
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
              className="group bg-white/90 backdrop-blur-sm border-2 border-white/20 text-navy hover:bg-white hover:text-navy hover:border-white font-semibold px-4 py-2 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <Home className="w-4 h-4 mr-2 group-hover:animate-pulse" />
              <span>Home</span>
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
                  <TableHead>Price</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>In Stock</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => {
                  const category = categories.find(c => c.id === product.categoryId);
                  return (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{category?.name || 'Unknown'}</TableCell>
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
              </TableBody>
            </Table>
          </CardContent>
        </Card>
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
    featured: product?.featured || false,
    rating: product?.rating || '0',
    inStock: product?.inStock || true,
  });
  
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string>('');

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
        featured: product.featured,
        rating: product.rating,
        inStock: product.inStock,
      });
    } else {
      // Reset form for new product
      setFormData({
        name: '',
        description: '',
        price: '0',
        image: '',
        images: [],
        categoryId: 1,
        featured: false,
        rating: '0',
        inStock: true,
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
            required
          />
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
                {subcategories
                  .filter(sub => sub.categoryId === formData.categoryId)
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