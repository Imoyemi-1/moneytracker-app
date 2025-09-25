import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { MdOutlineEdit } from 'react-icons/md';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import clsx from 'clsx';
import Modal from '../components/Modal';
import ModalTransaction from '../components/ModalTransaction';
import { useDropdown } from '../contexts/Setup';
import { DashboardContext } from '../contexts/DashboardContext';
import NewTransactions from './NewTransactions';

const TransactionSection = ({ transactions }) => {
  // get app states details with context
  const {
    isEditMode,
    setIsEditMode,
    setTransactionToEdit,
    setActiveTab,
    allAccounts,
  } = useContext(AppContext);

  const { setAccountTransactionEdit } = useDropdown();
  const { setAmtCodeEdit, setAmount1, setNote } = useContext(DashboardContext);

  // set edit form modal with transaction details

  const startEditing = (list) => {
    // Added transaction details to TransactionToEdit states
    setTransactionToEdit(list);

    // Put app in edit
    setIsEditMode(true);
    setNote(list.note);
    // Set nav tag to  transaction type
    setActiveTab(list.type);

    // set transaction account details to form account selection
    setAccountTransactionEdit(
      list.accountTransactionInfo[0]?.id,
      list.accountTransactionInfo[1]?.id,
      list.tags
    );

    // set amount code details to form amount code selection
    setAmtCodeEdit(
      list.accountTransactionInfo[0]?.code,
      list.accountTransactionInfo[1]?.code
    );

    setAmount1(list.accountTransactionInfo[0]?.amount);
  };

  // display transaction list to dom
  const transactionList = transactions
    .slice()
    .reverse()
    .map((list) => {
      // format date to show just day and short month
      const dateStr = list.date;
      const [y, m, d] = dateStr.split('-');
      const date = new Date(+y, +m - 1, +d);
      const day = date.getDate();
      const month = date.toLocaleDateString('en', { month: 'short' });

      // return transaction list div
      return (
        <div
          key={list.id}
          className='px-3.5 py-2.5 border-b border-gray-300 grid grid-cols-[1fr_1fr_auto] text-sm'
        >
          {/* Display formatted date */}
          <div className='text-gray-500 whitespace-nowrap flex items-center'>
            {day} {month}
          </div>

          {/* display account name ,tags and note */}
          <div className='flex row-start-2 col-span-3 items-center mt-1.5'>
            {
              allAccounts.find(
                (acc) => acc.id === list.accountTransactionInfo[0]?.id
              )?.name
            }
            {list.tags.length > 0 ||
            list.note ||
            allAccounts.find(
              (acc) => acc.id === list.accountTransactionInfo[1]?.id
            )?.name ? (
              list.type === 'income' ? (
                <FaArrowLeft className='text-gray-500 mx-1.5' />
              ) : (
                <FaArrowRight className='text-gray-500 mx-1.5' />
              )
            ) : null}
            {list.accountTransactionInfo[1]
              ? allAccounts.find(
                  (acc) => acc.id === list.accountTransactionInfo[1]?.id
                )?.name
              : null}
            {list.tags.map((tag, index) => (
              <div
                className='tag text-[0.75rem] mx-0.5  bg-gray-300 py-1 px-2.5 rounded text-gray-600'
                key={index}
              >
                {tag}
              </div>
            ))}
            {list.note && (
              <span className='pl-1.5 text-gray-400'>{list.note}</span>
            )}
          </div>

          {/*  display amount and code info */}
          <div
            className={clsx(
              'flex items-center justify-end font-mono',
              list.type === 'expense' && 'text-red-600',
              list.type === 'income' && 'text-green-600',
              list.type === 'transfer' && 'text-gray-500'
            )}
          >
            <span>
              {list.type === 'expense'
                ? '-'
                : list.type === 'income'
                ? '+'
                : null}
              {list.accountTransactionInfo[0]?.amount.toFixed(2)}{' '}
              {list.accountTransactionInfo[0]?.code}
            </span>{' '}
            {list.accountTransactionInfo[1]?.code !==
            list.accountTransactionInfo[0]?.code ? (
              <>
                {list.type === 'transfer' && (
                  <FaArrowRight className=' mx-1.5' />
                )}
                <span>
                  {list.accountTransactionInfo[1]?.amount.toFixed(2)}{' '}
                  {list.accountTransactionInfo[1]?.code}
                </span>
              </>
            ) : null}
          </div>
          <div className=''>
            {/*  add edit button to edit  transactions */}
            <button
              onClick={() => {
                startEditing(list);
              }}
              disabled={
                allAccounts.find(
                  (acc) =>
                    acc.id === list.accountTransactionInfo[1]?.id ||
                    acc.id === list.accountTransactionInfo[0]?.id
                )?.isArchived
              }
              className='group ml-3 p-[0.5645rem] rounded-full border border-gray-200 hover:border-gray-400 duration-300 transition-colors active:scale-95 cursor-pointer disabled:border-0 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <MdOutlineEdit className='font-bold text-lg text-gray-500 group-hover:text-gray-700 ' />
            </button>
          </div>
        </div>
      );
    });
  if (!transactions) return null;
  return (
    <>
      {transactions.length > 0 ? (
        transactionList
      ) : (
        <div className='px-3.5 text-sm min-h-12.5 flex items-center border-b border-gray-300'>
          No transactions found.
        </div>
      )}
      {isEditMode && (
        <Modal content={<ModalTransaction content={<NewTransactions />} />} />
      )}
    </>
  );
};

export default TransactionSection;
