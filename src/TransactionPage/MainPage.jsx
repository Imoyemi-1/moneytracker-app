import { ImPlus, ImCross } from 'react-icons/im';
import { FaCalendar, FaFilter, FaCreditCard, FaTag } from 'react-icons/fa';
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
import NewTransactions from '../dashboardPage/NewTransactions';
import FilterTransactionForm from './FilterTransactionForm';

const MainPage = () => {
  const {
    setIsNewTransaction,
    isNewTransaction,
    rates,
    isFilterTransaction,
    setIsFilterTransaction,
    appliedTransactionFilter,
    setAppliedTransactionFilter,
  } = useContext(AppContext);
  const { selected, defaultTransactionFilter } = useDropdown();

  // use and close dropdown is it clicked out
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // time range to filter transaction display by date
  const [transactionDisplayedTime, setTransactionDisplayedTime] =
    useState('Last 7 days');

  useEffect(() => {
    // close dropdown if click out of dropdown
    const handleClickOutside = (e) =>
      dropdownRef.current && !dropdownRef.current.contains(e.target)
        ? setIsOpen(false)
        : null;
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  //  time range list to display and filter displayed transaction
  const filterList = [
    'Today',
    'Yesterday',
    'Last 7 days',
    'Last 30 days',
    'This month',
    'Custom date',
  ];

  // dropdown list for selecting time range
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

  // get and filtering transactions with date range
  const transactions = useLiveQuery(async () => {
    const [start, end] = getDateRange(transactionDisplayedTime);

    if (!start || !end) return db.transactions.toArray();

    //  filtering transactions with date range
    return db.transactions
      .filter((list) => list.date >= start && list.date <= end)
      .toArray();
  }, [transactionDisplayedTime]);

  if (!transactions || !rates) return;

  // total amount of the expense display
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

  // total amount of the income  display
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

  // remove total expense from total income to display
  const totalReminder =
    addTotalNum(totalIncomeAmountArr) - addTotalNum(totalExpenseAmountArr);

  return (
    <>
      <main className='text-sm'>
        <div className='border-b border-gray-300 flex text-gray-500 *:whitespace-nowrap'>
          {/* button to display  add new transaction modal from transaction page  */}
          <button
            onClick={() => setIsNewTransaction(true)}
            className=' flex items-center justify-center  relative pl-14 pr-5 py-2 flex-[1_0_auto] hover:text-gray-800 duration-200 transition-colors cursor-pointer'
          >
            <i className='absolute h-full  left-0 bg-gray-100  w-9 text-center flex items-center justify-center'>
              <ImPlus className='text-[0.755rem] ' />
            </i>
            New
          </button>
          {/* display container for selection and selected time range*/}
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
            {/* dropdown list to display time range list */}
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
          {/*  filtering transaction with tags and accounts */}
          <button
            onClick={() => {
              defaultTransactionFilter();
              setIsFilterTransaction(true);
            }}
            className='flex-[1_0_auto] p-2.5 flex items-center justify-center border-l border-gray-300 hover:text-gray-800 duration-200 transition-colors cursor-pointer'
          >
            <FaFilter />
          </button>
        </div>
        {/* transactions filters applied tags */}
        {appliedTransactionFilter.accountFilter.length <= 0 &&
        appliedTransactionFilter.tagsFilter <= 0 ? null : (
          <div className='px-3 py-3 border-b border-gray-300 bg-gray-100 shadow-[inset_0_1px_1px_0_rgba(34,36,38,0.15)] flex flex-wrap'>
            {appliedTransactionFilter.accountFilter.map((acc) => (
              <div
                className='tag flex  w-fit  m-[0.185rem] items-center text-[0.75rem] whitespace-normal align-top  py-[0.187rem] px-2 h-fit text-black/60 bg-[#e8e8e8]  rounded'
                key={acc.id}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  const removeBtn = e.target.closest('.removeBtn');
                  removeBtn
                    ? setAppliedTransactionFilter((prev) => ({
                        ...prev,
                        accountFilter: prev.accountFilter.filter(
                          (list) => list.id !== acc.id
                        ),
                      }))
                    : null;
                }}
              >
                <FaCreditCard className='text-[0.813rem] mr-2.5' />
                <span className='mb-1 mr-1.5'>{acc.name}</span>
                <ImCross className='removeBtn text-gray-400 text-[0.55rem]  hover:text-gray-600 active:scale-95 cursor-pointer' />
              </div>
            ))}
            {appliedTransactionFilter.tagsFilter.map((tag) => (
              <div
                className='tag flex  w-fit  m-[0.185rem] items-center text-[0.75rem] whitespace-normal align-top  py-[0.187rem] px-2 h-fit text-black/60 bg-[#e8e8e8]  rounded'
                key={tag}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  const removeBtn = e.target.closest('.removeBtn');
                  removeBtn
                    ? setAppliedTransactionFilter((prev) => ({
                        ...prev,
                        tagsFilter: prev.tagsFilter.filter((t) => t !== tag),
                      }))
                    : null;
                }}
              >
                <FaTag className='text-[0.813rem] mr-2.5' />
                <span className='mb-1 mr-1.5'>{tag}</span>
                <ImCross className='removeBtn text-gray-400 text-[0.55rem]  hover:text-gray-600 active:scale-95 cursor-pointer' />
              </div>
            ))}
          </div>
        )}
        {/*  rendering filtered account to page */}
        <TransactionSection transactions={transactions} />

        {/*  table to display today income and expense display */}
        <div>
          <table className='table table-fixed text-base w-full bg-white '>
            <tbody className='table-row-group align-middle '>
              {/* display total income display filter transactions displayed*/}
              <tr className='border-b border-gray-200  table-row align-middle  '>
                <td className='td-ui'>Total income</td>
                <td className='td-ui text-right font-mono'>
                  <span className='text-green-600'>
                    {addTotalNum(totalIncomeAmountArr).toFixed(2)}{' '}
                    {selected.baseSelection.code}
                  </span>
                </td>
              </tr>
              {/* display total expense filter transactions displayed*/}
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
              {/* display total  reminder from expense and income transactions*/}
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

      {/* display add new transaction modal when click add new  to add transaction*/}
      {isNewTransaction && (
        <Modal
          content={
            <ModalTransaction content={<NewTransactions ref={null} />} />
          }
        />
      )}

      {/* dispay filter transaction modal to filter by account and tags */}
      {isFilterTransaction && (
        <Modal
          content={<ModalTransaction content={<FilterTransactionForm />} />}
        />
      )}
    </>
  );
};

export default MainPage;
