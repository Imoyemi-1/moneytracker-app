import { useEffect } from 'react';
import clsx from 'clsx';

const FilterDropDown = ({ ref, isOpen, setIsOpen, dropDownList }) => {
  useEffect(() => {
    // close dropdown if click out of dropdown
    const handleClickOutside = (e) =>
      ref.current && !ref.current.contains(e.target) ? setIsOpen(false) : null;
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <ul
      ref={ref}
      className={clsx(
        'absolute bg-white min-w-full left-0 top-full cursor-pointer rounded shadow shadow-gray-100 border border-gray-100 z-50',
        !isOpen && 'hidden '
      )}
    >
      {dropDownList}
    </ul>
  );
};

export default FilterDropDown;
