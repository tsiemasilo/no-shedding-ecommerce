import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/header";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@shared/schema";

export default function ProductDetails() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { addToCart, isAddingToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
          <Button 
            variant="outline"
            onClick={() => setLocation("/")} 
            className="group bg-white/90 backdrop-blur-sm border-2 border-navy/20 text-navy hover:bg-navy hover:text-white hover:border-navy font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <ArrowLeft className="w-5 h-5 mr-3 group-hover:animate-pulse" />
            <span className="text-lg">Back to Home</span>
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
      <div className="bg-transparent">
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product Image Gallery */}
          <div className="relative lg:sticky lg:top-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="relative bg-gradient-to-br from-sand/30 to-white p-4">
                {/* Main Image Display */}
                <img
                  src={currentImageIndex === -1 || !product.images || product.images.length === 0 || !product.images[currentImageIndex]
                    ? product.image 
                    : product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-[400px] object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-500"
                />
                {product.featured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-bright-orange to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                    <Star className="w-3 h-3 inline mr-1" />
                    Featured
                  </div>
                )}
                {!product.inStock && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-tl-lg rounded-br-lg font-bold text-xs shadow-lg transform rotate-12 z-10">
                    OUT OF STOCK
                  </div>
                )}
              </div>
            </div>

            {/* Image Thumbnails */}
            {product.images && product.images.length > 0 && (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {/* Main image thumbnail */}
                <button
                  onClick={() => setCurrentImageIndex(-1)}
                  className={`relative overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                    currentImageIndex === -1 || (currentImageIndex === 0 && !product.images[0])
                      ? 'border-navy shadow-lg scale-105' 
                      : 'border-gray-200 hover:border-navy/50'
                  }`}
                >
                  <img
                    src={product.image}
                    alt={`${product.name} - Main`}
                    className="w-full h-14 object-cover"
                  />
                </button>
                
                {/* Additional image thumbnails */}
                {product.images.filter(img => img && img.trim() !== '').map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                      currentImageIndex === index 
                        ? 'border-navy shadow-lg scale-105' 
                        : 'border-gray-200 hover:border-navy/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - Image ${index + 2}`}
                      className="w-full h-14 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
            
            {/* Trust Indicators */}
            <div className="mt-4 bg-white rounded-lg p-4 shadow-md border border-gray-100">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="space-y-1">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <ShoppingCart className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-xs font-medium text-navy">Secure Payment</p>
                </div>
                <div className="space-y-1">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Star className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-xs font-medium text-navy">Quality Assured</p>
                </div>
                <div className="space-y-1">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <Heart className="w-4 h-4 text-purple-600" />
                  </div>
                  <p className="text-xs font-medium text-navy">Customer Favorite</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Product Header */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-navy leading-tight mb-3">{product.name}</h1>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-lg font-semibold text-charcoal">({product.rating})</span>
                      <span className="text-gray-500 text-sm">• Premium Quality</span>
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

                <div className="bg-gradient-to-r from-navy/5 to-electric/5 rounded-lg p-4 border border-gray-100">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-bold text-navy">R{product.price}</span>
                    <span className="text-gray-500 text-base">ZAR</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Competitive pricing • Free delivery on orders over R500</p>
                </div>
              </div>
            </div>

            {/* Product Description */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-navy mb-4 flex items-center">
                <div className="w-6 h-6 bg-electric/20 rounded-lg flex items-center justify-center mr-2">
                  <Star className="w-3 h-3 text-electric" />
                </div>
                Product Overview
              </h3>
              <p className="text-charcoal text-base leading-relaxed">{product.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAddingToCart}
                  className="flex-1 bg-gradient-to-r from-electric to-electric/90 hover:from-electric/90 hover:to-electric/80 text-navy font-bold py-4 text-lg shadow-lg rounded-lg border-2 border-electric/20 transition-all duration-300 hover:scale-105"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {!product.inStock ? 'Currently Unavailable' : 'Add to Cart'}
                </Button>
                
                <Button
                  variant="outline"
                  className="px-6 py-4 border-2 border-navy/20 text-navy hover:bg-navy hover:text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105"
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