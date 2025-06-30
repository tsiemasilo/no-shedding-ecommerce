import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Lightbulb, Zap, Home, Wrench, Star, Shield } from 'lucide-react';
import { useState } from 'react';
import { SubcategoryView } from '@/components/subcategory-view';
import type { Category } from '@shared/schema';

export function HeroCategories() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  // Show subcategory view if a category is selected
  if (selectedCategory) {
    return (
      <SubcategoryView
        categoryId={selectedCategory.id}
        categoryName={selectedCategory.name}
        onBack={() => setSelectedCategory(null)}
      />
    );
  }

  // Icon mapping for each category
  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName) {
      case 'Lighting Solutions':
        return Lightbulb;
      case 'Power Solutions':
        return Zap;
      case 'Appliance Alternatives':
        return Home;
      case 'Comfort & Utility Kits':
        return Wrench;
      case 'Premium Items':
        return Star;
      case 'Safety & Security':
        return Shield;
      default:
        return Lightbulb;
    }
  };

  if (isLoading) {
    return (
      <section className="py-12 bg-gradient-to-br from-sand to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
              Premium Electrical Solutions
            </h1>
            <p className="text-xl text-charcoal max-w-3xl mx-auto">
              Discover our comprehensive range of electrical products designed for safety, reliability, and performance
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-sand flex items-center justify-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
                </div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-16 bg-gray-200 rounded mb-4"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-br from-sand to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Premium Electrical Solutions
          </h1>
          <p className="text-xl text-charcoal max-w-3xl mx-auto">
            Discover our comprehensive range of electrical products designed for safety, reliability, and performance
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const IconComponent = getCategoryIcon(category.name);
            return (
              <div
                key={category.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-navy hover:border-electric transition-all duration-300 transform hover:scale-105"
              >
                <div className="w-full h-48 bg-sand flex items-center justify-center">
                  <IconComponent className="w-24 h-24 text-navy" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy mb-2">{category.name}</h3>
                  <p className="text-charcoal mb-4">{category.description}</p>
                  <Button 
                    className="w-full bg-bright-orange hover:bg-orange-600 text-white font-semibold"
                    onClick={() => {
                      if (category.name === 'Lighting Solutions') {
                        setSelectedCategory(category);
                      } else {
                        // Handle other categories - could navigate to product pages
                        console.log(`Browse ${category.name} products`);
                      }
                    }}
                  >
                    {category.name === 'Lighting Solutions' ? 'View Subcategories' : `Explore ${category.name.split(' ')[0]}`}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
