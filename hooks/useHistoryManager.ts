import { useState, useEffect } from 'react';
import { Alert, Linking } from 'react-native';
import { ScanHistoryItem } from '../types/ScanHistoryTypes';
import { MOCK_HISTORY } from '../data/mockData';

export const useHistoryManager = () => {
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  useEffect(() => {
    // Load history from storage - for now using mock data
    setHistory(MOCK_HISTORY);
  }, []);

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

  return {
    history,
    selectedItems,
    isSelectionMode,
    handleItemPress,
    handleItemLongPress,
    deleteSelectedItems,
    clearAllHistory,
    cancelSelection,
  };
};