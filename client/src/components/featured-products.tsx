import { useQuery } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';
import type { Product } from '@shared/schema';

export function FeaturedProducts() {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products?featured=true'],
  });

  const { addToCart, isAddingToCart } = useCart();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleAddToCart = (product: Product) => {
    addToCart({ productId: product.id, quantity: 1 });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
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
    <section className="py-16 bg-navy">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Featured Products</h2>
          <p className="text-sand text-lg">Discover our most popular electrical solutions</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-sand rounded-lg shadow-md overflow-hidden border border-gray-200 hover:border-electric transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => setLocation(`/product/${product.id}`)}
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                {!product.inStock && (
                  <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded-tl-md rounded-br-md font-bold text-xs shadow-lg transform rotate-12 z-10">
                    OUT OF STOCK
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-navy mb-3 text-lg">{product.name}</h3>
                <p className="text-charcoal text-base mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-navy">R{product.price}</span>
                  {renderStars(product.rating)}
                </div>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  disabled={isAddingToCart || !product.inStock}
                  className="w-full bg-bright-orange hover:bg-orange-600 text-white font-semibold py-3 text-base"
                >
                  {!product.inStock ? 'Out of Stock' : 'Add to Cart'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
