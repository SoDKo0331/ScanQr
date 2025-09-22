import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { EmptyStateProps } from '../types/ScanHistoryTypes';

export const EmptyState: React.FC<EmptyStateProps> = ({ isDark }) => (
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

const styles = StyleSheet.create({
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