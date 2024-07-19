import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../../../utils/colors";

export default function Header() {
  const { user } = useUser();
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user?.imageUrl }}
        style={{ height: 45, width: 45, borderRadius: 99 }}
      />
      <Image
        source={require("../../../assets/images/logo.png")}
        style={{ height: 45, width: 200, objectFit: "contain" }}
      />
      <FontAwesome name="filter" size={26} color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
