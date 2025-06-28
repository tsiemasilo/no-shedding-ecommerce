import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import type { Category } from '@shared/schema';

export function HeroCategories() {
  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

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
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-200"></div>
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
    <section className="py-16 bg-gradient-to-br from-sand via-white to-sand">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-navy mb-6 tracking-tight">
            Power Your World with <span className="text-electric">No Shedding</span>
          </h1>
          <p className="text-xl text-charcoal max-w-4xl mx-auto leading-relaxed">
            Discover premium electrical solutions engineered for modern living. From smart lighting to power management, we deliver safety, reliability, and innovation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group bg-white rounded-2xl shadow-xl overflow-hidden border-3 border-navy/20 hover:border-electric transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-navy mb-3 group-hover:text-electric transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-charcoal text-sm mb-4 leading-relaxed">
                  {category.description}
                </p>
                <Button className="w-full bg-bright-orange hover:bg-navy text-white font-semibold py-3 rounded-xl transition-all duration-300 group-hover:shadow-lg">
                  Shop Now
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-charcoal/60">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-electric rounded-full"></span>
              <span className="font-medium">UL Listed Products</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-electric rounded-full"></span>
              <span className="font-medium">Expert Installation</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-electric rounded-full"></span>
              <span className="font-medium">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-electric rounded-full"></span>
              <span className="font-medium">Fast Shipping</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
