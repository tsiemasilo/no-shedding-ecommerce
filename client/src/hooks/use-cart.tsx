import { useState, createContext, useContext, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { CartItemWithProduct } from '@/lib/types';

// Generate a session ID for the user
const getSessionId = () => {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};

interface CartContextType {
  cartItems: CartItemWithProduct[];
  cartCount: number;
  cartTotal: number;
  isOpen: boolean;
  isLoading: boolean;
  setIsOpen: (open: boolean) => void;
  addToCart: (data: { productId: number; quantity: number; productName?: string; productPrice?: string; productImage?: string }) => void;
  updateQuantity: (data: { id: number; quantity: number }) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  isAddingToCart: boolean;
  showNotification: boolean;
  setShowNotification: (show: boolean) => void;
  lastAddedProduct: { name: string; price: string; image?: string } | null;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<{ name: string; price: string; image?: string } | null>(null);
  const queryClient = useQueryClient();
  const sessionId = getSessionId();

  const { data: cartItems = [], isLoading } = useQuery<CartItemWithProduct[]>({
    queryKey: ['/api/cart', sessionId],
    queryFn: async () => {
      const response = await fetch(`/api/cart/${sessionId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }
      return response.json();
    },
  });

  const addToCartMutation = useMutation({
    mutationFn: async ({ productId, quantity, productName, productPrice, productImage }: { 
      productId: number; 
      quantity: number; 
      productName?: string; 
      productPrice?: string; 
      productImage?: string;
    }) => {
      const response = await apiRequest('POST', '/api/cart', {
        productId,
        quantity,
        sessionId,
      });
      return { data: await response.json(), productName, productPrice, productImage };
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart', sessionId] });
      
      // Show notification if product info is provided
      if (result.productName && result.productPrice) {
        setLastAddedProduct({
          name: result.productName,
          price: result.productPrice,
          image: result.productImage
        });
        setShowNotification(true);
      }
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) => {
      const response = await apiRequest('PUT', `/api/cart/${id}`, { quantity });
      return response.json();
    },
    onMutate: async ({ id, quantity }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['/api/cart', sessionId] });
      
      // Snapshot the previous value
      const previousCartItems = queryClient.getQueryData(['/api/cart', sessionId]);
      
      // Optimistically update the cache
      queryClient.setQueryData(['/api/cart', sessionId], (old: CartItemWithProduct[] | undefined) => {
        if (!old) return old;
        return old.map(item => 
          item.id === id ? { ...item, quantity } : item
        );
      });
      
      return { previousCartItems };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousCartItems) {
        queryClient.setQueryData(['/api/cart', sessionId], context.previousCartItems);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart', sessionId] });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest('DELETE', `/api/cart/${id}`);
      return response.json();
    },
    onMutate: async (id: number) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['/api/cart', sessionId] });
      
      // Snapshot the previous value
      const previousCartItems = queryClient.getQueryData(['/api/cart', sessionId]);
      
      // Optimistically remove the item from the cache
      queryClient.setQueryData(['/api/cart', sessionId], (old: CartItemWithProduct[] | undefined) => {
        if (!old) return old;
        return old.filter(item => item.id !== id);
      });
      
      return { previousCartItems };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousCartItems) {
        queryClient.setQueryData(['/api/cart', sessionId], context.previousCartItems);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart', sessionId] });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('DELETE', `/api/cart/session/${sessionId}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart', sessionId] });
    },
  });

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => {
    if (item.product) {
      return sum + parseFloat(item.product.price) * item.quantity;
    }
    return sum;
  }, 0);

  const contextValue: CartContextType = {
    cartItems,
    cartCount,
    cartTotal,
    isOpen,
    isLoading,
    setIsOpen,
    addToCart: addToCartMutation.mutate,
    updateQuantity: updateQuantityMutation.mutate,
    removeFromCart: removeFromCartMutation.mutate,
    clearCart: clearCartMutation.mutate,
    isAddingToCart: addToCartMutation.isPending,
    showNotification,
    setShowNotification,
    lastAddedProduct,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}