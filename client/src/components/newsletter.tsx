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
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-light text-white mb-6">Stay Connected</h2>
          <div className="w-16 h-1 bg-blue-400 mx-auto mb-8"></div>
          <p className="text-gray-300 mb-8 font-light text-lg leading-relaxed">
            Receive technical insights, product updates, and industry news from our electrical engineering experts
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white focus:ring-2 focus:ring-blue-400 border-gray-300 shadow-sm"
              required
            />
            <Button
              type="submit"
              disabled={subscribeMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-2 transition-colors duration-200"
            >
              {subscribeMutation.isPending ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
