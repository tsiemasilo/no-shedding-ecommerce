import { Header } from '@/components/header';
import { HeroCategories } from '@/components/hero-categories';
import { FeaturedProducts } from '@/components/featured-products';
import { BrandStory } from '@/components/brand-story';
import { Newsletter } from '@/components/newsletter';
import { Footer } from '@/components/footer';
import { ShoppingCart } from '@/components/shopping-cart';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroCategories />
      <FeaturedProducts />
      <BrandStory />
      <Newsletter />
      <Footer />
      <ShoppingCart />
    </div>
  );
}
