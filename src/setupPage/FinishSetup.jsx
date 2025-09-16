import { useLiveQuery } from 'dexie-react-hooks';
import db from '../db/data';
import { useDropdown } from '../contexts/Setup';
import { MdOutlineEdit } from 'react-icons/md';
import clsx from 'clsx';
import { getTotalAmt } from '../hooks/useExchangeRates';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAsideBar } from '../contexts/aside';

// group account by there type
function groupByType(accounts) {
  return accounts.reduce((groups, acc) => {
    if (!groups[acc.type]) groups[acc.type] = [];
    groups[acc.type].push(acc);
    return groups;
  }, {});
}

const FinishSetup = () => {
  const { selected } = useDropdown();
  const { setSetupComplete } = useAsideBar();
  const accounts = useLiveQuery(() => db.accounts.toArray(), []);
  const [rates, setRates] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // get rate from storage and fetch from api if no rate in storage or time up
    const fetchRate = async () => {
      const cached = await db.exchangeRates.get('latestRates');
      const now = Date.now();

      if (!cached || now > new Date(cached.nextUpdate).getTime()) {
        const res = await fetch(
          'https://v6.exchangerate-api.com/v6/eb7e378c2f0c2d0d8b6d630b/latest/USD'
        );
        const data = await res.json();

        await db.exchangeRates.put({
          id: 'latestRates',
          base: 'USD',
          data: data.conversion_rates,
          lastFetchedAt: Date.now(),
          nextUpdate: data.time_update_utc,
        });

        setRates(data.conversion_rates);
      } else {
        setRates(cached.data);
      }
    };
    fetchRate();
  }, []);

  // handle route index so dashboard become index when setup is completed

  const handleSetupComplete = async () => {
    await db.settings.put({ key: 'setupComplete', value: true });
    setSetupComplete(true);
    navigate('/');
  };

  if (!accounts) return;

  const grouped = groupByType(accounts);

  return (
    accounts.length > 0 && (
      <div>
        <div className='m-4 mb-0 border-t border-gray-300 '>
          {Object.entries(grouped).map(([type, accList], index) => {
            const totalAmount = rates
              ? getTotalAmt(
                  accList,
                  selected.baseSelection.code,
                  rates
                ).toFixed(2)
              : null;

            return (
              <div key={index}>
                <div
                  onClick={(e) =>
                    e.currentTarget.nextElementSibling.classList.toggle(
                      'hidden'
                    )
                  }
                  className='border-b border-gray-300 bg-gray-50 flex justify-between  py-3 px-4 cursor-pointer'
                >
                  <span className='font-medium'>{type}</span>
                  <span
                    className={clsx(
                      'font-mono',
                      totalAmount >= 0 && 'text-green-600',
                      totalAmount < 0 && 'text-red-500'
                    )}
                  >
                    {totalAmount} {selected.baseSelection.code}
                  </span>
                </div>
                <div>
                  {accList.map((acc) => (
                    <div
                      key={acc.id}
                      className='flex border-b border-gray-300 '
                    >
                      <p className='flex-1 text-blue-400 p-2 pl-4'>
                        {acc.name}
                      </p>
                      <div className='py-2 px-4'>
                        {acc.currencies
                          .filter((cur) => cur.enabled)
                          .map((cur, index) => (
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
              </div>
            );
          })}
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
