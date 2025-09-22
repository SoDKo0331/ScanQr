// Types for scan history functionality
export interface ScanHistoryItem {
  id: string;
  data: string;
  type: string;
  timestamp: Date;
  isUrl?: boolean;
}

export interface HistoryScreenProps {
}

export interface HistoryItemProps {
  item: ScanHistoryItem;
  isSelected: boolean;
  isSelectionMode: boolean;
  isDark: boolean;
  onPress: (item: ScanHistoryItem) => void;
  onLongPress: (item: ScanHistoryItem) => void;
}

export interface EmptyStateProps {
  isDark: boolean;
}