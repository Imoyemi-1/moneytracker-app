import Section from '../dashboardPage/Section';
import CurrenciesForm from '../setupPage/CurrenciesForm';
import { FaFileAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { deleteUserData } from '../hooks/useAccount';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { useState, useEffect, useRef } from 'react';
import db from '../db/data';

const MainPage = () => {
  const [open, setOpen] = useState(false);
  const tooltipRef = useRef(null);

  useEffect(() => {
    // close tooltip if click out of tooltip
    const handleClickOutside = (e) =>
      tooltipRef.current && !tooltipRef.current.contains(e.target)
        ? setOpen(false)
        : null;
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // download transaction as a json object
  const exportTransaction = async () => {
    const transactions = await db.transactions.toArray();
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(transactions, null, 2));

    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', 'transactions.json');
    link.click();
  };

  return (
    <main>
      {/*  */}
      <Section
        title='currency'
        sectionBody={
          <div className='border-t border-b border-gray-300 p-4'>
            {<CurrenciesForm />}
          </div>
        }
      />
      {/*  */}
      <Section
        title='data import'
        sectionBody={
          <div className='border-t border-b border-gray-300 p-4'>
            <div className='max-w-[42.5rem]'>
              <p className='mb-4 text-base'>
                Import transactions from a CSV file.
              </p>
              <button className='flex items-center text-gray-500 bg-gray-200 text-sm rounded py-2 px-5 hover:bg-gray-300 hover:text-gray-800 duration-200 transition-colors cursor-pointer'>
                <FaFileAlt className=' mr-1.5 ' />
                Open File
              </button>
            </div>
          </div>
        }
      />
      {/*  */}
      <Section
        title='data export'
        sectionBody={
          <div className='border-t border-b border-gray-300 p-4'>
            <div className='max-w-[42.5rem]'>
              <p className='mb-4 text-base'>
                Export transactions to a JSON file.
              </p>
              <button
                onClick={exportTransaction}
                className='flex items-center text-gray-500 bg-gray-200 text-sm rounded py-2 px-5 hover:bg-gray-300 hover:text-gray-800 duration-200 transition-colors cursor-pointer'
              >
                <FaFileAlt className=' mr-1.5 ' />
                Export JSON File
              </button>
            </div>
          </div>
        }
      />
      {/*  */}
      <div className='relative'>
        <Section
          title='USER'
          sectionBody={
            <div className='border-t  border-gray-300 p-4'>
              {' '}
              <button
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setOpen((prev) => !prev);
                }}
                className='relative  mr-1 text-sm bg-gray-200   text-gray-500 py-2 pr-14 pl-5 rounded hover:bg-gray-300 hover:text-gray-800 duration-200 transition-colors cursor-pointer '
              >
                <span className='absolute flex items-center  top-0 right-0 h-full bg-[rgba(0,0,0,0.05)] rounded rounded-tl-none rounded-bl-none text-sm  w-8.5 shadow-[inset_1px_0_0_0_transparent] '>
                  <MdDelete className='text-lg m-auto ' />
                </span>
                Delete data
              </button>
            </div>
          }
        />
        <ConfirmDeleteModal
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={deleteUserData}
          tooltipRef={tooltipRef}
        />
      </div>
    </main>
  );
};

export default MainPage;
