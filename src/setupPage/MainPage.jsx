import CurrenciesForm from './CurrenciesForm';

const MainPage = () => {
  return (
    <main className='border-t border-gray-100 p-3.5 space-y-3.5'>
      <p className=''>
        if you want to sync your data with the cloud. You may also use the
        tracker without signing in. Your data will be stored only on current
        device in this case. You can sign in and sync your data any time later.
      </p>
      <h2 className='font-roboto text-2xl '>Currencies</h2>
      <p>
        Select your base currency — the currency which will be used by default.
        <br />
        You can also select any number of additional currencies, if you use
        them.
      </p>
      <CurrenciesForm />
      <h2 className='font-roboto text-2xl '>Accounts</h2>
      <p>
        Create accounts that you would like to keep track of.
        <br />
        It could be cash in your wallet, bank accounts, credit cards or even a
        loan to your friend.
      </p>
    </main>
  );
};

export default MainPage;
