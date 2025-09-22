import { ScanHistoryItem } from '../types/ScanHistoryTypes';

// Mock data for demonstration - in real app, this would come from storage
export const MOCK_HISTORY: ScanHistoryItem[] = [
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