import { ImPlus } from 'react-icons/im';
import { FaCalendar, FaFilter } from 'react-icons/fa';
import clsx from 'clsx';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import Modal from '../components/Modal';
import ModalTransaction from '../components/ModalTransaction';

const MainPage = () => {
  const { setIsNewTransaction, isNewTransaction } = useContext(AppContext);

  //
  const filterList = [
    'Today',
    'Yesterday',
    'Last 7 days',
    ' Last 30 days',
    'This month',
    'Custom date',
  ];
  //
  const dropDownList = filterList.map((list) => (
    <li
      key={list}
      className={clsx(
        'cursor-pointer text-black/85 px-4 py-2 hover:bg-gray-100 duration-300 transition-all ease-linear',
        list === 'Last 7 days' && 'bg-gray-100 font-medium'
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
          <div className=' relative flex items-center flex-[1_0_auto] border-l  border-gray-300 pl-14 pr-5 py-2 hover:text-gray-800 duration-200 transition-colors cursor-pointer'>
            <span>14 Sep — 21 Sep</span>
            <i className='absolute h-full  left-0 bg-gray-100  w-9 text-center flex items-center justify-center'>
              <FaCalendar />
            </i>
            {/*  */}
            <ul className='hidden absolute bg-white min-w-full left-0 top-full cursor-pointer shadow shadow-gray-100 border border-gray-100'>
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
