import Section from './Section';
import AccountWidget from '../components/AccountWidget';
import NewTransactions from '../components/NewTransactions';

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
    </main>
  );
};
