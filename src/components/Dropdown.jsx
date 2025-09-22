import clsx from 'clsx/lite';
import { useDropdown } from '../contexts/Setup';
import { DashboardContext } from '../contexts/DashboardContext';
import { useContext } from 'react';

const Dropdown = ({ isOpen, dropDownList, id }) => {
  const { selected, handleSelected, setOpenId, setQuery, query } =
    useDropdown();
  const { setTags, tags } = useContext(DashboardContext);

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
        setQuery('');
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
        id === 'firstTransaction'
          ? list.name === selected.firstAccountTransaction.name &&
              'bg-gray-100 font-medium'
          : id === 'secondTransaction'
          ? list.name === selected.secondAccountTransaction.name &&
            'bg-gray-100 font-medium'
          : null
      )}
      key={list.id}
      onMouseDown={(e) => {
        if (id === 'accountFieldFilter') return;
        e.stopPropagation();
        handleSelected(id, list.id);
        setQuery('');
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
      {/*  add display list to add tags  */}
      {id === 'tagsField' && query.length > 0
        ? !tags
            .filter(
              (tag) =>
                selected.tags.length === 0 ||
                selected.tags.every((word) => tag !== word)
            )
            .includes(query) && (
            <li
              onMouseDown={(e) => {
                e.stopPropagation();
                if (!tags.includes(query)) {
                  handleSelected(id, query);
                  setTags((prev) =>
                    prev.includes(query) ? prev : [...prev, query]
                  );
                } else {
                  alert('Tag already Exist');
                }

                setOpenId(null);
                setQuery('');
              }}
              className='text-sm gap-1 flex items-center px-4 py-2 border-t border-gray-50 cursor-pointer bg-gray-100 pointer-events-auto'
            >
              Add {<b> {query}</b>}
            </li>
          )
        : null}
      {/* display list base on the dropdown */}
      {dropDownList.length > 0 ? (
        // display list in selected type
        id === 'groupField' || id === 'tagsFieldFilter' ? (
          accountGroupList
        ) : // dropdown list for tags filters
        id === 'tagsField' ? (
          dropDownList
            .filter((tag) => tag.toLowerCase().includes(query.toLowerCase()))
            .map((list) => (
              <li
                className={
                  'text-sm  flex items-center px-4 py-2 border-t border-gray-50 cursor-pointer hover:bg-gray-100 pointer-events-auto'
                }
                key={list}
                onMouseDown={(e) => {
                  if (id === 'tagsFieldFilter') return;
                  e.stopPropagation();
                  handleSelected(id, list);
                  setOpenId(null);
                  setQuery('');
                }}
              >
                {list}
              </li>
            ))
        ) : // for account to make transaction or filter transaction
        id === 'firstTransaction' ||
          id === 'secondTransaction' ||
          id === 'accountFieldFilter' ? (
          accountTransactionList
        ) : (
          // list for dropdown for selection base currencies
          currenciesList
        )
      ) : id === 'tagsField' && query.length > 0 ? null : (
        <li
          onMouseDown={(e) => e.stopPropagation()}
          className=' flex items-center px-4  min-h-9 border-t border-gray-50 text-gray-400'
        >
          No result found
        </li>
      )}
    </ul>
  );
};

export default Dropdown;
