import { MdDelete } from 'react-icons/md';
import { FaRegFile } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { useContext } from 'react';
import { DashboardContext } from '../contexts/DashboardContext';
import { useDeleteTransactions } from '../hooks/useAccount';
import { AppContext } from '../contexts/AppContext';
import clsx from 'clsx';

const ModalTransaction = ({ content }) => {
  // display edit or add new transaction component to modal
  const { resetStateEdit } = useContext(DashboardContext);
  const { transactionToEdit, rates, isEditMode, isFilterTransaction } =
    useContext(AppContext);
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className='relative bg-white h-fit w-full m-auto rounded'
    >
      {/* cancel icon to close modal */}
      <ImCross
        onClick={() => resetStateEdit()}
        className='absolute right-6 top-4.5 text-sm cursor-pointer text-gray-600 hover:text-gray-800 '
      />
      <div className='border-b border-gray-300 flex items-center py-2.5 pl-3.5 pr-8'>
        {isFilterTransaction ? null : <FaRegFile className='text-3xl px-1' />}
        <h3
          className={clsx(
            !isFilterTransaction && 'font-roboto text-lg pl-2.5 font-medium ',
            isFilterTransaction && 'font-lato text-xl font-bold'
          )}
        >
          {isEditMode
            ? 'Edit Transaction'
            : isFilterTransaction
            ? 'Filter transactions'
            : 'New Transaction'}
        </h3>
      </div>
      {/* content inside  component*/}
      {content}

      {/* delete transaction button div container*/}
      {isEditMode || isFilterTransaction ? (
        <div className='flex text-sm justify-end p-3.5 pb-0 bg-gray-100 rounded'>
          {isEditMode && (
            <button
              onClick={() => {
                useDeleteTransactions(transactionToEdit, rates);
                resetStateEdit();
              }}
              className='relative mb-3.5 ml-2.5 mr-1 text-sm bg-red-600 opacity-85 hover:opacity-100 duration-300 transition-opacity text-white py-2.5 pr-15 pl-5.5 rounded cursor-pointer'
            >
              <span className='absolute flex items-center  top-0 right-0 h-full rounded rounded-tl-none rounded-bl-none text-sm bg-red-700 w-8.5'>
                <MdDelete className='text-xl m-auto' />
              </span>
              Delete
            </button>
          )}
          {isFilterTransaction && (
            <>
              <button className='mb-3.5 mr-2 ml-2.5 py-2 px-5 bg-gray-300 rounded text-gray-500'>
                Reset
              </button>
              <button className='mb-3.5 mr-1 ml-2.5 py-2 px-5 bg-green-500 rounded text-white'>
                Apply
              </button>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default ModalTransaction;
