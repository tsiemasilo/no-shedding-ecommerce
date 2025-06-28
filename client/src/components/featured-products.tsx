import { useQuery } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@shared/schema';

export function FeaturedProducts() {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products?featured=true'],
  });

  const { addToCart, isAddingToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
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
            className={`w-4 h-4 ${
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Featured Products</h2>
            <p className="text-charcoal text-lg">Discover our most popular electrical solutions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-sand rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-12 bg-gray-200 rounded mb-3"></div>
                  <div className="h-8 bg-gray-200 rounded mb-3"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-sand/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-navy mb-6">Best Selling Products</h2>
          <p className="text-charcoal text-lg max-w-2xl mx-auto">Professional-grade electrical solutions trusted by thousands of customers worldwide</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 hover:border-electric hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-electric text-navy px-2 py-1 rounded-full text-xs font-bold">
                    ⭐ {product.rating}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-navy mb-3 text-lg group-hover:text-electric transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-charcoal text-sm mb-4 leading-relaxed line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-navy">${product.price}</span>
                  {renderStars(product.rating)}
                </div>
                <Button
                  onClick={() => handleAddToCart(product)}
                  disabled={isAddingToCart || !product.inStock}
                  className="w-full bg-bright-orange hover:bg-navy text-white font-bold py-3 rounded-xl transition-all duration-300 transform active:scale-95"
                >
                  {!product.inStock ? 'Out of Stock' : 'Add to Cart'}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to action */}
        <div className="text-center mt-16">
          <Button className="bg-navy hover:bg-electric hover:text-navy text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
