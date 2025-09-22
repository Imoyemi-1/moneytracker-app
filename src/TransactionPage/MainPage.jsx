import { ImPlus } from 'react-icons/im';
import { FaCalendar, FaFilter } from 'react-icons/fa';
import clsx from 'clsx';
import { useContext, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import Modal from '../components/Modal';
import ModalTransaction from '../components/ModalTransaction';
import { getDateRangeLabel } from '../utils/dateUtils';

const MainPage = () => {
  const { setIsNewTransaction, isNewTransaction } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [transactionDisplayedTime, setTransactionDisplayedTime] =
    useState('Last 7 days');
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
      </main>
      {isNewTransaction && <Modal content={<ModalTransaction />} />}
    </>
  );
};

export default MainPage;
