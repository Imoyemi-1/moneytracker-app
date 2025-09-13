import { useLiveQuery } from 'dexie-react-hooks';
import db from '../db/data';
import { useDropdown } from '../contexts/Setup';
import { MdOutlineEdit } from 'react-icons/md';
import clsx from 'clsx';

// group account by there type
function groupByType(accounts) {
  return accounts.reduce((groups, acc) => {
    if (!groups[acc.type]) groups[acc.type] = [];
    groups[acc.type].push(acc);
    return groups;
  }, {});
}

// handle route index so dashboard become index when setup is completed

const handleSetupComplete = async () => {
  await db.settings.put({ key: 'setupComplete', value: true });
};

const FinishSetup = () => {
  const { selected } = useDropdown();
  const accounts = useLiveQuery(() => db.accounts.toArray(), []);

  if (!accounts) return;

  const grouped = groupByType(accounts);

  return (
    accounts.length > 0 && (
      <div className=''>
        <div className='m-4 mb-0 border-t border-gray-300 '>
          {Object.entries(grouped).map(([type, accList], index) => (
            <div key={index}>
              <div className='border-b border-gray-300 bg-gray-100 flex justify-between py-3 px-4'>
                <span className='font-medium'>{type}</span>
                <span className='font-mono'>
                  0.00 {selected.baseSelection.code}
                </span>
              </div>
              {accList.map((acc) => (
                <div key={acc.id} className='flex border-b border-gray-300 '>
                  <p className='flex-1 text-blue-400 p-2 pl-4'>{acc.name}</p>
                  <div className='py-2 px-4'>
                    {acc.currencies.map((cur, index) => (
                      <div
                        className={clsx(
                          'font-mono text-right whitespace-nowrap',
                          cur.amount >= 0 && 'text-green-600',
                          cur.amount < 0 && 'text-red-500'
                        )}
                        key={index}
                      >
                        {cur.amount.toFixed(2)} {cur.code}
                      </div>
                    ))}
                  </div>
                  <div className='p-3 pl-0 '>
                    <button className='group hover:border-gray-400 duration-300 transition-colors p-2 rounded-full border border-gray-200 cursor-pointer '>
                      <MdOutlineEdit className='group-hover:text-gray-600 text-xl text-gray-500 font-black' />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
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
    )
  );
};

export default FinishSetup;
