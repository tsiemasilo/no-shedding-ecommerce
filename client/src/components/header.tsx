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
      <div className="w-full px-2">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Far Left */}
          <div className="flex items-center space-x-3 flex-shrink-0 ml-6">
            <div 
              className="h-16 w-16 bg-white rounded-lg flex items-center justify-center p-1"
            >
              <img 
                src={logoImage} 
                alt="No Shedding Logo" 
                className="h-full w-full object-contain"
              />
            </div>
            <span className="text-white text-2xl font-bold">No Shedding</span>
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search for electrical solutions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-lg bg-white border border-gray-300 focus:ring-2 focus:ring-electric focus:border-electric"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-electric w-5 h-5" />
            </form>
          </div>
          
          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 mr-4">
            <a href="#" className="text-white hover:text-electric transition-colors text-lg font-medium">Categories</a>
            <a href="#" className="text-white hover:text-electric transition-colors text-lg font-medium">About</a>
            <a href="#" className="text-white hover:text-electric transition-colors text-lg font-medium">Support</a>
          </nav>
          
          {/* User Actions */}
          <div className="flex items-center space-x-3 mr-6">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:text-electric hover:bg-white/10 p-4 rounded-lg transition-all duration-200"
              onClick={() => setLocation('/admin/login')}
            >
              <User className="w-8 h-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-white hover:text-electric hover:bg-white/10 p-4 rounded-lg transition-all duration-200"
              onClick={() => {
                console.log('Cart button clicked, setting isOpen to true');
                setIsOpen(true);
              }}
            >
              <ShoppingCart className="w-8 h-8" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-bright-orange text-white text-sm rounded-full w-7 h-7 flex items-center justify-center font-bold border-2 border-navy">
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
