import { Outlet } from 'react-router';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { useAsideBar } from '../contexts/aside';

const RootLayout = () => {
  const { setupComplete } = useAsideBar();
  return (
    <>
      {setupComplete && (
        <>
          <Navbar />
          <Header />
        </>
      )}

      <Outlet />
    </>
  );
};

export default RootLayout;
