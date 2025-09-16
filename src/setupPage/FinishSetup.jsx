import { useLiveQuery } from 'dexie-react-hooks';
import db from '../db/data';
import { useNavigate } from 'react-router';
import { useAsideBar } from '../contexts/aside';
import AccountWidget from '../components/AccountWidget';

const FinishSetup = () => {
  const { setSetupComplete } = useAsideBar();
  const accounts = useLiveQuery(() => db.accounts.toArray(), []);
  const navigate = useNavigate();

  // handle route index so dashboard become index when setup is completed

  const handleSetupComplete = async () => {
    await db.settings.put({ key: 'setupComplete', value: true });
    setSetupComplete(true);
    navigate('/');
  };

  return (
    <>
      {accounts?.length > 0 && (
        <div>
          <div className='m-4 mb-0 border-t border-gray-300 '>
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
