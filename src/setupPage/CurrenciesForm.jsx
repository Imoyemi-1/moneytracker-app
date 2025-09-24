import { useContext } from 'react';
import Field from '../components/Field';
import { useDropdown } from '../contexts/Setup';
import { clsx } from 'clsx/lite';
import { ImCross } from 'react-icons/im';
import { AppContext } from '../contexts/AppContext';
// get countries data from currencies data

const CurrenciesForm = () => {
  const { currenciesData, query, selected, openId, removeAdditionalCur } =
    useDropdown();
  const { baseInputEmpty, setBaseInputEmpty } = useContext(AppContext);

  // remove currencies already selected from base list
  const filteredForSearch = currenciesData
    .filter((currency) => currency.code !== selected.baseSelection.code)
    .filter(
      (cur) =>
        selected.additionalSelection.length === 0 ||
        selected.additionalSelection.every((addCur) => cur.code !== addCur.code)
    )
    .filter(
      (currency) =>
        currency.code?.toLowerCase().includes(query.toLowerCase()) ||
        currency.name?.toLowerCase().includes(query.toLowerCase())
    );

  const filteredForBase = currenciesData.filter(
    (currency) =>
      currency.code?.toLowerCase().includes(query.toLowerCase()) ||
      currency.name?.toLowerCase().includes(query.toLowerCase())
  );

  // additional currencies display

  const addCurrencyList = selected.additionalSelection.map((cur) => (
    <div
      // className='tag flex items-center gap-x-2 text-sm whitespace-normal align-top  px-2.5 bg-gray-100 shadow hover:bg-gray-200 transition-colors duration-300 rounded-[2px] cursor-pointer'
      className='tag flex gap-x-2 w-fit my-auto items-center text-[0.75rem] whitespace-normal align-top  py-[0.19rem] px-2.5 h-fit text-black/60 bg-[#e8e8e8]  rounded'
      key={cur.code}
      onMouseDown={(e) => {
        e.stopPropagation();
        const removeBtn = e.target.closest('.removeBtn');
        removeBtn ? removeAdditionalCur(cur.code) : null;
      }}
    >
      {cur.code}
      <ImCross className='removeBtn text-gray-300 text-[0.75rem] hover:text-gray-500 active:text-[0.625rem]' />
    </div>
  ));

  return (
    <form>
      <div>
        <Field
          id='baseField'
          isInput={true}
          setBaseInputEmpty={setBaseInputEmpty}
          dropDownList={filteredForBase}
          label='Base Currency'
          selection={
            <div
              className={clsx(
                'flex items-center absolute -translate-y-1/2 top-1/2',
                openId === 'baseField' && 'opacity-50',
                !baseInputEmpty && 'invisible'
              )}
            >
              <img
                className='mr-2.5 h-3.5 w-4 object-cover'
                src={selected.baseSelection.flag}
                alt={selected.baseSelection.country}
              />
              <span>
                {selected.baseSelection.code}, {selected.baseSelection.name}
              </span>
            </div>
          }
          placeholder=''
        />

        <Field
          id='additionalField'
          isInput={true}
          setBaseInputEmpty={setBaseInputEmpty}
          dropDownList={filteredForSearch}
          label='Additional Currencies (optional)'
          placeholder={
            selected.additionalSelection.length > 0
              ? ''
              : 'Select additional currencies'
          }
          selection={addCurrencyList}
        />
      </div>
    </form>
  );
};

export default CurrenciesForm;
