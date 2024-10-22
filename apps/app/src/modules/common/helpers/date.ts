export function formatDate(dateRaw?: string | Date): string {
  if (!dateRaw) return '-';

  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateRaw));
}

export function formatDateTime(dateRaw?: string | Date): string {
  if (!dateRaw) return '-';

  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(dateRaw));
}
