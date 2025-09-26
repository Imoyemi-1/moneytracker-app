import { IoMdArrowDropdown } from 'react-icons/io';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { ImCross } from 'react-icons/im';
import clsx from 'clsx';
import { useState, useRef, useContext } from 'react';
import FilterDropDown from '../TransactionPage/FilterDropDown';
import Field from '../components/Field';
import { AppContext } from '../contexts/AppContext';
import { DashboardContext } from '../contexts/DashboardContext';
import { useDropdown } from '../contexts/Setup';

const MainPage = () => {
  const { setBaseInputEmpty, accounts } = useContext(AppContext);
  const { tags } = useContext(DashboardContext);
  const { selected, query, removeTagFilterReport, removeAccountFilterReport } =
    useDropdown();

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

  //
  const filteredForTags = tags
    .filter(
      (tag) =>
        selected.tagsFilterReport.length === 0 ||
        selected.tagsFilterReport.every((word) => tag !== word)
    )
    .filter((list) => list.toLowerCase().includes(query.toLowerCase()));

  //
  const filteredAccount = accounts
    .filter(
      (list) =>
        selected.accountFilterReport.length === 0 ||
        selected.accountFilterReport.every((acc) => list.id !== acc.id)
    )
    .filter((acc) => acc.name.toLowerCase().includes(query.toLowerCase()));

  // tags selection  display

  const addTagsFilterList = selected.tagsFilterReport.map((tag) => (
    <div
      className='tag flex gap-x-2 my-auto items-center text-sm whitespace-normal align-top  px-2.5 h-fit  bg-gray-300  hover:bg-gray-400 transition-colors duration-500 rounded-[2px] cursor-pointer'
      key={tag}
      onMouseDown={(e) => {
        e.stopPropagation();
        const removeBtn = e.target.closest('.removeBtn');
        removeBtn ? removeTagFilterReport(tag) : null;
      }}
    >
      <span className='mb-1'>{tag}</span>
      <ImCross className='removeBtn text-gray-500 text-[0.65rem]  hover:text-gray-600 active:text-[0.625rem]' />
    </div>
  ));

  //  account transaction filter currencies display

  const addAccountFilterList = selected.accountFilterReport.map((acc) => (
    <div
      className='tag flex gap-x-2 my-auto items-center text-sm whitespace-normal align-top  px-2.5 h-fit  bg-gray-300  hover:bg-gray-400 transition-colors duration-500 rounded-[2px] cursor-pointer'
      key={acc.id}
      onMouseDown={(e) => {
        e.stopPropagation();
        const removeBtn = e.target.closest('.removeBtn');
        removeBtn ? removeAccountFilterReport(acc.id) : null;
      }}
    >
      <span className='mb-1'>{acc.name}</span>
      <ImCross className='removeBtn text-gray-500 text-[0.65rem]  hover:text-gray-600 active:text-[0.625rem]' />
    </div>
  ));

  return (
    <main>
      <div className='border-b border-gray-300 flex  text-[#00000099] text-sm'>
        <div
          onMouseDown={(e) => {
            e.stopPropagation();
            setIsOpen((prev) => !prev);
            setIsOpenTime(false);
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
              setIsOpen(false);
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
      {/*  */}
      <div className='p-4 border-t border-gray-300 bg-[#f9fafb] text-base'>
        {/* selected account to filter transaction with and dropdown  to select the account to filter with*/}
        <Field
          id='accountFieldReport'
          isInput={true}
          setBaseInputEmpty={setBaseInputEmpty}
          dropDownList={filteredAccount}
          label=''
          placeholder={
            selected.accountFilterReport.length <= 0 ? 'Specify accounts' : null
          }
          selection={addAccountFilterList}
        />
        {/* selected tags to filter transaction with and dropdown  to select the tags to filter with*/}
        <Field
          id='tagsFieldReport'
          isInput={true}
          setBaseInputEmpty={setBaseInputEmpty}
          dropDownList={filteredForTags}
          label=''
          placeholder={
            selected.tagsFilterReport.length <= 0 ? 'Exclude tags' : null
          }
          selection={addTagsFilterList}
        />
      </div>
    </main>
  );
};

export default MainPage;
