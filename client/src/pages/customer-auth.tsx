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

const loginSchema = z.object({
  identifier: z.string().min(1, 'Email or username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = insertCustomerSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export default function CustomerAuth() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('login');
  const { loginMutation: customerLoginMutation, registerMutation, isAuthenticated: customerAuthenticated } = useCustomerAuth();
  const { loginMutation: adminLoginMutation, user: adminUser } = useAdminAuth();

  // Redirect if already authenticated
  if (customerAuthenticated || adminUser) {
    setLocation(adminUser ? '/admin/dashboard' : '/');
    return null;
  }

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
    },
  });

  const handleLogin = (data: LoginFormData) => {
    const { identifier, password } = data;
    
    // Check if identifier looks like an email (for customer) or username (for admin)
    const isEmail = identifier.includes('@');
    
    if (isEmail) {
      // Try customer login
      customerLoginMutation.mutate({ email: identifier, password }, {
        onSuccess: () => {
          setLocation('/');
        },
      });
    } else {
      // Try admin login
      adminLoginMutation.mutate({ username: identifier, password }, {
        onSuccess: () => {
          setLocation('/admin/dashboard');
        },
      });
    }
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
      {/* Back button */}
      <Button
        variant="ghost"
        onClick={() => setLocation('/')}
        className="absolute top-6 left-6 text-white bg-navy/90 hover:bg-navy hover:scale-105 transition-all duration-300 px-4 py-2 rounded-lg shadow-md"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Store
      </Button>

      {/* Centered Auth Form */}
      <Card className="w-full max-w-md border-2 border-navy/10 shadow-2xl bg-white/95 backdrop-blur-sm">
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
          <CardTitle className="text-2xl font-bold text-navy">Welcome</CardTitle>
          <CardDescription className="text-charcoal">
            Sign in or create an account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="text-sm">Sign In</TabsTrigger>
              <TabsTrigger value="register" className="text-sm">Register</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="identifier" className="text-navy font-medium">
                    <User className="w-4 h-4 inline mr-2" />
                    Email or Username
                  </Label>
                  <Input
                    id="identifier"
                    type="text"
                    placeholder="Enter your email or username"
                    {...loginForm.register('identifier')}
                    className="border-navy/20 focus:ring-electric focus:border-electric"
                  />
                  {loginForm.formState.errors.identifier && (
                    <p className="text-red-500 text-sm">{loginForm.formState.errors.identifier.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-navy font-medium">
                    <Lock className="w-4 h-4 inline mr-2" />
                    Password
                  </Label>
                  <Input
                    id="password"
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
                  disabled={customerLoginMutation.isPending || adminLoginMutation.isPending}
                  className="w-full bg-navy hover:bg-navy/90 text-white py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  {(customerLoginMutation.isPending || adminLoginMutation.isPending) ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register">
              <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-navy font-medium">
                      <User className="w-4 h-4 inline mr-2" />
                      First Name
                    </Label>
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
                    <Label htmlFor="lastName" className="text-navy font-medium">
                      Last Name
                    </Label>
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
                  <Label htmlFor="email" className="text-navy font-medium">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email
                  </Label>
                  <Input
                    id="email"
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
                    Phone
                  </Label>
                  <Input
                    id="phone"
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
                    Address
                  </Label>
                  <Input
                    id="address"
                    placeholder="Street address"
                    {...registerForm.register('address')}
                    className="border-navy/20 focus:ring-electric focus:border-electric"
                  />
                  {registerForm.formState.errors.address && (
                    <p className="text-red-500 text-sm">{registerForm.formState.errors.address.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-navy font-medium">
                      City
                    </Label>
                    <Input
                      id="city"
                      placeholder="City"
                      {...registerForm.register('city')}
                      className="border-navy/20 focus:ring-electric focus:border-electric"
                    />
                    {registerForm.formState.errors.city && (
                      <p className="text-red-500 text-sm">{registerForm.formState.errors.city.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postalCode" className="text-navy font-medium">
                      Postal Code
                    </Label>
                    <Input
                      id="postalCode"
                      placeholder="Postal code"
                      {...registerForm.register('postalCode')}
                      className="border-navy/20 focus:ring-electric focus:border-electric"
                    />
                    {registerForm.formState.errors.postalCode && (
                      <p className="text-red-500 text-sm">{registerForm.formState.errors.postalCode.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registerPassword" className="text-navy font-medium">
                    <Lock className="w-4 h-4 inline mr-2" />
                    Password
                  </Label>
                  <Input
                    id="registerPassword"
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
  );
}