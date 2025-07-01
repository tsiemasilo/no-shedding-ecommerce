import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminAuthProvider } from "@/hooks/use-admin-auth";
import { CustomerAuthProvider } from "@/hooks/use-customer-auth";
import { CartProvider } from "@/hooks/use-cart";
import { ShoppingCart } from "@/components/shopping-cart";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

import AdminDashboard from "@/pages/admin-dashboard";
import ProductDetails from "@/pages/product-details";
import CustomerAuth from "@/pages/customer-auth";
import AdminAuth from "@/pages/admin-auth";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/product/:id" component={ProductDetails} />
      <Route path="/customer/auth" component={CustomerAuth} />
      <Route path="/admin/auth" component={AdminAuth} />
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
            </CartProvider>
          </CustomerAuthProvider>
        </AdminAuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
