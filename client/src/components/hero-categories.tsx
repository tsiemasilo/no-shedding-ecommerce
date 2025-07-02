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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
              Premium Electrical Solutions
            </h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
              Discover our comprehensive portfolio of electrical products engineered for safety, reliability, and optimal performance
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-50 flex items-center justify-center">
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
            Premium Electrical Solutions
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
            Discover our comprehensive portfolio of electrical products engineered for safety, reliability, and optimal performance
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const IconComponent = getCategoryIcon(category.name);
            return (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200"
              >
                <div className="w-full h-48 bg-gray-50 flex items-center justify-center">
                  <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
                    <IconComponent className="w-10 h-10 text-blue-600" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-3">{category.name}</h3>
                  <p className="text-gray-600 mb-6 font-light leading-relaxed">{category.description}</p>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 transition-colors duration-200"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {(category.name === 'Lighting Solutions' || category.name === 'Power Solutions' || category.name === 'Appliance Alternatives') 
                      ? 'View Solutions' 
                      : `Explore ${category.name.split(' ')[0]}`}
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
