import { createContext, ReactNode, useContext } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { Customer, InsertCustomer } from "@shared/schema";
import { apiRequest, getQueryFn, queryClient } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type CustomerAuthContextType = {
  customer: Customer | null;
  isLoading: boolean;
  loginMutation: UseMutationResult<Customer, Error, LoginData>;
  registerMutation: UseMutationResult<Customer, Error, InsertCustomer>;
  logout: () => void;
  isAuthenticated: boolean;
};

type LoginData = {
  email: string;
  password: string;
};

export const CustomerAuthContext = createContext<CustomerAuthContextType | null>(null);

export function CustomerAuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();

  // Query current customer session
  const {
    data: customer,
    error,
    isLoading,
  } = useQuery<Customer | undefined, Error>({
    queryKey: ["/api/customer/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      const res = await apiRequest("POST", "/api/customer/login", credentials);
      return await res.json();
    },
    onSuccess: (customer: Customer) => {
      queryClient.setQueryData(["/api/customer/user"], customer);
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (customerData: InsertCustomer) => {
      const res = await apiRequest("POST", "/api/customer/register", customerData);
      return await res.json();
    },
    onSuccess: (customer: Customer) => {
      // Don't automatically log in the user
      toast({
        title: "Account created successfully!",
        description: `Account created for ${customer.firstName || customer.email}. Please sign in with your credentials.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const logout = () => {
    queryClient.setQueryData(["/api/customer/user"], null);
    toast({
      title: "Goodbye!",
      description: "You've been logged out successfully.",
    });
  };

  const contextValue: CustomerAuthContextType = {
    customer: customer ?? null,
    isLoading,
    loginMutation,
    registerMutation,
    logout,
    isAuthenticated: !!customer,
  };

  return (
    <CustomerAuthContext.Provider value={contextValue}>
      {children}
    </CustomerAuthContext.Provider>
  );
}

export function useCustomerAuth() {
  const context = useContext(CustomerAuthContext);
  if (!context) {
    throw new Error("useCustomerAuth must be used within a CustomerAuthProvider");
  }
  return context;
}