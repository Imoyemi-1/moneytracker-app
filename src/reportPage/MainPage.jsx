import { IoMdArrowDropdown } from 'react-icons/io';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import clsx from 'clsx';
import { useState, useRef } from 'react';
import FilterDropDown from '../TransactionPage/FilterDropDown';

const MainPage = () => {
  const [filterReport, setFilterReport] = useState('Expense & Income');
  const [timeFilterReport, setTimeFilterReport] = useState('Yearly');
  //  time range list to display and filter displayed transaction
  const filterList = [
    'Expense & Income',
    'Expense by Tags',
    'Net Income',
    'Net Worth',
  ];
  const timeFilterList = ['Yearly', 'Monthly'];

  // use and close dropdown is it clicked out
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTime, setIsOpenTime] = useState(false);
  const FilterDropdownRef = useRef(null);
  const timeFilterRef = useRef(null);

  // dropdown list for selecting time range
  const FilterDropdownList = filterList.map((list) => (
    <li
      key={list}
      onMouseDown={(e) => {
        e.stopPropagation();
        setFilterReport(list);
        setIsOpen(false);
      }}
      className={clsx(
        'cursor-pointer  text-black/85 px-4 py-2 hover:bg-gray-100 duration-300 transition-all ease-linear',
        list === filterReport && 'bg-gray-100 font-medium'
      )}
    >
      {list}
    </li>
  ));

  // dropdown list for selecting time range
  const timeDropdownList = timeFilterList.map((list) => (
    <li
      key={list}
      onMouseDown={(e) => {
        e.stopPropagation();
        setTimeFilterReport(list);
        setIsOpenTime(false);
      }}
      className={clsx(
        'cursor-pointer  text-black/85 px-4 py-2 hover:bg-gray-100 duration-300 transition-all ease-linear',
        list === timeFilterReport && 'bg-gray-100 font-medium'
      )}
    >
      {list}
    </li>
  ));

  return (
    <main>
      <div className='border-b border-gray-300 flex  text-[#00000099] text-sm'>
        <div
          onMouseDown={(e) => {
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
          className='relative flex text-nowrap items-center  border-r border-gray-300 py-2 px-5 cursor-pointer hover:text-gray-700 transition-colors duration-200'
        >
          <div>{filterReport}</div>
          <IoMdArrowDropdown className='ml-2 text-base' />
          {/* dropdown list to display time range list */}
          <FilterDropDown
            ref={FilterDropdownRef}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            dropDownList={FilterDropdownList}
          />
        </div>
        <button className='border-r border-gray-300 py-1 px-2 cursor-pointer hover:text-gray-600 transition-colors duration-200'>
          <MdKeyboardArrowLeft className='text-2xl ' />
        </button>
        <div className='relative'>
          <div
            onMouseDown={(e) => {
              e.stopPropagation();
              setIsOpenTime((prev) => !prev);
            }}
            className='border-r border-gray-300 h-full  py-2 px-5.5 cursor-pointer'
          >
            2025
          </div>
          <FilterDropDown
            ref={timeFilterRef}
            isOpen={isOpenTime}
            setIsOpen={setIsOpenTime}
            dropDownList={timeDropdownList}
          />
        </div>
        <button className='border-r border-gray-300 py-1 px-2 cursor-pointer hover:text-gray-600 transition-colors duration-200'>
          <MdKeyboardArrowRight className='text-2xl ' />
        </button>
      </div>
    </main>
  );
};

export default MainPage;
