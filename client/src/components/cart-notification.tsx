import { useEffect } from 'react';
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
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-500 ease-out transform animate-in slide-in-from-right-8 slide-in-from-bottom-8">
      {/* Backdrop blur overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-black/10 backdrop-blur-sm rounded-2xl -z-10 transform scale-110"></div>
      
      <div className="relative w-[420px] h-auto bg-white/95 backdrop-blur-lg rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.15),0_10px_20px_rgba(0,0,0,0.1)] border border-white/20 overflow-hidden">
        {/* Gradient accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#009688] via-[#00bcd4] to-[#009688]"></div>
        
        <div className="p-6">
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <div className="flex-shrink-0">
              <div className="w-14 h-14 bg-gradient-to-br from-[#e0f2f1] to-[#b2dfdb] rounded-full flex items-center justify-center shadow-lg ring-2 ring-[#009688]/20">
                <svg viewBox="0 0 576 512" width={24} height={24} xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" fill="#009688" />
                </svg>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Title and Close */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                  Added to cart!
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
                >
                  <svg 
                    className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200"
                    viewBox="0 0 384 512" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                  </svg>
                </button>
              </div>

              {/* Product Details */}
              <div className="space-y-2 mb-4">
                <div className="text-sm font-medium text-gray-700 cursor-pointer hover:text-[#009688] transition-colors duration-200 truncate">
                  {productName}
                </div>
                <div className="text-lg font-bold text-gray-900">
                  R{productPrice}
                </div>
              </div>

              {/* View Cart Button */}
              <button
                onClick={handleViewCart}
                className="w-full bg-gradient-to-r from-[#009688] to-[#00acc1] hover:from-[#00796b] hover:to-[#0097a7] text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 ease-out uppercase tracking-wide text-sm"
                type="button"
              >
                View Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}