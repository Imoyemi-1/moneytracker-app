import { useState } from 'react';
import Field from '../components/Field';
import { useDropdown } from '../contexts/Setup';
import { clsx } from 'clsx/lite';
import { ImCross } from 'react-icons/im';
// get countries data from currencies data

const Form = () => {
  const { currenciesData, selected, openId } = useDropdown();
  const [baseInputEmpty, setBaseInputEmpty] = useState(true);

  // remove currencies already selected from base list
  const filteredForSearch = currenciesData
    .filter((currency) => currency.code !== selected.baseSelection.code)
    .filter(
      (cur) =>
        selected.additionalSelection.length === 0 ||
        selected.additionalSelection.every((addCur) => cur.code !== addCur.code)
    );

  // additional currencies display

  const addCurrencyList = selected.additionalSelection.map((cur) => (
    <div
      className='flex items-center gap-x-2 text-sm whitespace-normal align-top py-0.5 px-2.5 bg-gray-100 shadow hover:bg-gray-200 transition-colors duration-300 rounded-[2px] cursor-pointer'
      key={cur.code}
      onMouseDown={(e) => {
        e.preventDefault();
      }}
    >
      {cur.code}
      <ImCross className='text-gray-300 text-[0.75rem] hover:text-gray-500 active:text-[0.625rem]' />
    </div>
  ));

  return (
    <form>
      <div>
        <Field
          id='baseField'
          setBaseInputEmpty={setBaseInputEmpty}
          dropDownList={currenciesData}
          label='Base Currency'
          selection={
            <div
              className={clsx(
                //  toggle selection display when input have value
                'text-sm px-3.5 flex items-center',
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
          setBaseInputEmpty={setBaseInputEmpty}
          dropDownList={filteredForSearch}
          label='Additional Currencies (optional)'
          placeholder={
            selected.additionalSelection.length > 0
              ? ''
              : 'Select additional currencies'
          }
          selection={
            <div
              className={clsx(
                'flex gap-2 flex-wrap',
                selected.additionalSelection.length > 0 && 'ml-4'
              )}
            >
              {addCurrencyList}
            </div>
          }
        />
      </div>
    </form>
  );
};

export default Form;
