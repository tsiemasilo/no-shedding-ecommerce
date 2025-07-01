import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocation } from 'wouter';
import { useCustomerAuth } from '@/hooks/use-customer-auth';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { insertCustomerSchema } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, User, Mail, Lock, Phone, MapPin } from 'lucide-react';
import logoImage from '@assets/WhatsApp Image 2025-06-28 at 20.45.26_1751136519966.jpeg';

const customerLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const adminLoginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = insertCustomerSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type CustomerLoginFormData = z.infer<typeof customerLoginSchema>;
type AdminLoginFormData = z.infer<typeof adminLoginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export default function CustomerAuth() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('customer-login');
  const { loginMutation: customerLoginMutation, registerMutation, isAuthenticated: customerAuthenticated } = useCustomerAuth();
  const { loginMutation: adminLoginMutation, user: adminUser } = useAdminAuth();

  // Redirect if already authenticated
  if (customerAuthenticated || adminUser) {
    setLocation(adminUser ? '/admin/dashboard' : '/');
    return null;
  }

  const customerLoginForm = useForm<CustomerLoginFormData>({
    resolver: zodResolver(customerLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const adminLoginForm = useForm<AdminLoginFormData>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
    },
  });

  const handleCustomerLogin = (data: CustomerLoginFormData) => {
    customerLoginMutation.mutate(data, {
      onSuccess: () => {
        setLocation('/');
      },
    });
  };

  const handleAdminLogin = (data: AdminLoginFormData) => {
    adminLoginMutation.mutate(data, {
      onSuccess: () => {
        setLocation('/admin/dashboard');
      },
    });
  };

  const handleRegister = (data: RegisterFormData) => {
    const { confirmPassword, ...customerData } = data;
    registerMutation.mutate(customerData, {
      onSuccess: () => {
        setLocation('/');
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sand via-white to-sand flex items-center justify-center p-4" style={{ zoom: '0.9' }}>
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Forms */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          {/* Back button */}
          <Button
            variant="ghost"
            onClick={() => setLocation('/')}
            className="mb-6 text-navy hover:text-electric hover:bg-white/80 backdrop-blur-sm border border-navy/20 rounded-lg px-4 py-2 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-pulse"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Store
          </Button>

          <Card className="border-2 border-navy/10 shadow-2xl bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center p-2 shadow-lg">
                  <img 
                    src={logoImage} 
                    alt="No Shedding Logo" 
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-navy">Customer Account</CardTitle>
              <CardDescription className="text-charcoal">
                Sign in to your account or create a new one to start shopping
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="customer-login" className="text-sm">Customer</TabsTrigger>
                  <TabsTrigger value="admin-login" className="text-sm">Admin</TabsTrigger>
                  <TabsTrigger value="register" className="text-sm">Register</TabsTrigger>
                </TabsList>

                {/* Login Tab */}
                <TabsContent value="login">
                  <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-navy font-medium">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email
                      </Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
                        {...loginForm.register('email')}
                        className="border-navy/20 focus:ring-electric focus:border-electric"
                      />
                      {loginForm.formState.errors.email && (
                        <p className="text-red-500 text-sm">{loginForm.formState.errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-navy font-medium">
                        <Lock className="w-4 h-4 inline mr-2" />
                        Password
                      </Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Enter your password"
                        {...loginForm.register('password')}
                        className="border-navy/20 focus:ring-electric focus:border-electric"
                      />
                      {loginForm.formState.errors.password && (
                        <p className="text-red-500 text-sm">{loginForm.formState.errors.password.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={loginMutation.isPending}
                      className="w-full bg-navy hover:bg-navy/90 text-white py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
                    >
                      {loginMutation.isPending ? 'Signing In...' : 'Sign In'}
                    </Button>
                  </form>
                </TabsContent>

                {/* Register Tab */}
                <TabsContent value="register">
                  <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-navy font-medium">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="First name"
                          {...registerForm.register('firstName')}
                          className="border-navy/20 focus:ring-electric focus:border-electric"
                        />
                        {registerForm.formState.errors.firstName && (
                          <p className="text-red-500 text-sm">{registerForm.formState.errors.firstName.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-navy font-medium">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Last name"
                          {...registerForm.register('lastName')}
                          className="border-navy/20 focus:ring-electric focus:border-electric"
                        />
                        {registerForm.formState.errors.lastName && (
                          <p className="text-red-500 text-sm">{registerForm.formState.errors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email" className="text-navy font-medium">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email
                      </Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="Enter your email"
                        {...registerForm.register('email')}
                        className="border-navy/20 focus:ring-electric focus:border-electric"
                      />
                      {registerForm.formState.errors.email && (
                        <p className="text-red-500 text-sm">{registerForm.formState.errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-navy font-medium">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone (Optional)
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Phone number"
                        {...registerForm.register('phone')}
                        className="border-navy/20 focus:ring-electric focus:border-electric"
                      />
                      {registerForm.formState.errors.phone && (
                        <p className="text-red-500 text-sm">{registerForm.formState.errors.phone.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-navy font-medium">
                        <MapPin className="w-4 h-4 inline mr-2" />
                        Address (Optional)
                      </Label>
                      <Input
                        id="address"
                        placeholder="Street address"
                        {...registerForm.register('address')}
                        className="border-navy/20 focus:ring-electric focus:border-electric"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-navy font-medium">City (Optional)</Label>
                        <Input
                          id="city"
                          placeholder="City"
                          {...registerForm.register('city')}
                          className="border-navy/20 focus:ring-electric focus:border-electric"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="postalCode" className="text-navy font-medium">Postal Code (Optional)</Label>
                        <Input
                          id="postalCode"
                          placeholder="Postal code"
                          {...registerForm.register('postalCode')}
                          className="border-navy/20 focus:ring-electric focus:border-electric"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password" className="text-navy font-medium">
                        <Lock className="w-4 h-4 inline mr-2" />
                        Password
                      </Label>
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="Create a password"
                        {...registerForm.register('password')}
                        className="border-navy/20 focus:ring-electric focus:border-electric"
                      />
                      {registerForm.formState.errors.password && (
                        <p className="text-red-500 text-sm">{registerForm.formState.errors.password.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-navy font-medium">
                        <Lock className="w-4 h-4 inline mr-2" />
                        Confirm Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        {...registerForm.register('confirmPassword')}
                        className="border-navy/20 focus:ring-electric focus:border-electric"
                      />
                      {registerForm.formState.errors.confirmPassword && (
                        <p className="text-red-500 text-sm">{registerForm.formState.errors.confirmPassword.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={registerMutation.isPending}
                      className="w-full bg-navy hover:bg-navy/90 text-white py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
                    >
                      {registerMutation.isPending ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right side - Hero section */}
        <div className="hidden lg:block">
          <div className="text-center space-y-6 p-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-navy leading-tight">
                Welcome to No Shedding
              </h1>
              <p className="text-xl text-charcoal leading-relaxed">
                Your trusted partner for premium electrical solutions and power management systems.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 mt-8">
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-navy/10 shadow-lg">
                <h3 className="text-lg font-semibold text-navy mb-2">Premium Quality Products</h3>
                <p className="text-charcoal">Carefully selected electrical solutions from trusted manufacturers</p>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-navy/10 shadow-lg">
                <h3 className="text-lg font-semibold text-navy mb-2">Expert Support</h3>
                <p className="text-charcoal">Professional guidance to help you choose the right electrical solutions</p>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-navy/10 shadow-lg">
                <h3 className="text-lg font-semibold text-navy mb-2">Fast Delivery</h3>
                <p className="text-charcoal">Quick and reliable delivery across South Africa</p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-electric/10 rounded-lg border border-electric/20">
              <p className="text-navy font-medium">
                Create your account today and enjoy exclusive member benefits, order tracking, and personalized recommendations!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}