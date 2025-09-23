import { useContext } from 'react';
import Field from '../components/Field';
import { AppContext } from '../contexts/AppContext';
import { useDropdown } from '../contexts/Setup';
import { ImCross } from 'react-icons/im';

const FilterTransactionForm = () => {
  const { setBaseInputEmpty, accounts } = useContext(AppContext);
  const { query, selected, removeTagFilter, removeAccountFilter } =
    useDropdown();

  //
  const filteredForTags = ['from', 'here', 'eba', 'ele', 'sd', 'amala']
    .filter(
      (tag) =>
        selected.tagsFilterTransaction.length === 0 ||
        selected.tagsFilterTransaction.every((word) => tag !== word)
    )
    .filter((list) => list.toLowerCase().includes(query.toLowerCase()));

  //
  const filteredAccount = accounts
    .filter(
      (list) =>
        selected.accountFilterTransaction.length === 0 ||
        selected.accountFilterTransaction.every((acc) => list.id !== acc.id)
    )
    .filter((acc) => acc.name.toLowerCase().includes(query.toLowerCase()));

  // tags selection  display

  const addTagsFilterList = selected.tagsFilterTransaction.map((tag) => (
    <div
      className='tag flex gap-x-2 my-auto items-center text-sm whitespace-normal align-top  px-2.5 h-fit  bg-gray-300  hover:bg-gray-400 transition-colors duration-500 rounded-[2px] cursor-pointer'
      key={tag}
      onMouseDown={(e) => {
        e.stopPropagation();
        const removeBtn = e.target.closest('.removeBtn');
        removeBtn ? removeTagFilter(tag) : null;
      }}
    >
      <span className='mb-1'>{tag}</span>
      <ImCross className='removeBtn text-gray-500 text-[0.65rem]  hover:text-gray-600 active:text-[0.625rem]' />
    </div>
  ));

  //  account transaction filter currencies display

  const addAccountFilterList = selected.accountFilterTransaction.map((acc) => (
    <div
      className='tag flex gap-x-2 my-auto items-center text-sm whitespace-normal align-top  px-2.5 h-fit  bg-gray-300  hover:bg-gray-400 transition-colors duration-500 rounded-[2px] cursor-pointer'
      key={acc.id}
      onMouseDown={(e) => {
        e.stopPropagation();
        const removeBtn = e.target.closest('.removeBtn');
        removeBtn ? removeAccountFilter(acc.id) : null;
      }}
    >
      <span className='mb-1'>{acc.name}</span>
      <ImCross className='removeBtn text-gray-500 text-[0.65rem]  hover:text-gray-600 active:text-[0.625rem]' />
    </div>
  ));
  return (
    <div>
      <form className='p-3.5'>
        {/* selected account to filter transaction with and dropdown  to select the account to filter with*/}
        <Field
          id='accountFieldFilter'
          isInput={true}
          setBaseInputEmpty={setBaseInputEmpty}
          dropDownList={filteredAccount}
          label='Account'
          placeholder=''
          selection={addAccountFilterList}
        />
        {/* selected tags to filter transaction with and dropdown  to select the tags to filter with*/}
        <Field
          id='tagsFieldFilter'
          isInput={true}
          setBaseInputEmpty={setBaseInputEmpty}
          dropDownList={filteredForTags}
          label='Tags'
          placeholder=''
          selection={addTagsFilterList}
        />
      </form>
    </div>
  );
};

export default FilterTransactionForm;
