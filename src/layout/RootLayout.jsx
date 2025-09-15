import { Outlet } from 'react-router';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Header />
      {/* <Outlet /> */}
    </>
  );
};

export default RootLayout;
