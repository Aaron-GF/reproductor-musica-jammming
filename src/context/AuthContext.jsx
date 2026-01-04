import React, { createContext, useContext, useState, useEffect } from "react";
import spotifyService from "@/services/spotifyService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const localToken = localStorage.getItem("access_token");
      const expiresAt = parseInt(localStorage.getItem("expires_at"), 10);

      if (localToken && expiresAt && Date.now() < expiresAt) {
        setToken(localToken);
        try {
          const userData = await spotifyService.getUserProfile();
          setUser(userData);
        } catch (error) {
          console.error(
            "Error fetching user profile during initialization:",
            error
          );
          logout();
        }
      } else {
        // Si no hay token o expiró, limpiar
        if (localToken) logout();
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = () => {
    spotifyService.login();
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("user_id");
    setToken(null);
    setUser(null);
    window.location.href = "/";
  };

  const handleTokenExchange = async (code) => {
    setLoading(true);
    try {
      const newToken = await spotifyService.exchangeCodeForToken(code);
      setToken(newToken);
      const userData = await spotifyService.getUserProfile();
      setUser(userData);
      return newToken;
    } catch (error) {
      console.error("Error in handleTokenExchange:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    token,
    user,
    loading,
    isAuthenticated: !!token,
    login,
    logout,
    handleTokenExchange,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
