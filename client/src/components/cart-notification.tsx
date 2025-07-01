import { useState, useEffect } from 'react';
import { X, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';

interface CartNotificationProps {
  isVisible: boolean;
  onClose: () => void;
  productName: string;
  productPrice: string;
}

export function CartNotification({ isVisible, onClose, productName, productPrice }: CartNotificationProps) {
  const { setIsOpen } = useCart();

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000); // Auto-hide after 4 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const handleViewCart = () => {
    setIsOpen(true);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 ease-in-out transform">
      <div className="w-[360px] h-[150px] bg-white/10 backdrop-blur-[10px] rounded-2xl shadow-lg border border-white/20 p-2.5">
        <div className="flex items-center h-full">
          {/* Cart Icon */}
          <div className="w-1/5 flex justify-center">
            <div className="w-12 h-12 bg-black/20 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-black" />
            </div>
          </div>

          {/* Content */}
          <div className="w-4/5 pr-2">
            {/* Title and Close */}
            <div className="flex items-baseline justify-between w-full mb-2">
              <span className="text-base font-semibold text-gray-900 flex-1 pl-2.5">
                Added to cart!
              </span>
              <button
                onClick={onClose}
                className="p-1 hover:bg-black/10 rounded transition-colors"
              >
                <X className="w-4 h-4 text-black/20 hover:text-black/60" />
              </button>
            </div>

            {/* Product Name */}
            <div className="text-sm text-gray-700 mb-1 pl-2.5 cursor-pointer hover:underline">
              {productName}
            </div>

            {/* Product Price */}
            <div className="text-sm font-semibold text-gray-800 mb-3 pl-2.5">
              R{productPrice}
            </div>

            {/* View Cart Button */}
            <button
              onClick={handleViewCart}
              className="relative ml-2.5 px-5 py-2 bg-black rounded-full text-white text-sm font-bold border-2 border-white/30 overflow-hidden group hover:scale-105 transition-transform duration-300 flex items-center gap-2 h-[35px]"
            >
              <span>View cart</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              
              {/* Shine effect */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-60 -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-out"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}