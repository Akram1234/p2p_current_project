import { parse } from 'path';
import { Activity } from './definitions';

export const formatCurrency = (amount: number) => {
  return (amount).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export function formatDateToLocal(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, 
  })
}

export const generateYAxis = (activity: Activity[]) => {
  const yAxisLabels: string[] = []

  const highestRecord = Math.max(...activity.map((m) => m.activity))

  const topLabel = highestRecord

  for (let value = topLabel; value >= 0; value -= 1_000) {
    const label = `${(value)}`
    yAxisLabels.push(`${label}`)
  }

  return { yAxisLabels, topLabel }
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
