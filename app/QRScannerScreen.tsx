import React, { useState, useRef, useCallback } from "react";
import { View, StatusBar, Alert, Vibration, TouchableOpacity, Text } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

import CameraPermissionLoading from "@/components/CameraPermissionLoading";
import CameraPermissionDenied from "@/components/CameraPermissionDenied";
import QRScannerOverlay from "@/components/QRScannerOverlay";
import QRScannerControls from "@/components/QRScannerControls";
import QRScannerSuccess from "@/components/QRScannerSuccess";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { SafeAreaView } from "react-native-safe-area-context";

export default function QRScannerScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState("");
  const [isFlashOn, setIsFlashOn] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Зөвшөөрөл шаардлагатай", "Зургийн сангаас авах зөвшөөрөл өгөх шаардлагатай.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);

      const formData = new FormData();
      formData.append("file", {
        uri: result.assets[0].uri,
        name: "upload.jpg",
        type: "image/jpeg",
      } as any);
  
      try {
        const response = await fetch("http://YOUR_BACKEND_URL/api/upload-qr", {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const res = await response.json();
        if (response.ok && res.success) {
          router.push("/(tabs)/HistoryScreen");
        } else {
          Alert.alert("Алдаа", res.message || "QR код танигдсангүй");
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Алдаа гарлаа", "Сервертэй холбогдож чадсангүй");
      }
    }
  };

  const handleBarcodeScanned = useCallback(
    async ({ data: scannedData }: { type: string; data: string }) => {
      if (scanned) return;

      setScanned(true);
      setData(scannedData);
      Vibration.vibrate(100);

      try {
        const response = await fetch("http://YOUR_BACKEND_URL/api/scan-qr", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ qrCode: scannedData }),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          router.push("/HistoryScreen");
        } else {
          Alert.alert("QR код буруу байна", result.message || "Код олдсонгүй");
          setScanned(false);
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Алдаа гарлаа", "Сервертэй холбогдож чадсангүй");
        setScanned(false);
      }
    },
    [scanned]
  );


  const toggleFlash = () => setIsFlashOn(!isFlashOn);

  const resetScanner = () => {
    setScanned(false);
    setData("");
  };

  if (!permission) return <CameraPermissionLoading isDark={isDark} />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <StatusBar barStyle="light-content" translucent />

      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          position: "absolute",
          top: 50,
          left: 20,
          zIndex: 10,
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          padding: 10,
          borderRadius: 20,

        }}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>✕</Text>
      </TouchableOpacity>

      {!permission.granted ? (
        <CameraPermissionDenied isDark={isDark} requestPermission={requestPermission} />
      ) : (
        <>
          <CameraView
            ref={cameraRef}
            style={{ flex: 1 }}
            facing="back"
            flash={isFlashOn ? "on" : "off"}
            onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "pdf417", "ean13", "ean8", "code128", "code39"],
            }}
          />
          <QRScannerOverlay />
          <QRScannerControls
            isFlashOn={isFlashOn}
            toggleFlash={toggleFlash}
            pickImage={pickImage}
            scanned={scanned}
            resetScanner={resetScanner}
          />
          {scanned && <QRScannerSuccess />}
        </>
      )}
    </SafeAreaView>
  );
}
