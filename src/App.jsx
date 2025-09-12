import SetupPage from './pages/SetupPage';
import { DropdownProvider } from './contexts/Setup';

const App = () => {
  return (
    <DropdownProvider>
      <div className='pt-4 bg-white max-w-[700px] m-auto'>
        <SetupPage />
      </div>
    </DropdownProvider>
  );
};

export default App;
