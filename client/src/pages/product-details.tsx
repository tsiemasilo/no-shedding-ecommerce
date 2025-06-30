import { useQuery } from '@tanstack/react-query';
import { useParams, useLocation } from 'wouter';
import { ArrowLeft, Star, ShoppingCart, Shield, Truck, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
    <div className="min-h-screen bg-gradient-to-br from-sand to-white">
      {/* Header with Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => setLocation('/')}
            className="text-navy hover:text-electric hover:bg-electric/10 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image Section */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {product.featured && (
                  <div className="absolute top-4 right-4 bg-orange text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    ⭐ Featured
                  </div>
                )}
              </div>
            </div>
            
            {/* Trust Indicators - Moved here for better visual balance */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold text-navy mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-electric" />
                Why Choose No Shedding?
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-charcoal">
                  <div className="w-2 h-2 bg-electric rounded-full"></div>
                  <span>Secure Payment & Privacy Protection</span>
                </div>
                <div className="flex items-center gap-3 text-charcoal">
                  <div className="w-2 h-2 bg-electric rounded-full"></div>
                  <span>Free Shipping on Orders Over R500</span>
                </div>
                <div className="flex items-center gap-3 text-charcoal">
                  <div className="w-2 h-2 bg-electric rounded-full"></div>
                  <span>30-Day Money-Back Guarantee</span>
                </div>
                <div className="flex items-center gap-3 text-charcoal">
                  <div className="w-2 h-2 bg-electric rounded-full"></div>
                  <span>Expert Customer Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Information Section */}
          <div className="space-y-8">
            {/* Product Header */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                {renderStars(product.rating)}
                <span className="text-sm text-charcoal font-medium">({product.rating} stars)</span>
                <Badge variant={product.inStock ? "default" : "destructive"} className="ml-auto">
                  {product.inStock ? "✓ In Stock" : "Out of Stock"}
                </Badge>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-navy mb-4 leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl lg:text-5xl font-bold text-navy">R{product.price}</span>
                <span className="text-lg text-charcoal/70">excl. VAT</span>
              </div>

              {/* Action Button */}
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock || isAddingToCart}
                className="w-full bg-gradient-to-r from-electric to-orange hover:from-electric/90 hover:to-orange/90 text-navy font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                size="lg"
              >
                <ShoppingCart className="w-6 h-6 mr-3" />
                {isAddingToCart ? "Adding to Cart..." : product.inStock ? "Add to Cart" : "Currently Unavailable"}
              </Button>
            </div>

            {/* Product Description */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-navy mb-4 flex items-center">
                <div className="w-1 h-6 bg-electric rounded-full mr-3"></div>
                Product Details
              </h3>
              <p className="text-charcoal leading-relaxed text-lg">{product.description}</p>
            </div>

            {/* Additional Features */}
            <div className="bg-gradient-to-r from-navy to-navy/90 rounded-2xl p-8 shadow-lg text-white">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <div className="w-2 h-2 bg-electric rounded-full mr-3"></div>
                Key Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-electric/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-electric" />
                  </div>
                  <span>Quality Guaranteed</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-electric/20 rounded-lg flex items-center justify-center">
                    <Truck className="w-4 h-4 text-electric" />
                  </div>
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-electric/20 rounded-lg flex items-center justify-center">
                    <RotateCcw className="w-4 h-4 text-electric" />
                  </div>
                  <span>Easy Returns</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-electric/20 rounded-lg flex items-center justify-center">
                    <Star className="w-4 h-4 text-electric" />
                  </div>
                  <span>Top Rated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}