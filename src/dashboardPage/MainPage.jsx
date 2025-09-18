import Section from './Section';
import AccountWidget from '../components/AccountWidget';
import NewTransactions from './NewTransactions';
import TransactionSection from './TransactionSection';

export const MainPage = () => {
  return (
    <main>
      {/* Section for dashboard net worth  and account widget section*/}
      <Section
        title='net worth'
        isNetWorth={true}
        sectionBody={
          <div className='border-t border-gray-300 '>
            <AccountWidget isDashboard={true} />
          </div>
        }
      />
      {/* Section for creating  new Transaction*/}
      <Section
        title='New Transaction'
        sectionBody={
          <div className='border-t border-gray-300 '>{<NewTransactions />}</div>
        }
      />
      {/* Section for creating  new Transaction*/}
      <Section
        title='Recent Transactions'
        sectionBody={
          <div className='border-t border-gray-300 '>
            {<TransactionSection />}
          </div>
        }
      />
    </main>
  );
};
