import { Search, User, ShoppingCart, Bolt } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/hooks/use-cart';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount, setIsOpen } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="bg-navy shadow-2xl sticky top-0 z-50 border-b-4 border-electric">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-electric rounded-xl p-2">
              <Bolt className="text-navy text-2xl" />
            </div>
            <div>
              <span className="text-white text-2xl font-bold tracking-tight">No Shedding</span>
              <div className="text-electric text-xs font-medium">ELECTRICAL SOLUTIONS</div>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8 hidden lg:block">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search for electrical solutions, tools, lighting..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-white/95 backdrop-blur border-2 border-transparent focus:border-electric focus:ring-4 focus:ring-electric/20 rounded-xl text-lg shadow-lg"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-charcoal w-5 h-5" />
            </form>
          </div>
          
          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-electric transition-colors font-medium text-lg">Categories</a>
            <a href="#" className="text-white hover:text-electric transition-colors font-medium text-lg">About</a>
            <a href="#" className="text-white hover:text-electric transition-colors font-medium text-lg">Support</a>
          </nav>
          
          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white hover:text-electric hover:bg-electric/10 w-12 h-12 rounded-xl">
              <User className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-white hover:text-electric hover:bg-electric/10 w-12 h-12 rounded-xl"
              onClick={() => setIsOpen(true)}
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-bright-orange text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-navy shadow-lg">
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
