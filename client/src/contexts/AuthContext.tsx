import { createContext, FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  token: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async (storedToken: string) => {
      try {
        const response = await fetch('/api/validate-token', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${storedToken}`
          }
        });
        return response.ok;
      } catch (error) {
        console.error('Token validation error:', error);
        return false;
      }
    };

    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        const isValid = await validateToken(storedToken);
        if (isValid) {
          setIsLoggedIn(true);
          setToken(storedToken);
        } else {
          localStorage.removeItem("token");
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setIsLoggedIn(true);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setToken(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, token, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
