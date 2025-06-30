import { useQuery } from '@tanstack/react-query';
import { useParams, useLocation } from 'wouter';
import { ArrowLeft, Star, ShoppingCart, Shield, Truck, RotateCcw, Heart, Share2, Package, Zap, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@shared/schema';

export default function ProductDetails() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { addToCart, isAddingToCart } = useCart();

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: [`/api/products/${id}`],
    enabled: !!id,
  });

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({ productId: product.id, quantity: 1 }, {
      onSuccess: () => {
        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart.`,
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to add item to cart. Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  const renderStars = (rating: string) => {
    const numRating = parseFloat(rating);
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 >= 0.5;

    return (
      <div className="flex items-center gap-1">
        <div className="flex text-electric">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < fullStars || (i === fullStars && hasHalfStar)
                  ? 'fill-current'
                  : 'stroke-current fill-transparent'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground ml-1">({rating})</span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-sand">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-16 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-sand">
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={() => setLocation('/')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-navy mb-4">Product Not Found</h1>
            <p className="text-charcoal mb-6">The product you're looking for doesn't exist.</p>
            <Button onClick={() => setLocation('/')}>
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button 
              onClick={() => setLocation('/')}
              className="hover:text-navy transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-navy font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Product Image Section */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg border overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.featured && (
                  <div className="absolute top-4 left-4 bg-orange text-white px-3 py-1 rounded text-sm font-medium">
                    Featured
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Information Section */}
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                  <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
                </div>
                <span className="text-sm text-gray-400">|</span>
                <span className="text-sm text-gray-600">Write a review</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">R{product.price}</span>
                  <span className="text-sm text-gray-500">incl. VAT</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Or as low as R{Math.round(parseFloat(product.price) / 6).toFixed(0)}/month with financing
                </p>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.inStock ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="font-medium">In Stock</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span className="font-medium">Out of Stock</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock || isAddingToCart}
                className="w-full bg-electric hover:bg-electric/90 text-navy font-bold py-4 text-lg"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {isAddingToCart ? "Adding to Cart..." : product.inStock ? "Add to Cart" : "Notify When Available"}
              </Button>
              
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  <Heart className="w-4 h-4 mr-2" />
                  Add to Wishlist
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Product Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Key Features</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Zap className="w-5 h-5 text-electric" />
                  <span className="text-sm font-medium">High Capacity</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Package className="w-5 h-5 text-electric" />
                  <span className="text-sm font-medium">Portable Design</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Shield className="w-5 h-5 text-electric" />
                  <span className="text-sm font-medium">Safety Certified</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Award className="w-5 h-5 text-electric" />
                  <span className="text-sm font-medium">Premium Quality</span>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Delivery & Returns */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Delivery & Returns</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Free Standard Delivery</p>
                    <p className="text-xs text-gray-600">On orders over R500 • 3-5 business days</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Express Delivery Available</p>
                    <p className="text-xs text-gray-600">Next business day • R99</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">30-Day Returns</p>
                    <p className="text-xs text-gray-600">Free returns on all items</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Product Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Product Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}