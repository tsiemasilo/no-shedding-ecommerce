import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, ArrowLeft } from "lucide-react";
import { useAdminAuth } from "@/hooks/use-admin-auth";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminAuth() {
  const [, setLocation] = useLocation();
  const { user, loginMutation } = useAdminAuth();

  // Redirect if already authenticated
  if (user) {
    setLocation('/admin');
    return null;
  }

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleLogin = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sand via-white to-sand flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
        {/* Back Button */}
        <div className="absolute top-6 left-6">
          <Button
            variant="ghost"
            onClick={() => setLocation('/')}
            className="bg-white/80 backdrop-blur-sm hover:bg-white/90 text-navy border border-navy/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Login Form */}
        <Card className="w-full shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-navy rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-navy">Admin Dashboard</CardTitle>
            <CardDescription className="text-charcoal">
              Access the admin dashboard to manage products and settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-navy font-medium">Username</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Enter admin username"
                          className="border-navy/20 focus:border-navy"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-navy font-medium">Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Enter admin password"
                          className="border-navy/20 focus:border-navy"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-navy hover:bg-navy/90 text-white py-6 text-lg font-semibold"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Signing In..." : "Sign In to Dashboard"}
                </Button>
              </form>
            </Form>

            <Alert className="border-navy/20 bg-navy/5">
              <Shield className="h-4 w-4 text-navy" />
              <AlertDescription className="text-navy">
                This area is restricted to authorized administrators only.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Hero Section */}
        <div className="hidden md:flex flex-col space-y-6 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-navy">
              No Shedding
            </h1>
            <p className="text-xl text-charcoal">
              Professional electrical solutions platform
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-navy/10">
              <h3 className="font-semibold text-navy mb-2">Admin Features</h3>
              <ul className="text-sm text-charcoal space-y-1">
                <li>• Product Management</li>
                <li>• Inventory Control</li>
                <li>• Category Organization</li>
                <li>• Image Upload & Management</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}