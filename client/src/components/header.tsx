import { Search, User, ShoppingCart, LogOut } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useCart } from '@/hooks/use-cart';
import { useCustomerAuth } from '@/hooks/use-customer-auth';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLocation, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import logoImage from '@assets/WhatsApp Image 2025-06-28 at 20.45.26_1751136519966.jpeg';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const { cartCount, setIsOpen } = useCart();
  const { customer, isAuthenticated: isCustomerAuth, logout: customerLogout } = useCustomerAuth();
  const { user: adminUser, logoutMutation: adminLogout } = useAdminAuth();
  const [, setLocation] = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch all products for search suggestions
  const { data: products = [] } = useQuery({
    queryKey: ['/api/products'],
  });

  // Check if either customer or admin is authenticated
  const isAuthenticated = isCustomerAuth || !!adminUser;
  const currentUser = adminUser || customer;

  // Generate search suggestions based on products
  const suggestions = searchQuery.trim().length >= 2 ? 
    products
      .filter((product: any) => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 6)
      .map((product: any) => product.name)
    : [];

  // Debug logging
  console.log('Search query:', searchQuery);
  console.log('Products available:', products.length);
  console.log('Suggestions generated:', suggestions);
  console.log('Show suggestions:', showSuggestions);

  // Handle clicking outside search to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setSelectedSuggestion(-1);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    console.log('Suggestion clicked:', suggestion);
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    setLocation(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedSuggestion(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedSuggestion(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter' && selectedSuggestion >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[selectedSuggestion]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedSuggestion(-1);
    }
  };

  const handleLogout = () => {
    if (adminUser) {
      adminLogout.mutate();
    } else {
      customerLogout();
    }
  };

  return (
    <header className="bg-navy shadow-lg sticky top-0 z-50">
      <div className="w-full px-2 md:px-4">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between h-20">
          {/* Logo - Far Left */}
          <div 
            className="flex items-center space-x-3 flex-shrink-0 ml-6 cursor-pointer"
            onClick={() => setLocation('/')}
          >
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
          <div className="flex-1 max-w-2xl mx-8" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Search for electrical solutions..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(e.target.value.trim().length >= 2);
                  setSelectedSuggestion(-1);
                }}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                  if (searchQuery.trim().length >= 2) {
                    setShowSuggestions(true);
                  }
                }}
                className="w-full pl-12 pr-4 py-3 text-lg bg-white border border-gray-300 focus:ring-2 focus:ring-electric focus:border-electric"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-electric w-5 h-5" />
              
              {/* Search Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className={`px-4 py-3 cursor-pointer hover:bg-gray-100 border-b border-gray-100 last:border-b-0 ${
                        index === selectedSuggestion ? 'bg-electric/10 text-navy' : 'text-gray-800'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleSuggestionClick(suggestion);
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <Search className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium">{suggestion}</span>
                      </div>
                    </div>
                  ))}
                  {searchQuery.trim().length >= 2 && suggestions.length === 0 && (
                    <div className="px-4 py-3 text-gray-500 text-sm">
                      No products found matching "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
          
          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 mr-4">
            <button 
              onClick={() => {
                setLocation('/');
                setTimeout(() => {
                  const categoriesSection = document.querySelector('.hero-categories');
                  if (categoriesSection) {
                    categoriesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 300);
              }}
              className="text-white hover:text-electric transition-colors text-lg font-medium"
            >
              Categories
            </button>
            <Link 
              href="/about" 
              className="text-white hover:text-electric transition-colors text-lg font-medium"
            >
              About
            </Link>
            <Link 
              href="/support" 
              className="text-white hover:text-electric transition-colors text-lg font-medium"
            >
              Support
            </Link>
          </nav>
          
          {/* User Actions */}
          <div className="flex items-center space-x-3 mr-6">
            {/* Authentication */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => setLocation('/profile')}
                  className="text-white hover:text-electric hover:bg-white/10 p-2 rounded-lg transition-all duration-200"
                  title="Profile"
                >
                  <User className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium hidden md:block">
                    {adminUser ? adminUser.username : (customer?.firstName || 'Profile')}
                  </span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:text-electric hover:bg-white/10 p-3 rounded-lg transition-all duration-200"
                  onClick={handleLogout}
                  title="Logout"
                >
                  <LogOut className="w-6 h-6" />
                </Button>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:text-electric hover:bg-white/10 p-4 rounded-lg transition-all duration-200"
                onClick={() => setLocation('/auth')}
                title="Sign In"
              >
                <User className="w-8 h-8" />
              </Button>
            )}

            {/* Shopping Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-white hover:text-electric hover:bg-white/10 p-4 rounded-lg transition-all duration-200"
              onClick={() => setIsOpen(true)}
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

        {/* Mobile Header */}
        <div className="md:hidden">
          {/* Top row - Logo and Actions */}
          <div className="flex items-center justify-between h-16 px-4">
            {/* Mobile Logo */}
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setLocation('/')}
            >
              <div 
                className="h-10 w-10 bg-white rounded-lg flex items-center justify-center p-1"
              >
                <img 
                  src={logoImage} 
                  alt="No Shedding Logo" 
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-white text-lg font-bold">No Shedding</span>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center space-x-2">
              {/* Authentication */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLocation('/profile')}
                    className="text-white hover:text-electric hover:bg-white/10 p-2 rounded-lg"
                    title="Profile"
                  >
                    <User className="w-5 h-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-white hover:text-electric hover:bg-white/10 p-2 rounded-lg"
                    onClick={handleLogout}
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-white hover:text-electric hover:bg-white/10 p-2 rounded-lg"
                  onClick={() => setLocation('/auth')}
                  title="Sign In"
                >
                  <User className="w-5 h-5" />
                </Button>
              )}

              {/* Mobile Shopping Cart */}
              <Button
                variant="ghost"
                size="sm"
                className="relative text-white hover:text-electric hover:bg-white/10 p-2 rounded-lg"
                onClick={() => setIsOpen(true)}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-bright-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold border border-navy">
                    {cartCount}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="px-4 pb-3" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(e.target.value.trim().length >= 2);
                  setSelectedSuggestion(-1);
                }}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                  if (searchQuery.trim().length >= 2) {
                    setShowSuggestions(true);
                  }
                }}
                className="w-full pl-10 pr-4 py-2 text-base bg-white border border-gray-300 focus:ring-2 focus:ring-electric focus:border-electric"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-electric w-4 h-4" />
              
              {/* Mobile Search Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className={`px-3 py-2 cursor-pointer hover:bg-gray-100 border-b border-gray-100 last:border-b-0 ${
                        index === selectedSuggestion ? 'bg-electric/10 text-navy' : 'text-gray-800'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleSuggestionClick(suggestion);
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <Search className="w-3 h-3 text-gray-400" />
                        <span className="text-xs font-medium">{suggestion}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-around py-2 border-t border-white/20">
            <button 
              onClick={() => {
                setLocation('/');
                setTimeout(() => {
                  const categoriesSection = document.querySelector('.hero-categories');
                  if (categoriesSection) {
                    categoriesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 300);
              }}
              className="text-white hover:text-electric transition-colors text-sm font-medium py-2"
            >
              Categories
            </button>
            <Link 
              href="/about" 
              className="text-white hover:text-electric transition-colors text-sm font-medium py-2"
            >
              About
            </Link>
            <Link 
              href="/support" 
              className="text-white hover:text-electric transition-colors text-sm font-medium py-2"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
