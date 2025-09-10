import Field from '../components/Field';
import { useDropdown } from '../contexts/Setup';

const groupList = ['Cash', 'Bank Account', 'Deposit', 'Credit', 'Asset'];

const AccountForm = () => {
  const { selected } = useDropdown();

  // for additional currencies amount

  const additionalAmountList = selected.additionalSelection.map((cur) => (
    <div key={cur.code} className='flex items-center text-sm mt-3.5'>
      <div className='flex-1'>
        <label className='flex items-center  cursor-pointer w-fit'>
          <input
            className='w-4 h-4 accent-blue-500 mr-2 '
            type='checkbox'
            defaultChecked
          />
          {cur.name}
        </label>
      </div>
      <div className='w-[41%] box-border'>
        <div className='flex '>
          <input
            className='border w-full text-end border-gray-200 rounded px-3.5 py-2 rounded-tr-none rounded-br-none outline-0 focus:border focus:border-blue-200'
            type='number'
            placeholder='Balance'
            step='0.01'
          />
          <div className='bg-gray-200 px-2.5 py-2 rounded rounded-tl-none rounded-bl-none'>
            {cur.code}
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <form>
      <div>
        <div className='flex flex-col '>
          <label className='font-medium mb-1 text-sm ' htmlFor='accountName'>
            Name <span className='text-red-600 '>*</span>
          </label>
          <input
            className='border border-gray-200 outline-0 rounded-md pl-4 py-1.5'
            type='text'
            id='accountName'
            placeholder='Account name'
            required
          />
        </div>
        <Field
          id='groupField'
          isInput={false}
          dropDownList={groupList}
          label='Group'
          selection={
            <div className='text-sm py-0.5'>{selected.groupSelection}</div>
          }
        />
      </div>

      {/* for base currency selection */}
      <div className='flex items-center text-sm'>
        <div className='flex-1'>
          <label className='flex items-center  cursor-pointer w-fit'>
            <input
              className='w-4 h-4 accent-blue-500 mr-2 '
              type='checkbox'
              defaultChecked
            />
            {selected.baseSelection.name}
          </label>
        </div>
        <div className='w-[41%] box-border'>
          <div className='flex '>
            <input
              className='border w-full text-end border-gray-200 rounded px-3.5 py-2 rounded-tr-none rounded-br-none outline-0 focus:border focus:border-blue-200'
              type='number'
              placeholder='Balance'
              step='0.01'
            />
            <div className='bg-gray-200 px-2.5 py-2 rounded rounded-tl-none rounded-bl-none'>
              {selected.baseSelection.code}
            </div>
          </div>
        </div>
      </div>

      {additionalAmountList}

      {/* for save  account button */}
      <div className='flex items-center text-sm mt-3.5'>
        <div className='flex-1'>
          <label className='flex items-center  cursor-pointer w-fit'>
            <input
              className='w-4 h-4 accent-blue-500 mr-2 '
              type='checkbox'
              defaultChecked
            />
            Show on Dashboard
          </label>
        </div>
        <button className='bg-blue-700 text-white py-2.5 px-5 w-[41%] rounded'>
          Save Account
        </button>
      </div>
    </form>
  );
};

export default AccountForm;
