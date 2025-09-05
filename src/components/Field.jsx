import { IoMdArrowDropdown } from 'react-icons/io';
import { useState } from 'react';

const Field = ({ label, selection, defaultPh, FocusPh }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    // Todo: add accessibility to jsx later

    <div className='mb-3.5 flex flex-col'>
      <label className='font-medium mb-1 text-sm '>{label}</label>
      <div className='w-full flex border border-gray-300 h-9.5 rounded items-center py-2.5  px-3.5 '>
        {!isFocused && <div className='text-[0.9375rem]'>{selection}</div>}
        <input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className='py-2 pr-7 full outline-0 min-w-12.5 flex-1 border-0 text-[0.9375rem]'
          type='text'
          placeholder={isFocused ? FocusPh : defaultPh}
        />
        <IoMdArrowDropdown className='cursor-pointer' />
      </div>
    </div>
  );
};

export default Field;
