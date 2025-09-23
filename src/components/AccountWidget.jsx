import { useDropdown } from '../contexts/Setup';
import { MdOutlineEdit } from 'react-icons/md';
import { clsx } from 'clsx/lite';
import { getTotalAmt } from '../hooks/useExchangeRates';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

// group account by there type
function groupByType(accounts) {
  return accounts.reduce((groups, acc) => {
    if (!groups[acc.type]) groups[acc.type] = [];
    groups[acc.type].push(acc);
    return groups;
  }, {});
}

const AccountWidget = ({ isDashboard }) => {
  const { rates, accounts } = useContext(AppContext);

  const { selected } = useDropdown();

  if (!accounts) return;

  //   group each base of their type and check if its for dashboard to remove account that the show on dashboard is not enable

  const grouped = isDashboard
    ? groupByType(accounts.filter((acc) => acc.showOnDashboard))
    : groupByType(accounts);

  return (
    <>
      {/* map to each account to display account on their type */}
      {Object.entries(grouped).map(([type, accList], index) => {
        const totalAmount = rates
          ? getTotalAmt(accList, selected.baseSelection.code, rates).toFixed(2)
          : null;

        return (
          <div key={index}>
            {/* Toggle account body if section header  is click*/}
            <div
              onClick={(e) =>
                e.currentTarget.nextElementSibling.classList.toggle('hidden')
              }
              className='border-b border-gray-300 bg-gray-100 flex justify-between  py-3 px-4 cursor-pointer'
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
                <div key={acc.id} className='flex border-b border-gray-300 '>
                  <p className='flex-1 text-blue-500 p-2 pl-4'>{acc.name}</p>
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
                  {/* display edit button is its not on dashboard */}
                  {!isDashboard && (
                    <div className='p-3 pl-0 '>
                      <button className='group hover:border-gray-400 duration-300 transition-colors p-2 rounded-full border border-gray-200 cursor-pointer '>
                        <MdOutlineEdit className='group-hover:text-gray-600 text-xl text-gray-500 font-black' />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default AccountWidget;
