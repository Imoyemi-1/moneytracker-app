import Section from './Section';
import AccountWidget from '../components/AccountWidget';
import NewTransactions from './NewTransactions';
import TransactionSection from './TransactionSection';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

export const MainPage = () => {
  const { transactions, accounts } = useContext(AppContext);

  return (
    <main className='md:px-3.5 md:pb-3.5 md:grid lg:grid-cols-2 gap-x-5 xl:bg-white xl:max-w-[60rem] xl:mx-auto xl:my-4.5 xl:rounded xl:shadow-[0_2px_4px_0_rgba(34,36,38,0.12),0_2px_10px_0_rgba(34,36,38,0.15)] '>
      {/* Section for dashboard net worth  and account widget section*/}
      <Section
        title='net worth'
        isNetWorth={true}
        sectionBody={
          <div className='md:border-x md:rounded md:border-b border-gray-300'>
            {accounts.length > 0 && <AccountWidget isDashboard={true} />}
          </div>
        }
      />
      <div>
        {/* Section for creating  new Transaction*/}
        <Section
          title='New Transaction'
          sectionBody={
            <div className='border-t md:border md:rounded  border-gray-300 '>
              {<NewTransactions />}
            </div>
          }
        />

        {/* Section for creating  new Transaction*/}

        <Section
          title='Recent Transactions'
          sectionBody={
            <div className='border-t md:border md:rounded border-gray-300 '>
              {<TransactionSection transactions={transactions} />}
            </div>
          }
        />
      </div>
    </main>
  );
};
