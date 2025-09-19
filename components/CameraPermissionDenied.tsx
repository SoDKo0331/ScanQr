import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function CameraPermissionDenied({
  isDark,
  requestPermission,
}: {
  isDark: boolean;
  requestPermission: () => void;
}) {
  return (
    <View
      style={[
        styles.permissionContainer,
        { backgroundColor: isDark ? "#121212" : "#F5F5F5" },
      ]}
    >
      <IconSymbol
        name="camera"
        size={64}
        color={isDark ? "#BB86FC" : "#6200EE"}
      />
      <Text
        style={[styles.permissionTitle, { color: isDark ? "#FFFFFF" : "#000000" }]}
      >
        Камерын зөвшөөрөл шаардлагатай
      </Text>
      <Text
        style={[
          styles.permissionMessage,
          { color: isDark ? "#FFFFFF80" : "#00000080" },
        ]}
      >
        QR код уншихын тулд камерын зөвшөөрөл өгнө үү
      </Text>
      <TouchableOpacity
        style={[styles.permissionButton, { backgroundColor: isDark ? "#BB86FC" : "#6200EE" }]}
        onPress={requestPermission}
      >
        <Text style={styles.permissionButtonText}>Зөвшөөрөл өгөх</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  permissionContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 32 },
  permissionTitle: { fontSize: 20, fontWeight: "600", textAlign: "center", marginTop: 24, marginBottom: 12 },
  permissionMessage: { fontSize: 16, textAlign: "center", marginBottom: 32, lineHeight: 22 },
  permissionButton: { paddingVertical: 14, paddingHorizontal: 28, borderRadius: 24 },
  permissionButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
});
