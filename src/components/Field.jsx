import { IoMdArrowDropdown } from 'react-icons/io';
import { useState } from 'react';
import Dropdown from './Dropdown';
import { clsx } from 'clsx/lite';

const Field = ({ label, selection, defaultPh, FocusPh }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    // Todo: add accessibility to jsx later

    <div className='mb-3.5 flex flex-col'>
      <label className='font-medium mb-1 text-sm '>{label}</label>

      <div
        className={clsx(
          'relative w-full flex flex-wrap items-center h-9.5 rounded',

          //   update border when input is focus or blur
          isFocused &&
            'border-blue-200  border border-b-0 rounded-bl-none rounded-br-none',
          !isFocused && 'border-gray-300 border '
        )}
      >
        {!isFocused && selection && (
          //  toggle selection display if input is focused
          <div className='text-[0.9375rem] px-3.5'>{selection}</div>
        )}

        <input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className='py-2 px-4 pr-7  full outline-0 min-w-12.5 flex-1 border-0 text-[0.9375rem]'
          type='text'
          //   toggle and display placeholder when selection is hidden
          placeholder={isFocused ? FocusPh : defaultPh}
        />

        <button type='button' className='px-4 cursor-pointer'>
          <IoMdArrowDropdown />
        </button>

        <Dropdown isFocused={isFocused} />
      </div>
    </div>
  );
};

export default Field;
