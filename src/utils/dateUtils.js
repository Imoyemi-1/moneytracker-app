import {
  format,
  subDays,
  startOfToday,
  endOfToday,
  startOfDay,
  endOfDay,
  startOfMonth,
} from 'date-fns';

let previousDate;
let previousRange;
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

export const getDateRange = (transactionDisplayedTime) => {
  const today = new Date();

  switch (transactionDisplayedTime) {
    case 'Today':
      previousRange = [
        format(startOfToday(), 'yyyy-MM-dd'),
        format(endOfToday(), 'yyyy-MM-dd'),
      ];
      return [
        format(startOfToday(), 'yyyy-MM-dd'),
        format(endOfToday(), 'yyyy-MM-dd'),
      ];

    case 'Yesterday': {
      const y = subDays(today, 1);
      previousRange = [
        format(startOfDay(y), 'yyyy-MM-dd'),
        format(endOfDay(y), 'yyyy-MM-dd'),
      ];
      return [
        format(startOfDay(y), 'yyyy-MM-dd'),
        format(endOfDay(y), 'yyyy-MM-dd'),
      ];
    }

    case 'Last 7 days':
      previousRange = [
        format(subDays(today, 7), 'yyyy-MM-dd'),
        format(today, 'yyyy-MM-dd'),
      ];
      return [
        format(subDays(today, 7), 'yyyy-MM-dd'),
        format(today, 'yyyy-MM-dd'),
      ];

    case 'Last 30 days':
      previousRange = [
        format(subDays(today, 30), 'yyyy-MM-dd'),
        format(today, 'yyyy-MM-dd'),
      ];
      return [
        format(subDays(today, 30), 'yyyy-MM-dd'),
        format(today, 'yyyy-MM-dd'),
      ];

    case 'This month':
      previousRange = [
        format(startOfMonth(today), 'yyyy-MM-dd'),
        format(today, 'yyyy-MM-dd'),
      ];
      return [
        format(startOfMonth(today), 'yyyy-MM-dd'),
        format(today, 'yyyy-MM-dd'),
      ];

    case 'Custom date':
      return previousRange;

    default:
      return [null, null];
  }
};
