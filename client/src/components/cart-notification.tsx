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
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 ease-in-out transform">
      <div className="card w-[400px] h-auto bg-[#f9f9f9] rounded-[5px] shadow-[0_1px_4px_rgba(0,0,0,0.1),0_2px_3px_rgba(0,0,0,0.1)] p-0 px-[10px]">
        <div className="card-wrapper inline-flex flex-nowrap items-center w-full">
          {/* Cart Icon */}
          <div className="card-icon w-[20%]">
            <div className="icon-cart-box bg-[#e0f2f1] w-12 h-12 rounded-full text-center p-[15px] mx-auto flex items-center justify-center">
              <svg viewBox="0 0 576 512" width={20} height={20} xmlns="http://www.w3.org/2000/svg">
                <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" fill="#009688" />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="card-content w-[80%]">
            {/* Title and Close */}
            <div className="card-title-wrapper inline-flex flex-nowrap items-baseline w-full">
              <span className="card-title w-[95%] text-base font-semibold text-[#333] pt-5 pb-0 pl-[10px]">
                Added to cart!
              </span>
              <span className="card-action w-[5%] text-right pr-[30px]">
                <svg 
                  onClick={onClose}
                  className="cursor-pointer fill-black/20 hover:fill-black/60 transition-all duration-300 ease-in-out"
                  viewBox="0 0 384 512" 
                  width={15} 
                  height={15} 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </span>
            </div>

            {/* Product Name */}
            <div className="product-name text-sm text-[#757575] pt-[10px] pb-0 pl-[10px] cursor-pointer hover:underline">
              {productName}
            </div>

            {/* Product Price */}
            <div className="product-price text-sm font-semibold text-[#333] pt-0 pb-[10px] pl-[10px]">
              R{productPrice}
            </div>

            {/* View Cart Button */}
            <button
              onClick={handleViewCart}
              className="btn-view-cart text-xs font-semibold py-[5px] px-[10px] my-[5px] mx-[10px] mb-5 rounded-[15px] text-[#009688] border border-[#009688] bg-[#e0f2f1] shadow-none uppercase cursor-pointer transition-all duration-300 ease-in-out hover:text-white hover:bg-[#009688] active:text-white active:bg-[#009688] focus:text-white focus:bg-[#009688]"
              type="button"
            >
              View Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}