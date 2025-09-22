import { format, startOfMonth, subDays } from 'date-fns';

let previousDate;
export const getDateRangeLabel = (transactionDisplayedTime) => {
  const today = new Date();
  let start;

  switch (transactionDisplayedTime) {
    case 'Today':
      previousDate = format(today, 'MMMM, do');
      return format(today, 'MMMM, do');

    case 'Yesterday':
      previousDate = format(subDays(today, 1), 'MMMM, do');
      return format(subDays(today, 1), 'MMMM, do');

    case 'Last 7 days':
      start = subDays(today, 7);
      previousDate = `${format(start, 'dd MMM')} — ${format(today, 'dd MMM')}`;
      return `${format(start, 'dd MMM')} — ${format(today, 'dd MMM')}`;

    case 'Last 30 days':
      start = subDays(today, 30);
      previousDate = `${format(start, 'dd MMM')} — ${format(today, 'dd MMM')}`;
      return `${format(start, 'dd MMM')} — ${format(today, 'dd MMM')}`;

    case 'This month':
      start = startOfMonth(today);
      previousDate = `${format(start, 'dd MMM')} — ${format(today, 'dd MMM')}`;
      return `${format(start, 'dd MMM')} — ${format(today, 'dd MMM')}`;

    case 'Custom date':
      return previousDate;

    default:
      return '';
  }
};
