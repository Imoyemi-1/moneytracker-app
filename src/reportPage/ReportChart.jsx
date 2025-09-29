import { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { AppContext } from '../contexts/AppContext';
import { getYear, getMonth } from 'date-fns';
import { convertCurrency } from '../hooks/useExchangeRates';
import { useDropdown } from '../contexts/Setup';
import clsx from 'clsx';

const ReportChart = ({ formatDate, viewType }) => {
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

  let filteredTransaction = transactions.filter((tx) => {
    const txDate = new Date(tx.date);
    return getYear(txDate).toString() === formatDate();
  });

  if (viewType === 'Monthly') {
    filteredTransaction = transactions.filter((tx) => {
      const txDate = new Date(tx.date);

      return (
        `${monthsNameArr[getMonth(txDate).toString()]} ${getYear(
          txDate
        ).toString()}` === formatDate()
      );
    });
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
  let labels = monthsNameArr;
  let incomeData = [];
  let expenseData = [];

  //
  incomeData = Array(12).fill(0);
  expenseData = Array(12).fill(0);

  //
  const data = {
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

  const options = {
    responsive: true,
    scales: { x: { stacked: false }, y: { stacked: false, beginAtZero: true } },
  };

  return (
    <div>
      <div className='p-4 border-y border-gray-300'>
        <div className='flex flex-col justify-center items-center uppercase mx-6 mb-3'>
          <div>
            <span className='font-mono text-xl text-green-600'>
              {totalIncome} {selected.baseSelection.code}
            </span>
          </div>
          <div className='font-lato text-base font-bold text-[rgba(0,0,0,0.87)]'>
            Total Income
          </div>
        </div>
        <div className='flex flex-col justify-center items-center uppercase  mx-6 '>
          <div>
            <span
              className={clsx(
                'font-mono text-xl text-red-600',
                totalExpense === 0 && 'text-green-600'
              )}
            >
              {totalExpense > 0 && '-'}
              {totalExpense} {selected.baseSelection.code}
            </span>
          </div>
          <div className='font-lato text-base font-bold text-[rgba(0,0,0,0.87)]'>
            Total Expense
          </div>
        </div>
      </div>
      <div className='w-full'>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ReportChart;
