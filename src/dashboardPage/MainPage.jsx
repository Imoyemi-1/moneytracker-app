import Section from './Section';
import AccountWidget from '../components/AccountWidget';

export const MainPage = () => {
  return (
    <main>
      <Section
        title='net worth'
        isNetWorth={true}
        sectionBody={
          <div className='border-t border-gray-300 '>
            <AccountWidget isDashboard={true} />
          </div>
        }
      />
      <Section title='New Transaction' sectionBody={''} />
    </main>
  );
};
