import { Link } from "expo-router";
import { StyleSheet, View, TouchableOpacity, StatusBar, Platform , Text } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { SafeAreaView } from "react-native-safe-area-context";

function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F5F5F5' }]}>
    <View>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          QR Код Уншуулах
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Link href="/QRScannerScreen" asChild>
          <TouchableOpacity 
            style={[styles.primaryButton, { backgroundColor: isDark ? '#BB86FC' : '#6200EE' }]}
            activeOpacity={0.8}
          >
            <IconSymbol 
              name="qrcode.viewfinder" 
              size={100} 
              color="#dfdcdcff" 
              style={styles.buttonIcon}
            />
            
          </TouchableOpacity>
        </Link>
      </View>
    </View>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'roboto-regularr',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#6200EE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    minWidth: 200,
    justifyContent: 'center',
  },
  buttonIcon: {
    backgroundColor: '#6f19d8ff',
    marginRight: 8,
    borderRadius: 8,
  },
  subtitle : {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 4,
  }
});

export default HomeScreen;