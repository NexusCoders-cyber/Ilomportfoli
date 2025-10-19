import { useEffect } from "react";
import { useLocation } from "wouter";

export function useAuth() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setLocation("/admin");
    }
  }, [setLocation]);

  const logout = () => {
    localStorage.removeItem("adminToken");
    setLocation("/admin");
  };

  return { logout };
}

export function getAuthHeaders() {
  const token = localStorage.getItem("adminToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}
