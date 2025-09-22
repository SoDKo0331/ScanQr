// Utility functions for date formatting
export const formatDate = (date: Date): string => {
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