import { useEffect } from 'react';
import { useCart } from '@/hooks/use-cart';

interface CartNotificationProps {
  isVisible: boolean;
  onClose: () => void;
  productName: string;
  productPrice: string;
  productImage?: string;
}

export function CartNotification({ isVisible, onClose, productName, productPrice, productImage }: CartNotificationProps) {
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
    <div className="fixed bottom-4 right-4 z-50 transition-all duration-300 ease-out transform animate-in slide-in-from-right-4 slide-in-from-bottom-4">
      <div className="relative w-80 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        {/* Orange accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-orange-500"></div>
        
        <div className="p-4">
          <div className="flex items-start space-x-3">
            {/* Success Icon */}
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">Added to cart</p>
                  <p className="text-sm text-gray-600 truncate">{productName}</p>
                  <p className="text-sm font-medium text-gray-900">R{productPrice}</p>
                </div>
                
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="ml-2 flex-shrink-0 rounded-full p-1 hover:bg-gray-100 transition-colors duration-200"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* View Cart Button */}
              <button
                onClick={handleViewCart}
                className="mt-3 w-full bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors duration-200"
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