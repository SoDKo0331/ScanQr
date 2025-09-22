import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { HistoryItemProps } from '../types/ScanHistoryTypes';
import { formatDate } from '../utils/dateUtils';

export const HistoryItem: React.FC<HistoryItemProps> = ({
  item,
  isSelected,
  isSelectionMode,
  isDark,
  onPress,
  onLongPress,
}) => {
  const getIconName = () => {
    if (item.isUrl) return "link";
    return item.type === 'qr' ? "qrcode" : "barcode";
  };

  return (
    <TouchableOpacity
      style={[
        styles.historyItem,
        { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' },
        isSelected && { backgroundColor: isDark ? '#3700B3' : '#E8EAF6' }
      ]}
      onPress={() => onPress(item)}
      onLongPress={() => onLongPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.itemHeader}>
        <View style={styles.typeIndicator}>
          <IconSymbol 
            name={getIconName()} 
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

const styles = StyleSheet.create({
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
});