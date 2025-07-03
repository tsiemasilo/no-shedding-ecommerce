import { useEffect, useState } from 'react';
import { useCustomerAuth } from '@/hooks/use-customer-auth';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, Mail, Phone, MapPin, Shield, Calendar, Clock, Star, ShoppingBag, CreditCard, Settings, Bell, History } from 'lucide-react';
import { useLocation } from 'wouter';
import { format } from 'date-fns';

export default function Profile() {
  const [, setLocation] = useLocation();
  const { customer, isAuthenticated: isCustomer } = useCustomerAuth();
  const { user: adminUser } = useAdminAuth();

  // Redirect if not authenticated using useEffect
  useEffect(() => {
    if (!isCustomer && !adminUser) {
      setLocation('/auth');
    }
  }, [isCustomer, adminUser, setLocation]);

  // Show loading or return null while redirecting
  if (!isCustomer && !adminUser) {
    return null;
  }

  const isAdmin = !!adminUser;
  const currentUser = isAdmin ? adminUser : customer;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Back Button Section */}
      <div className="bg-navy py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="outline"
            onClick={() => setLocation("/")}
            className="group bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white hover:bg-white hover:text-navy font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 mr-3 group-hover:animate-pulse" />
            <span className="text-lg">Back to Home</span>
          </Button>
        </div>
      </div>

      {/* Profile Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-navy mb-4">
            {isAdmin ? 'Admin Profile' : 'Customer Profile'}
          </h1>
          <p className="text-lg text-gray-600">
            Manage your account information
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Information Card */}
          <Card className="shadow-lg border-0 bg-white lg:col-span-2">
            <CardHeader className="bg-gradient-to-r from-navy to-electric text-white">
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
              <CardDescription className="text-white/80">
                Your account details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {isAdmin ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-navy" />
                    <div>
                      <p className="font-semibold text-gray-900">Role</p>
                      <p className="text-gray-600">Administrator</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-navy" />
                    <div>
                      <p className="font-semibold text-gray-900">Username</p>
                      <p className="text-gray-600">{adminUser?.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-navy" />
                    <div>
                      <p className="font-semibold text-gray-900">Access Level</p>
                      <Badge className="bg-navy text-white">Full Administrative Access</Badge>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-navy" />
                      <div>
                        <p className="font-semibold text-gray-900">Full Name</p>
                        <p className="text-gray-600">
                          {customer?.firstName} {customer?.lastName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-navy" />
                      <div>
                        <p className="font-semibold text-gray-900">Email Address</p>
                        <p className="text-gray-600">{customer?.email}</p>
                      </div>
                    </div>
                    {customer?.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-navy" />
                        <div>
                          <p className="font-semibold text-gray-900">Phone Number</p>
                          <p className="text-gray-600">{customer.phone}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-navy" />
                      <div>
                        <p className="font-semibold text-gray-900">Member Since</p>
                        <p className="text-gray-600">
                          {customer?.createdAt ? format(new Date(customer.createdAt), 'MMMM yyyy') : 'Recently joined'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {customer?.address && (
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-navy mt-0.5" />
                        <div>
                          <p className="font-semibold text-gray-900">Billing Address</p>
                          <p className="text-gray-600">
                            {customer.address}
                            {customer.city && <><br />{customer.city}</>}
                            {customer.postalCode && <><br />{customer.postalCode}</>}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-navy" />
                      <div>
                        <p className="font-semibold text-gray-900">Customer Status</p>
                        <Badge className="bg-electric text-navy">Verified Customer</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-electric to-bright-orange text-white">
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Quick Actions
              </CardTitle>
              <CardDescription className="text-white/80">
                Manage your account
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {isAdmin ? (
                <>
                  <Button 
                    onClick={() => setLocation('/admin')}
                    className="w-full bg-navy hover:bg-navy/90 text-white flex items-center gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    Admin Dashboard
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setLocation('/')}
                    className="w-full border-navy text-navy hover:bg-navy hover:text-white flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    View Store
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    onClick={() => setLocation('/')}
                    className="w-full bg-navy hover:bg-navy/90 text-white flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Continue Shopping
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setLocation('/checkout')}
                    className="w-full border-navy text-navy hover:bg-navy hover:text-white flex items-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    View Cart & Checkout
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setLocation('/support')}
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Bell className="w-4 h-4" />
                    Customer Support
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Additional Information for Customers */}
        {!isAdmin && (
          <div className="grid gap-6 md:grid-cols-2 mt-8">
            {/* Account Security */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-navy to-charcoal text-white">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Account Security
                </CardTitle>
                <CardDescription className="text-white/80">
                  Manage your account security
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">Password</p>
                    <p className="text-sm text-gray-600">Last updated recently</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Secure</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">Email Verification</p>
                    <p className="text-sm text-gray-600">Account verified</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Verified</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">Two-Factor Auth</p>
                    <p className="text-sm text-gray-600">Available on request</p>
                  </div>
                  <Badge className="bg-gray-100 text-gray-800">Optional</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-bright-orange to-electric text-white">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Preferences
                </CardTitle>
                <CardDescription className="text-white/80">
                  Communication and account preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">Email Notifications</p>
                    <p className="text-sm text-gray-600">Product updates & offers</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">Order Updates</p>
                    <p className="text-sm text-gray-600">Order status notifications</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">Marketing Communications</p>
                    <p className="text-sm text-gray-600">Special offers and promotions</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Enabled</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}