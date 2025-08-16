import React, { createContext, useContext, useMemo, useState } from "react";

type User = {
  id: string;
  name: string;
  role?: string;
};

type LoginPayload = {
  identity: string;
  password: string;
};

type AuthContextValue = {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  // For later integration with your .NET backend:
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Persist a simple token for demo; replace with real auth later.
  const [token, setToken] = useState<string | null>(() =>
    typeof window !== "undefined" ? localStorage.getItem("auth:token") : null
  );
  const [user, setUser] = useState<User | null>(() => {
    const raw =
      typeof window !== "undefined" ? localStorage.getItem("auth:user") : null;
    return raw ? (JSON.parse(raw) as User) : null;
  });

  const isAuthenticated = Boolean(token);

  // Stubbed login/logout for now — wire to .NET later
  const login = async (payload: LoginPayload) => {
    // TODO: call your API and set real token/user
    const demoToken = "demo-token";
    const demoUser: User = { id: "1", name: payload.identity, role: "Admin" };

    setToken(demoToken);
    setUser(demoUser);
    localStorage.setItem("auth:token", demoToken);
    localStorage.setItem("auth:user", JSON.stringify(demoUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("auth:token");
    localStorage.removeItem("auth:user");
  };

  const value = useMemo<AuthContextValue>(
    () => ({ isAuthenticated, token, user, login, logout }),
    [isAuthenticated, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
