import db from '../db/data';
import AccountWidget from '../components/AccountWidget';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { useDropdown } from '../contexts/Setup';

const FinishSetup = () => {
  const { accounts } = useContext(AppContext);
  const { selected } = useDropdown();

  // handle route index so dashboard become index when setup is completed

  const handleSetupComplete = async () => {
    await db.settings.put({
      key: 'defaultCurrency',
      value: selected.baseSelection.code,
    });
    await db.settings.put({ key: 'setupComplete', value: true });

    window.location.reload();
  };

  return (
    <>
      {accounts?.length > 0 && (
        <div>
          <div className='m-4 mb-0 border-b border-gray-300 md:border md:border-t-0 md:rounded'>
            <AccountWidget />
          </div>
          <div className='flex justify-end p-4'>
            <button
              onClick={handleSetupComplete}
              className='bg-blue-800 py-2 px-5 text-white text-sm rounded mr-3.5 cursor-pointer hover:bg-blue-900 duration-300 transition-colors'
            >
              Finish
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FinishSetup;
