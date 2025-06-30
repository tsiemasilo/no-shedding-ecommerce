import { useState } from 'react';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocation } from 'wouter';
import { Loader2, Shield } from 'lucide-react';

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { user, loginMutation } = useAdminAuth();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  // Redirect if already logged in
  if (user) {
    setLocation('/admin/dashboard');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(credentials, {
      onSuccess: () => {
        setLocation('/admin/dashboard');
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy to-charcoal flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-electric rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-navy" />
          </div>
          <CardTitle className="text-2xl font-bold text-navy">Admin Login</CardTitle>
          <CardDescription>
            Access the No Shedding admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                placeholder="Enter username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Enter password"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-navy hover:bg-navy/90 text-white"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-sand rounded-lg">
            <p className="text-sm text-charcoal">
              <strong>Demo Credentials:</strong><br />
              Username: admin<br />
              Password: admin1
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}