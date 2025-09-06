import { IoMdArrowDropdown } from 'react-icons/io';
import Dropdown from './Dropdown';
import { clsx } from 'clsx/lite';
import { useEffect, useRef } from 'react';

const Field = ({
  label,
  selection,
  placeholder,
  id,
  openId,
  setOpenId,
  setBaseInputEmpty,
}) => {
  const isOpen = openId === id;
  const inputRef = useRef(null);

  // focus on the input when state change

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
    else {
      inputRef.current?.blur();
      inputRef.current.value = '';
      setBaseInputEmpty(true);
    }
  }, [isOpen]);

  // handle toggle for which field is click

  const onToggle = (e) => {
    e.preventDefault();
    const nextOpen = !isOpen;
    setOpenId(nextOpen ? id : null);
    if (nextOpen) inputRef.current.focus();
    else inputRef.current.blur();
  };

  //   handle base selection when typed in input

  const handleBaseSelection = (id) => {
    if (id === 'baseField' && inputRef.current.value.trim()) {
      setBaseInputEmpty(false);
    } else {
      setBaseInputEmpty(true);
    }
  };

  return (
    // Todo: add accessibility to jsx later

    <div className='mb-3.5 flex flex-col'>
      <label className='font-medium mb-1 text-sm '>{label}</label>
      <div
        className={clsx(
          'relative w-full flex flex-wrap items-center h-9.5 rounded  border-gray-300 border  justify-between',

          // update border when input is focus or blur
          isOpen &&
            ' border-blue-200  border border-b-0 rounded-bl-none rounded-br-none',
          !isOpen && ' border-gray-300 border '
        )}
      >
        <>{selection}</>

        <input
          ref={inputRef}
          className='absolute w-full py-2 px-4 pr-7  full outline-0 min-w-12.5 flex-1 border-0 text-[0.9375rem]'
          type='text'
          onChange={() => {
            handleBaseSelection(id);
          }}
          onFocus={() => setOpenId(id)}
          onBlur={() => setOpenId(null)}
          placeholder={placeholder}
        />

        <button
          onPointerDown={onToggle}
          type='button'
          className='px-4 cursor-pointer relative right-0'
        >
          <IoMdArrowDropdown />
        </button>

        <Dropdown isOpen={isOpen} />
      </div>
    </div>
  );
};

export default Field;
