import { View, Text, StyleSheet } from "react-native";
import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewStyle from "../../../utils/MapViewStyle.json";

export default function AppMapView() {
  return (
    <View>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={MapViewStyle}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
