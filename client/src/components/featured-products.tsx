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
    addToCart({ 
      productId: product.id, 
      quantity: 1,
      productName: product.name,
      productPrice: product.price,
      productImage: product.image
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
              className="flip-card w-full h-96 cursor-pointer"
              onClick={() => setLocation(`/product/${product.id}`)}
            >
              <div className="flip-card-inner">
                {/* Front - Product Image */}
                <div className="flip-card-front">
                  <div className="relative w-full h-full flex flex-col">
                    <div className="relative flex-1">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain bg-white rounded-t-lg"
                        style={{ imageRendering: 'auto' }}
                      />
                      {!product.inStock && (
                        <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded-tl-md rounded-br-md font-bold text-xs shadow-lg transform rotate-12 z-10">
                          OUT OF STOCK
                        </div>
                      )}
                      {product.featured && (
                        <div className="absolute top-3 left-3 bg-electric text-navy px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                          ⭐ Featured
                        </div>
                      )}
                    </div>
                    <div className="bg-white p-4 rounded-b-lg border-t min-h-[4rem] flex flex-col justify-center">
                      <h3 className="font-semibold text-navy text-center text-sm line-clamp-2 mb-1">{product.name}</h3>
                      <p className="text-charcoal text-center text-sm font-medium">R{product.price}</p>
                    </div>
                  </div>
                </div>
                
                {/* Back - Product Details */}
                <div className="flip-card-back">
                  <div className="w-full h-full bg-gradient-to-br from-navy to-navy/90 text-white p-6 rounded-lg flex flex-col justify-center items-center">
                    <div className="text-center mb-6">
                      <h3 className="font-bold text-2xl mb-4 text-electric">{product.name}</h3>
                      <div className="flex items-center justify-center mb-4">
                        <span className="text-3xl font-bold text-white">R{product.price}</span>
                      </div>
                      <div className="flex items-center justify-center mb-4">
                        {renderStars(product.rating)}
                      </div>
                    </div>
                    
                    <div className="space-y-4 w-full">
                      <div className="flex items-center justify-between text-sm bg-white bg-opacity-10 p-3 rounded-lg">
                        <span className="text-sand">Stock Status:</span>
                        <span className={`font-semibold ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                      
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        disabled={isAddingToCart || !product.inStock}
                        className="w-full bg-electric hover:bg-electric/90 text-navy font-semibold py-3"
                      >
                        {!product.inStock ? 'Out of Stock' : 'Add to Cart'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
