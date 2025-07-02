import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminAuthProvider } from "@/hooks/use-admin-auth";
import { CustomerAuthProvider } from "@/hooks/use-customer-auth";
import { CartProvider } from "@/hooks/use-cart";
import { ShoppingCart } from "@/components/shopping-cart";
import { CartNotificationWrapper } from "@/components/cart-notification-wrapper";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import About from "@/pages/about";
import Support from "@/pages/support";

import AdminDashboard from "@/pages/admin-dashboard";
import ProductDetails from "@/pages/product-details";
import CustomerAuth from "@/pages/customer-auth";
import Checkout from "@/pages/checkout";
import Profile from "@/pages/profile";
import SearchResults from "@/pages/search-results";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/support" component={Support} />
      <Route path="/product/:id" component={ProductDetails} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/auth" component={CustomerAuth} />
      <Route path="/profile" component={Profile} />
      <Route path="/search" component={SearchResults} />
      <Route path="/admin" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AdminAuthProvider>
          <CustomerAuthProvider>
            <CartProvider>
              <Toaster />
              <Router />
              <ShoppingCart />
              <CartNotificationWrapper />
            </CartProvider>
          </CustomerAuthProvider>
        </AdminAuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
