import React, { createContext, useContext, useState } from 'react';
import { usePathname } from 'expo-router';

type HeaderContextType = {
  title: string;
  setTitle: (title: string) => void;
};

const defaultTitles: Record<string, string> = {
  '/': 'Training & Stats',
  '/rankings': 'Rankings'
};

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function HeaderProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [title, setTitle] = useState<string>(defaultTitles[pathname] || '');

  return (
    <HeaderContext.Provider value={{ 
      title: defaultTitles[pathname] || title, 
      setTitle 
    }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error('useHeader doit être utilisé à l\'intérieur d\'un HeaderProvider');
  }
  return context;
}