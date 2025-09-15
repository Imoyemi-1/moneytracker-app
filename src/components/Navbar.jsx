import { NavLink } from 'react-router';
import {
  FaNewspaper,
  FaExchangeAlt,
  FaCreditCard,
  FaChartLine,
  FaShoppingBasket,
} from 'react-icons/fa';
import { IoIosOptions } from 'react-icons/io';

const Navbar = () => {
  return (
    <aside className='fixed top-15.5 w-31 min-h-full bg-white '>
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
