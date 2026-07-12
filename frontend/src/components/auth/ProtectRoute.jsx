import api from "@/lib/api/apiClient";
import useAuthStore from "@/lib/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React, { useEffect } from "react";
import { Navigate } from "react-router";

const ProtectRoute = ({ children }) => {
  const { user, setAuth, clearAuth, token } = useAuthStore();
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await api.get("/auth/dashboard");
      return response.data;
    },
    retry: 1,
  });
  // error case
  useEffect(() => {
    if (isError) {
      clearAuth();
    }
  }, [isError, data, setAuth, token]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectRoute;
