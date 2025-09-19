import React, { useState, useEffect } from "react";
import { 
  View, 
  StyleSheet, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StatusBar, 
  Platform,
  Alert,
  Linking
} from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColorScheme } from "@/hooks/use-color-scheme";

// Mock data for demonstration - in real app, this would come from storage
interface ScanHistoryItem {
  id: string;
  data: string;
  type: string;
  timestamp: Date;
  isUrl?: boolean;
}

const MOCK_HISTORY: ScanHistoryItem[] = [
  {
    id: '1',
    data: 'https://www.example.com',
    type: 'qr',
    timestamp: new Date('2024-01-15T10:30:00'),
    isUrl: true,
  },
  {
    id: '2',
    data: 'Энэ бол жишээ текст юм',
    type: 'qr',
    timestamp: new Date('2024-01-15T09:15:00'),
    isUrl: false,
  },
  {
    id: '3',
    data: '1234567890123',
    type: 'ean13',
    timestamp: new Date('2024-01-14T16:45:00'),
    isUrl: false,
  },
];

export default function HistoryScreen() {
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    // Load history from storage - for now using mock data
    setHistory(MOCK_HISTORY);
  }, []);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return 'Өнөөдөр';
    } else if (diffDays === 2) {
      return 'Өчигдөр';
    } else if (diffDays <= 7) {
      return `${diffDays} хоногийн өмнө`;
    } else {
      return date.toLocaleDateString('mn-MN');
    }
  };

  const handleItemPress = (item: ScanHistoryItem) => {
    if (isSelectionMode) {
      toggleItemSelection(item.id);
    } else {
      // Handle single item action
      if (item.isUrl) {
        Alert.alert(
          'Линк нээх',
          `${item.data} хаягруу очих уу?`,
          [
            { text: 'Цуцлах', style: 'cancel' },
            { text: 'Нээх', onPress: () => Linking.openURL(item.data) },
          ]
        );
      } else {
        Alert.alert('Скан хийсэн өгөгдөл', item.data);
      }
    }
  };

  const handleItemLongPress = (item: ScanHistoryItem) => {
    setIsSelectionMode(true);
    toggleItemSelection(item.id);
  };

  const toggleItemSelection = (id: string) => {
    const newSelection = new Set(selectedItems);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedItems(newSelection);

    if (newSelection.size === 0) {
      setIsSelectionMode(false);
    }
  };

  const deleteSelectedItems = () => {
    Alert.alert(
      'Устгах',
      `Сонгосон ${selectedItems.size} зүйлийг устгах уу?`,
      [
        { text: 'Цуцлах', style: 'cancel' },
        { 
          text: 'Устгах', 
          style: 'destructive',
          onPress: () => {
            setHistory(prev => prev.filter(item => !selectedItems.has(item.id)));
            setSelectedItems(new Set());
            setIsSelectionMode(false);
          }
        },
      ]
    );
  };

  const clearAllHistory = () => {
    Alert.alert(
      'Бүх түүхийг арилгах',
      'Та бүх скан хийсэн түүхийг устгахдаа итгэлтэй байна уу?',
      [
        { text: 'Цуцлах', style: 'cancel' },
        { 
          text: 'Бүгдийг устгах', 
          style: 'destructive',
          onPress: () => setHistory([])
        },
      ]
    );
  };

  const cancelSelection = () => {
    setSelectedItems(new Set());
    setIsSelectionMode(false);
  };

  const renderHistoryItem = ({ item }: { item: ScanHistoryItem }) => {
    const isSelected = selectedItems.has(item.id);
    
    return (
      <TouchableOpacity
        style={[
          styles.historyItem, 
          { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' },
          isSelected && { backgroundColor: isDark ? '#3700B3' : '#E8EAF6' }
        ]}
        onPress={() => handleItemPress(item)}
        onLongPress={() => handleItemLongPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.itemHeader}>
          <View style={styles.typeIndicator}>
            <IconSymbol 
              name={item.isUrl ? "link" : item.type === 'qr' ? "qrcode" : "barcode"} 
              size={20} 
              color={isDark ? '#BB86FC' : '#6200EE'} 
            />
            <Text style={[styles.typeText, { color: isDark ? '#BB86FC' : '#6200EE' }]}>
              {item.type.toUpperCase()}
            </Text>
          </View>
          <Text style={[styles.timestamp, { color: isDark ? '#FFFFFF60' : '#00000060' }]}>
            {formatDate(item.timestamp)}
          </Text>
        </View>
        
        <Text 
          style={[
            styles.itemData, 
            { color: isDark ? '#FFFFFF' : '#000000' },
            item.isUrl && { color: isDark ? '#82B1FF' : '#1976D2' }
          ]}
          numberOfLines={2}
        >
          {item.data}
        </Text>
        
        {isSelectionMode && (
          <View style={styles.selectionIndicator}>
            <IconSymbol 
              name={isSelected ? "checkmark.circle.fill" : "circle"} 
              size={24} 
              color={isSelected ? (isDark ? '#BB86FC' : '#6200EE') : (isDark ? '#FFFFFF40' : '#00000040')} 
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <IconSymbol name="clock" size={64} color={isDark ? '#FFFFFF40' : '#00000040'} />
      <Text style={[styles.emptyTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
        Түүх хоосон байна
      </Text>
      <Text style={[styles.emptyMessage, { color: isDark ? '#FFFFFF80' : '#00000080' }]}>
        QR код уншуулсны дараа энд харагдана
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F5F5F5' }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
        <View style={styles.headerContent}>
          {isSelectionMode ? (
            <>
              <TouchableOpacity onPress={cancelSelection}>
                <IconSymbol name="xmark" size={24} color={isDark ? '#FFFFFF' : '#000000'} />
              </TouchableOpacity>
              <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                {selectedItems.size} сонгосон
              </Text>
              <TouchableOpacity onPress={deleteSelectedItems}>
                <IconSymbol name="trash" size={24} color="#F44336" />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                Түүх
              </Text>
              {history.length > 0 && (
                <TouchableOpacity onPress={clearAllHistory}>
                  <IconSymbol name="trash" size={24} color={isDark ? '#FFFFFF80' : '#00000080'} />
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </View>

      {/* Content */}
      {history.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={renderHistoryItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  listContent: {
    padding: 16,
  },
  historyItem: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    position: 'relative',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  timestamp: {
    fontSize: 12,
  },
  itemData: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 4,
  },
  selectionIndicator: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
});