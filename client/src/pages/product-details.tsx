import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, ShoppingCart, Heart } from "lucide-react";
import { Header } from "@/components/header";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@shared/schema";

export default function ProductDetails() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { addToCart, isAddingToCart } = useCart();

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: [`/api/products/${id}`],
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
      <div className="flex text-electric">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < fullStars || (i === fullStars && hasHalfStar)
                ? 'fill-current'
                : 'stroke-current fill-transparent'
            }`}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sand to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="animate-pulse">
            <div className="w-32 h-8 bg-gray-200 rounded mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="w-full h-96 bg-gray-200 rounded-lg"></div>
              <div className="space-y-6">
                <div className="w-3/4 h-8 bg-gray-200 rounded"></div>
                <div className="w-full h-20 bg-gray-200 rounded"></div>
                <div className="w-32 h-8 bg-gray-200 rounded"></div>
                <div className="w-full h-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sand to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-navy mb-4">Product not found</h1>
          <Button onClick={() => setLocation("/")} className="bg-navy hover:bg-navy/90 text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sand via-white to-sand/50">
      {/* Navigation Header */}
      <Header />
      
      {/* Breadcrumb Section */}
      <div className="bg-gradient-to-r from-white via-sand/10 to-white border-b border-gray-200/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="outline"
            onClick={() => setLocation("/")}
            className="group bg-white/90 backdrop-blur-sm border-2 border-navy/20 text-navy hover:bg-navy hover:text-white hover:border-navy font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <ArrowLeft className="w-5 h-5 mr-3 group-hover:animate-pulse" />
            <span className="text-lg">Back to Products</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Product Image Gallery */}
          <div className="relative lg:sticky lg:top-8">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="relative bg-gradient-to-br from-sand/30 to-white p-8">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[550px] object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
                />
                {product.featured && (
                  <div className="absolute top-12 left-12 bg-gradient-to-r from-bright-orange to-orange-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-xl backdrop-blur-sm">
                    <Star className="w-4 h-4 inline mr-2" />
                    Featured Product
                  </div>
                )}
                {!product.inStock && (
                  <div className="absolute inset-8 bg-black/70 backdrop-blur-sm flex items-center justify-center rounded-xl">
                    <div className="text-center">
                      <span className="text-white font-bold text-3xl block">Out of Stock</span>
                      <span className="text-gray-300 text-sm mt-2">Currently unavailable</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-6 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <ShoppingCart className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-navy">Secure Payment</p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Star className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-navy">Quality Assured</p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <Heart className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="text-sm font-medium text-navy">Customer Favorite</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-10">
            {/* Product Header */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <div className="space-y-6">
                <div>
                  <h1 className="text-6xl font-bold text-navy leading-tight mb-4">{product.name}</h1>
                  <div className="flex items-center space-x-8">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-xl font-semibold text-charcoal">({product.rating})</span>
                      <span className="text-gray-500">• Premium Quality</span>
                    </div>
                    {product.inStock ? (
                      <Badge className="bg-green-50 border-green-200 text-green-800 px-4 py-2 text-sm font-semibold">
                        ✓ In Stock - Ready to Ship
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="px-4 py-2 text-sm font-semibold">
                        Out of Stock
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-navy/5 to-electric/5 rounded-xl p-6 border border-gray-100">
                  <div className="flex items-baseline space-x-3">
                    <span className="text-7xl font-bold text-navy">R{product.price}</span>
                    <span className="text-gray-500 text-lg">ZAR</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Competitive pricing • Free delivery on orders over R500</p>
                </div>
              </div>
            </div>

            {/* Product Description */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-navy mb-6 flex items-center">
                <div className="w-8 h-8 bg-electric/20 rounded-lg flex items-center justify-center mr-3">
                  <Star className="w-4 h-4 text-electric" />
                </div>
                Product Overview
              </h3>
              <p className="text-charcoal text-lg leading-relaxed">{product.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <div className="flex space-x-6">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAddingToCart}
                  className="flex-1 bg-gradient-to-r from-electric to-electric/90 hover:from-electric/90 hover:to-electric/80 text-navy font-bold py-6 text-xl shadow-xl rounded-xl border-2 border-electric/20 transition-all duration-300 hover:scale-105"
                >
                  <ShoppingCart className="w-6 h-6 mr-3" />
                  {!product.inStock ? 'Currently Unavailable' : 'Add to Cart'}
                </Button>
                
                <Button
                  variant="outline"
                  className="px-8 py-6 border-2 border-navy/20 text-navy hover:bg-navy hover:text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  <Heart className="w-6 h-6 mr-2" />
                  Save
                </Button>
              </div>
              
              {/* Additional Actions */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-600">
                    <ShoppingCart className="w-5 h-5 mr-2 text-green-600" />
                    <span className="text-sm">Secure checkout</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Star className="w-5 h-5 mr-2 text-blue-600" />
                    <span className="text-sm">Quality guaranteed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Specifications */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-navy mb-8 flex items-center">
                <div className="w-8 h-8 bg-navy/20 rounded-lg flex items-center justify-center mr-3">
                  <Star className="w-4 h-4 text-navy" />
                </div>
                Product Specifications
              </h3>
              
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-100">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-electric/20 rounded-full flex items-center justify-center">
                        <Star className="w-5 h-5 text-electric" />
                      </div>
                      <span className="text-navy font-semibold text-lg">Quality Rating</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      {renderStars(product.rating)}
                      <span className="text-navy font-bold text-xl">{product.rating}/5</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-100">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${product.inStock ? 'bg-green-100' : 'bg-red-100'}`}>
                        <ShoppingCart className={`w-5 h-5 ${product.inStock ? 'text-green-600' : 'text-red-600'}`} />
                      </div>
                      <span className="text-navy font-semibold text-lg">Availability Status</span>
                    </div>
                    <span className={`font-bold text-xl ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
                
{product.featured && (
                  <div className="bg-gradient-to-r from-bright-orange/5 to-orange-50 rounded-xl p-6 border border-bright-orange/20">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-bright-orange/20 rounded-full flex items-center justify-center">
                          <Star className="w-5 h-5 text-bright-orange" />
                        </div>
                        <span className="text-navy font-semibold text-lg">Featured Product</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-5 h-5 text-bright-orange fill-bright-orange" />
                        <span className="font-bold text-xl text-bright-orange">Premium Selection</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}