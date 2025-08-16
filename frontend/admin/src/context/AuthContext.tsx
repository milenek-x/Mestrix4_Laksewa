import { createContext, useState, ReactNode } from 'react';

export const AuthContext = createContext({
  userId: null as string | null,
  setUserId: (id: string | null) => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};
