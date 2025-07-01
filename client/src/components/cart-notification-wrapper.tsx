import { useCart } from '@/hooks/use-cart';
import { CartNotification } from './cart-notification';

export function CartNotificationWrapper() {
  const { showNotification, setShowNotification, lastAddedProduct } = useCart();

  return (
    <CartNotification
      isVisible={showNotification}
      onClose={() => setShowNotification(false)}
      productName={lastAddedProduct?.name || ''}
      productPrice={lastAddedProduct?.price || ''}
      productImage={lastAddedProduct?.image || ''}
    />
  );
}