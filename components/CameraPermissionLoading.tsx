import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";


export default function CameraPermissionLoading({ isDark }: { isDark: boolean }) {
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
        color={isDark ? "#FFFFFF60" : "#00000060"}
      />
      <Text
        style={[
          styles.permissionText,
          { color: isDark ? "#FFFFFF" : "#000000" },
        ]}
      >
        Камерын зөвшөөрөл шалгаж байна...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  permissionContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 32 },
  permissionText: { fontSize: 16, textAlign: "center", marginTop: 16 },
});
