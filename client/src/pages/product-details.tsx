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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Enhanced Navigation Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm">
              <button 
                onClick={() => setLocation('/')}
                className="flex items-center gap-2 text-gray-600 hover:text-navy transition-all duration-200 hover:bg-gray-100 px-3 py-2 rounded-lg"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Store
              </button>
              <span className="text-gray-300">/</span>
              <span className="text-navy font-semibold">{product.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          {/* Product Image Section - Enhanced */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl shadow-2xl shadow-gray-300/20 overflow-hidden border border-gray-100">
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 p-8">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-2xl shadow-lg"
                  />
                  {product.featured && (
                    <div className="absolute top-6 right-6 bg-gradient-to-r from-orange to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      ⭐ Featured Product
                    </div>
                  )}
                  <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                    <span className="text-sm font-medium text-gray-700">360° View Available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
                <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">Secure Payment</p>
                <p className="text-xs text-gray-600">SSL Protected</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
                <Truck className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">Free Shipping</p>
                <p className="text-xs text-gray-600">Orders over R500</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
                <RotateCcw className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">Easy Returns</p>
                <p className="text-xs text-gray-600">30-Day Policy</p>
              </div>
            </div>
          </div>

          {/* Product Information Section - Enhanced */}
          <div className="lg:col-span-5 space-y-6">
            {/* Product Header Card */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-gray-300/20 border border-gray-100">
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">{product.name}</h1>
                  
                  {/* Enhanced Rating */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1">
                      {renderStars(product.rating)}
                      <span className="text-lg font-semibold text-gray-700 ml-2">({product.rating})</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 cursor-pointer">
                      <span>See all reviews</span>
                      <ArrowLeft className="w-3 h-3 rotate-180" />
                    </div>
                  </div>

                  {/* Enhanced Price */}
                  <div className="bg-gradient-to-r from-electric/10 to-orange/10 rounded-2xl p-6 mb-6">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-5xl font-bold text-gray-900">R{product.price}</span>
                      <span className="text-lg text-gray-600 bg-white px-3 py-1 rounded-full">incl. VAT</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        💳 R{Math.round(parseFloat(product.price) / 6)}/month
                      </span>
                      <span>with 0% interest financing</span>
                    </div>
                  </div>

                  {/* Enhanced Stock Status */}
                  <div className="mb-6">
                    {product.inStock ? (
                      <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="font-semibold text-green-800">✅ In Stock - Ships Today</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="font-semibold text-red-800">❌ Currently Out of Stock</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="space-y-4">
                  <Button
                    onClick={handleAddToCart}
                    disabled={!product.inStock || isAddingToCart}
                    className="w-full bg-gradient-to-r from-electric via-electric to-orange hover:from-electric/90 hover:to-orange/90 text-navy font-bold py-6 text-xl rounded-2xl shadow-2xl shadow-electric/25 hover:shadow-electric/40 transition-all duration-300 transform hover:scale-105"
                    size="lg"
                  >
                    <ShoppingCart className="w-6 h-6 mr-3" />
                    {isAddingToCart ? "Adding to Cart..." : product.inStock ? "Add to Cart - Free Shipping" : "Notify When Available"}
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="py-4 rounded-xl border-2 hover:bg-gray-50 transition-all duration-200">
                      <Heart className="w-5 h-5 mr-2 text-red-500" />
                      Save for Later
                    </Button>
                    <Button variant="outline" className="py-4 rounded-xl border-2 hover:bg-gray-50 transition-all duration-200">
                      <Package className="w-5 h-5 mr-2 text-blue-500" />
                      Compare
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Features Card */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-gray-300/20 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Zap className="w-6 h-6 mr-3 text-electric" />
                Key Features
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">High-Capacity Battery</p>
                    <p className="text-sm text-gray-600">Long-lasting power for your devices</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Ultra-Portable Design</p>
                    <p className="text-sm text-gray-600">Compact and lightweight for travel</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-100">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Safety Certified</p>
                    <p className="text-sm text-gray-600">Multiple protection systems built-in</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Information Card */}
            <div className="bg-gradient-to-br from-navy to-navy/90 rounded-3xl p-8 shadow-2xl text-white">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Truck className="w-6 h-6 mr-3 text-electric" />
                Delivery & Returns
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="w-10 h-10 bg-electric/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Truck className="w-5 h-5 text-electric" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Free Standard Delivery</p>
                    <p className="text-sm text-gray-300">On orders over R500 • 2-3 business days nationwide</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="w-10 h-10 bg-electric/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-electric" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Express Delivery Available</p>
                    <p className="text-sm text-gray-300">Next business day delivery • Only R99</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="w-10 h-10 bg-electric/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <RotateCcw className="w-5 h-5 text-electric" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">30-Day Returns</p>
                    <p className="text-sm text-gray-300">Free returns on all items • No questions asked</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Description Card */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-gray-300/20 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Product Description</h3>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}