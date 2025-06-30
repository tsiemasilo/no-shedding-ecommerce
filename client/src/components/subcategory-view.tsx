import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Lightbulb, Sun, Battery, Radar, Star, ShoppingCart, Smartphone, Shield } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import type { Subcategory, Product } from '@shared/schema';

interface SubcategoryViewProps {
  categoryId: number;
  categoryName: string;
  onBack: () => void;
}

export function SubcategoryView({ categoryId, categoryName, onBack }: SubcategoryViewProps) {
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
  const { addToCart, isAddingToCart } = useCart();
  const { toast } = useToast();

  const { data: subcategories = [], isLoading } = useQuery<Subcategory[]>({
    queryKey: ['/api/subcategories', categoryId],
    queryFn: () => fetch(`/api/subcategories?categoryId=${categoryId}`).then(res => res.json())
  });

  // Fetch products for the selected subcategory
  const { data: products = [], isLoading: isLoadingProducts } = useQuery<Product[]>({
    queryKey: ['/api/products', { categoryId, subcategoryId: selectedSubcategory?.id }],
    queryFn: () => fetch(`/api/products?categoryId=${categoryId}`).then(res => res.json()),
    enabled: !!selectedSubcategory
  });

  const getSubcategoryIcon = (name: string) => {
    switch (name) {
      case 'Rechargeable LED Lanterns':
        return Lightbulb;
      case 'Solar Powered Lamp':
        return Sun;
      case 'Rechargeable Bulbs':
        return Battery;
      case 'Motion Sensor Lights':
        return Radar;
      case 'Power Banks':
        return Smartphone;
      case 'UPS Devices':
        return Shield;
      default:
        return Lightbulb;
    }
  };

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

  // Show products view if a subcategory is selected
  if (selectedSubcategory) {
    return (
      <div className="bg-gradient-to-br from-sand to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Button
              variant="ghost"
              onClick={() => setSelectedSubcategory(null)}
              className="mb-8 text-navy hover:text-electric hover:bg-navy/5"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {categoryName}
            </Button>
            
            <h2 className="text-5xl font-bold text-navy mb-6">
              {selectedSubcategory.name}
            </h2>
            <p className="text-xl text-charcoal max-w-3xl mx-auto">
              {selectedSubcategory.description}
            </p>
          </div>

          {isLoadingProducts ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="w-full h-48 bg-gray-200"></div>
                  <CardContent className="p-4">
                    <div className="w-32 h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="w-full h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="w-24 h-8 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.featured && (
                      <div className="absolute top-3 left-3 bg-bright-orange text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Featured
                      </div>
                    )}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-semibold">Out of Stock</span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg text-navy mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-charcoal mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-navy">
                        ${product.price}
                      </span>
                      <div className="flex items-center space-x-1">
                        {renderStars(product.rating)}
                        <span className="text-sm text-charcoal ml-1">
                          ({product.rating})
                        </span>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock || isAddingToCart}
                      className="w-full bg-electric hover:bg-electric/90 text-navy font-semibold"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {!product.inStock ? 'Out of Stock' : 'Add to Cart'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-sand rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart className="w-12 h-12 text-charcoal" />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-4">No Products Yet</h3>
                <p className="text-charcoal mb-6">
                  We're working hard to bring you amazing {selectedSubcategory.name.toLowerCase()}. 
                  Check back soon for exciting new products!
                </p>
                <p className="text-sm text-charcoal/70">
                  Products will be available soon
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-sand to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse mb-4 mx-auto"></div>
            <div className="w-64 h-12 bg-gray-200 rounded animate-pulse mb-4 mx-auto"></div>
            <div className="w-96 h-6 bg-gray-200 rounded animate-pulse mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-sand flex items-center justify-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
                </div>
                <div className="p-6">
                  <div className="w-32 h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="w-full h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="w-24 h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-sand to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-8 text-navy hover:text-electric hover:bg-navy/5"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Categories
          </Button>
          
          <h2 className="text-5xl font-bold text-navy mb-6">
            {categoryName}
          </h2>
          <p className="text-xl text-charcoal max-w-3xl mx-auto">
            {categoryName === 'Lighting Solutions' 
              ? 'Choose from our specialized lighting subcategories designed for every electrical need'
              : categoryName === 'Power Solutions'
              ? 'Choose from our power solution subcategories for all your energy needs'
              : `Explore our ${categoryName.toLowerCase()} designed for your electrical requirements`
            }
          </p>
        </div>
        
        {subcategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {subcategories.map((subcategory) => {
              const IconComponent = getSubcategoryIcon(subcategory.name);
              return (
                <div
                  key={subcategory.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-navy hover:border-electric transition-all duration-300 transform hover:scale-105"
                >
                  <div className="w-full h-48 bg-gradient-to-br from-sand to-electric/10 flex items-center justify-center">
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <IconComponent className="w-16 h-16 text-navy" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-navy mb-3">{subcategory.name}</h3>
                    <p className="text-charcoal text-sm mb-4 leading-relaxed">
                      {subcategory.description}
                    </p>
                    <Button 
                      onClick={() => setSelectedSubcategory(subcategory)}
                      className="w-full bg-electric hover:bg-electric/90 text-navy font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      Browse Products
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-sand rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-12 h-12 text-charcoal" />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">Products Coming Soon</h3>
              <p className="text-charcoal mb-6">
                We're working hard to bring you amazing {categoryName.toLowerCase()} products. 
                Our team is carefully curating the best electrical solutions for this category.
              </p>
              <p className="text-sm text-charcoal/70">
                Check back soon for exciting new products and subcategories!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}