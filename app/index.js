import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import LoginScreen from "./Screen/LoginScreen/LoginScreen.jsx"; // Adjusted to match actual case
import {
  ClerkProvider,
  ClerkLoaded,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-expo";
SplashScreen.preventAutoHideAsync();
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./Navigations/TabNavigation.js";

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (error) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function App() {
  // Add font in application
  const [fontsLoaded] = useFonts({
    outfit: require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("../assets/fonts/Outfit-SemiBold.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  // Completed app font

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={
        "pk_test_YW11c2luZy1wb3NzdW0tNzcuY2xlcmsuYWNjb3VudHMuZGV2JA"
      }
    >
      <ClerkLoaded>
        <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
          <SignedIn>
            <TabNavigation />
          </SignedIn>

          <SignedOut>
            <LoginScreen />
          </SignedOut>
        </SafeAreaView>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
