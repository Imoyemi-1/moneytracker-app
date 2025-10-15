import { FaHourglassHalf } from 'react-icons/fa6';

const BudgetPage = () => {
  return (
    <div className='md:max-w-[calc(100%-7.8rem)] md:ml-[7.8rem] md:mt-3.5 md:px-1.5'>
      <div className='flex items-center w-full max-w-[60rem] mx-auto px-4 py-4.5 rounded shadow-[inset_0_0_0_1px_rgba(34,36,38,0.22),0_0_0_0_transparent] bg-[#f8f8f9]'>
        <FaHourglassHalf className='text-5xl opacity-[0.8] mr-7' />
        <div className='flex-1 '>
          <div className='text-lg font-bold '>Work in Progress</div>
          <p>This page is not ready yet, check back later 😉</p>
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;
