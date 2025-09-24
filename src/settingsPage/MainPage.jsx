import Section from '../dashboardPage/Section';
import CurrenciesForm from '../setupPage/CurrenciesForm';
import { FaFileAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const MainPage = () => {
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
              <button className='flex items-center text-gray-500 bg-gray-200 text-sm rounded py-2 px-5 hover:bg-gray-300 hover:text-gray-800 duration-200 transition-colors cursor-pointer'>
                <FaFileAlt className=' mr-1.5 ' />
                Export JSON File
              </button>
            </div>
          </div>
        }
      />
      {/*  */}
      <Section
        title='USER'
        sectionBody={
          <div className='border-t  border-gray-300 p-4'>
            {' '}
            <button className='relative  mr-1 text-sm bg-gray-200   text-gray-500 py-2 pr-14 pl-5 rounded hover:bg-gray-300 hover:text-gray-800 duration-200 transition-colors cursor-pointer '>
              <span className='absolute flex items-center  top-0 right-0 h-full bg-[rgba(0,0,0,0.05)] rounded rounded-tl-none rounded-bl-none text-sm  w-8.5 shadow-[inset_1px_0_0_0_transparent] '>
                <MdDelete className='text-lg m-auto ' />
              </span>
              Delete data
            </button>
          </div>
        }
      />
    </main>
  );
};

export default MainPage;
