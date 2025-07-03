import { X, Plus, Minus, Trash2, ShoppingBag, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCustomerAuth } from '@/hooks/use-customer-auth';
import { useLocation } from 'wouter';
import { useState } from 'react';

export function ShoppingCart() {
  const { 
    cartItems, 
    cartTotal, 
    isOpen, 
    setIsOpen, 
    updateQuantity, 
    removeFromCart,
    clearCart,
    isLoading 
  } = useCart();
  
  const { customer, isAuthenticated } = useCustomerAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [couponCode, setCouponCode] = useState('');

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 0) {
      return; // Don't allow negative quantities
    }
    updateQuantity({ id, quantity: newQuantity });
  };

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
  };

  const handleClearAll = () => {
    clearCart();
    toast({
      title: "Cart cleared",
    });
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        variant: "destructive",
      });
      setIsOpen(false);
      // Store the intended destination before redirecting to auth
      localStorage.setItem('redirectAfterLogin', '/checkout');
      setLocation('/auth');
      return;
    }
    
    // Close cart and navigate to checkout page
    setIsOpen(false);
    setLocation('/checkout');
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Coupon Applied",
      description: `Coupon "${couponCode}" has been applied.`,
    });
    setCouponCode('');
  };

  const subtotal = cartTotal;
  const discount = 0; // Calculate discount based on coupons
  const shipping = cartItems.length > 0 ? 4.99 : 0;
  const finalTotal = subtotal - discount + shipping;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-[500px] bg-gradient-to-b from-white to-gray-50 z-50 shadow-2xl transform transition-transform duration-300 ease-out">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-200/50 p-6 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#009688] to-[#00acc1] rounded-full flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
                <p className="text-sm text-gray-500">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
            >
              <X className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
            </button>
          </div>
          
          {/* Clear All Button */}
          {cartItems.length > 0 && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleClearAll}
                className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All</span>
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Cart Items */}
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Add some products to get started</p>
              <button
                onClick={() => {
                  setIsOpen(false);
                  // Navigate to home and scroll to categories section
                  setLocation('/');
                  setTimeout(() => {
                    const categoriesSection = document.querySelector('.hero-categories');
                    if (categoriesSection) {
                      categoriesSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 300);
                }}
                className="px-6 py-3 bg-gradient-to-r from-[#009688] to-[#00acc1] text-white font-semibold rounded-xl hover:from-[#00796b] hover:to-[#0097a7] transition-all duration-300 transform hover:scale-105"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center space-x-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-100 shadow-sm">
                      {item.product?.image ? (
                        <img
                          src={item.product.image}
                          alt={item.product.name || ''}
                          className="w-18 h-18 object-contain p-1"
                          style={{ backgroundColor: 'transparent' }}
                        />
                      ) : (
                        <div className="w-18 h-18 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                          <span className="text-orange-600 text-xs font-semibold">IMG</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 mb-1 truncate">
                        {item.product?.name || 'Product'}
                      </h4>
                      <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                        {item.product?.description || 'Premium Quality Product'}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900">
                          R{item.product?.price || '0.00'}
                        </span>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-200 transition-colors duration-200"
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="px-3 py-2 text-sm font-semibold text-gray-900 min-w-[40px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-200 transition-colors duration-200"
                            >
                              <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                          
                          {/* Remove Button */}
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Coupon Section - Only show if cart has items */}
          {cartItems.length > 0 && (
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Have a coupon code?
              </h3>
              <form onSubmit={handleApplyCoupon} className="flex space-x-3">
                <Input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#009688] focus:border-transparent text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-[#009688] to-[#00acc1] text-white text-sm font-semibold rounded-lg hover:from-[#00796b] hover:to-[#0097a7] transition-all duration-300"
                >
                  Apply
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Footer - Only show if cart has items */}
        {cartItems.length > 0 && (
          <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-gray-200/50 p-6">
            {/* Summary */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-gray-900">R{subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-semibold text-green-600">-R{discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-gray-900">R{shipping.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-gray-900">R{finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-[#009688] to-[#00acc1] hover:from-[#00796b] hover:to-[#0097a7] text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 text-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
