import { X, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  
  const { toast } = useToast();
  const [couponCode, setCouponCode] = useState('');

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity({ id, quantity: newQuantity });
    }
  };

  const handleCheckout = () => {
    toast({
      title: "Checkout",
      description: "Checkout functionality would be implemented here.",
    });
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
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-[450px] bg-gray-50 z-50 overflow-y-auto">
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 bg-white shadow-md rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Master Container */}
        <div className="p-4 space-y-3">
          {/* Cart Card */}
          <div className="bg-white rounded-t-[19px] rounded-b-[7px] shadow-lg">
            <div className="h-10 flex items-center px-5 border-b border-gray-100">
              <label className="font-bold text-xs text-gray-600 uppercase tracking-wide">Your cart</label>
            </div>
            <div className="p-3">
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-16 bg-gray-200 rounded mb-2"></div>
                </div>
              ) : cartItems.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-[60px_1fr_80px_1fr] gap-3 items-center">
                      {/* Product Image */}
                      <div className="w-15 h-15 bg-orange-50 rounded-lg flex items-center justify-center">
                        {item.product?.image ? (
                          <img
                            src={item.product.image}
                            alt={item.product.name || ''}
                            className="w-12 h-12 object-cover rounded"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-orange-100 rounded flex items-center justify-center">
                            <span className="text-orange-500 text-xs">IMG</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Product Details */}
                      <div>
                        <span className="block text-sm font-semibold text-gray-700 mb-2">
                          {item.product?.name || 'Product'}
                        </span>
                        <p className="text-xs font-semibold text-gray-500">
                          {item.product?.description?.substring(0, 30) || 'Premium Quality'}
                        </p>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="h-8 grid grid-cols-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="flex items-center justify-center h-full text-gray-600 hover:bg-gray-50 rounded-l-lg transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <label className="flex items-center justify-center h-full text-sm font-bold text-gray-700">
                          {item.quantity}
                        </label>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="flex items-center justify-center h-full text-gray-600 hover:bg-gray-50 rounded-r-lg transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      
                      {/* Price */}
                      <label className="text-sm font-semibold text-gray-700 text-right">
                        R{item.product?.price || '0.00'}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Coupons Card */}
          <div className="bg-white rounded-lg shadow-lg">
            <div className="h-10 flex items-center px-5 border-b border-gray-100">
              <label className="font-bold text-xs text-gray-600 uppercase tracking-wide">Apply coupons</label>
            </div>
            <div className="p-3">
              <form onSubmit={handleApplyCoupon} className="grid grid-cols-[1fr_80px] gap-3">
                <Input
                  type="text"
                  placeholder="Apply your coupons here"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="h-9 px-3 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button
                  type="submit"
                  className="h-9 px-4 bg-gradient-to-b from-blue-400 via-blue-600 to-blue-700 text-white text-xs font-semibold rounded shadow-sm hover:from-blue-500 hover:via-blue-700 hover:to-blue-800 transition-all"
                >
                  Apply
                </button>
              </form>
            </div>
          </div>

          {/* Checkout Card */}
          <div className="bg-white rounded-t-[9px] rounded-b-[19px] shadow-lg">
            <div className="h-10 flex items-center px-5 border-b border-gray-100">
              <label className="font-bold text-xs text-gray-600 uppercase tracking-wide">Checkout</label>
            </div>
            <div className="p-3">
              <div className="grid grid-cols-[3fr_1fr] gap-1 mb-4">
                <span className="text-xs font-bold text-gray-500">Your cart subtotal:</span>
                <span className="text-sm font-semibold text-gray-700 text-right">R{subtotal.toFixed(2)}</span>
                
                <span className="text-xs font-bold text-gray-500">Discount through applied coupons:</span>
                <span className="text-sm font-semibold text-gray-700 text-right">R{discount.toFixed(2)}</span>
                
                <span className="text-xs font-bold text-gray-500">Shipping fees:</span>
                <span className="text-sm font-semibold text-gray-700 text-right">R{shipping.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex items-center justify-between px-5 py-3 bg-gray-100 rounded-b-[19px]">
              <div className="text-2xl font-black text-gray-800">
                <sup className="text-sm">R</sup>{finalTotal.toFixed(2)}
              </div>
              <button
                onClick={handleCheckout}
                className="h-9 px-6 bg-gradient-to-b from-blue-400 via-blue-600 to-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm hover:from-blue-500 hover:via-blue-700 hover:to-blue-800 transition-all"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
