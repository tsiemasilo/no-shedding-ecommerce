import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Search, Star, ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import type { Product } from '@shared/schema';

export default function SearchResults() {
  const [, setLocation] = useLocation();
  const { addToCart } = useCart();
  
  // Get search query from URL parameters
  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get('q') || '';

  const { data: allProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  // Filter products based on search query
  const searchResults = allProducts.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleAddToCart = (product: Product) => {
    addToCart({
      productId: product.id,
      quantity: 1,
      productName: product.name,
      productPrice: `R${product.price}`,
      productImage: product.image,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Search className="w-12 h-12 text-navy mx-auto mb-4 animate-pulse" />
            <p className="text-lg text-gray-600">Searching...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Back Button Section */}
      <div className="bg-navy py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="outline"
            onClick={() => setLocation("/")}
            className="group bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white hover:bg-white hover:text-navy font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 mr-3 group-hover:animate-pulse" />
            <span className="text-lg">Back to Home</span>
          </Button>
        </div>
      </div>

      {/* Search Results Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Search className="w-8 h-8 text-navy" />
            <h1 className="text-4xl font-bold text-navy">Search Results</h1>
          </div>
          <p className="text-lg text-gray-600 mb-2">
            {query ? `Results for "${query}"` : 'All Products'}
          </p>
          <p className="text-md text-gray-500">
            {searchResults.length} product{searchResults.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {searchResults.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No products found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We couldn't find any products matching "{query}". Try adjusting your search terms or browse our categories.
            </p>
            <Button 
              onClick={() => setLocation('/')}
              className="bg-navy hover:bg-navy/90 text-white px-8 py-3"
            >
              Browse All Products
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <Card 
                key={product.id} 
                className="group relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 rounded-2xl h-auto"
              >
                {/* Out of Stock Ribbon */}
                {!product.inStock && (
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-red-500 text-white px-3 py-1 text-sm font-bold transform rotate-12 shadow-lg rounded">
                      Out of Stock
                    </div>
                  </div>
                )}
                
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden rounded-t-2xl">
                    <img
                      src={product.image || '/api/placeholder/300/200'}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-xl text-navy mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {product.description}
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-electric">
                          R{product.price}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-electric text-electric" />
                          <span className="text-sm font-medium text-gray-700">
                            {product.rating}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation(`/product/${product.id}`)}
                          variant="outline"
                          className="flex-1 border-navy text-navy hover:bg-navy hover:text-white"
                        >
                          View Details
                        </Button>
                        <Button
                          onClick={() => handleAddToCart(product)}
                          disabled={!product.inStock}
                          className="flex-1 bg-electric hover:bg-electric/90 text-navy font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}