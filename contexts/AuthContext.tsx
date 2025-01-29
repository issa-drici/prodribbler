import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, verificationCode: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setIsAuthenticated(true);
        // Ici vous pourriez faire un appel API pour récupérer les infos utilisateur
        setUser({ email: 'user@example.com' }); // Exemple
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du statut d\'authentification:', error);
    } finally {
      setIsInitialized(true);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // À remplacer par votre appel API Laravel
      // POST /api/login
      if (email === 'test@test.com' && password === 'password') {
        await AsyncStorage.setItem('userToken', 'fake-token');
        setIsAuthenticated(true);
        setUser({ email });
      } else {
        throw new Error('Identifiants invalides');
      }
    } catch (error) {
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string, verificationCode: string) => {
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // À remplacer par votre appel API Laravel
      // POST /api/register avec email, password, name et verification_code
      if (verificationCode === '123456') { // Simulation de vérification
        await AsyncStorage.setItem('userToken', 'fake-token');
        setIsAuthenticated(true);
        setUser({ email, name });
      } else {
        throw new Error('Code de vérification invalide');
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      // À remplacer par votre appel API Laravel
      // POST /api/logout
      await AsyncStorage.removeItem('userToken');
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isInitialized,
      user, 
      login, 
      signup, 
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
} 