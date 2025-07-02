import { useCustomerAuth } from '@/hooks/use-customer-auth';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, User, Mail, Phone, MapPin, Shield } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Profile() {
  const [, setLocation] = useLocation();
  const { customer, isAuthenticated: isCustomer } = useCustomerAuth();
  const { user: adminUser } = useAdminAuth();

  // Redirect if not authenticated
  if (!isCustomer && !adminUser) {
    setLocation('/auth');
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

        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Information Card */}
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-navy to-electric text-white">
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
              <CardDescription className="text-white/80">
                Your account details
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {isAdmin ? (
                <>
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
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-navy" />
                    <div>
                      <p className="font-semibold text-gray-900">Name</p>
                      <p className="text-gray-600">
                        {customer?.firstName} {customer?.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-navy" />
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <p className="text-gray-600">{customer?.email}</p>
                    </div>
                  </div>
                  {customer?.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-navy" />
                      <div>
                        <p className="font-semibold text-gray-900">Phone</p>
                        <p className="text-gray-600">{customer.phone}</p>
                      </div>
                    </div>
                  )}
                  {customer?.address && (
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-navy" />
                      <div>
                        <p className="font-semibold text-gray-900">Address</p>
                        <p className="text-gray-600">
                          {customer.address}
                          {customer.city && `, ${customer.city}`}
                          {customer.postalCode && ` ${customer.postalCode}`}
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-electric to-bright-orange text-white">
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription className="text-white/80">
                Manage your account
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {isAdmin ? (
                <>
                  <Button 
                    onClick={() => setLocation('/admin')}
                    className="w-full bg-navy hover:bg-navy/90 text-white"
                  >
                    Go to Admin Dashboard
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setLocation('/')}
                    className="w-full border-navy text-navy hover:bg-navy hover:text-white"
                  >
                    View Store
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    onClick={() => setLocation('/')}
                    className="w-full bg-navy hover:bg-navy/90 text-white"
                  >
                    Continue Shopping
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setLocation('/checkout')}
                    className="w-full border-navy text-navy hover:bg-navy hover:text-white"
                  >
                    View Cart & Checkout
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}