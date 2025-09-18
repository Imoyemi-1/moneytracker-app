import { IoMdArrowDropdown } from 'react-icons/io';

const TransactionAmtField = () => {
  return (
    <div className='flex'>
      <input
        className='border w-full text-end border-gray-200 rounded px-3.5 py-1.5 rounded-tr-none rounded-br-none outline-0 focus:border focus:border-blue-200'
        type='number'
        step='0.01'
        required
      />
      <div className='relative flex items-center text-sm font-mono gap-2 bg-gray-200 rounded px-3 py-1.5 rounded-tl-none rounded-bl-none'>
        <span>USD</span>
        <IoMdArrowDropdown className='text-base' />
        <ul className='hidden absolute min-w-full left-0 top-full rounded bg-white border border-gray-200 z-10 tran-menu'>
          <li className='py-2 flex justify-center whitespace-nowrap hover:bg-gray-100'>
            USD
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TransactionAmtField;
