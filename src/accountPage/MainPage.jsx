import { ImPlus } from 'react-icons/im';
import AccountWidget from '../components/AccountWidget';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import Modal from '../components/Modal';
import ModalTransaction from '../components/ModalTransaction';
import AccountForm from '../setupPage/AccountForm';

const MainPage = () => {
  const { setIsNewAccount, isNewAccount } = useContext(AppContext);
  return (
    <>
      <main>
        <div className='text-sm border-b border-gray-300 flex text-gray-500 *:whitespace-nowrap'>
          {/* button to display  add new account modal from accounts page  */}
          <button
            onClick={() => setIsNewAccount(true)}
            className=' flex items-center justify-center  relative pl-14 pr-5.5 py-2 border-r border-gray-300 hover:text-gray-800 duration-200 transition-colors cursor-pointer'
          >
            <i className='absolute h-full  left-0 bg-gray-100  w-9 text-center flex items-center justify-center'>
              <ImPlus className='text-[0.755rem] ' />
            </i>
            New
          </button>
        </div>
        <AccountWidget isDashboard={false} />
      </main>
      {isNewAccount && (
        <Modal
          content={
            <ModalTransaction
              content={
                <div className='p-3.5'>
                  <AccountForm />
                </div>
              }
            />
          }
        />
      )}
    </>
  );
};

export default MainPage;
