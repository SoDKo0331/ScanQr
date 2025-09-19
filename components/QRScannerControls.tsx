import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";


export default function QRScannerControls({
  isFlashOn,
  toggleFlash,
  pickImage,
  scanned,
  resetScanner,
}: {
  isFlashOn: boolean;
  toggleFlash: () => void;
  pickImage: () => void;
  scanned: boolean;
  resetScanner: () => void;
}) {
  return (
    <View style={styles.bottomControls}>
      <TouchableOpacity style={[styles.controlButton, isFlashOn && styles.controlButtonActive]} onPress={toggleFlash}>
        <IconSymbol name={isFlashOn ? "flashlight.on.fill" : "flashlight.off.fill"} size={24} color={isFlashOn ? "#6200EE" : "#FFFFFF"} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.controlButton, { backgroundColor: "#6200EE" }]} onPress={pickImage}>
        <IconSymbol name="photo" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      {scanned && (
        <TouchableOpacity style={[styles.controlButton, styles.resetButton]} onPress={resetScanner}>
          <IconSymbol name="arrow.clockwise" size={24} color="#FFFFFF" />
          <Text style={styles.controlButtonText}>Дахин скан</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomControls: { position: "absolute", bottom: 60, left: 20, right: 20, flexDirection: "row", justifyContent: "space-around", alignItems: "center", zIndex: 10 },
  controlButton: { width: 56, height: 56, borderRadius: 28, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: "transparent" },
  controlButtonActive: { backgroundColor: "rgba(255,255,255,0.9)", borderColor: "#6200EE" },
  resetButton: { flexDirection: "row", width: "auto", paddingHorizontal: 20, gap: 8 },
  controlButtonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "500" },
});
