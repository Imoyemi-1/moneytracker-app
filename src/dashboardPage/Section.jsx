import { IoMdArrowDropdown } from 'react-icons/io';
import { useLiveQuery } from 'dexie-react-hooks';
import db from '../db/data';
import { getTotalAmt } from '../hooks/useExchangeRates';
import { useDropdown } from '../contexts/Setup';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { clsx } from 'clsx/lite';

const Section = ({ title, isNetWorth, sectionBody }) => {
  const accounts = useLiveQuery(() => db.accounts.toArray(), []);
  const { selected } = useDropdown();
  const { rates } = useContext(AppContext);

  if (!accounts) return;

  const totalNetWorth = rates
    ? getTotalAmt(accounts, selected.baseSelection.code, rates, true)
    : null;

  return (
    <section className='cursor-pointer text-[rgb(0,0,0,0.87)]'>
      <div className='flex items-center'>
        <div className='flex flex-1 items-center py-4 pl-2 text-xl font-roboto'>
          <IoMdArrowDropdown />
          <h3 className='uppercase  left-[0.175rem] whitespace-nowrap '>
            {title}
          </h3>
        </div>
        {isNetWorth && (
          <div
            className={clsx(
              'pr-4 font-bold text-right text-[1.35rem] font-mono',
              totalNetWorth >= 0 && 'text-green-500',
              totalNetWorth < 0 && 'text-red-500'
            )}
          >
            <span>
              {totalNetWorth.toFixed(2)} {selected.baseSelection.code}
            </span>
          </div>
        )}
      </div>
      {sectionBody}
    </section>
  );
};

export default Section;
