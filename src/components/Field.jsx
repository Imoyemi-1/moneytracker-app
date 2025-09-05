import { IoMdArrowDropdown } from 'react-icons/io';
import { useState } from 'react';
import Dropdown from './Dropdown';
import { clsx } from 'clsx/lite';

const Field = ({ label, selection, placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [baseInputEmpty, setBaseInputEmpty] = useState(true);

  return (
    // Todo: add accessibility to jsx later

    <div className='mb-3.5 flex flex-col'>
      <label className='font-medium mb-1 text-sm '>{label}</label>

      <div
        className={clsx(
          'relative w-full flex flex-wrap items-center h-9.5 rounded',

          //   update border when input is focus or blur
          isFocused &&
            ' border-blue-200  border border-b-0 rounded-bl-none rounded-br-none',
          !isFocused && ' border-gray-300 border '
        )}
      >
        {selection &&
          //  toggle selection states when input is focus
          baseInputEmpty && (
            <div
              className={clsx(
                //  toggle selection display when input have value
                'text-sm px-3.5 flex items-center',
                isFocused && 'absolute opacity-50'
              )}
            >
              <img
                className='mr-2.5 h-3.5 w-4 object-cover'
                src={selection.flag}
                alt={selection.country}
              />
              <span>
                {selection.code}, {selection.name}
              </span>
            </div>
          )}

        <input
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          onChange={(e) =>
            e.target.value.trim().length > 0
              ? setBaseInputEmpty(false)
              : setBaseInputEmpty(true)
          }
          className='py-2 px-4 pr-7  full outline-0 min-w-12.5 flex-1 border-0 text-[0.9375rem]'
          type='text'
          //   toggle and display placeholder when selection is hidden
          placeholder={placeholder}
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
