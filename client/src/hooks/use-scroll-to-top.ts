import { useEffect } from 'react';
import { useLocation } from 'wouter';

export function useScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Scroll to top immediately when route changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);
}