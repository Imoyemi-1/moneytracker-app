import { GiHamburgerMenu } from 'react-icons/gi';
import { useAsideBar } from '../contexts/aside';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

const Header = () => {
  const { setOpenSidebar } = useAsideBar();
  const [currentPageName, setCurrentPageName] = useState('');
  const location = useLocation();

  useEffect(() => {
    // paths to readable names
    const pathToNameMap = {
      '/': 'Dashboard',
      '/transactions': 'Transactions',
      '/accounts': 'Accounts',
      '/reports': 'Reports',
      '/budget': 'Budget',
      '/settings': 'Settings',
    };

    // default to 'unknown if path is not found'

    setCurrentPageName(pathToNameMap[location.pathname] || 'Unknown');
  }, [location.pathname]);

  return (
    <header className='p-4 h-15.5 bg-blue-bg sticky top-0 w-full shadow-header z-50'>
      <div className='flex items-center text-white font-roboto'>
        {/* toggle sidebar */}
        <GiHamburgerMenu
          onClick={() => setOpenSidebar((prev) => !prev)}
          className='text-[1.6875rem] cursor-pointer'
        />
        {/* Dynamic page title */}
        <h2 className='pl-3 font-light flex-1 text-2xl '>{currentPageName}</h2>
      </div>
    </header>
  );
};

export default Header;
