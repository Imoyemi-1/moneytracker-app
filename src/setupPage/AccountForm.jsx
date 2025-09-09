import Field from '../components/Field';
import { useDropdown } from '../contexts/Setup';

const groupList = ['Cash', 'Bank Account', 'Deposit', 'Credit', 'Asset'];

const AccountForm = () => {
  const { selected } = useDropdown();

  return (
    <form>
      <div className='flex flex-col '>
        <label className='font-medium mb-1 text-sm ' htmlFor='accountName'>
          Name <span className='text-red-600 '>*</span>
        </label>
        <input
          className='border border-gray-200 outline-0 rounded-md pl-4 py-1.5'
          type='text'
          id='accountName'
          placeholder='Account name'
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
    </form>
  );
};

export default AccountForm;
