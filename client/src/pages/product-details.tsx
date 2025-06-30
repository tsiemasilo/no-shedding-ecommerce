import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, ShoppingCart, Heart } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-sand to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Button
          variant="ghost"
          onClick={() => setLocation("/")}
          className="mb-8 text-navy hover:text-electric hover:bg-navy/5"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Product Image */}
          <div className="relative lg:sticky lg:top-8">
            <Card className="overflow-hidden shadow-xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[500px] object-cover"
              />
              {product.featured && (
                <div className="absolute top-6 left-6 bg-bright-orange text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Featured
                </div>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">Out of Stock</span>
                </div>
              )}
            </Card>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-navy leading-tight">{product.name}</h1>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  {renderStars(product.rating)}
                  <span className="text-lg font-medium text-charcoal">({product.rating})</span>
                </div>
                {product.inStock ? (
                  <Badge className="bg-green-100 text-green-800 px-3 py-1">In Stock</Badge>
                ) : (
                  <Badge variant="destructive" className="px-3 py-1">Out of Stock</Badge>
                )}
              </div>
            </div>

            <div className="py-4 border-y border-gray-200">
              <div className="text-6xl font-bold text-navy">
                R{product.price}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-navy">Description</h3>
              <p className="text-charcoal text-lg leading-relaxed">{product.description}</p>
            </div>

            <div className="flex space-x-4 pt-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock || isAddingToCart}
                className="flex-1 bg-electric hover:bg-electric/90 text-navy font-semibold py-4 text-lg shadow-lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {!product.inStock ? 'Out of Stock' : 'Add to Cart'}
              </Button>
              
              <Button
                variant="outline"
                className="px-8 py-4 border-navy text-navy hover:bg-navy hover:text-white"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            {/* Additional Product Info */}
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-navy mb-6">Product Specifications</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-charcoal font-medium">Quality Rating:</span>
                    <div className="flex items-center space-x-3">
                      {renderStars(product.rating)}
                      <span className="text-navy font-semibold text-lg">{product.rating}/5</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-charcoal font-medium">Availability:</span>
                    <span className={`font-semibold text-lg ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-charcoal font-medium">Featured Product:</span>
                    <span className={`font-semibold text-lg ${product.featured ? 'text-electric' : 'text-charcoal'}`}>
                      {product.featured ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}