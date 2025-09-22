import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';

interface HistoryHeaderProps {
  isDark: boolean;
  isSelectionMode: boolean;
  selectedItemsCount: number;
  hasHistory: boolean;
  onCancelSelection: () => void;
  onDeleteSelected: () => void;
  onClearAllHistory: () => void;
}

export const HistoryHeader: React.FC<HistoryHeaderProps> = ({
  isDark,
  isSelectionMode,
  selectedItemsCount,
  hasHistory,
  onCancelSelection,
  onDeleteSelected,
  onClearAllHistory,
}) => (
  <View style={[styles.header, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
    <View style={styles.headerContent}>
      {isSelectionMode ? (
        <>
          <TouchableOpacity onPress={onCancelSelection}>
            <IconSymbol name="xmark" size={24} color={isDark ? '#FFFFFF' : '#000000'} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
            {selectedItemsCount} сонгосон
          </Text>
          <TouchableOpacity onPress={onDeleteSelected}>
            <IconSymbol name="trash" size={24} color="#F44336" />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>
            Түүх
          </Text>
          {hasHistory && (
            <TouchableOpacity onPress={onClearAllHistory}>
              <IconSymbol name="trash" size={24} color={isDark ? '#FFFFFF80' : '#00000080'} />
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
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
});