import { FaCogs } from 'react-icons/fa';
import MainPage from '../setupPage/MainPage';
import FinishSetup from '../setupPage/FinishSetup';

const SetupPage = () => {
  return (
    <div className='pt-4 bg-white max-w-[700px] md:mx-auto  md:my-4 md:rounded md:shadow-[0_2px_4px_0_rgba(34,36,38,0.12),0_2px_10px_0_rgba(34,36,38,0.15)] md:border border-gray-300 '>
      <header>
        <h2 className='flex items-center  ml-3.5 mb-3.5'>
          <FaCogs className='w-11 h-9' />
          <span className='pl-2.5 align-middle text-2xl  font-roboto'>
            Money Tracker Setup
          </span>
        </h2>
      </header>
      <MainPage />
      <FinishSetup />
    </div>
  );
};

export default SetupPage;
