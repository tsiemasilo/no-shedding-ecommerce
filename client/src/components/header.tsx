import { Search, User, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/hooks/use-cart';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import logoImage from '@assets/WhatsApp Image 2025-06-28 at 20.45.26_1751136519966.jpeg';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount, setIsOpen } = useCart();
  const [, setLocation] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="bg-navy shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div 
              className="h-12 w-12 bg-white rounded-lg flex items-center justify-center p-1"
            >
              <img 
                src={logoImage} 
                alt="No Shedding Logo" 
                className="h-full w-full object-contain"
              />
            </div>
            <span className="text-white text-xl font-bold">No Shedding</span>
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search for electrical solutions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 bg-white border border-gray-300 focus:ring-2 focus:ring-electric focus:border-electric"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-electric w-4 h-4" />
            </form>
          </div>
          
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-white hover:text-electric transition-colors">Categories</a>
            <a href="#" className="text-white hover:text-electric transition-colors">About</a>
            <a href="#" className="text-white hover:text-electric transition-colors">Support</a>
          </nav>
          
          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:text-electric"
              onClick={() => setLocation('/admin/login')}
            >
              <User className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-white hover:text-electric"
              onClick={() => setIsOpen(true)}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-bright-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
