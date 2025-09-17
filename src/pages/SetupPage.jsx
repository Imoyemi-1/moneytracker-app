import { FaCogs } from 'react-icons/fa';
import MainPage from '../setupPage/MainPage';
import FinishSetup from '../setupPage/FinishSetup';

const SetupPage = () => {
  return (
    <div className='pt-4 bg-white max-w-[700px] m-auto '>
      <header>
        <h2 className='flex items-center space-x-2 mx-3.5 mb-3.5'>
          <FaCogs className='text-5xl' />
          <span className='pl-2.5 align-middle text-2xl font-Roboto '>
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
