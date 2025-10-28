// Auth Hooks using React Query (hooks/useAuth.ts)
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  authApi,
  User,
  LoginCredentials,
  CreateUserRequest,
  decodeToken,
} from "../services/auth";

// Get current user from token
const getCurrentUser = (): User | null => {
  const token = localStorage.getItem("access_token");
  if (!token) return null;
  return decodeToken(token);
};

// Hook to get current user
export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: Infinity, // User data doesn't change unless we manually update it
  });
};

// Hook for login
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
      const user = decodeToken(data.access_token);
      queryClient.setQueryData(["user"], user);
    },
  });
};

// Hook for register
export const useRegister = () => {
  return useMutation({
    mutationFn: authApi.register,
  });
};

// Hook for logout
export const useLogout = () => {
  const queryClient = useQueryClient();

  return () => {
    localStorage.removeItem("access_token");
    queryClient.setQueryData(["user"], null);
    queryClient.clear();
  };
};

// Helper hook to check if user is authenticated
export const useIsAuthenticated = () => {
  const { data: user } = useUser();
  return !!user;
};
