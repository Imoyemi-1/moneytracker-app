import { IoMdArrowDropdown } from 'react-icons/io';
import { getTotalAmt } from '../hooks/useExchangeRates';
import { useDropdown } from '../contexts/Setup';
import { useContext, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import { clsx } from 'clsx/lite';

const Section = ({ title, isNetWorth, sectionBody }) => {
  const { selected } = useDropdown();
  const { rates, accounts } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(true);

  if (!accounts) return;

  //  calculate total net worth amount
  const totalNetWorth = rates
    ? getTotalAmt(accounts, selected.baseSelection?.code, rates)
    : 0;

  return (
    <section
      className={clsx(
        ' text-[rgb(0,0,0,0.87)]  border-gray-300',
        !isOpen && 'border-b'
      )}
    >
      {/* Toggle section body if section header  is click*/}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className='flex items-center cursor-pointer'
      >
        <div className='flex flex-1 items-center py-4 pl-2  font-roboto'>
          <IoMdArrowDropdown
            className={clsx(
              'transition-transform duration-300 ease-linear',
              !isOpen && '-rotate-90'
            )}
          />

          <h3 className='uppercase  pl-[0.175rem] whitespace-nowrap text-[1.200rem]'>
            {title}
          </h3>
        </div>
        {isNetWorth && (
          <div
            // if amount is negative color red and  green if 0 or greater 0
            className={clsx(
              'pr-4 font-bold text-right text-xl font-mono',
              totalNetWorth >= 0 && 'text-green-500',
              totalNetWorth < 0 && 'text-red-500'
            )}
          >
            <span>
              {totalNetWorth?.toFixed(2)} {selected.baseSelection.code}
            </span>
          </div>
        )}
      </div>

      {/* display section if only is open states is true */}
      {isOpen && sectionBody}
    </section>
  );
};

export default Section;
