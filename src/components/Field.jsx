import { IoMdArrowDropdown } from 'react-icons/io';
import Dropdown from './Dropdown';
import { clsx } from 'clsx/lite';
import { useEffect, useRef } from 'react';
import { useDropdown } from '../contexts/Setup';

const Field = ({
  label,
  selection,
  placeholder,
  id,
  setBaseInputEmpty,
  dropDownList,
  isInput,
}) => {
  const { openId, setOpenId, setQuery, query } = useDropdown();

  const isOpen = openId === id;
  const inputRef = useRef(null);

  // for search in input field
  const filtered = dropDownList.filter(
    (currency) =>
      currency.code?.toLowerCase().includes(query.toLowerCase()) ||
      currency.name?.toLowerCase().includes(query.toLowerCase())
  );

  // focus on the input when state change

  useEffect(() => {
    const handleClickOutside = () => {
      setOpenId(null);
      setQuery('');
    };

    if (!isInput) return;

    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      inputRef.current.value = '';
      setBaseInputEmpty(true);
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // handle toggle for which field is click

  const onToggle = () => {
    const nextOpen = !isOpen;
    setOpenId(nextOpen ? id : null);
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
        onMouseDown={(e) => {
          e.stopPropagation();
          setOpenId(id);
        }}
        className='relative'
      >
        <div
          className={clsx(
            'flex  rounded-md  pl-4 py-1.5',
            isOpen &&
              'border border-b-0 border-blue-200 rounded-bl-none rounded-br-none',
            !isOpen &&
              'border border-gray-200 hover:border-gray-400 duration-300 transition-colors'
          )}
        >
          <div className='flex w-full flex-wrap gap-x-3 gap-y-2 m-auto'>
            <>{selection}</>

            {isInput && (
              <input
                ref={inputRef}
                className='w-full  flex-1 outline-0'
                type='text'
                onChange={(e) => {
                  handleBaseSelection(id);
                  setQuery(e.target.value.trim());
                }}
                placeholder={placeholder}
              />
            )}
          </div>

          <button
            onMouseDown={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            type='button'
            className='dropDownBtn px-4 cursor-pointer'
          >
            <IoMdArrowDropdown />
          </button>
        </div>

        <Dropdown
          id={id}
          dropDownList={id === 'groupField' ? dropDownList : filtered}
          isOpen={isOpen}
        />
      </div>
    </div>
  );
};

export default Field;
