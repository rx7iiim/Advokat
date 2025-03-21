"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import Upbar from "../components/Upbar/Upbar";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // ✅ Check if the user is already logged in (Avoid infinite loop)
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  useEffect(() => {
    const storedUsername = Cookies.get("username");
    if (storedUsername && window.location.pathname !== `/user/${storedUsername}/home`) {
      router.replace(`/user/${storedUsername}/home`);
    }
  }, [router]);

  // 🔥 Login function with fixed redirects
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ Ensures cookies are included
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        Cookies.set("id", userData.user.userId, {
          path: "/",
          secure: process.env.NODE_ENV === "production", 
          sameSite: "Strict",
        });

        // ✅ Only redirect if the user is not already there
        if (window.location.pathname !== `/user/${userData.username}/home`) {
          router.replace(`/user/${userData.username}/home`);
        }
      } else {
        setError(response.status === 401 ? "Nom d'utilisateur ou mot de passe incorrect." : "Erreur serveur. Réessayez plus tard.");
      }
    } catch (err) {
      console.error("Échec de la connexion :", err);
      setError("Une erreur réseau s'est produite. Vérifiez votre connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Upbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Connexion à votre compte
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Pas encore de compte ?{" "}
              <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                Inscrivez-vous
              </Link>
            </p>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Nom d'utilisateur
                </label>
                <input
                  id="username"
                  name="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Votre pseudo"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="*********"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Se souvenir de moi
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Mot de passe oublié ?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {loading ? "Connexion..." : "Se connecter"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
