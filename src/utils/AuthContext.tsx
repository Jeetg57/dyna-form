// contexts/auth.js

import { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import api from "./api";

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  loginUser: async (
    email: string,
    password: string,
    next: string | string[] | null
  ) => null,
  loading: false,
  logout: () => null,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken, removeToken] = useCookies(["token"]);
  const router = useRouter();
  useEffect(() => {
    async function loadUserFromCookies() {
      if (token.token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token.token}`;
        try {
          const { data: user } = await api.get("user/me");
          if (user) setUser(user);
        } catch (error) {
          removeToken("token", {});
          setUser(null);
        }
      }
      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  const loginUser = async (email: string, password: string, next: string) => {
    try {
      const { data: access_token } = await api.post("auth/signin", {
        email,
        password,
      });
      console.log(access_token);
      if (access_token.access_token) {
        setToken("token", access_token.access_token, { maxAge: 60 * 60 * 20 });
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token.access_token}`;
        const { data: user } = await api.get("user/me");
        setUser(user);
        if (user !== null) {
          console.log(next);
          if (next !== undefined) {
            router.push(next);
          } else {
            router.push("/");
          }
          return true;
        }
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    removeToken("token", {});
    delete api.defaults.headers.common["Authorization"];
    window.location.pathname = "/login";
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, loginUser, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
