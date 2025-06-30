import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Lightbulb, Sun, Battery, Zap } from 'lucide-react';
import type { Subcategory } from '@shared/schema';

interface SubcategoryViewProps {
  categoryId: number;
  categoryName: string;
  onBack: () => void;
}

export function SubcategoryView({ categoryId, categoryName, onBack }: SubcategoryViewProps) {
  const { data: subcategories = [], isLoading } = useQuery<Subcategory[]>({
    queryKey: ['/api/subcategories', categoryId],
    queryFn: () => fetch(`/api/subcategories?categoryId=${categoryId}`).then(res => res.json())
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
        return Zap;
      default:
        return Lightbulb;
    }
  };

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
            Choose from our specialized lighting subcategories designed for every electrical need
          </p>
        </div>
        
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
                    className="w-full bg-electric hover:bg-electric/90 text-navy font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    Browse Products
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}