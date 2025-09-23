import React from "react";
import { 
  View, 
  StyleSheet, 
  FlatList, 
  StatusBar,
  RefreshControl,
} from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { HistoryScreenProps, ScanHistoryItem } from '../../types/ScanHistoryTypes';
import { useHistoryManager } from '../../hooks/useHistoryManager';
import { HistoryHeader } from '../../components/HistoryHeader';
import { HistoryItem } from '../../components/HistoryItem';
import { EmptyState } from '../../components/EmptyState';

export default function HistoryScreen({}: HistoryScreenProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
    <View style={[styles.container, { backgroundColor: isDark ? "#121212" : "#F5F5F5" }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <HistoryHeader
        isDark={isDark}
        isSelectionMode={isSelectionMode}
        selectedItemsCount={selectedItems.size}
        hasHistory={history.length > 0}
        onCancelSelection={cancelSelection}
        onDeleteSelected={deleteSelectedItems}
        onClearAllHistory={clearAllHistory}
      />

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={renderHistoryItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#b600eeff"]}
            tintColor={isDark ? "#FFFFFF" : "#000000"}
          />
        }
        ListEmptyComponent={<EmptyState isDark={isDark} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "nunito-sans-regular",
  },
  listContent: {
    padding: 16,
    flexGrow: 1, // ensures EmptyState centers properly
  },
});
