import React, { createContext, useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { Platform } from "react-native";
interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (email: string, password: string, name: string, verification_code: string) => void;
}

interface User {
  token: string;
  id: string;
  full_name: string;
  email: string;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



  const login = (email: string, password: string) => {
    setIsLoading(true);
    axios.post('https://api.prodribbler.alliance-tech.fr/api/login', { email, password, device_name: Platform.OS }).then((response) => {
      const userResponse = {
        token: response.data.token,
        id: response.data.user.id,
        full_name: response.data.user.full_name,
        email: response.data.user.email,
      };
      console.log(userResponse);
      setUser(userResponse);
      SecureStore.setItemAsync("user", JSON.stringify(userResponse));
    }).catch((error) => {
      console.log(error.response.data.message);
      setError(error.response.data.message);
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const logout = () => {
    setIsLoading(true);
    axios.defaults.headers.common['Authorization'] = `Bearer ${user?.token}`;
    axios.post('https://api.prodribbler.alliance-tech.fr/api/logout').then(() => {
      setUser(null);
      SecureStore.deleteItemAsync("user");
      setError(null);
    }).catch((error) => {
      console.log(error.response.data.message);
    }).finally(() => {
      setUser(null);
      SecureStore.deleteItemAsync("user");
      setIsLoading(false);
    });
  };


  const register = (email: string, password: string, name: string, verification_code: string) => {
    setIsLoading(true);
    axios.post('https://api.prodribbler.alliance-tech.fr/api/register', { email, password, full_name: name, device_name: Platform.OS, verification_code }).then((response) => {
      const userResponse = {
        token: response.data.token,
        id: response.data.user.id,
        full_name: response.data.user.full_name,
        email: response.data.user.email,
      };
      console.log(userResponse);
      setUser(userResponse);
      SecureStore.setItemAsync("user", JSON.stringify(userResponse));
    }).catch((error) => {
      console.log(error.response.data.message);
      setError(error.response.data.message);
    }).finally(() => {
      setIsLoading(false);
    });
  };



  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        error,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
