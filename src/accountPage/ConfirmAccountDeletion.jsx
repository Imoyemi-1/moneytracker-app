import { useContext, useState } from 'react';
import OptionField from './OptionField';
import { AppContext } from '../contexts/AppContext';
import { FaArrowRight } from 'react-icons/fa';
import Field from '../components/Field';
import { useDropdown } from '../contexts/Setup';
import { useDeleteAccount } from '../hooks/useAccount';
import { DashboardContext } from '../contexts/DashboardContext';

const ConfirmAccountDeletion = () => {
  const { accountToEdit, accounts, rates } = useContext(AppContext);
  const { selected } = useDropdown();
  const { resetStateEdit } = useContext(DashboardContext);
  const [deleteOption, setDeleteOption] = useState('archive');

  const handleAccountDeletion = () => {
    useDeleteAccount(deleteOption, accountToEdit.id, rates);
    resetStateEdit();
  };

  return (
    <>
      {/*  */}
      <h3 className='font-roboto text-lg'>
        You are about to delete account "{accountToEdit?.name}"
      </h3>
      <p className='my-3.5 text-sm'>
        What should we do with transactions linked to this account?
      </p>
      {/*  */}
      <form action={handleAccountDeletion}>
        <OptionField
          id={'archiveRadio'}
          text={'Archive account, keep transactions as is'}
          value={'archive'}
          checked={deleteOption === 'archive'}
          onChange={() => setDeleteOption('archive')}
        />
        <OptionField
          id={'deleteRadio'}
          text={'Delete transactions with account'}
          value={'delete'}
          checked={deleteOption === 'delete'}
          onChange={() => setDeleteOption('delete')}
        />
        {accounts.length > 1 && (
          <OptionField
            id={'moveRadio'}
            text={'Move transactions to another account'}
            value={'move'}
            checked={deleteOption === 'move'}
            onChange={() => setDeleteOption('move')}
          />
        )}
        {/*  */}
        {deleteOption === 'move' && (
          <Field
            id='moveAccountDeleteOption'
            isInput={false}
            label=''
            dropDownList={accounts?.filter(
              (acc) => acc.id !== accountToEdit.id
            )}
            selection={
              <div className='text-sm py-0.5'>
                {selected.moveToDeleteAccount?.name}
              </div>
            }
          />
        )}
        <div>
          <button className='relative accent-black mr-1 text-sm bg-red-700 opacity-90 hover:opacity-100 duration-300 transition-opacity text-white py-2 pr-15 pl-5.5 rounded cursor-pointer'>
            <span className='absolute flex items-center  top-0 right-0 h-full rounded rounded-tl-none rounded-bl-none text-sm bg-red-800 w-9'>
              <FaArrowRight className='text-base m-auto' />
            </span>
            Proceed
          </button>
        </div>
      </form>
    </>
  );
};

export default ConfirmAccountDeletion;
