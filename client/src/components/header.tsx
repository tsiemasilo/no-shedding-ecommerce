import { Search, User, ShoppingCart, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/hooks/use-cart';
import { useCustomerAuth } from '@/hooks/use-customer-auth';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLocation, Link } from 'wouter';
import logoImage from '@assets/WhatsApp Image 2025-06-28 at 20.45.26_1751136519966.jpeg';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount, setIsOpen } = useCart();
  const { customer, isAuthenticated: isCustomerAuth, logout: customerLogout } = useCustomerAuth();
  const { user: adminUser, logoutMutation: adminLogout } = useAdminAuth();
  const [, setLocation] = useLocation();

  // Check if either customer or admin is authenticated
  const isAuthenticated = isCustomerAuth || !!adminUser;
  const currentUser = adminUser || customer;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
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
          <div className="px-4 pb-3">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-base bg-white border border-gray-300 focus:ring-2 focus:ring-electric focus:border-electric"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-electric w-4 h-4" />
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
