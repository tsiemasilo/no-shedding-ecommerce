import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import {
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { insertCustomerSchema, Customer, InsertCustomer } from "@shared/schema";
import { apiRequest } from "../lib/queryClient";
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
  const [customer, setCustomer] = useState<Customer | null>(null);
  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      const res = await apiRequest("POST", "/api/customer/login", credentials);
      return await res.json();
    },
    onSuccess: (customer: Customer) => {
      setCustomer(customer);
      localStorage.setItem('customer', JSON.stringify(customer));
      toast({
        title: "Welcome back!",
        description: `Welcome back, ${customer.firstName}!`,
      });
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
      setCustomer(customer);
      localStorage.setItem('customer', JSON.stringify(customer));
      toast({
        title: "Account created successfully!",
        description: `Welcome to No Shedding, ${customer.firstName}!`,
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
    setCustomer(null);
    localStorage.removeItem('customer');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  // Check if customer is stored in localStorage on mount
  useEffect(() => {
    const storedCustomer = localStorage.getItem('customer');
    if (storedCustomer) {
      try {
        setCustomer(JSON.parse(storedCustomer));
      } catch (error) {
        localStorage.removeItem('customer');
      }
    }
  }, []);

  return (
    <CustomerAuthContext.Provider
      value={{
        customer,
        isLoading: loginMutation.isPending || registerMutation.isPending,
        loginMutation,
        registerMutation,
        logout,
        isAuthenticated: !!customer,
      }}
    >
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