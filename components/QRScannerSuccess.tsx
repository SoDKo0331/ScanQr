import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";


export default function QRScannerSuccess() {
  return (
    <View style={styles.successOverlay}>
      <View style={styles.successIndicator}>
        <IconSymbol name="checkmark.circle.fill" size={48} color="#4CAF50" />
        <Text style={styles.successText}>Амжилттай уншигдлаа!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  successOverlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.8)", justifyContent: "center", alignItems: "center", zIndex: 20 },
  successIndicator: { alignItems: "center", padding: 32, backgroundColor: "rgba(255,255,255,0.95)", borderRadius: 16, marginHorizontal: 40 },
  successText: { color: "#000000", fontSize: 18, fontWeight: "600", marginTop: 16 },
});
