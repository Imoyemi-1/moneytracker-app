import { NavLink } from 'react-router';
import {
  FaNewspaper,
  FaExchangeAlt,
  FaCreditCard,
  FaChartLine,
  FaShoppingBasket,
} from 'react-icons/fa';
import { IoIosOptions } from 'react-icons/io';
import { clsx } from 'clsx/lite';
import { useAsideBar } from '../contexts/aside';

const Navbar = () => {
  const { isOpenSidebar, setOpenSidebar } = useAsideBar();

  // close sidebar once nav is clicked

  const closeSideBar = () => {
    setOpenSidebar(false);
  };

  return (
    <aside
      onClick={closeSideBar}
      className={clsx(
        'fixed top-15.5 w-31 min-h-full bg-white translate -translate-x-full transition-transform duration-300 ease-linear',
        isOpenSidebar && 'translate-x-0'
      )}
    >
      <nav>
        <NavLink className='nav-item' to='/'>
          <FaNewspaper className='nav-item-icon' />
          <span>Dashboard</span>
        </NavLink>
        <NavLink className='nav-item' to='transactions'>
          <FaExchangeAlt className='nav-item-icon' />
          <span>Transactions</span>
        </NavLink>
        <NavLink className='nav-item' to='accounts'>
          <FaCreditCard className='nav-item-icon' />
          <span>Accounts</span>
        </NavLink>
        <NavLink className='nav-item' to='reports'>
          <FaChartLine className='nav-item-icon' />
          <span>Reports</span>
        </NavLink>
        <NavLink className='nav-item' to='budget'>
          <FaShoppingBasket className='nav-item-icon' />
          <span>Budget</span>
        </NavLink>
        <NavLink className='nav-item' to='settings'>
          <IoIosOptions className='nav-item-icon' />
          <span>Settings</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Navbar;
