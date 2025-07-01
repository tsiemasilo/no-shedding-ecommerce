import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocation } from 'wouter';
import { useCustomerAuth } from '@/hooks/use-customer-auth';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { useToast } from '@/hooks/use-toast';
import { insertCustomerSchema } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  const [isLogin, setIsLogin] = useState(false);

  const { toast } = useToast();
  const { loginMutation: customerLoginMutation, registerMutation, isAuthenticated: customerAuthenticated } = useCustomerAuth();
  const { loginMutation: adminLoginMutation, user: adminUser } = useAdminAuth();

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



  // Redirect if already authenticated
  if (customerAuthenticated || adminUser) {
    setLocation(adminUser ? '/admin/dashboard' : '/');
    return null;
  }

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

  const handleGoogleAuth = () => {
    // Redirect to Google OAuth endpoint
    window.location.href = '/api/auth/google';
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4" 
      style={{ 
        zoom: '0.9',
        backgroundColor: '#FDF6EC' // Light Sand background from website color theme
      }}
    >
      {/* Centered Auth Form */}
      <Card className="w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200">
        <CardHeader className="text-center pb-4 pt-8">
          {/* Removed logo to match the design */}
        </CardHeader>

        <CardContent className="px-8 pb-8">
          {!isLogin ? (
            // Sign Up Form
            <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-3">
                <Label htmlFor="name" className="text-black text-lg font-medium">
                  Name
                </Label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <Input
                    id="name"
                    placeholder="Enter your Name"
                    {...registerForm.register('firstName')}
                    className="pl-12 py-4 border-2 border-gray-200 bg-white rounded-xl text-base placeholder:text-gray-400 focus:ring-0 focus:border-gray-300 transition-all"
                  />
                </div>
                {registerForm.formState.errors.firstName && (
                  <p className="text-red-500 text-sm">{registerForm.formState.errors.firstName.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-black text-lg font-medium">
                  Email
                </Label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl font-bold">
                    @
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your Email"
                    {...registerForm.register('email')}
                    className="pl-12 py-4 border-2 border-gray-200 bg-white rounded-xl text-base placeholder:text-gray-400 focus:ring-0 focus:border-gray-300 transition-all"
                  />
                </div>
                {registerForm.formState.errors.email && (
                  <p className="text-red-500 text-sm">{registerForm.formState.errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-3">
                <Label htmlFor="password" className="text-black text-lg font-medium">
                  Password
                </Label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18,8h-1V6c0-2.76-2.24-5-5-5S7,3.24,7,6v2H6c-1.1,0-2,0.9-2,2v10c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V10 C20,8.9,19.1,8,18,8z M12,17c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S13.1,17,12,17z M15.1,8H8.9V6c0-1.71,1.39-3.1,3.1-3.1 s3.1,1.39,3.1,3.1V8z"/>
                    </svg>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your Password"
                    {...registerForm.register('password')}
                    className="pl-12 py-4 border-2 border-gray-200 bg-white rounded-xl text-base placeholder:text-gray-400 focus:ring-0 focus:border-gray-300 transition-all"
                  />
                </div>
                {registerForm.formState.errors.password && (
                  <p className="text-red-500 text-sm">{registerForm.formState.errors.password.message}</p>
                )}
              </div>

              {/* Hidden fields for complete registration */}
              <input type="hidden" {...registerForm.register('lastName')} value="" />
              <input type="hidden" {...registerForm.register('phone')} value="" />
              <input type="hidden" {...registerForm.register('address')} value="" />
              <input type="hidden" {...registerForm.register('city')} value="" />
              <input type="hidden" {...registerForm.register('postalCode')} value="" />
              <input type="hidden" {...registerForm.register('confirmPassword')} value={registerForm.watch('password')} />

              {/* Sign Up Button */}
              <Button
                type="submit"
                disabled={registerMutation.isPending}
                className="w-full bg-black hover:bg-gray-800 text-white py-4 text-lg font-semibold rounded-xl transition-all duration-200 mt-8"
              >
                {registerMutation.isPending ? 'Creating Account...' : 'Sign Up'}
              </Button>

              {/* Login Link */}
              <div className="text-center pt-6">
                <span className="text-gray-700">Already have a account? </span>
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
                >
                  login
                </button>
              </div>

              {/* Google Sign Up */}
              <div className="pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleAuth}
                  className="w-full py-4 border-2 border-gray-200 bg-white rounded-xl hover:bg-gray-50 transition-all duration-200"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="text-gray-700 font-medium">Google</span>
                  </div>
                </Button>
              </div>

              {/* Back to Store Button for Register */}
              <div className="pt-6 border-t border-gray-200 mt-6">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setLocation('/')}
                  className="w-full py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Store
                </Button>
              </div>
            </form>
          ) : (
            // Login Form
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-6">
              {/* Email/Username Field */}
              <div className="space-y-3">
                <Label htmlFor="identifier" className="text-black text-lg font-medium">
                  Email or Username
                </Label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl font-bold">
                    @
                  </div>
                  <Input
                    id="identifier"
                    placeholder="Enter your Email or Username"
                    {...loginForm.register('identifier')}
                    className="pl-12 py-4 border-2 border-gray-200 bg-white rounded-xl text-base placeholder:text-gray-400 focus:ring-0 focus:border-gray-300 transition-all"
                  />
                </div>
                {loginForm.formState.errors.identifier && (
                  <p className="text-red-500 text-sm">{loginForm.formState.errors.identifier.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-3">
                <Label htmlFor="loginPassword" className="text-black text-lg font-medium">
                  Password
                </Label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18,8h-1V6c0-2.76-2.24-5-5-5S7,3.24,7,6v2H6c-1.1,0-2,0.9-2,2v10c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V10 C20,8.9,19.1,8,18,8z M12,17c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S13.1,17,12,17z M15.1,8H8.9V6c0-1.71,1.39-3.1,3.1-3.1 s3.1,1.39,3.1,3.1V8z"/>
                    </svg>
                  </div>
                  <Input
                    id="loginPassword"
                    type="password"
                    placeholder="Enter your Password"
                    {...loginForm.register('password')}
                    className="pl-12 py-4 border-2 border-gray-200 bg-white rounded-xl text-base placeholder:text-gray-400 focus:ring-0 focus:border-gray-300 transition-all"
                  />
                </div>
                {loginForm.formState.errors.password && (
                  <p className="text-red-500 text-sm">{loginForm.formState.errors.password.message}</p>
                )}
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={customerLoginMutation.isPending || adminLoginMutation.isPending}
                className="w-full bg-black hover:bg-gray-800 text-white py-4 text-lg font-semibold rounded-xl transition-all duration-200 mt-8"
              >
                {(customerLoginMutation.isPending || adminLoginMutation.isPending) ? 'Signing In...' : 'Login'}
              </Button>

              {/* Sign Up Link */}
              <div className="text-center pt-6">
                <span className="text-gray-700">Don't have an account? </span>
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
                >
                  Sign up
                </button>
              </div>

              {/* Google Login */}
              <div className="pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleAuth}
                  className="w-full py-4 border-2 border-gray-200 bg-white rounded-xl hover:bg-gray-50 transition-all duration-200"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="text-gray-700 font-medium">Google</span>
                  </div>
                </Button>
              </div>

              {/* Back to Store Button */}
              <div className="pt-6 border-t border-gray-200 mt-6">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setLocation('/')}
                  className="w-full py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Store
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}