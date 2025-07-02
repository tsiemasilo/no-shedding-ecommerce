import { useState, useEffect } from 'react';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Shield, Check, Truck, Mail, MapPin, Phone, CreditCard, Lock } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const checkoutFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal code is required"),
});

type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

const CheckoutForm = ({ 
  clientSecret, 
  onPaymentSuccess, 
  shippingInfo 
}: { 
  clientSecret: string;
  onPaymentSuccess: (paymentIntent: any) => void;
  shippingInfo: CheckoutFormData;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin,
          shipping: {
            name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              postal_code: shippingInfo.postalCode,
              country: 'ZA',
            },
          },
        },
        redirect: 'if_required',
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onPaymentSuccess(paymentIntent);
      }
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "An unexpected error occurred during payment processing.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <PaymentElement />
      </div>
      
      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 rounded-lg"
      >
        {isProcessing ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
            Processing Payment...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Lock className="w-5 h-5 mr-3" />
            Complete Order
          </div>
        )}
      </Button>
    </form>
  );
};

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [clientSecret, setClientSecret] = useState("");

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
    },
  });

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    setLocation('/');
    return null;
  }

  // Calculate totals
  const subtotal = cartTotal;
  const shipping = cartItems.length > 0 ? 4.99 : 0;
  const tax = subtotal * 0.15;
  const total = subtotal + shipping + tax;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    apiRequest("POST", "/api/create-payment-intent", { 
      amount: Math.round(total * 100), // Convert to cents
      currency: 'zar'
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        console.error("Error creating payment intent:", error);
        toast({
          title: "Payment Setup Error",
          description: "Unable to initialize payment. Please try again.",
          variant: "destructive",
        });
      });
  }, [total]);

  const handlePaymentSuccess = async (paymentIntent: any) => {
    try {
      toast({
        title: "Payment Successful!",
        description: "Your order has been placed successfully. You will receive a confirmation email shortly.",
      });

      // Clear cart and redirect to home page
      clearCart();
      setLocation('/');
    } catch (error) {
      console.error("Error after payment success:", error);
      toast({
        title: "Order Processing Error",
        description: "Payment was successful but there was an error processing your order. Please contact support.",
        variant: "destructive",
      });
    }
  };

  const handleCheckout = async (data: CheckoutFormData) => {
    // Form is valid, the actual payment will be handled by Stripe
    console.log("Shipping information:", data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50" style={{ zoom: '90%' }}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setLocation('/')}
                className="bg-white/70 backdrop-blur-sm hover:bg-white/90 text-[#0A2342] p-3 rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:animate-pulse" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Complete Your Order</h1>
                <p className="text-gray-600">Secure checkout powered by Stripe</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-green-600">
                <Shield className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">SSL Secured</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={form.handleSubmit(handleCheckout)} className="space-y-6">
              {/* Shipping Information */}
              <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                  <h2 className="text-lg font-semibold text-white flex items-center">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                      <Truck className="w-4 h-4 text-white" />
                    </div>
                    Shipping Information
                  </h2>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</Label>
                      <Input
                        id="firstName"
                        {...form.register('firstName')}
                        className="h-12 bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                        placeholder="Enter first name"
                      />
                      {form.formState.errors.firstName && (
                        <p className="text-red-500 text-sm flex items-center mt-1">
                          <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 text-xs flex items-center justify-center mr-2">!</span>
                          {form.formState.errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</Label>
                      <Input
                        id="lastName"
                        {...form.register('lastName')}
                        className="h-12 bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                        placeholder="Enter last name"
                      />
                      {form.formState.errors.lastName && (
                        <p className="text-red-500 text-sm flex items-center mt-1">
                          <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 text-xs flex items-center justify-center mr-2">!</span>
                          {form.formState.errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        {...form.register('email')}
                        className="h-12 bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                        placeholder="Enter email address"
                      />
                      {form.formState.errors.email && (
                        <p className="text-red-500 text-sm flex items-center mt-1">
                          <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 text-xs flex items-center justify-center mr-2">!</span>
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
                      <Input
                        id="phone"
                        {...form.register('phone')}
                        className="h-12 bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                        placeholder="Enter phone number"
                      />
                      {form.formState.errors.phone && (
                        <p className="text-red-500 text-sm flex items-center mt-1">
                          <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 text-xs flex items-center justify-center mr-2">!</span>
                          {form.formState.errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm font-medium text-gray-700">Street Address</Label>
                    <Input
                      id="address"
                      {...form.register('address')}
                      className="h-12 bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                      placeholder="Enter street address"
                    />
                    {form.formState.errors.address && (
                      <p className="text-red-500 text-sm flex items-center mt-1">
                        <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 text-xs flex items-center justify-center mr-2">!</span>
                        {form.formState.errors.address.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-sm font-medium text-gray-700">City</Label>
                      <Input
                        id="city"
                        {...form.register('city')}
                        className="h-12 bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                        placeholder="Enter city"
                      />
                      {form.formState.errors.city && (
                        <p className="text-red-500 text-sm flex items-center mt-1">
                          <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 text-xs flex items-center justify-center mr-2">!</span>
                          {form.formState.errors.city.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode" className="text-sm font-medium text-gray-700">Postal Code</Label>
                      <Input
                        id="postalCode"
                        {...form.register('postalCode')}
                        className="h-12 bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                        placeholder="Enter postal code"
                      />
                      {form.formState.errors.postalCode && (
                        <p className="text-red-500 text-sm flex items-center mt-1">
                          <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 text-xs flex items-center justify-center mr-2">!</span>
                          {form.formState.errors.postalCode.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </form>

            {/* Payment Information */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                <h2 className="text-lg font-semibold text-white flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <CreditCard className="w-4 h-4 text-white" />
                  </div>
                  Payment Details
                </h2>
              </div>
              <div className="p-6">
                {clientSecret ? (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm 
                      clientSecret={clientSecret}
                      onPaymentSuccess={handlePaymentSuccess}
                      shippingInfo={form.getValues()}
                    />
                  </Elements>
                ) : (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-green-600 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600">Setting up secure payment...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
              </div>
              <div className="p-6 space-y-4">
                {/* Cart Items */}
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 py-3 border-b border-gray-100 last:border-b-0">
                      <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
                        {item.product?.image ? (
                          <img
                            src={item.product.image}
                            alt={item.product.name || ''}
                            className="w-14 h-14 object-contain"
                          />
                        ) : (
                          <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center">
                            <span className="text-gray-400 text-xs">IMG</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm truncate">
                          {item.product?.name || 'Product'}
                        </h4>
                        <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          R{item.product ? (parseFloat(item.product.price) * item.quantity).toFixed(2) : '0.00'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Totals */}
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">R{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">R{shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (15%)</span>
                    <span className="text-gray-900">R{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200">
                    <span className="text-gray-900">Total</span>
                    <span className="text-blue-600">R{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="bg-green-50 rounded-xl border border-green-200 p-6">
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-green-600 mr-2" />
                <h4 className="font-semibold text-green-800">Secure Checkout</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-green-700">
                  <Check className="w-4 h-4 mr-2" />
                  <span className="text-sm">256-bit SSL encryption</span>
                </div>
                <div className="flex items-center text-green-700">
                  <Check className="w-4 h-4 mr-2" />
                  <span className="text-sm">PCI DSS compliant</span>
                </div>
                <div className="flex items-center text-green-700">
                  <Check className="w-4 h-4 mr-2" />
                  <span className="text-sm">30-day money back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}