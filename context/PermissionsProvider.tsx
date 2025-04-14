import React, { createContext, useContext, useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

type PermissionsContextType = {
  cameraPermission: ImagePicker.PermissionStatus | null;
  libraryPermission: ImagePicker.PermissionStatus | null;
  checkPermissions: () => Promise<void>;
  permissionsGranted: boolean;
};

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

export function PermissionsProvider({ children }: { children: React.ReactNode }) {
  const [cameraPermission, setCameraPermission] = useState<ImagePicker.PermissionStatus | null>(null);
  const [libraryPermission, setLibraryPermission] = useState<ImagePicker.PermissionStatus | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const checkPermissions = async () => {
    try {
      const camera = await ImagePicker.getCameraPermissionsAsync();
      const library = await ImagePicker.getMediaLibraryPermissionsAsync();
      
      setCameraPermission(camera.status);
      setLibraryPermission(library.status);
    } catch (error) {
      console.error('Erreur lors de la vérification des permissions:', error);
    }
  };

  const permissionsGranted = cameraPermission === 'granted' && libraryPermission === 'granted';

  // Vérification initiale des permissions
  useEffect(() => {
    const initializePermissions = async () => {
      await checkPermissions();
      setIsInitialized(true);
    };
    initializePermissions();
  }, []);

  return (
    <PermissionsContext.Provider value={{
      cameraPermission,
      libraryPermission,
      checkPermissions,
      permissionsGranted,
    }}>
      {children}
    </PermissionsContext.Provider>
  );
}

export function usePermissions() {
  const context = useContext(PermissionsContext);
  if (context === undefined) {
    throw new Error('usePermissions must be used within a PermissionsProvider');
  }
  return context;
} 