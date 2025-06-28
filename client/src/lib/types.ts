export interface CartItemWithProduct {
  id: number;
  productId: number;
  quantity: number;
  sessionId: string;
  product?: {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    categoryId: number;
    featured: boolean;
    rating: string;
    inStock: boolean;
  };
}
