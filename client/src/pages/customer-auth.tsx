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
      {/* New UI Library Form Container */}
      <div className="form-container">
        <div className="login-box">
          {!isLogin ? (
            // Sign Up Form with New Design
            <form onSubmit={registerForm.handleSubmit(handleRegister)} className="form">
              <div className="logo" />
              <span className="header">Create Account</span>
              
              <input
                type="text"
                placeholder="Name"
                {...registerForm.register('firstName')}
                className="input"
              />
              {registerForm.formState.errors.firstName && (
                <p className="error-text">{registerForm.formState.errors.firstName.message}</p>
              )}
              
              <input
                type="email"
                placeholder="Email"
                {...registerForm.register('email')}
                className="input"
              />
              {registerForm.formState.errors.email && (
                <p className="error-text">{registerForm.formState.errors.email.message}</p>
              )}
              
              <input
                type="password"
                placeholder="Password"
                {...registerForm.register('password')}
                className="input"
              />
              {registerForm.formState.errors.password && (
                <p className="error-text">{registerForm.formState.errors.password.message}</p>
              )}

              {/* Hidden fields for complete registration */}
              <input type="hidden" {...registerForm.register('lastName')} value="" />
              <input type="hidden" {...registerForm.register('phone')} value="" />
              <input type="hidden" {...registerForm.register('address')} value="" />
              <input type="hidden" {...registerForm.register('city')} value="" />
              <input type="hidden" {...registerForm.register('postalCode')} value="" />
              <input type="hidden" {...registerForm.register('confirmPassword')} value={registerForm.watch('password')} />

              <button 
                type="submit" 
                className="button sign-in"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? 'Creating Account...' : 'Sign Up'}
              </button>

              <button 
                type="button"
                onClick={handleGoogleAuth}
                className="button google-sign-in"
              >
                <svg className="icon" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" fill="#000000">
                  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                  <g id="SVGRepo_iconCarrier">
                    <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" />
                    <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" />
                    <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" />
                    <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" />
                  </g>
                </svg>
                <span className="span two">Sign up with Google</span>
              </button>

              <p className="footer">
                Already have an account?
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="link"
                >
                  Sign in!
                </button>
                <br />
                <button
                  type="button"
                  onClick={() => setLocation('/')}
                  className="link"
                >
                  Back to Store
                </button>
              </p>
            </form>
          ) : (
            // Login Form with New Design
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="form">
              <div className="logo" />
              <span className="header">Welcome Back!</span>
              
              <input
                type="text"
                placeholder="Email or Username"
                {...loginForm.register('identifier')}
                className="input"
              />
              {loginForm.formState.errors.identifier && (
                <p className="error-text">{loginForm.formState.errors.identifier.message}</p>
              )}
              
              <input
                type="password"
                placeholder="Password"
                {...loginForm.register('password')}
                className="input"
              />
              {loginForm.formState.errors.password && (
                <p className="error-text">{loginForm.formState.errors.password.message}</p>
              )}

              <button 
                type="submit" 
                className="button sign-in"
                disabled={customerLoginMutation.isPending || adminLoginMutation.isPending}
              >
                {(customerLoginMutation.isPending || adminLoginMutation.isPending) ? 'Signing In...' : 'Sign In'}
              </button>

              <button 
                type="button"
                onClick={handleGoogleAuth}
                className="button google-sign-in"
              >
                <svg className="icon" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" fill="#000000">
                  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                  <g id="SVGRepo_iconCarrier">
                    <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" />
                    <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" />
                    <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" />
                    <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" />
                  </g>
                </svg>
                <span className="span two">Sign in with Google</span>
              </button>

              <p className="footer">
                Don't have an account?
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="link"
                >
                  Sign up, it's free!
                </button>
                <br />
                <button
                  type="button"
                  onClick={() => setLocation('/')}
                  className="link"
                >
                  Back to Store
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}