import { IoMdArrowDropdown } from 'react-icons/io';
import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';

import { DashboardContext } from '../contexts/DashboardContext';

const TransactionAmtField = ({
  dropDownList,
  selection,
  id,
  name,
  isReadOnly,
  value,
  onChange,
}) => {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const { handleChangeSelected } = useContext(DashboardContext);

  // handle toggle onclick of dropdown selection container
  const onToggle = () => {
    if (dropDownList?.length <= 1) return;
    setIsOpenDropDown((prev) => !prev);
  };

  // transaction amount field dropdown list
  const currencyList = dropDownList?.map((cur) => (
    <li
      onClick={() => {
        handleChangeSelected(id, cur.code);
      }}
      key={cur.code}
      className={clsx(
        'py-2 flex justify-center whitespace-nowrap border-b border-gray-300 hover:bg-gray-100',
        cur.code === selection && 'font-semibold bg-gray-100'
      )}
    >
      {cur.code}
    </li>
  ));

  // close dropdown if click on body
  useEffect(() => {
    const handleClickOut = () => {
      setIsOpenDropDown(false);
    };
    document.addEventListener('click', handleClickOut);

    return () => {
      document.removeEventListener('click', handleClickOut);
    };
  });

  return (
    <div className='flex'>
      {/* input for amount transaction */}
      <input
        className={clsx(
          'border w-full text-end border-gray-200 rounded px-3.5 py-1.5 rounded-tr-none rounded-br-none outline-0 ',
          !isReadOnly && 'focus:border focus:border-blue-200'
        )}
        type='number'
        step='0.01'
        min={0.01}
        required
        name={name}
        readOnly={isReadOnly}
        onInput={(e) => onChange?.(e.target.value)}
        value={value ?? ''}
      />
      {/* Container for selection and dropdown list  */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className={clsx(
          'relative flex items-center text-sm font-mono min-w-16 justify-center gap-2 bg-gray-200 rounded px-3 py-1.5 rounded-tl-none rounded-bl-none',
          dropDownList?.length <= 1 && 'cursor-auto',
          isOpenDropDown && 'bg-gray-300'
        )}
      >
        <span>{selection}</span>
        {dropDownList?.length > 1 && (
          <>
            <IoMdArrowDropdown className='text-lg' />
            <ul
              className={clsx(
                ' absolute min-w-full left-0 top-full rounded bg-white border border-gray-200 z-5 tran-menu',
                !isOpenDropDown && 'hidden'
              )}
            >
              {currencyList}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionAmtField;
