import { useState, useEffect } from "react";
import axios from "axios";
import * as Application from "expo-application";
import { Alert, Linking, Platform, BackHandler } from "react-native";

interface VersionCheckResponse {
  ios_version?: string; // Version pour iOS
  android_version?: string; // Version pour Android
  force_update: boolean;
  update_message?: string;
}

export const useVersionCheck = () => {
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [isForceUpdate, setIsForceUpdate] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");

  const checkVersion = async () => {
    try {
      const currentVersion = Application.nativeApplicationVersion;
      const platform = Platform.OS;

      const response = await axios.get<VersionCheckResponse>(
        "https://api.prodribbler.alliance-tech.fr/api/version-check",
        {
          params: {
            platform: platform,
            version: currentVersion,
          },
        }
      );

      // Déterminer la dernière version selon la plateforme
      let latestVersion = "";
      if (platform === "ios") {
        latestVersion = response.data.ios_version || "";
      } else if (platform === "android") {
        latestVersion = response.data.android_version || "";
      }

      // Continuer uniquement si nous avons une version valide pour la plateforme actuelle
      if (latestVersion) {
        const isNewerVersion = compareVersions(
          latestVersion,
          currentVersion || ""
        );

        if (isNewerVersion > 0) {
          setNeedsUpdate(true);

          // Message par défaut pour mise à jour normale
          setUpdateMessage(
            response.data.update_message ||
              "Une nouvelle version est disponible."
          );

          // Vérifier si c'est une mise à jour forcée
          if (response.data.force_update) {
            setIsForceUpdate(true);
          }
        }
      }
    } catch (error) {
      console.error("Error checking version:", error);
    }
  };

  const showUpdateDialog = () => {
    // Pour iOS, nous devons utiliser une approche différente pour les mises à jour forcées
    if (Platform.OS === "ios" && isForceUpdate) {
      Alert.alert(
        "Update Available",
        updateMessage,
        [
          {
            text: "Update",
            onPress: () => {
              const storeUrl = "https://apps.apple.com/app/idYOUR_APP_ID"; // Remplacez par votre ID d'app réel
              Linking.openURL(storeUrl);
              setTimeout(() => {
                showUpdateDialog();
              }, 500);
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      // Pour Android et les mises à jour non-forcées
      Alert.alert(
        "Update Available",
        updateMessage,
        [
          {
            text: "Update",
            onPress: () => {
              const storeUrl = Platform.select({
                ios: "https://apps.apple.com/app/idYOUR_APP_ID",
                android: "market://details?id=com.alliancetech.prodribbler",
              });
              Linking.openURL(storeUrl || "");
              if (isForceUpdate) {
                setTimeout(() => {
                  showUpdateDialog();
                }, 1000);
              }
            },
          },
          !isForceUpdate && {
            text: "Later",
            onPress: () => {},
            style: "cancel",
          },
        ].filter(Boolean) as any,
        { cancelable: !isForceUpdate }
      );
    }
  };

  // Effet pour bloquer le bouton de retour si mise à jour forcée
  useEffect(() => {
    if (isForceUpdate && needsUpdate) {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          showUpdateDialog(); // Réafficher la boîte de dialogue si l'utilisateur tente de revenir en arrière
          return true; // Empêcher le retour en arrière
        }
      );

      return () => backHandler.remove();
    }
  }, [isForceUpdate, needsUpdate]);

  return {
    checkVersion,
    showUpdateDialog,
    needsUpdate,
    isForceUpdate,
  };
};

// Fonction utilitaire pour comparer les versions
const compareVersions = (v1: string, v2: string): number => {
  const parts1 = v1.split(".").map(Number);
  const parts2 = v2.split(".").map(Number);

  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const part1 = parts1[i] || 0;
    const part2 = parts2[i] || 0;

    if (part1 > part2) return 1;
    if (part1 < part2) return -1;
  }

  return 0;
};
