import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { setupCache } from "axios-cache-adapter";

// Create `axios-cache-adapter` instance

interface AuthProps {
  children?: React.ReactNode;
}

export const Auth: React.FC<AuthProps> = ({ children }) => {
  const router = useRouter();
  const cache = setupCache({
    maxAge: 15 * 60 * 1000,
  });
  const api = axios.create({
    adapter: cache.adapter,
  });
  const getMe = async (token: string) => {
    if (token !== "" && token !== null) {
      api({
        method: "get",
        url: "http://localhost:5000/user/me",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(function (response: AxiosResponse) {
          if (response.data) {
            console.log(response.data);

            if (router.pathname === "/login") {
              router.push("/");
            }
          }
        })
        .catch(function (err: AxiosError) {
          console.log(err.response);
          if (err.response.data["statusCode"] === 401) {
            window.sessionStorage.removeItem("jwt");
            if (router.pathname !== "/login") {
              router.push("/login");
            }
          }
        });
    }
  };
  useEffect(() => {
    if (window != undefined) {
      if (router.pathname !== "login") {
        if (window.sessionStorage.getItem("jwt")) {
          getMe(window.sessionStorage.getItem("jwt").toString());
        }
      }
    }
  });

  return <>{children}</>;
};
