import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Lightbulb, Sun, Battery, Radar, Star, ShoppingCart, Smartphone, Shield, Flame, Coffee, Settings, Wind, Package, Eye, Zap, Fan } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import type { Subcategory, Product } from '@shared/schema';
import { formatPrice } from '@/lib/utils';

interface SubcategoryViewProps {
  categoryId: number;
  categoryName: string;
  onBack: () => void;
}

export function SubcategoryView({ categoryId, categoryName, onBack }: SubcategoryViewProps) {
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
  const { addToCart, isAddingToCart } = useCart();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const { data: subcategories = [], isLoading } = useQuery<Subcategory[]>({
    queryKey: ['/api/subcategories', categoryId],
    queryFn: () => fetch(`/api/subcategories?categoryId=${categoryId}`).then(res => res.json())
  });

  // Fetch products for the selected subcategory
  const { data: products = [], isLoading: isLoadingProducts } = useQuery<Product[]>({
    queryKey: ['/api/products', { subcategoryId: selectedSubcategory?.id }],
    queryFn: () => fetch(`/api/products?subcategoryId=${selectedSubcategory?.id}`).then(res => res.json()),
    enabled: !!selectedSubcategory
  });

  const getSubcategoryIcon = (iconName: string | null) => {
    switch (iconName) {
      case 'Zap':
        return Zap;
      case 'Sun':
        return Sun;
      case 'Lightbulb':
        return Lightbulb;
      case 'Eye':
        return Eye;
      case 'Smartphone':
        return Smartphone;
      case 'Shield':
        return Shield;
      case 'Flame':
        return Flame;
      case 'Coffee':
        return Coffee;
      case 'Settings':
        return Settings;
      case 'Wind':
        return Wind;
      case 'Package':
        return Package;
      case 'Fan':
        return Fan;
      default:
        return Lightbulb;
    }
  };

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

  // Show products view if a subcategory is selected
  if (selectedSubcategory) {
    return (
      <div className="bg-gradient-to-br from-sand to-white">
        {/* Back Button Section */}
        <div className="bg-navy py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button
              variant="outline"
              onClick={() => setSelectedSubcategory(null)}
              className="group bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white hover:bg-white hover:text-navy font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5 mr-3 group-hover:animate-pulse" />
              <span className="text-lg">Back to {categoryName}</span>
            </Button>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            
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
                <div
                  key={product.id}
                  className="flip-card w-full h-96 cursor-pointer"
                  onClick={() => setLocation(`/product/${product.id}`)}
                >
                  <div className="flip-card-inner">
                    {/* Front - Product Image */}
                    <div className="flip-card-front">
                      <div className="relative w-full h-full flex flex-col">
                        <div className="relative h-72">
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
                        <div className="bg-white p-4 rounded-b-lg border-t flex flex-col justify-center z-10 relative">
                          <h3 className="font-semibold text-navy text-center text-sm line-clamp-2 mb-1 opacity-100">{product.name}</h3>
                          <p className="text-charcoal text-center text-sm font-medium mb-2 opacity-100">R{formatPrice(product.price)}</p>
                          
                          {/* Mobile Add to Cart Button - only visible on mobile */}
                          <div className="md:hidden">
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(product);
                              }}
                              disabled={isAddingToCart || !product.inStock}
                              className="w-full bg-electric hover:bg-electric/90 text-navy font-semibold py-2 text-xs"
                              size="sm"
                            >
                              {!product.inStock ? 'Out of Stock' : 'Add to Cart'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Back - Product Details */}
                    <div className="flip-card-back">
                      <div className="w-full h-full bg-gradient-to-br from-navy to-navy/90 text-white p-4 rounded-lg flex flex-col justify-center items-center">
                        <div className="text-center mb-4">
                          <h3 className="font-bold text-xl mb-3 text-electric">{product.name}</h3>
                          <div className="flex items-center justify-center mb-3">
                            <span className="text-2xl font-bold text-white">R{formatPrice(product.price)}</span>
                          </div>
                          <div className="flex items-center justify-center mb-3">
                            {renderStars(product.rating)}
                          </div>
                        </div>
                        
                        <div className="space-y-3 w-full">
                          <div className="flex items-center justify-between text-sm bg-white bg-opacity-10 p-2 rounded-lg">
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
                            className="w-full bg-electric hover:bg-electric/90 text-navy font-semibold py-2 text-sm"
                          >
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            {!product.inStock ? 'Out of Stock' : 'Add to Cart'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
    <div className="bg-gradient-to-br from-sand to-white">
      {/* Back Button Section */}
      <div className="bg-navy py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="outline"
            onClick={onBack}
            className="group bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white hover:bg-white hover:text-navy font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 mr-3 group-hover:animate-pulse" />
            <span className="text-lg">Back to Categories</span>
          </Button>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          
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
              const IconComponent = getSubcategoryIcon(subcategory.icon);
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