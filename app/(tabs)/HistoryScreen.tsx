import React from "react";
import { 
  View, 
  StyleSheet, 
  FlatList, 
  StatusBar,
} from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { HistoryScreenProps, ScanHistoryItem } from '../../types/ScanHistoryTypes';
import { useHistoryManager } from '../../hooks/useHistoryManager';
import { HistoryHeader } from '../../components/HistoryHeader';
import { HistoryItem } from '../../components/HistoryItem';
import { EmptyState } from '../../components/EmptyState';

export default function HistoryScreen({}: HistoryScreenProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const {
    history,
    selectedItems,
    isSelectionMode,
    handleItemPress,
    handleItemLongPress,
    deleteSelectedItems,
    clearAllHistory,
    cancelSelection,
  } = useHistoryManager();

  const renderHistoryItem = ({ item }: { item: ScanHistoryItem }) => (
    <HistoryItem
      item={item}
      isSelected={selectedItems.has(item.id)}
      isSelectionMode={isSelectionMode}
      isDark={isDark}
      onPress={handleItemPress}
      onLongPress={handleItemLongPress}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F5F5F5' }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      <HistoryHeader
        isDark={isDark}
        isSelectionMode={isSelectionMode}
        selectedItemsCount={selectedItems.size}
        hasHistory={history.length > 0}
        onCancelSelection={cancelSelection}
        onDeleteSelected={deleteSelectedItems}
        onClearAllHistory={clearAllHistory}
      />
      {history.length === 0 ? (
        <EmptyState isDark={isDark} />
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
  listContent: {
    padding: 16,
  },
});