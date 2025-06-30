import { useQuery } from '@tanstack/react-query';
import { useParams, useLocation } from 'wouter';
import { ArrowLeft, Star, ShoppingCart, Shield, Truck, RotateCcw, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ShoppingCart as ShoppingCartComponent } from '@/components/shopping-cart';
import type { Product } from '@shared/schema';

export default function ProductDetails() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { addToCart, isAddingToCart } = useCart();
  const { toast } = useToast();

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: [`/api/products/${id}`],
  });

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      await addToCart({
        productId: product.id,
        quantity: 1
      });
      
      toast({
        title: "Added to cart!",
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderStars = (rating: string) => {
    const numRating = parseFloat(rating);
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-5 h-5 ${
            i <= numRating ? 'text-electric fill-electric' : 'text-gray-300'
          }`}
        />
      );
    }
    return stars;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-sand">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy mx-auto mb-4"></div>
            <p className="text-navy">Loading product details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-sand">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-navy mb-4">Product Not Found</h2>
            <p className="text-charcoal mb-6">The product you're looking for doesn't exist.</p>
            <Button
              onClick={() => setLocation('/')}
              className="bg-electric hover:bg-electric/90 text-navy font-semibold"
            >
              Return to Home
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => setLocation('/')}
            className="text-navy hover:text-electric"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Store
          </Button>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Product Image */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              <div className="aspect-square relative p-8">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                {product.featured && (
                  <div className="absolute top-4 right-4 bg-orange text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    Featured Product
                  </div>
                )}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 text-center">
                <Shield className="w-8 h-8 text-electric mx-auto mb-3" />
                <p className="font-semibold text-navy text-sm">Secure Payment</p>
                <p className="text-xs text-charcoal">SSL Protected</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 text-center">
                <Truck className="w-8 h-8 text-electric mx-auto mb-3" />
                <p className="font-semibold text-navy text-sm">Free Shipping</p>
                <p className="text-xs text-charcoal">Orders over R500</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 text-center">
                <RotateCcw className="w-8 h-8 text-electric mx-auto mb-3" />
                <p className="font-semibold text-navy text-sm">Easy Returns</p>
                <p className="text-xs text-charcoal">30-Day Policy</p>
              </div>
            </div>

            {/* Product Description */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-navy mb-4">Product Description</h3>
              <p className="text-charcoal leading-relaxed text-lg">{product.description}</p>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            {/* Product Header */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold text-navy mb-4 leading-tight">{product.name}</h1>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1">
                      {renderStars(product.rating)}
                      <span className="text-lg font-semibold text-charcoal ml-2">({product.rating})</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="bg-gradient-to-r from-electric/10 to-orange/10 rounded-xl p-6 mb-6">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-5xl font-bold text-navy">R{product.price}</span>
                      <span className="text-lg text-charcoal bg-white px-3 py-1 rounded-full">incl. VAT</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-charcoal">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                        Or R{Math.round(parseFloat(product.price) / 6)}/month
                      </span>
                      <span>with 0% interest financing</span>
                    </div>
                  </div>

                  {/* Stock Status */}
                  <div className="mb-6">
                    {product.inStock ? (
                      <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="font-semibold text-green-800">In Stock - Ships Today</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="font-semibold text-red-800">Currently Out of Stock</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <Button
                    onClick={handleAddToCart}
                    disabled={!product.inStock || isAddingToCart}
                    className="w-full bg-electric hover:bg-electric/90 text-navy font-bold py-6 text-xl rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    size="lg"
                  >
                    <ShoppingCart className="w-6 h-6 mr-3" />
                    {isAddingToCart ? "Adding to Cart..." : product.inStock ? "Add to Cart" : "Notify When Available"}
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="py-4 rounded-xl border-2 border-navy/20 hover:bg-navy/5 transition-all duration-200">
                      <Heart className="w-5 h-5 mr-2 text-orange" />
                      Add to Wishlist
                    </Button>
                    <Button variant="outline" className="py-4 rounded-xl border-2 border-navy/20 hover:bg-navy/5 transition-all duration-200">
                      <Share2 className="w-5 h-5 mr-2 text-navy" />
                      Share Product
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-navy rounded-xl p-8 shadow-lg text-white">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Truck className="w-6 h-6 mr-3 text-electric" />
                Delivery & Returns
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl">
                  <div className="w-10 h-10 bg-electric/20 rounded-lg flex items-center justify-center">
                    <Truck className="w-5 h-5 text-electric" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Free Standard Delivery</p>
                    <p className="text-sm text-gray-300">On orders over R500 • 2-3 business days nationwide</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl">
                  <div className="w-10 h-10 bg-electric/20 rounded-lg flex items-center justify-center">
                    <RotateCcw className="w-5 h-5 text-electric" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">30-Day Returns</p>
                    <p className="text-sm text-gray-300">Free returns on all items • No questions asked</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ShoppingCartComponent />
    </div>
  );
}