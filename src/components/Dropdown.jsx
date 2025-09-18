import clsx from 'clsx/lite';
import { useDropdown } from '../contexts/Setup';

const Dropdown = ({ isOpen, dropDownList, id }) => {
  const { selected, handleSelected, setOpenId, setQuery } = useDropdown();

  // list item for currencies dropdown

  const currenciesList = dropDownList.map((currency) => (
    <li
      onMouseDown={(e) => {
        e.stopPropagation();
        handleSelected(id, currency.code);
        setOpenId(null);
        setQuery('');
      }}
      key={currency.code}
      className={clsx(
        'text-sm  flex items-center px-4 py-2 border-t border-gray-50 cursor-pointer hover:bg-gray-100 pointer-events-auto',
        currency.name === selected.baseSelection.name &&
          'bg-gray-100 font-medium'
      )}
    >
      <img
        className='mr-2.5 h-3.5 w-4 object-cover'
        src={currency.flag}
        alt={currency.country}
      />
      <span>
        {currency.code}, {currency.name}
      </span>
    </li>
  ));

  // list item for group dropdown

  const accountGroupList = dropDownList.map((list) => (
    <li
      className={clsx(
        'text-sm  flex items-center px-4 py-2 border-t border-gray-50 cursor-pointer hover:bg-gray-100 pointer-events-auto',
        list === selected.groupSelection && 'bg-gray-100 font-medium'
      )}
      key={list}
      onMouseDown={(e) => {
        e.stopPropagation();
        handleSelected(id, list);
        setOpenId(null);
      }}
    >
      {list}
    </li>
  ));

  // list item for selection of new transactions

  const accountTransactionList = dropDownList.map((list) => (
    <li
      className={clsx(
        'text-sm  flex items-center justify-between px-4 py-2 border-t border-gray-50 cursor-pointer hover:bg-gray-100 pointer-events-auto',
        list.name === selected.firstAccountTransaction.name &&
          'bg-gray-100 font-medium'
      )}
      key={list.id}
      onMouseDown={(e) => {
        e.stopPropagation();
        handleSelected(id, list.id);
        setOpenId(null);
      }}
    >
      <span>{list.name}</span>
      <span className='text-gray-400'>{list.type}</span>
    </li>
  ));

  return (
    // Todo: add accessibility to jsx later
    <ul
      className={clsx(
        'dropdown absolute left-0 border w-full  text-sm max-h-[7rem]  overflow-y-auto scroll-auto border-blue-200  rounded border-t-0 rounded-tl-none rounded-tr-none z-10 bg-white shadow-[0_1.5px_0_rgba(0,0,0,0.05)]',

        // toggle dropdown display if input is focused
        !isOpen && 'hidden'
      )}
    >
      {/* display list base on the dropdown */}
      {dropDownList.length > 0 ? (
        id === 'groupField' ? (
          accountGroupList
        ) : id === 'firstTransaction' ? (
          accountTransactionList
        ) : (
          currenciesList
        )
      ) : (
        <li className=' px-4 py-1.5 border-t border-gray-50 text-gray-400'>
          No result found
        </li>
      )}
    </ul>
  );
};

export default Dropdown;
