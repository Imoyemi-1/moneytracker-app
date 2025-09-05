import clsx from 'clsx/lite';

const Dropdown = ({ isFocused, data }) => {
  return (
    // Todo: add accessibility to jsx later
    <ul
      className={clsx(
        'dropdown absolute -left-[1px] top-[37px] border w-[calc(100%+2px)] order-2 flex-grow flex-shrink-0 basis-full text-sm max-h-[7rem] overflow-y-scroll scroll-auto border-blue-200  rounded border-t-0 rounded-tl-none rounded-tr-none z-10 bg-white shadow-[0_1.5px_0_rgba(0,0,0,0.05)]',

        // toggle dropdown display if input is focused
        !isFocused && 'hidden'
      )}
    >
      {/* Todo: add real data to todo later */}
      <li className='px-4 py-2 border-t border-gray-50 cursor-pointer'>
        House
      </li>
      <li className='px-4 py-2 border-t border-gray-50'>CVE</li>
      <li className='px-4 py-2 border-t border-gray-50'>Books</li>
      <li className='px-4 py-2 border-t border-gray-50'>Drinks</li>
      <li className='px-4 py-2 border-t border-gray-50'>Bags</li>
    </ul>
  );
};

export default Dropdown;
