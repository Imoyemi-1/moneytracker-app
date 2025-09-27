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
import Modal from './Modal';

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
        'fixed top-15.5 w-31 min-h-full bg-white translate -translate-x-full transition-transform duration-300 ease-linear z-50 md:translate-x-0  shadow-[0_2px_6px_0_rgba(34,36,38,0.15),0_2px_18px_0_rgba(34,36,38,0.17)]',
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
      {isOpenSidebar && <Modal content={''} />}
    </aside>
  );
};

export default Navbar;
