import { ImPlus } from 'react-icons/im';
import AccountWidget from '../components/AccountWidget';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import Modal from '../components/Modal';
import ModalTransaction from '../components/ModalTransaction';
import AccountForm from '../setupPage/AccountForm';
import { useAsideBar } from '../contexts/aside';
import ConfirmAccountDeletion from './ConfirmAccountDeletion';
import clsx from 'clsx';

const MainPage = () => {
  const {
    setIsNewAccount,
    isNewAccount,
    isEditAccountMode,
    isConfirmAccountDelete,
    accounts,
  } = useContext(AppContext);
  const { setupComplete } = useAsideBar();
  return (
    <>
      <main className='text-sm md:mx-1  gap-x-5 xl:bg-white xl:max-w-[60rem] xl:mx-auto xl:my-4.5 xl:rounded xl:shadow-[0_2px_4px_0_rgba(34,36,38,0.12),0_2px_10px_0_rgba(34,36,38,0.15)]'>
        <div
          className={clsx(
            'md:bg-gray-50  md:rounded-tl md:rounded-tr md:p-4',
            accounts.length === 0 && 'border-b  border-gray-300'
          )}
        >
          <div className='text-sm flex text-gray-500 *:whitespace-nowrap  bg-white md:max-w-[22.5rem] md:border md:rounded md:shadow-[0_1px_2px_0_rgba(34,36,38,0.15)] border-gray-300 w-fit border-r-0'>
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
        </div>
        <AccountWidget isDashboard={false} />
      </main>
      {isNewAccount || (isEditAccountMode && setupComplete) ? (
        <Modal
          content={
            <ModalTransaction
              content={
                <div className='p-3.5'>
                  {isConfirmAccountDelete ? (
                    <ConfirmAccountDeletion />
                  ) : (
                    <AccountForm />
                  )}
                </div>
              }
            />
          }
        />
      ) : null}
    </>
  );
};

export default MainPage;
