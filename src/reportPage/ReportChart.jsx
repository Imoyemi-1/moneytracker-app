import { useContext } from 'react';
import React, { Suspense } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { AppContext } from '../contexts/AppContext';
import { getYear, getMonth, getDaysInMonth } from 'date-fns';
import { convertCurrency } from '../hooks/useExchangeRates';
import { useDropdown } from '../contexts/Setup';
import clsx from 'clsx';

const Bar = React.lazy(() =>
  import('react-chartjs-2').then((module) => ({ default: module.Bar }))
);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ReportChart = ({ formatDate, viewType, currentDate, filterReport }) => {
  const { transactions, rates } = useContext(AppContext);
  const { selected } = useDropdown();

  const monthsNameArr = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  let filteredTransaction;

  filteredTransaction = transactions
    .filter((tx) => {
      const txDate = new Date(tx.date);
      return (
        (getYear(txDate).toString() === formatDate() &&
          selected.accountFilterReport.length === 0) ||
        selected.accountFilterReport.some(
          (acc) => tx.accountTransactionInfo[0]?.id === acc.id
        )
      );
    })
    .filter(
      (tx) => !tx.tags.some((tag) => selected.tagsFilterReport.includes(tag))
    );

  if (viewType === 'Monthly') {
    filteredTransaction = transactions
      .filter((tx) => {
        const txDate = new Date(tx.date);

        return (
          `${monthsNameArr[getMonth(txDate).toString()]} ${getYear(
            txDate
          ).toString()}` === formatDate()
        );
      })
      .filter(
        (tx) =>
          selected.accountFilterReport.length === 0 ||
          selected.accountFilterReport.some(
            (acc) => tx.accountTransactionInfo[0]?.id !== acc.id
          )
      )
      .filter(
        (tx) => !tx.tags.some((tag) => selected.tagsFilterReport.includes(tag))
      );
  }

  //
  const totalIncome = filteredTransaction
    .filter((tx) => tx.type === 'income')
    .reduce(
      (sum, tx) =>
        sum +
        convertCurrency(
          tx.accountTransactionInfo[0]?.amount,
          tx.accountTransactionInfo[0]?.code,
          selected.baseSelection?.code,
          rates
        ),
      0
    );

  //
  const totalExpense = filteredTransaction
    .filter((tx) => tx.type === 'expense')
    .reduce(
      (sum, tx) =>
        sum +
        convertCurrency(
          tx.accountTransactionInfo[0]?.amount,
          tx.accountTransactionInfo[0]?.code,
          selected.baseSelection.code,
          rates
        ),
      0
    );

  //
  let labels = [];
  let incomeData = [];
  let expenseData = [];
  if (viewType === 'Yearly') {
    labels = monthsNameArr;
    //
    incomeData = Array(12).fill(0);
    expenseData = Array(12).fill(0);

    //
    filteredTransaction.forEach((tx) => {
      const monthIndex = new Date(tx.date).getMonth();
      if (filterReport === 'Net Income') {
        if (tx.type === 'income')
          incomeData[monthIndex] += tx.accountTransactionInfo[0]?.amount;
        else incomeData[monthIndex] -= tx.accountTransactionInfo[0]?.amount;
      } else if (filterReport === 'Expense & Income') {
        if (tx.type === 'income')
          incomeData[monthIndex] += tx.accountTransactionInfo[0]?.amount;
        else expenseData[monthIndex] += tx.accountTransactionInfo[0]?.amount;
      }
    });
  } else {
    // Month: Days 01-31

    const numDays = getDaysInMonth(currentDate);

    labels = Array.from({ length: numDays }, (_, i) =>
      (i + 1).toString().padStart(2, '0')
    ); // '01', '02', ...
    incomeData = Array(numDays).fill(0);
    expenseData = Array(numDays).fill(0);

    if (filterReport === 'Net Income') {
      filteredTransaction.forEach((tx) => {
        const dayIndex = new Date(tx.date).getDate(); // 0-based
        if (tx.type === 'income')
          incomeData[dayIndex] += tx.accountTransactionInfo[0]?.amount || 0;
        if (tx.type === 'expense')
          incomeData[dayIndex] -= tx.accountTransactionInfo[0]?.amount || 0;
      });
    } else if (filterReport === 'Expense & Income') {
      filteredTransaction.forEach((tx) => {
        const dayIndex = new Date(tx.date).getDate(); // 0-based
        if (tx.type === 'income')
          incomeData[dayIndex] += tx.accountTransactionInfo[0]?.amount;
        else expenseData[dayIndex] += tx.accountTransactionInfo[0]?.amount;
      });
    }
  }
  //
  let data = {
    labels: labels,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        backgroundColor: 'green',
      },
      {
        label: 'Expense',
        data: expenseData,
        backgroundColor: 'red',
      },
    ],
  };

  if (filterReport === 'Net Income') {
    const colors = incomeData.map((val) => (val >= 0 ? 'green' : 'red'));
    data = {
      labels: labels,
      datasets: [
        {
          label: 'Net Income',
          data: incomeData,
          backgroundColor: colors,
        },
      ],
    };
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: { x: { stacked: false }, y: { stacked: false, beginAtZero: true } },
  };

  return (
    <div>
      <div className='p-4 border-y border-gray-300'>
        <div className='flex flex-col justify-center items-center uppercase mx-6 mb-3'>
          <div>
            <span className='font-mono text-xl text-green-600'>
              {filterReport === 'Net Income'
                ? totalIncome - totalExpense
                : totalIncome}{' '}
              {selected.baseSelection.code}
            </span>
          </div>
          <div className='font-lato text-base font-bold text-[rgba(0,0,0,0.87)]'>
            {filterReport === 'Net Income'
              ? 'Total Net Income'
              : 'Total Income'}
          </div>
        </div>
        <div className='flex flex-col justify-center items-center uppercase  mx-6 '>
          <div>
            <span
              className={clsx(
                'font-mono text-xl text-green-600',
                totalExpense > 0 &&
                  filterReport !== 'Net Income' &&
                  ' text-red-600',
                filterReport === 'Net Income' &&
                  (totalIncome - totalExpense) / 2 < 0 &&
                  ' text-red-600'
              )}
            >
              {filterReport !== 'Net Income' && totalExpense > 0
                ? '-'
                : filterReport !== 'Net Income' &&
                  (totalIncome - totalExpense) / 2 > 0
                ? '-'
                : null}
              {filterReport === 'Net Income'
                ? (totalIncome - totalExpense) / 2
                : totalExpense}{' '}
              {selected.baseSelection.code}
            </span>
          </div>
          <div className='font-lato text-base font-bold text-[rgba(0,0,0,0.87)]'>
            {filterReport === 'Net Income'
              ? 'Average Net Income'
              : 'Total Expense'}
          </div>
        </div>
      </div>
      <div className='w-full h-[25rem] relative'>
        <Suspense fallback={<div>Loading chart...</div>}>
          <Bar data={data} options={options} />
        </Suspense>
      </div>
    </div>
  );
};

export default ReportChart;
