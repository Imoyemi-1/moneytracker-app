import { ImPlus } from 'react-icons/im';
import { FaCalendar, FaFilter } from 'react-icons/fa';
import clsx from 'clsx';
import { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '../contexts/AppContext';
import Modal from '../components/Modal';
import ModalTransaction from '../components/ModalTransaction';
import { getDateRange, getDateRangeLabel } from '../utils/dateUtils';
import { useLiveQuery } from 'dexie-react-hooks';
import db from '../db/data';
import TransactionSection from '../dashboardPage/TransactionSection';
import { convertCurrency, addTotalNum } from '../hooks/useExchangeRates';
import { useDropdown } from '../contexts/Setup';

const MainPage = () => {
  const { setIsNewTransaction, isNewTransaction, rates } =
    useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [transactionDisplayedTime, setTransactionDisplayedTime] =
    useState('Last 7 days');
  const { selected } = useDropdown();
  //
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) =>
      dropdownRef.current && !dropdownRef.current.contains(e.target)
        ? setIsOpen(false)
        : null;
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  //
  const filterList = [
    'Today',
    'Yesterday',
    'Last 7 days',
    'Last 30 days',
    'This month',
    'Custom date',
  ];

  //
  const dropDownList = filterList.map((list) => (
    <li
      key={list}
      onClick={() => setTransactionDisplayedTime(list)}
      className={clsx(
        'cursor-pointer text-black/85 px-4 py-2 hover:bg-gray-100 duration-300 transition-all ease-linear',
        list === transactionDisplayedTime && 'bg-gray-100 font-medium'
      )}
    >
      {list}
    </li>
  ));

  //
  const transactions = useLiveQuery(async () => {
    const [start, end] = getDateRange(transactionDisplayedTime);

    if (!start || !end) return db.transactions.toArray();

    return db.transactions
      .filter((list) => list.date >= start && list.date <= end)
      .toArray();
  }, [transactionDisplayedTime]);

  if (!transactions || !rates) return;

  const totalExpenseAmountArr = transactions
    .filter((tnx) => tnx.type === 'expense')
    .map(
      (list) =>
        convertCurrency(
          list?.accountTransactionInfo[0]?.amount,
          list?.accountTransactionInfo[0]?.code,
          selected.baseSelection.code,
          rates
        ) || 0
    );

  const totalIncomeAmountArr = transactions
    .filter((tnx) => tnx.type === 'income')
    .map(
      (list) =>
        convertCurrency(
          list?.accountTransactionInfo[0]?.amount,
          list?.accountTransactionInfo[0]?.code,
          selected.baseSelection.code,
          rates
        ) || 0
    );

  const totalReminder =
    addTotalNum(totalIncomeAmountArr) - addTotalNum(totalExpenseAmountArr);
  return (
    <>
      <main className='text-sm'>
        <div className='border-b border-gray-300 flex text-gray-500 *:whitespace-nowrap'>
          {/*  */}
          <button
            onClick={() => setIsNewTransaction(true)}
            className=' flex items-center justify-center  relative pl-14 pr-5 py-2 flex-[1_0_auto] hover:text-gray-800 duration-200 transition-colors cursor-pointer'
          >
            <i className='absolute h-full  left-0 bg-gray-100  w-9 text-center flex items-center justify-center'>
              <ImPlus className='text-[0.755rem] ' />
            </i>
            New
          </button>
          {/*  */}
          <div
            onClick={() => setIsOpen((prev) => !prev)}
            className={clsx(
              ' relative flex items-center flex-[1_0_auto] border-l  border-gray-300 pl-14 pr-5 py-2 hover:text-gray-800 duration-200 transition-colors cursor-pointer',
              isOpen && 'text-gray-800 bg-gray-100'
            )}
          >
            <span>{getDateRangeLabel(transactionDisplayedTime)}</span>
            <i
              className={clsx(
                'absolute h-full  left-0 bg-gray-100  w-9 text-center flex items-center justify-center',
                isOpen && 'bg-gray-200'
              )}
            >
              <FaCalendar />
            </i>
            {/*  */}
            <ul
              ref={dropdownRef}
              className={clsx(
                'absolute bg-white min-w-full left-0 top-full cursor-pointer rounded shadow shadow-gray-100 border border-gray-100',
                !isOpen && 'hidden '
              )}
            >
              {dropDownList}
            </ul>
          </div>
          {/*  */}
          <button className='flex-[1_0_auto] p-2.5 flex items-center justify-center border-l border-gray-300 hover:text-gray-800 duration-200 transition-colors cursor-pointer'>
            <FaFilter />
          </button>
        </div>

        {/*  */}
        <TransactionSection transactions={transactions} />

        {/*  */}
        <div>
          <table className='table table-fixed text-base w-full bg-white '>
            <tbody className='table-row-group align-middle '>
              <tr className='border-b border-gray-200  table-row align-middle  '>
                <td className='td-ui'>Total income</td>
                <td className='td-ui text-right font-mono'>
                  <span className='text-green-600'>
                    {addTotalNum(totalIncomeAmountArr).toFixed(2)}{' '}
                    {selected.baseSelection.code}
                  </span>
                </td>
              </tr>
              <tr className='border-b border-gray-200  table-row align-middle  '>
                <td className='td-ui'>Total expense</td>
                <td className='td-ui text-right font-mono'>
                  <span
                    className={clsx({
                      'text-green-600': addTotalNum(totalExpenseAmountArr) <= 0,
                      'text-red-600': addTotalNum(totalExpenseAmountArr) > 0,
                    })}
                  >
                    {addTotalNum(totalExpenseAmountArr) <= 0 ? null : '-'}
                    {addTotalNum(totalExpenseAmountArr).toFixed(2)}{' '}
                    {selected.baseSelection.code}
                  </span>
                </td>
              </tr>
              <tr className='border-b border-gray-200  table-row align-middle  '>
                <td className='td-ui'></td>
                <td className='td-ui text-right font-mono'>
                  <span
                    className={clsx({
                      'text-green-600': totalReminder >= 0,
                      'text-red-600': totalReminder < 0,
                    })}
                  >
                    {totalReminder.toFixed(2)} {selected.baseSelection.code}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      {isNewTransaction && <Modal content={<ModalTransaction />} />}
    </>
  );
};

export default MainPage;
