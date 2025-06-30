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
      {/* Enhanced Navigation Header - Full Width */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="px-8 py-4">
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

      {/* Full Width Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Side - Product Image Section */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center items-center p-8 lg:p-16">
          <div className="w-full max-w-2xl">
            <div className="relative mb-8">
              <div className="aspect-square bg-white rounded-3xl shadow-2xl overflow-hidden p-8">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-2xl"
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

            {/* Trust Badges - Full Width */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <Shield className="w-10 h-10 text-green-500 mx-auto mb-3" />
                <p className="text-base font-bold text-gray-900">Secure Payment</p>
                <p className="text-sm text-gray-600">SSL Protected</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <Truck className="w-10 h-10 text-blue-500 mx-auto mb-3" />
                <p className="text-base font-bold text-gray-900">Free Shipping</p>
                <p className="text-sm text-gray-600">Orders over R500</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <RotateCcw className="w-10 h-10 text-purple-500 mx-auto mb-3" />
                <p className="text-base font-bold text-gray-900">Easy Returns</p>
                <p className="text-sm text-gray-600">30-Day Policy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Product Information Section */}
        <div className="bg-white flex flex-col justify-center p-8 lg:p-16 overflow-y-auto">
          <div className="w-full max-w-2xl mx-auto space-y-8">
            {/* Product Header */}
            <div className="space-y-6">
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">{product.name}</h1>
                
                {/* Enhanced Rating */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    {renderStars(product.rating)}
                    <span className="text-xl font-semibold text-gray-700 ml-2">({product.rating})</span>
                  </div>
                  <div className="flex items-center gap-2 text-base text-blue-600 hover:text-blue-700 cursor-pointer">
                    <span>See all reviews</span>
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </div>
                </div>

                {/* Enhanced Price */}
                <div className="bg-gradient-to-r from-electric/10 to-orange/10 rounded-3xl p-8 mb-8">
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="text-6xl lg:text-7xl font-bold text-gray-900">R{product.price}</span>
                    <span className="text-2xl text-gray-600 bg-white px-4 py-2 rounded-full">incl. VAT</span>
                  </div>
                  <div className="flex items-center gap-3 text-lg text-gray-700">
                    <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold">
                      💳 R{Math.round(parseFloat(product.price) / 6)}/month
                    </span>
                    <span>with 0% interest financing</span>
                  </div>
                </div>

                {/* Enhanced Stock Status */}
                <div className="mb-8">
                  {product.inStock ? (
                    <div className="flex items-center gap-4 bg-green-50 border border-green-200 rounded-2xl p-6">
                      <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xl font-bold text-green-800">✅ In Stock - Ships Today</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 bg-red-50 border border-red-200 rounded-2xl p-6">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      <span className="text-xl font-bold text-red-800">❌ Currently Out of Stock</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="space-y-6">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAddingToCart}
                  className="w-full bg-gradient-to-r from-electric via-electric to-orange hover:from-electric/90 hover:to-orange/90 text-navy font-bold py-8 text-2xl rounded-3xl shadow-2xl shadow-electric/25 hover:shadow-electric/40 transition-all duration-300 transform hover:scale-105"
                  size="lg"
                >
                  <ShoppingCart className="w-8 h-8 mr-4" />
                  {isAddingToCart ? "Adding to Cart..." : product.inStock ? "Add to Cart - Free Shipping" : "Notify When Available"}
                </Button>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="py-6 text-lg rounded-2xl border-2 hover:bg-gray-50 transition-all duration-200">
                    <Heart className="w-6 h-6 mr-3 text-red-500" />
                    Save for Later
                  </Button>
                  <Button variant="outline" className="py-6 text-lg rounded-2xl border-2 hover:bg-gray-50 transition-all duration-200">
                    <Package className="w-6 h-6 mr-3 text-blue-500" />
                    Compare
                  </Button>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900 flex items-center">
                <Zap className="w-8 h-8 mr-4 text-electric" />
                Key Features
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                  <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">High-Capacity Battery</p>
                    <p className="text-lg text-gray-600">Long-lasting power for your devices</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                  <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center">
                    <Package className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">Ultra-Portable Design</p>
                    <p className="text-lg text-gray-600">Compact and lightweight for travel</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl border border-purple-100">
                  <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">Safety Certified</p>
                    <p className="text-lg text-gray-600">Multiple protection systems built-in</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-gradient-to-br from-navy to-navy/90 rounded-3xl p-8 shadow-2xl text-white">
              <h3 className="text-3xl font-bold mb-8 flex items-center">
                <Truck className="w-8 h-8 mr-4 text-electric" />
                Delivery & Returns
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-6 p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <div className="w-12 h-12 bg-electric/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Truck className="w-6 h-6 text-electric" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">Free Standard Delivery</p>
                    <p className="text-lg text-gray-300">On orders over R500 • 2-3 business days nationwide</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <div className="w-12 h-12 bg-electric/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-electric" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">Express Delivery Available</p>
                    <p className="text-lg text-gray-300">Next business day delivery • Only R99</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <div className="w-12 h-12 bg-electric/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <RotateCcw className="w-6 h-6 text-electric" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">30-Day Returns</p>
                    <p className="text-lg text-gray-300">Free returns on all items • No questions asked</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Description */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">Product Description</h3>
              <div className="prose prose-gray max-w-none">
                <p className="text-xl text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}