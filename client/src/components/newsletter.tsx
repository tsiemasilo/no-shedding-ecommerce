import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest('POST', '/api/newsletter', { email });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive electrical safety tips and exclusive offers.",
      });
      setEmail('');
    },
    onError: () => {
      toast({
        title: "Subscription failed",
        description: "Please check your email address and try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      subscribeMutation.mutate(email);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-sand to-electric/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-10 w-32 h-32 border-4 border-electric rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-bright-orange rounded-lg rotate-45"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-navy mb-6">Stay Powered Up</h2>
          <p className="text-xl text-charcoal mb-8 max-w-2xl mx-auto">
            Join thousands of professionals getting electrical safety tips, product updates, and exclusive offers delivered to your inbox
          </p>
          
          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-electric/20 max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your professional email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-14 text-lg border-2 border-gray-200 focus:border-electric focus:ring-4 focus:ring-electric/20 rounded-xl"
                required
              />
              <Button
                type="submit"
                disabled={subscribeMutation.isPending}
                className="bg-bright-orange hover:bg-navy text-white font-bold px-8 h-14 text-lg rounded-xl transition-all duration-300 transform active:scale-95"
              >
                {subscribeMutation.isPending ? 'Subscribing...' : 'Get Updates'}
              </Button>
            </form>
            
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-charcoal/60">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-electric rounded-full"></span>
                <span>No spam, ever</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-electric rounded-full"></span>
                <span>Unsubscribe anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-electric rounded-full"></span>
                <span>Weekly updates</span>
              </div>
            </div>
          </div>
          
          {/* Social Proof */}
          <div className="mt-12 text-center">
            <p className="text-charcoal/60 mb-4">Trusted by professionals at</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <span className="bg-navy text-white px-4 py-2 rounded-lg font-semibold">Tesla</span>
              <span className="bg-navy text-white px-4 py-2 rounded-lg font-semibold">Google</span>
              <span className="bg-navy text-white px-4 py-2 rounded-lg font-semibold">Microsoft</span>
              <span className="bg-navy text-white px-4 py-2 rounded-lg font-semibold">Amazon</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
