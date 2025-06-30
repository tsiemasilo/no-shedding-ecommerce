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
    <div className="min-h-screen bg-sand">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => setLocation('/')}
          className="mb-6 text-navy hover:text-electric"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-navy mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                {renderStars(product.rating)}
                <Badge variant={product.inStock ? "default" : "destructive"}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
                {product.featured && (
                  <Badge variant="secondary" className="bg-electric text-navy">
                    Featured
                  </Badge>
                )}
              </div>
              <p className="text-4xl font-bold text-navy mb-6">R{product.price}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-navy mb-3">Description</h3>
              <p className="text-charcoal leading-relaxed">{product.description}</p>
            </div>

            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock || isAddingToCart}
                className="w-full bg-electric hover:bg-electric/90 text-navy font-semibold py-3"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {isAddingToCart ? "Adding to Cart..." : "Add to Cart"}
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center gap-3 text-sm text-charcoal">
                <Shield className="w-5 h-5 text-electric" />
                <span>Secure Payment & Privacy Protection</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-charcoal">
                <Truck className="w-5 h-5 text-electric" />
                <span>Free Shipping on Orders Over R500</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-charcoal">
                <RotateCcw className="w-5 h-5 text-electric" />
                <span>30-Day Return Policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}