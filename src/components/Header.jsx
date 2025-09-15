import { GiHamburgerMenu } from 'react-icons/gi';

const Header = () => {
  return (
    <header className='p-4 h-15.5 bg-blue-bg sticky top-0 w-full shadow-header'>
      <div className='flex items-center text-white font-roboto'>
        <GiHamburgerMenu className='text-[1.6875rem] cursor-pointer' />
        <h2 className='pl-3 font-light flex-1 text-2xl '>Dashboard</h2>
      </div>
    </header>
  );
};

export default Header;
