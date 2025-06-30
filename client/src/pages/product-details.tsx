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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/90 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,theme(colors.electric/20),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,theme(colors.orange/15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,theme(colors.electric/10),transparent_50%)]"></div>
      </div>

      {/* Floating Navigation */}
      <div className="fixed top-6 left-6 right-6 z-50">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setLocation('/')}
              className="flex items-center gap-3 text-white hover:text-electric transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-electric/20 transition-all duration-300">
                <ArrowLeft className="w-5 h-5" />
              </div>
              <span className="font-medium">Back to Store</span>
            </button>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300">
                <Heart className="w-5 h-5 text-white" />
              </button>
              <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300">
                <Share2 className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-5">
        {/* Left Section - Product Showcase */}
        <div className="lg:col-span-3 flex flex-col justify-center items-center p-8 lg:p-16">
          <div className="w-full max-w-4xl">
            {/* Product Image with Floating Elements */}
            <div className="relative mb-12">
              <div className="relative group">
                {/* Main Product Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-2xl">
                  <div className="aspect-square relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Floating Badge */}
                    {product.featured && (
                      <div className="absolute -top-4 -right-4 bg-gradient-to-r from-orange to-red-500 text-white px-6 py-3 rounded-2xl font-bold shadow-2xl animate-pulse">
                        ⭐ Featured
                      </div>
                    )}
                    {/* Interactive Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <span className="font-bold text-gray-900">360° Interactive View</span>
                    </div>
                  </div>
                </div>

                {/* Floating Rating Card */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-8 py-4 shadow-2xl">
                  <div className="flex items-center gap-3">
                    {renderStars(product.rating)}
                    <span className="text-white font-bold text-lg">({product.rating}) Excellent</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Feature Cards */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 group cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <p className="text-white font-bold">Secure Payment</p>
                <p className="text-gray-300 text-sm">SSL Protected</p>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 group cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <p className="text-white font-bold">Free Shipping</p>
                <p className="text-gray-300 text-sm">Orders over R500</p>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 group cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <RotateCcw className="w-6 h-6 text-white" />
                </div>
                <p className="text-white font-bold">Easy Returns</p>
                <p className="text-gray-300 text-sm">30-Day Policy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Product Details */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border-l border-white/10 p-8 lg:p-12 overflow-y-auto">
          <div className="space-y-8 max-w-2xl">
            {/* Product Header */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-black text-white leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {product.name}
              </h1>

              {/* Mega Price Display */}
              <div className="relative">
                <div className="bg-gradient-to-r from-electric/20 to-orange/20 rounded-3xl p-8 border border-electric/30">
                  <div className="text-center space-y-4">
                    <div className="text-7xl lg:text-8xl font-black text-transparent bg-gradient-to-r from-electric via-white to-orange bg-clip-text">
                      R{product.price}
                    </div>
                    <div className="flex items-center justify-center gap-4">
                      <span className="bg-white/20 text-white px-4 py-2 rounded-full font-bold">incl. VAT</span>
                      <span className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full font-bold">
                        R{Math.round(parseFloat(product.price) / 6)}/month
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex justify-center">
                {product.inStock ? (
                  <div className="bg-green-500/20 border border-green-400/30 rounded-2xl px-6 py-4 flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-300 font-bold text-lg">In Stock - Ships Today</span>
                  </div>
                ) : (
                  <div className="bg-red-500/20 border border-red-400/30 rounded-2xl px-6 py-4 flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <span className="text-red-300 font-bold text-lg">Out of Stock</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock || isAddingToCart}
                className="w-full bg-gradient-to-r from-electric via-electric to-orange hover:from-electric/80 hover:to-orange/80 text-navy font-black py-8 text-xl rounded-2xl shadow-2xl hover:shadow-electric/50 transition-all duration-500 transform hover:scale-105 border-2 border-white/20"
                size="lg"
              >
                <ShoppingCart className="w-8 h-8 mr-4" />
                {isAddingToCart ? "Adding to Cart..." : product.inStock ? "Add to Cart" : "Notify When Available"}
              </Button>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="py-6 text-white border-white/30 hover:bg-white/10 rounded-2xl transition-all duration-300">
                  <Heart className="w-5 h-5 mr-2 text-red-400" />
                  Wishlist
                </Button>
                <Button variant="outline" className="py-6 text-white border-white/30 hover:bg-white/10 rounded-2xl transition-all duration-300">
                  <Package className="w-5 h-5 mr-2 text-blue-400" />
                  Compare
                </Button>
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white flex items-center">
                <Zap className="w-6 h-6 mr-3 text-electric" />
                Key Features
              </h3>
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">High-Capacity Battery</p>
                      <p className="text-gray-300">Long-lasting power for your devices</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">Ultra-Portable Design</p>
                      <p className="text-gray-300">Compact and lightweight for travel</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">Safety Certified</p>
                      <p className="text-gray-300">Multiple protection systems built-in</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Truck className="w-6 h-6 mr-3 text-electric" />
                Delivery & Returns
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-electric/20 rounded-xl flex items-center justify-center">
                    <Truck className="w-5 h-5 text-electric" />
                  </div>
                  <div>
                    <p className="text-white font-bold">Free Standard Delivery</p>
                    <p className="text-gray-300 text-sm">On orders over R500 • 2-3 business days</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-electric/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-electric" />
                  </div>
                  <div>
                    <p className="text-white font-bold">Express Delivery</p>
                    <p className="text-gray-300 text-sm">Next business day • Only R99</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-electric/20 rounded-xl flex items-center justify-center">
                    <RotateCcw className="w-5 h-5 text-electric" />
                  </div>
                  <div>
                    <p className="text-white font-bold">30-Day Returns</p>
                    <p className="text-gray-300 text-sm">Free returns on all items</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Description */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Product Description</h3>
              <p className="text-gray-300 text-lg leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}