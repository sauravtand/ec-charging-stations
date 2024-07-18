import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import colors from "../../../utils/colors";
import { useWarmUpBrowser } from "../../../hooks/warmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";


WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.logoImage}
        source={require("../../../assets/images/logo.png")}
      />
      <Image
        style={styles.bgImage}
        source={require("../../../assets/images/ev-charge.jpg")}
      />

      <View style={styles.textContainer}>
        <Text style={styles.heading}>
          Your Ultimate EV Charging Station Finder App
        </Text>
        <Text style={styles.desc}>
          Find EV Charging Station near you, plan trip easily on a single click
        </Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Login With Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  logoImage: {
    width: 200,
    height: 40,
    resizeMode: "contain",
  },
  bgImage: {
    width: "100%",
    height: 240,
    marginTop: 20,
    resizeMode: "cover",
  },
  textContainer: {
    padding: 20,
  },
  heading: {
    fontSize: 25,
    fontFamily: "outfit-bold",
    textAlign: "center",
    marginTop: 20,
  },
  desc: {
    fontSize: 17,
    fontFamily: "outfit",
    textAlign: "center",
    marginTop: 15,
    color: colors.GRAY,
  },
  button: {
    backgroundColor: colors.PRIMARY,
    padding: 16,
    borderRadius: 99,
    marginTop: 40,
  },
  buttonText: {
    color: colors.WHITE,
    textAlign: "center",
    fontFamily: "outfit",
    fontSize: 17,
  },
});
