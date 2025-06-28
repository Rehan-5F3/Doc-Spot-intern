import { useContext, createContext } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "patient" | "doctor" | "admin";
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
}

// This should match the context from main.tsx
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // If context is not available, return a fallback
    return {
      user: {
        id: "1",
        name: "User",
        email: "user@example.com",
        role: "patient" as const,
      },
      login: () => {},
      logout: () => {},
      loading: false,
    };
  }
  return context;
}

export { AuthContext };
export type { User, AuthContextType };
