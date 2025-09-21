import { MdDelete } from 'react-icons/md';
import { FaRegFile } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import NewTransactions from '../dashboardPage/NewTransactions';
import { useContext } from 'react';
import { DashboardContext } from '../contexts/DashboardContext';
import { useDeleteTransactions } from '../hooks/useAccount';
import { AppContext } from '../contexts/AppContext';

const ModalTransaction = () => {
  // display edit or add new transaction component to modal
  const { resetStateEdit } = useContext(DashboardContext);
  const { transactionToEdit, rates } = useContext(AppContext);
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
        <FaRegFile className='text-3xl px-1' />
        <h3 className='font-roboto text-lg pl-2.5 font-medium'>
          Edit Transaction
        </h3>
      </div>
      {/* transaction save component*/}
      <NewTransactions />

      {/* delete transaction button div container*/}
      <div className='flex justify-end p-3.5 pb-0 bg-gray-100 rounded'>
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
      </div>
    </div>
  );
};

export default ModalTransaction;
