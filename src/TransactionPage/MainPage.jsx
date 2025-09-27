import { ImPlus, ImCross } from 'react-icons/im';
import { FaCalendar, FaFilter, FaCreditCard, FaTag } from 'react-icons/fa';
import clsx from 'clsx';
import { useContext, useState, useRef } from 'react';
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
import FilterDropDown from './FilterDropDown';

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
      onMouseDown={(e) => {
        e.stopPropagation();
        setTransactionDisplayedTime(list);
        setIsOpen(false);
      }}
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

    return (
      db.transactions
        //  filtering transactions with date range
        .filter((list) => list.date >= start && list.date <= end)
        //  filter by account
        .filter(
          (list) =>
            appliedTransactionFilter.accountFilter.length === 0 ||
            appliedTransactionFilter.accountFilter.some(
              (acc) =>
                list.accountTransactionInfo[0]?.id === acc.id ||
                list.accountTransactionInfo[1]?.id === acc.id
            )
        )
        //  filter by  tags
        .filter(
          (list) =>
            appliedTransactionFilter.tagsFilter.length === 0 ||
            appliedTransactionFilter.tagsFilter.some((tag) =>
              list.tags.includes(tag)
            )
        )
        .toArray()
    );
  }, [
    transactionDisplayedTime,
    appliedTransactionFilter.tagsFilter.length,
    appliedTransactionFilter.accountFilter.length,
  ]);

  if (!transactions) return null;

  // total amount of the expense display
  const totalExpenseAmountArr = transactions
    .filter((tnx) => tnx.type === 'expense')
    .map(
      (list) =>
        convertCurrency(
          list?.accountTransactionInfo[0]?.amount,
          list?.accountTransactionInfo[0]?.code,
          selected.baseSelection.code,
          rates || {}
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
    addTotalNum(totalIncomeAmountArr) - addTotalNum(totalExpenseAmountArr) ?? 0;

  return (
    <>
      <main className='text-sm md:mx-1  gap-x-5 xl:bg-white xl:max-w-[60rem] xl:mx-auto xl:my-4.5 xl:rounded xl:shadow-[0_2px_4px_0_rgba(34,36,38,0.12),0_2px_10px_0_rgba(34,36,38,0.15)]'>
        <div className='md:bg-gray-50 md:rounded-tl md:rounded-tr md:p-4 md:border-b border-gray-300'>
          <div className='border-b border-gray-300 flex text-gray-500 *:whitespace-nowrap bg-white md:max-w-[22.5rem] md:border md:rounded md:shadow-[0_1px_2px_0_rgba(34,36,38,0.15)]'>
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
              onMouseDown={(e) => {
                e.stopPropagation();
                setIsOpen((prev) => !prev);
              }}
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
              <FilterDropDown
                ref={dropdownRef}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                dropDownList={dropDownList}
              />
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
        <div className='w-full border-t border-gray-300'>
          <table className='table table-fixed text-base w-full  md:max-w-1/2 ml-auto'>
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
              <tr className='  table-row align-middle  '>
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
